
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
  Mail
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

// --- Constants ---
const CATEGORIES = [
  "Men's Singles",
  "Women's Singles",
  "Men's Doubles",
  "Women's Doubles"
];

// Associated locations mapping from the provided image
const LOCATIONS: Record<string, string[]> = {
  "China": ["Shenzhen", "Shanghai", "Beijing"],
  "Indonesia": ["Jakarta", "Yogyakarta", "Solo"],
  "Singapore": ["Singapore"],
  "Vietnam": ["Ho Chi Minh City", "Hanoi"],
  "Philippines": ["Mandaluyong", "Quezon City"],
  "Brazil": ["Sao Paulo"],
  "Thailand": ["Bangkok"],
  "Taiwan": ["Taipei", "Taichung"],
  "Malaysia": ["Kuala Lumpur", "Selangor"],
  "Korea": ["Seoul"],
  "Mexico": ["Mexico City"],
  "India": ["Bangalore", "Pune"],
  "Morocco": ["Casablanca"]
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
    <header className="w-full h-16 lg:h-20 bg-white flex items-center justify-end px-6 lg:px-10 z-[80]">
      <UserProfile />
    </header>
  );
};

const Sidebar = () => {
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
      <div className="relative z-10 mb-16">
        <img 
          src={ASSETS.logo} 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain block"
        />
      </div>

      <nav className="relative z-10 flex flex-col gap-10">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold transition-all text-left w-fit sidebar-link-active"
        >
          About
        </button>
      </nav>
    </div>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values from scroll position 0 to 100
  const headerHeight = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoSize = useTransform(scrollY, [0, 100], ["8rem", "4rem"]);
  const logoY = useTransform(scrollY, [0, 100], ["1rem", "0rem"]); // translate-y-4 is 1rem

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100]">
      <motion.div 
        style={{ height: headerHeight }}
        className="relative flex items-center justify-center bg-[#000080] text-white shadow-lg px-6 overflow-visible"
      >
        {/* Centered Large Logo with dynamic size and position */}
        <motion.div 
          style={{ width: logoSize, height: logoSize, y: logoY }}
          className="flex items-center justify-center"
        >
           <img 
            src={ASSETS.logo} 
            alt="Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Menu Button on the Right */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="absolute right-6 p-2 z-[110]"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#000080] p-6 text-white flex flex-col gap-6 shadow-2xl absolute top-full left-0 w-full z-[105]"
          >
            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
              className="text-xl font-bold"
            >
              About
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
    <section className="relative h-[calc(100vh-12rem)] lg:h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6 lg:px-24 py-8 lg:py-16 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl lg:text-8xl font-black text-[#000080] mb-6 lg:mb-8 leading-tight">
          About Sailors Open
        </h1>
        <p className="text-lg lg:text-2xl text-[#000080]/70 leading-relaxed font-medium mb-10 lg:mb-12 max-w-3xl mx-auto">
          The company-wide tennis tournament. The company-wide tennis tournament. Get moving, build strength, and connect with fellow Sailors. Open to all skill levels!
        </p>
        
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

      {/* Repositioned "more details" further down */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 lg:bottom-16 left-1/2 -translate-x-1/2 text-slate-400 text-sm font-medium tracking-wide"
      >
        more details coming soon...
      </motion.p>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 py-12 lg:py-16 px-6 lg:px-24 text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-3 text-slate-400">
          <Mail size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Contact Us</span>
        </div>
        <a 
          href="mailto:sailorstennis@sea.com" 
          className="text-xl lg:text-2xl font-black text-[#000080] hover:text-[#4c8bf5] transition-colors"
        >
          sailorstennis@sea.com
        </a>
        <div className="h-px w-20 bg-slate-100 my-2" />
        <p className="text-slate-400 text-xs font-medium">
          © 2026 Sailors Open Tennis Tournament. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const RegistrationFlow = () => {
  const [flowStep, setFlowStep] = useState<'info' | 'matchmaker' | 'success'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  
  // Location state
  const [selectedCountry, setSelectedCountry] = useState('Singapore');
  const [selectedCity, setSelectedCity] = useState('Singapore');

  const currentQuestion = QUESTIONS[currentQuestionIdx];
  const matchmakerProgress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

  const isDoublesSelected = selectedCategories.some(cat => cat.toLowerCase().includes('doubles'));

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    // Auto-select first city of selected country
    if (LOCATIONS[country]) {
      setSelectedCity(LOCATIONS[country][0]);
    } else {
      setSelectedCity('');
    }
  };

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
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

                  {/* Split Location into Country and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">Country</label>
                      <div className="relative">
                        <select 
                          required 
                          value={selectedCountry}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none"
                        >
                          <option value="">Select Country</option>
                          {Object.keys(LOCATIONS).map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#000080] mb-2">City</label>
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
                  
                  {/* Category Multi-Select */}
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

                    {/* Conditional Doubles Partner Input (Mandatory) */}
                    <AnimatePresence>
                      {isDoublesSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden px-1 -mx-1 pb-1 space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">
                              Partner's Full Name
                            </label>
                            <input 
                              required
                              type="text" 
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                              placeholder="Partner's Name" 
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#000080] mb-2">
                              Partner's Sea Email Address
                            </label>
                            <input 
                              required
                              type="email" 
                              value={partnerEmail}
                              onChange={(e) => setPartnerEmail(e.target.value)}
                              placeholder="Partner.Email@sea.com" 
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all" 
                            />
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

export default function App() {
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      <Sidebar />
      <MobileNav />
      
      {/* Container for scrolling content */}
      <div className="flex-1 lg:ml-[340px] relative min-h-screen flex flex-col pt-32 lg:pt-0">
        <TopHeader />
        <div className="flex-1 flex flex-col">
          <AboutSection />
          <RegistrationFlow />
          <Footer />
        </div>
      </div>

      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}
