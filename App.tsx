
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Trophy, 
  ArrowRight, 
  Check, 
  LogOut,
  Mail,
  Info,
  BookOpen,
  UserPlus,
  BarChart3,
  Gift,
  MessageSquare
} from 'lucide-react';

/**
 * ASSET INSTRUCTIONS:
 * Ensure 'logo.png' and 'bg_left_bar.png' are in your 'public' folder.
 */
const ASSETS = {
  logo: "/logo.png",
  wave: "https://res.cloudinary.com/dfm67v8v3/image/upload/v1740051187/Wave_Graphics_p7e5u6.png",
  sidebarPattern: "/bg_left_bar.png"
};

// --- Types ---
interface MatchmakerOption {
  id: string;
  tag?: string;
  label: string;
}

interface MatchmakerQuestion {
  id: number;
  question: string;
  isMultiSelect?: boolean;
  options: MatchmakerOption[];
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  setsW: number;
  setsL: number;
  gamesW: number;
  gamesL: number;
  gamesPct: string;
  points: number;
}

interface PrizeEntry {
  position: string;
  mensSingles: number;
  mensDoubles: number;
  womensSingles: number;
  womensDoubles: number;
}

interface ContactEntry {
  market: string;
  city: string;
  garena: string[];
  shopee: string[];
}

// --- Constants ---
const CATEGORIES = [
  "Men's Singles",
  "Women's Singles",
  "Men's Doubles",
  "Women's Doubles"
];

const LOCATIONS: Record<string, string[]> = {
  "China": ["Shenzhen", "Shanghai", "Beijing"],
  "Indonesia": ["Jakarta", "Yogyakarta"],
  "Singapore": ["Singapore"],
  "Vietnam": ["Ho Chi Minh City", "Hanoi"],
  "Philippines": ["Manila"],
  "Brazil": ["Sao Paulo"],
  "Thailand": ["Bangkok"],
  "Taiwan": ["Taipei"],
  "Malaysia": ["Kuala Lumpur"],
  "Korea": ["Seoul"],
  "Mexico": ["Mexico City"]
};

const QUESTIONS: MatchmakerQuestion[] = [
  {
    id: 1,
    question: "1. What is your history with the racket?",
    options: [
      { id: 'q1-o1', tag: 'Fresh Start', label: "I have never played, or I haven't picked up a racket in years." },
      { id: 'q1-o2', tag: 'Casual Cruiser', label: "I play occasionally. I can usually get the ball over the net." },
      { id: 'q1-o3', tag: 'Regular Hitter', label: "I play once a week or more. I’m comfortable with rallies." },
      { id: 'q1-o4', tag: 'Competitive Edge', label: "I play in a league or have had professional coaching." }
    ]
  },
  {
    id: 2,
    question: "2. How do you feel about the rules of the game?",
    options: [
      { id: 'q2-o1', label: "\"Wait, how do we count points again?\"" },
      { id: 'q2-o2', label: "I know the basics: Love, 15, 30, 40..." },
      { id: 'q2-o3', label: "I’m a pro—I know all about tie-breakers and deuce." }
    ]
  },
  {
    id: 3,
    question: "3. Choose your \"Tournament Spirit\"",
    options: [
      { id: 'q3-o1', label: "The Socialite: I’m here for photos and meeting people." },
      { id: 'q3-o2', label: "The Sporty Soul: I want a workout and friendly rallies." },
      { id: 'q3-o3', label: "The Challenger: I love the thrill of the game and fair competition." }
    ]
  },
  {
    id: 4,
    question: "4. If a ball is flying toward you at high speed, you are most likely to:",
    options: [
      { id: 'q4-o1', label: "Laugh, duck, and hope for the best!" },
      { id: 'q4-o2', label: "Attempt a return and see where it lands." },
      { id: 'q4-o3', label: "Adjust my feet and aim for a cross-court winner." }
    ]
  },
  {
    id: 5,
    question: "5. What would make this event a \"Win\" for you? (Select all that apply)",
    isMultiSelect: true,
    options: [
      { id: 'q5-o1', label: "Not hitting my partner with the ball." },
      { id: 'q5-o2', label: "Making new friends from other offices." },
      { id: 'q5-o3', label: "Winning a few games or a set." },
      { id: 'q5-o4', label: "Enjoying the post-match celebrations!" }
    ]
  }
];

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "Player A", played: 5, won: 5, lost: 0, setsW: 10, setsL: 1, gamesW: 65, gamesL: 32, gamesPct: "67.01%", points: 15 },
  { rank: 2, name: "Player B", played: 4, won: 3, lost: 1, setsW: 6, setsL: 3, gamesW: 48, gamesL: 40, gamesPct: "54.55%", points: 10 },
  { rank: 3, name: "Player C", played: 5, won: 2, lost: 3, setsW: 5, setsL: 7, gamesW: 45, gamesL: 55, gamesPct: "45.00%", points: 9 },
  { rank: 4, name: "Player D", played: 4, won: 1, lost: 3, setsW: 2, setsL: 6, gamesW: 30, gamesL: 42, gamesPct: "41.67%", points: 6 },
  { rank: 5, name: "Player E", played: 4, won: 0, lost: 4, setsW: 0, setsL: 8, gamesW: 22, gamesL: 48, gamesPct: "31.43%", points: 4 },
];

const PRIZES_DATA: PrizeEntry[] = [
  { position: "1st", mensSingles: 100, mensDoubles: 100, womensSingles: 100, womensDoubles: 100 },
  { position: "2nd", mensSingles: 80, mensDoubles: 80, womensSingles: 80, womensDoubles: 80 },
  { position: "3rd", mensSingles: 50, mensDoubles: 50, womensSingles: 50, womensDoubles: 50 },
  { position: "4th", mensSingles: 50, mensDoubles: 50, womensSingles: 50, womensDoubles: 50 },
];

const CONTACT_DATA: ContactEntry[] = [
  { market: "Brazil", city: "Sao Paulo", garena: ["Belle (colmane@garena.com)"], shopee: ["Pine Kyaw (pine.kyaw@shopee.com)"] },
  { market: "China", city: "Beijing\nShanghai\nShenzhen", garena: ["Carrie (jiajun.chen@garena.com)"], shopee: ["Aaron Wang (aaron.wang@shopee.com)", "Lily (yang.lily@shopee.com)"] },
  { market: "Indonesia", city: "Jakarta\nYogyakarta", garena: ["Asta (putric@garena.co.id)"], shopee: ["Isfana (isfana.arhami@shopee.com)"] },
  { market: "Korea", city: "Seoul", garena: ["Si Young (leesy@garena.com)"], shopee: ["Minsu Cho (minsu.cho@shopee.com)"] },
  { market: "Malaysia", city: "Kuala Lumpur", garena: ["-"], shopee: ["Eunice (eunice.low@shopee.com)"] },
  { market: "Mexico", city: "Mexico City", garena: ["Rodrigo (chavezr@garena.com)"], shopee: ["-"] },
  { market: "Philippines", city: "Manila", garena: ["-"], shopee: ["Redg (redg.mendoza@shopee.com)"] },
  { market: "Singapore", city: "Singapore", garena: ["Li Yan (ongly@garena.com)", "Rae-Ann (rawu@garena.com)"], shopee: ["Jenn (jenn.teoje@shopee.com)"] },
  { market: "Taiwan", city: "Taipei", garena: ["Toby (lutob@garena.com)"], shopee: ["Alice Wu (alice.wu@shopee.com)"] },
  { market: "Thailand", city: "Bangkok", garena: ["Bank (akaraphon.s@sea.com)"], shopee: ["Mint (mint.amornwutthisutja@shopee.com)"] },
  { market: "Vietnam", city: "Hanoi\nHo Chi Minh City", garena: ["Van Anh (vananh.tran@garena.vn)", "Linh (manhlinh.nguyen@garena.vn)"], shopee: ["Tram (tram.dinh@shopee.com)"] },
];

// --- Components ---

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 lg:w-12 lg:h-12 bg-[#4c8bf5] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 overflow-hidden font-black text-lg"
      >
        A
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100]"
          >
            <div className="p-6 border-b border-slate-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#4c8bf5] flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-[#000080] truncate">Amax</p>
                  <p className="text-xs text-slate-400 truncate">amax@sea.com</p>
                </div>
              </div>
              <div className="py-2 px-3 bg-slate-50 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logged In</span>
              </div>
            </div>
            
            <div className="p-2">
              <button 
                onClick={() => alert('Mock Logout: You would be redirected.')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-500 rounded-xl transition-colors font-bold text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopHeader = () => {
  return (
    <header className="w-full h-16 lg:h-20 bg-white flex items-center justify-end px-6 lg:px-10 z-[80] fixed top-0 right-0 lg:static">
      <UserProfile />
    </header>
  );
};

const Sidebar = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="hidden lg:flex flex-col w-[340px] h-screen fixed left-0 top-0 bg-[#000080] p-10 text-white z-[100] overflow-hidden shadow-2xl"
      style={{
        backgroundImage: `url(${ASSETS.sidebarPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 mb-16 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img 
          src={ASSETS.logo} 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain block"
        />
      </div>

      <nav className="relative z-10 flex flex-col gap-8">
        <button 
          onClick={() => scrollTo('about-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <Info size={20} className="text-[#4c8bf5]" />
          About
        </button>
        <button 
          onClick={() => scrollTo('rules-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <BookOpen size={20} className="text-[#4c8bf5]" />
          Rules
        </button>
        <button 
          onClick={() => scrollTo('leaderboard-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <BarChart3 size={20} className="text-[#4c8bf5]" />
          Leaderboard
        </button>
        <button 
          onClick={() => scrollTo('prizes-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <Gift size={20} className="text-[#4c8bf5]" />
          Prizes
        </button>
        <button 
          onClick={() => scrollTo('registration-flow')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <UserPlus size={20} className="text-[#4c8bf5]" />
          Register
        </button>
        <button 
          onClick={() => scrollTo('contact-section')}
          className="group flex items-center gap-3 text-xl font-bold transition-all text-left hover:translate-x-2"
        >
          <MessageSquare size={20} className="text-[#4c8bf5]" />
          Contact
        </button>
      </nav>
    </div>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoSize = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoY = useTransform(scrollY, [0, 100], ["1rem", "0rem"]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100]">
      <motion.div 
        style={{ height: headerHeight }}
        className="relative flex items-center justify-center bg-[#000080] text-white shadow-lg px-6 overflow-visible"
      >
        <motion.div 
          style={{ width: logoSize, height: logoSize, y: logoY }}
          className="flex items-center justify-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
           <img src={ASSETS.logo} alt="Logo" className="w-full h-full object-contain" />
        </motion.div>
        
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-6 p-2 z-[110]">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#000080] p-8 text-white flex flex-col gap-8 shadow-2xl absolute top-full left-0 w-full z-[105]"
          >
            <button onClick={() => scrollTo('about-section')} className="text-2xl font-bold flex items-center gap-4">
              <Info className="text-[#4c8bf5]" /> About
            </button>
            <button onClick={() => scrollTo('rules-section')} className="text-2xl font-bold flex items-center gap-4">
              <BookOpen className="text-[#4c8bf5]" /> Rules
            </button>
            <button onClick={() => scrollTo('leaderboard-section')} className="text-2xl font-bold flex items-center gap-4">
              <BarChart3 className="text-[#4c8bf5]" /> Leaderboard
            </button>
            <button onClick={() => scrollTo('prizes-section')} className="text-2xl font-bold flex items-center gap-4">
              <Gift className="text-[#4c8bf5]" /> Prizes
            </button>
            <button onClick={() => scrollTo('registration-flow')} className="text-2xl font-bold flex items-center gap-4">
              <UserPlus className="text-[#4c8bf5]" /> Register
            </button>
            <button onClick={() => scrollTo('contact-section')} className="text-2xl font-bold flex items-center gap-4">
              <MessageSquare className="text-[#4c8bf5]" /> Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutSection = () => {
  const scrollToRegister = () => {
    const el = document.getElementById('registration-flow');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="about-section" className="relative min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6 lg:px-24 py-16 lg:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-8 lg:mb-12 leading-tight text-left">
          About Sailors Open
        </h1>
        <div className="text-base lg:text-xl text-[#000080]/70 leading-relaxed font-medium mb-12 lg:mb-16 space-y-6 max-w-3xl text-left">
          <p>
            Welcome to the Sailors Open, where the spirit of competition meets the rush of the sea breeze! Feel the electric energy from the first serve. Every match crackles with intensity—the sharp pop of a perfectly struck ball, the swift scrape of shoes pivoting on the court. Here, powerful baseline drives meet delicate drop shots, and fearless net-chargers duel with unshakable defenders. It’s a fast-paced, thrilling showcase of skill, grit, and strategic brilliance.
          </p>
          <p>
            But the Sailors Open is more than scores and spin. It’s the palpable camaraderie between competitors, the shared respect after a hard-fought battle, and the vibrant atmosphere that surrounds the grounds. Whether you’re a player pushing your limits or a fan soaking in the action, the Sailors Open is a vibrant, sporty spectacle. It’s where personal bests are forged, unforgettable moments are born, and the pure, exhilarating love of the game is on full display.
          </p>
          <p className="font-black text-[#000080]">
            Come for the competition. Stay for the thrill.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={scrollToRegister}
            className="group flex items-center gap-4 px-10 py-5 lg:px-12 lg:py-6 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-3xl font-black text-xl lg:text-2xl shadow-2xl shadow-[#4c8bf5]/40 transition-all hover:scale-105 active:scale-95"
          >
            Register Now
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const RuleTable = ({ title, data }: { title: string, data: { label: string, value: string }[] }) => (
  <div className="mb-10 w-full">
    <h4 className="text-xl font-black text-[#4c8bf5] mb-4 uppercase tracking-widest">{title}</h4>
    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-left">
        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-bold text-[#000080] border-r border-slate-100 bg-slate-50/50 w-1/3">
                {row.label}
              </td>
              <td className="px-6 py-4 text-slate-600 font-medium">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RulesSection = () => {
  return (
    <section id="rules-section" className="relative min-h-screen px-6 lg:px-24 py-16 lg:py-24 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-8 lg:mb-12 leading-tight text-left">
          MATCH RULES
        </h1>
        <p className="text-base lg:text-xl text-[#000080]/70 leading-relaxed font-medium mb-12 text-left">
          Tennis scoring can feel like a different language, but it’s easy once you get the rhythm! Here is how you get from your first serve to a winning set:
        </p>

        {/* 1. Scoring a Game */}
        <RuleTable 
          title="1. Scoring a 'Game' (The 15-30-40 System)"
          data={[
            { label: "Description", value: "Think of a game as a race to 4 points. Instead of 1, 2, 3, 4, we use these traditional names:" },
            { label: "0 Points", value: "\"Love\" (as in, we play for the love of the game!)" },
            { label: "1 Point", value: "15" },
            { label: "2 Points", value: "30" },
            { label: "3 Points", value: "40" },
            { label: "4 Points", value: "Game Over! (You win that game)" }
          ]}
        />

        {/* 2. What is Deuce */}
        <RuleTable 
          title="2. What is 'Deuce'?"
          data={[
            { label: "Standard Rule", value: "If both players reach 40-40, it is called a Deuce." },
            { label: "Sudden Death", value: "To keep things moving and fun, to win from here we use 'Sudden Death.' The next point wins the game—no long deuce battles!" }
          ]}
        />

        {/* 3. Winning a Set */}
        <RuleTable 
          title="3. Winning a 'Set'"
          data={[
            { label: "General Win", value: "To win a set, you generally need to win 6 games." },
            { label: "Tie-breaker", value: "If the score reaches 5-5, you play one final 'Tie-break' game to decide who wins the set 6-5." },
            { label: "3rd Set Super Tie-breaker", value: "If the match goes into the 3rd set, the first player who reaches the score of 10 wins the set." }
          ]}
        />

        {/* 4. Winning the Match */}
        <RuleTable 
          title="4. Winning the Match"
          data={[
            { label: "Format", value: "Our matches are 'Best of 3' sets." },
            { label: "Requirement", value: "This means the first person or team to win 2 sets is the winner of the match." }
          ]}
        />

        {/* 5. Quick Court Rules */}
        <RuleTable 
          title="5. Quick Court Rules for Beginners"
          data={[
            { label: "In or Out?", value: "If the ball touches any part of the white line, it is IN." },
            { label: "The Serve", value: "You get two tries to hit the ball into the diagonal box opposite you. If you miss both, your opponent gets the point." }
          ]}
        />

        {/* LEAGUE RULES HEADER */}
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mt-24 mb-8 lg:mb-12 leading-tight text-left">
          LEAGUE RULES
        </h1>

        <RuleTable 
          title="General Conduct"
          data={[
            { label: "Umpiring", value: "Matches are self-umpired and should be conducted in the spirit of fair play." },
            { label: "Scoring", value: "The winner receives 3 points, the loser receives 1 participation point" },
            { label: "Liability", value: "Players compete at their own risk, and it is the player's responsibility to ensure any courts used are safe for play. By entering you agree to all terms as outlined in the competition rules & regulations." }
          ]}
        />

        <h1 className="text-3xl lg:text-5xl font-black text-[#000080] mt-16 mb-8 text-left uppercase tracking-tight">
          FAQs
        </h1>

        <RuleTable 
          title="Incomplete Matches"
          data={[
            { label: "Question", value: "What happens when a match is NOT completed?" },
            { label: "Rule", value: "Incomplete matches and Retirements: The winner gets 3 points, and the loser gets 1 participation point" }
          ]}
        />

        <RuleTable 
          title="Walkovers & Withdrawals"
          data={[
            { label: "Winner Reward", value: "The winner gets 3 points, and the loser gets 0 points" },
            { label: "Claiming Rule", value: "Walkovers can only be claimed when the match is confirmed and cancelled within 24 hours of the start time." }
          ]}
        />
      </motion.div>
    </section>
  );
};

const LeaderboardSection = () => {
  return (
    <section id="leaderboard-section" className="relative py-16 lg:py-24 px-6 lg:px-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-8 lg:mb-12 leading-tight text-left">
          LEADERBOARD
        </h1>
        
        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Rank</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Player Name</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">P</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">W</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">L</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Sets W</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Sets L</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games W</th>
                <th className="px-4 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games L</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Games % Won</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LEADERBOARD_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50 text-center">{entry.rank}</td>
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.name}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.played}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.won}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.lost}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.setsW}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.setsL}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesW}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesL}</td>
                  <td className="px-6 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.gamesPct}</td>
                  <td className="px-6 py-5 font-black text-[#000080] text-center">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-slate-400 font-medium text-sm">
          <Info size={14} />
          <span>Last updated: October 24, 2025</span>
        </div>
      </motion.div>
    </section>
  );
};

const PrizesSection = () => {
  return (
    <section id="prizes-section" className="relative py-16 lg:py-24 px-6 lg:px-24 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl lg:text-7xl font-black text-[#000080] mb-8 lg:mb-12 leading-tight text-left">
          PRIZES
        </h1>
        
        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Position</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Men's Singles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Men's Doubles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20 text-center">Women's Singles</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider text-center">Women's Doubles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRIZES_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.position}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.mensSingles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.mensDoubles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 border-r border-slate-50 text-center">{entry.womensSingles}</td>
                  <td className="px-4 py-5 font-medium text-slate-600 text-center">{entry.womensDoubles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-slate-400 font-medium text-sm">
          <Info size={14} />
          <span>* Prize amounts are in USD</span>
        </div>
      </motion.div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact-section" className="relative py-16 lg:py-24 px-6 lg:px-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl lg:text-5xl font-black text-[#000080] leading-tight text-left">
            Have more queries about Sailors Open?
          </h1>
          <p className="text-xl font-black text-[#000080]">Please check out the Rules / FAQ page.</p>
          <p className="text-lg font-bold text-slate-600">You may contact the following for Sailors Open related enquiries:</p>
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#d3e3f6]">
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Market</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">City (Match Location)</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider border-r border-white/20">Garena PICs</th>
                <th className="px-6 py-5 font-black text-[#000080] text-sm uppercase tracking-wider">Shopee PICs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CONTACT_DATA.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-[#000080] border-r border-slate-50">{entry.market}</td>
                  <td className="px-6 py-5 text-slate-600 border-r border-slate-50 whitespace-pre-line">{entry.city}</td>
                  <td className="px-6 py-5 text-slate-600 border-r border-slate-50">
                    {entry.garena.map((pic, i) => <div key={i}>{pic}</div>)}
                  </td>
                  <td className="px-6 py-5 text-slate-600">
                    {entry.shopee.map((pic, i) => <div key={i}>{pic}</div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
          <p className="text-lg font-black text-[#000080]">
            For feedback on the website, please contact <a href="mailto:sailorstennis@sea.com" className="text-[#4c8bf5] hover:underline">sailorstennis@sea.com</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const RegistrationFlow = () => {
  const [flowStep, setFlowStep] = useState<'info' | 'matchmaker' | 'success'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  
  const [selectedCountry, setSelectedCountry] = useState('Singapore');
  const [selectedCity, setSelectedCity] = useState('Singapore');

  const currentQuestion = QUESTIONS[currentQuestionIdx];
  const matchmakerProgress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

  const isDoublesSelected = selectedCategories.some(cat => cat.toLowerCase().includes('doubles'));

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    if (LOCATIONS[country]) {
      setSelectedCity(LOCATIONS[country][0]);
    } else {
      setSelectedCity('');
    }
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => {
      const isSelectingMen = cat.startsWith("Men");
      const isSelectingWomen = cat.startsWith("Women");

      let next = [...prev];

      // Mutually exclusive logic: if selecting a gender group, clear the other
      if (isSelectingMen) {
        next = next.filter(c => !c.startsWith("Women"));
      } else if (isSelectingWomen) {
        next = next.filter(c => !c.startsWith("Men"));
      }

      // Standard toggle logic
      if (next.includes(cat)) {
        return next.filter(c => c !== cat);
      } else {
        return [...next, cat];
      }
    });
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      alert("Please select at least one category to proceed.");
      return;
    }
    if (!selectedCountry || !selectedCity) {
      alert("Please select both country and city.");
      return;
    }
    setFlowStep('matchmaker');
    setTimeout(() => {
      document.getElementById('registration-flow')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const selectOption = (optionId: string) => {
    if (currentQuestion.isMultiSelect) {
      const currentAnswers = (answers[currentQuestionIdx] as string[]) || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [currentQuestionIdx]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentQuestionIdx]: optionId });
      if (currentQuestionIdx < QUESTIONS.length - 1) {
        setTimeout(() => setCurrentQuestionIdx(currentQuestionIdx + 1), 300);
      } else {
        setFlowStep('success');
      }
    }
  };

  const isSelected = (optionId: string) => {
    const answer = answers[currentQuestionIdx];
    return Array.isArray(answer) ? answer.includes(optionId) : answer === optionId;
  };

  return (
    <section id="registration-flow" className="py-24 px-6 lg:px-24 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {flowStep === 'info' && (
            <motion.div 
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow"
            >
              <h2 className="text-3xl font-black text-center text-[#000080] mb-10">Registration</h2>
              <form className="space-y-8" onSubmit={handleInfoSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Full Name</label>
                    <input required type="text" placeholder="Jane Wang" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Sea Email Address</label>
                    <input required type="email" placeholder="Jane.W@sea.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Market</label>
                      <div className="relative">
                        <select 
                          required 
                          value={selectedCountry}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none"
                        >
                          <option value="">Select Market</option>
                          {Object.keys(LOCATIONS).map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">City (Match Location)</label>
                      <div className="relative">
                        <select 
                          required 
                          disabled={!selectedCountry}
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none disabled:opacity-50"
                        >
                          <option value="">Select City</option>
                          {selectedCountry && LOCATIONS[selectedCountry].map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-4">Categories (Select all you wish to join)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryToggle(cat)}
                          className={`flex items-center justify-between px-5 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                            selectedCategories.includes(cat) 
                            ? 'bg-[#4c8bf5] border-[#4c8bf5] text-white shadow-lg' 
                            : 'bg-white border-slate-100 text-[#000080] hover:border-[#4c8bf5]/30'
                          }`}
                        >
                          {cat}
                          {selectedCategories.includes(cat) && <Check size={16} />}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {isDoublesSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden px-1 -mx-1 pb-1 space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">Partner's Full Name</label>
                            <input required type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="Partner's Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">Partner's Sea Email Address</label>
                            <input required type="email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} placeholder="Partner.Email@sea.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-[#4c8bf5]/20 active:scale-95 mt-4">
                  Next
                </button>
              </form>
            </motion.div>
          )}

          {flowStep === 'matchmaker' && (
            <motion.div 
              key="matchmaker"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow"
            >
              <h2 className="text-3xl font-black text-center text-[#000080] mb-8">Tennis Level Matchmaker</h2>
              <div className="w-full h-3 bg-slate-100 rounded-full mb-12 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${matchmakerProgress}%` }} className="h-full bg-[#4c8bf5] rounded-full" />
              </div>
              <div className="space-y-8">
                <h3 className="text-xl font-black text-[#000080] mb-6">{currentQuestion.question}</h3>
                <div className="space-y-4">
                  {currentQuestion.options.map(opt => (
                    <button 
                      key={opt.id} 
                      onClick={() => selectOption(opt.id)}
                      className={`w-full p-6 text-left rounded-2xl border-2 transition-all ${isSelected(opt.id) ? 'bg-[#4c8bf5] border-[#4c8bf5] text-white shadow-xl shadow-[#4c8bf5]/20' : 'bg-white border-slate-100 text-[#000080] hover:border-[#4c8bf5]/30'}`}
                    >
                      {opt.tag && <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase mb-3 ${isSelected(opt.id) ? 'bg-white text-[#4c8bf5]' : 'bg-[#4c8bf5] text-white'}`}>{opt.tag}</span>}
                      <p className="font-bold text-lg leading-snug">{opt.label}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                <button onClick={() => currentQuestionIdx === 0 ? setFlowStep('info') : setCurrentQuestionIdx(v => v - 1)} className="text-lg font-bold text-[#4c8bf5] hover:opacity-70">
                  Back
                </button>
                {currentQuestion.isMultiSelect && (
                   <button onClick={() => currentQuestionIdx < QUESTIONS.length - 1 ? setCurrentQuestionIdx(v => v + 1) : setFlowStep('success')} className="px-10 py-4 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all">
                    {currentQuestionIdx === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                   </button>
                )}
              </div>
            </motion.div>
          )}

          {flowStep === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] p-12 text-center card-shadow"
            >
              <div className="w-20 h-20 bg-[#4c8bf5] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#4c8bf5]/30">
                <Trophy size={40} />
              </div>
              <h2 className="text-3xl font-black text-[#000080] mb-4">You're All Set!</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">We'll analyze your level and successful registration will be notified shortly</p>
              <button onClick={() => { setFlowStep('info'); setCurrentQuestionIdx(0); setAnswers({}); setSelectedCategories([]); setPartnerName(''); setPartnerEmail(''); setSelectedCountry('Singapore'); setSelectedCity('Singapore'); }} className="px-10 py-4 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg shadow-[#4c8bf5]/20 active:scale-95 transition-all">
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-100 py-12 px-6 lg:px-24 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
          Sailors Open 2026
        </p>
        <p className="text-slate-400 text-xs font-medium">
          © 2026 Sailors Open Tennis Tournament. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      <Sidebar />
      <MobileNav />
      
      <div className="flex-1 lg:ml-[340px] relative min-h-screen flex flex-col pt-32 lg:pt-0">
        <TopHeader />
        <div className="flex-1 flex flex-col">
          <AboutSection />
          <RulesSection />
          <LeaderboardSection />
          <PrizesSection />
          <RegistrationFlow />
          <ContactSection />
          <Footer />
        </div>
      </div>

      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}
