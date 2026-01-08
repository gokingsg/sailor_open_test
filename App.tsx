
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Trophy
} from 'lucide-react';

// --- Types ---
type RegistrationType = 'player' | 'volunteer';

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
const QUESTIONS: MatchmakerQuestion[] = [
  {
    id: 1,
    question: "1. What is your history with the racket?",
    options: [
      { 
        id: 'q1-o1', 
        tag: 'Fresh Start', 
        label: "I have never played, or I haven't picked up a racket in years. I’m here for the laughs and the snacks!" 
      },
      { 
        id: 'q1-o2', 
        tag: 'Casual Cruiser', 
        label: "I play occasionally (maybe on holidays or once every few months). I can usually get the ball over the net." 
      },
      { 
        id: 'q1-o3', 
        tag: 'Regular Hitter', 
        label: "I play once a week or more. I’m comfortable with rallies and know my way around the court." 
      },
      { 
        id: 'q1-o4', 
        tag: 'Competitive Edge', 
        label: "I play in a league or have had professional coaching. I’m ready for a high-intensity match." 
      }
    ]
  },
  {
    id: 2,
    question: "2. How do you feel about the rules of the game?",
    options: [
      { 
        id: 'q2-o1', 
        label: "\"Wait, how do we count points again?\" (I’ll need a friendly guide!)", 
      },
      { 
        id: 'q2-o2', 
        label: "I know the basics: Love, 15, 30, 40... and I know where to stand.", 
      },
      { 
        id: 'q2-o3', 
        label: "I’m a pro—I know all about tie-breakers, deuce-advantage, and court lines.", 
      }
    ]
  },
  {
    id: 3,
    question: "3. Choose your \"Tournament Spirit\"",
    options: [
      { 
        id: 'q3-o1', 
        label: "The Socialite: I’m here to take photos, meet people from other departments, and enjoy the \"breather\" from work.", 
      },
      { 
        id: 'q3-o2', 
        label: "The Sporty Soul: I want a bit of a workout and some friendly rallies, but the score doesn't really matter.", 
      },
      { 
        id: 'q3-o3', 
        label: "The Challenger: I love the thrill of the game and I’m looking for a fair, competitive match-up.", 
      }
    ]
  },
  {
    id: 4,
    question: "4. If a ball is flying toward you at high speed, you are most likely to:",
    options: [
      { 
        id: 'q4-o1', 
        label: "Laugh, duck, and hope for the best!", 
      },
      { 
        id: 'q4-o2', 
        label: "Attempt a return and see where it lands.", 
      },
      { 
        id: 'q4-o3', 
        label: "Adjust my feet and aim for a cross-court winner.", 
      }
    ]
  },
  {
    id: 5,
    question: "5. What would make this event a \"Win\" for you? (Select all that apply)",
    isMultiSelect: true,
    options: [
      { id: 'q5-o1', label: "Not hitting my partner with the ball." },
      { id: 'q5-o2', label: "Making at least three new friends from other countries/offices." },
      { id: 'q5-o3', label: "Winning a few games or a set." },
      { id: 'q5-o4', label: "Enjoying the post-match celebrations!" }
    ]
  }
];

// --- Components ---

const Sidebar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'registration', label: 'Registration' },
    { id: 'matchmaker', label: 'Matchmaker' }
  ];

  return (
    <div className="hidden lg:flex flex-col w-80 h-screen fixed left-0 top-0 bg-[#000080] p-10 text-white z-50">
      <div className="mb-20">
        <img 
          src="logo.png" 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain"
        />
      </div>

      <nav className="flex flex-col gap-8">
        {sections.map(s => (
          <button 
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`text-lg font-medium transition-all text-left w-fit ${activeSection === s.id ? 'sidebar-link-active' : 'opacity-60 hover:opacity-100'}`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <button 
        onClick={() => setActiveSection('registration')}
        className="mt-20 px-8 py-3 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold shadow-lg transition-all active:scale-95"
      >
        Register Now
      </button>

      <div className="mt-auto opacity-20 text-xs">
        © 2026 Sailors Open
      </div>
    </div>
  );
};

const MobileNav = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'registration', label: 'Registration' },
    { id: 'matchmaker', label: 'Matchmaker' }
  ];

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100]">
      <div className="flex justify-between items-center p-6 bg-[#000080] text-white">
        <div className="w-16 h-16">
           <img 
            src="logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#000080] p-6 text-white flex flex-col gap-6 shadow-2xl"
          >
            {sections.map(s => (
              <button 
                key={s.id}
                onClick={() => { setActiveSection(s.id); setIsOpen(false); }}
                className={`text-xl font-bold ${activeSection === s.id ? 'text-white' : 'opacity-60'}`}
              >
                {s.label}
              </button>
            ))}
            <button 
              onClick={() => { setActiveSection('registration'); setIsOpen(false); }}
              className="w-full py-4 bg-[#4c8bf5] rounded-xl font-bold"
            >
              Register Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-24 py-32 lg:py-0 bg-white">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl lg:text-7xl font-black text-[#000080] mb-8 leading-tight">
          About Sailors Open
        </h1>
        <p className="text-xl text-[#000080]/80 leading-relaxed font-medium">
          The company-wide tennis tournament. The purpose of the event is to encourage employees ("Sailors") to take a break, have fun together, and get to know each other better. Anyone can participate, regardless of their skill level, and more details are expected to follow soon.
        </p>
      </motion.div>
      
      <div className="mt-20 relative w-full h-40 lg:h-64 overflow-hidden rounded-[3rem]">
        <img 
          src="https://res.cloudinary.com/dfm67v8v3/image/upload/v1740051187/Wave_Graphics_p7e5u6.png" 
          alt="Wave Decoration" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

const RegistrationSection = () => {
  const [regType, setRegType] = useState<RegistrationType>('player');

  return (
    <section id="registration" className="py-24 px-6 lg:px-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow">
          <h2 className="text-3xl font-black text-center text-[#000080] mb-10">Registration</h2>
          
          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => setRegType('player')}
              className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${regType === 'player' ? 'bg-[#4c8bf5] text-white shadow-lg' : 'bg-white text-[#4c8bf5] border-2 border-[#4c8bf5]/20'}`}
            >
              I am a Player
            </button>
            <button 
              onClick={() => setRegType('volunteer')}
              className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all ${regType === 'volunteer' ? 'bg-[#4c8bf5] text-white shadow-lg' : 'bg-white text-[#4c8bf5] border-2 border-[#4c8bf5]/20'}`}
            >
              I am a Volunteer
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-[#000080] mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Wang"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#000080] mb-2">Sea Email Address</label>
              <input 
                type="email" 
                placeholder="Jane.W@sea.com"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#4c8bf5] outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#000080] mb-2">Office Location</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none">
                    <option>Singapore (Galaxis)</option>
                    <option>Singapore (Solaris)</option>
                    <option>Shenzhen</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#000080] mb-2">Category</label>
                <div className="relative">
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none">
                    <option>Men's Singles</option>
                    <option>Women's Singles</option>
                    <option>Mixed Doubles</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#000080] mb-2">Skill Level</label>
              <div className="relative">
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>

            <button className="w-full py-5 bg-[#ff5e2c] hover:bg-[#e04d20] text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-[#ff5e2c]/20 active:scale-95 mt-4">
              Register as {regType === 'player' ? 'Player' : 'Volunteer'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const MatchmakerSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectOption = (optionId: string) => {
    if (currentQuestion.isMultiSelect) {
      const currentAnswers = (answers[currentStep] as string[]) || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [currentStep]: newAnswers });
    } else {
      setAnswers({ ...answers, [currentStep]: optionId });
      if (currentStep < QUESTIONS.length - 1) {
        setTimeout(() => handleNext(), 300);
      }
    }
  };

  const isSelected = (optionId: string) => {
    const answer = answers[currentStep];
    if (Array.isArray(answer)) {
      return answer.includes(optionId);
    }
    return answer === optionId;
  };

  if (isFinished) {
    return (
      <section className="py-24 px-6 lg:px-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] p-12 text-center card-shadow max-w-xl w-full"
        >
          <div className="w-20 h-20 bg-[#4c8bf5] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#4c8bf5]/30">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#000080] mb-4">You're All Set!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Thank you for completing the matchmaker. We have analyzed your responses and will pair you with the best opponents for your skill level. 
          </p>
          <button 
            onClick={() => { setIsFinished(false); setCurrentStep(0); setAnswers({}); }}
            className="px-10 py-4 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg"
          >
            Retake Test
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="matchmaker" className="py-24 px-6 lg:px-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 lg:p-12 card-shadow">
          <h2 className="text-3xl font-black text-center text-[#000080] mb-8">Tennis Level Matchmaker</h2>
          
          <div className="w-full h-3 bg-slate-100 rounded-full mb-12 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#4c8bf5] rounded-full"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3 className="text-xl font-black text-[#000080] mb-6">
                {currentQuestion.question}
              </h3>

              <div className="space-y-4">
                {currentQuestion.options.map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => selectOption(opt.id)}
                    className={`w-full p-6 text-left rounded-2xl border-2 transition-all ${isSelected(opt.id) ? 'bg-[#4c8bf5] border-[#4c8bf5] text-white shadow-xl shadow-[#4c8bf5]/20' : 'bg-white border-slate-100 text-[#000080] hover:border-[#4c8bf5]/30'}`}
                  >
                    {opt.tag && (
                      <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase mb-3 ${isSelected(opt.id) ? 'bg-white text-[#4c8bf5]' : 'bg-[#4c8bf5] text-white'}`}>
                        {opt.tag}
                      </span>
                    )}
                    <p className="font-bold text-lg leading-snug">{opt.label}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
            <button 
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`text-lg font-bold transition-all ${currentStep === 0 ? 'opacity-20 cursor-not-allowed' : 'text-[#4c8bf5] hover:opacity-70'}`}
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              className="px-10 py-4 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const el = document.getElementById(activeSection);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [activeSection]);

  return (
    <main className="min-h-screen bg-white">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <MobileNav activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="lg:ml-80">
        <div id="about">
          <AboutSection />
        </div>
        <div id="registration">
          <RegistrationSection />
        </div>
        <div id="matchmaker">
          <MatchmakerSection />
        </div>
      </div>

      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}
