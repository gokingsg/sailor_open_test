
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Trophy,
  ArrowRight,
  Check
} from 'lucide-react';

/**
 * ASSET INSTRUCTIONS:
 * Ensure 'logo.png' is in your 'public' folder.
 */
const ASSETS = {
  logo: "/logo.png",
  wave: "https://res.cloudinary.com/dfm67v8v3/image/upload/v1740051187/Wave_Graphics_p7e5u6.png"
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
  "Women's Doubles",
  "Mixed Doubles"
];

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

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col w-80 h-screen fixed left-0 top-0 bg-[#000080] p-10 text-white z-50">
      <div className="mb-20">
        <img 
          src={ASSETS.logo} 
          alt="Sailors Open 2026" 
          className="w-full h-auto object-contain block"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      <nav className="flex flex-col gap-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-lg font-medium transition-all text-left w-fit sidebar-link-active"
        >
          About
        </button>
      </nav>

      <div className="mt-auto opacity-20 text-xs">
        © 2026 Sailors Open
      </div>
    </div>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100]">
      <div className="flex justify-between items-center p-6 bg-[#000080] text-white shadow-lg">
        <div className="w-12 h-12">
           <img 
            src={ASSETS.logo} 
            alt="Logo" 
            className="w-full h-full object-contain block"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
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
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 lg:px-24 py-32 lg:py-0 bg-white">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl lg:text-7xl font-black text-[#000080] mb-8 leading-tight">
          About Sailors Open
        </h1>
        <p className="text-xl text-[#000080]/80 leading-relaxed font-medium mb-10">
          The company-wide tennis tournament. Take a break, have fun, and get to know fellow Sailors. Open to all skill levels!
        </p>
        
        <button 
          onClick={scrollToRegister}
          className="group flex items-center gap-3 px-10 py-5 bg-[#4c8bf5] hover:bg-[#3b7ae4] text-white rounded-2xl font-black text-xl shadow-2xl shadow-[#4c8bf5]/30 transition-all active:scale-95"
        >
          Register Now
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
      
      <div className="mt-20 relative w-full h-40 lg:h-64 overflow-hidden rounded-[3rem]">
        <img 
          src={ASSETS.wave} 
          alt="Wave Decoration" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

const RegistrationFlow = () => {
  const [flowStep, setFlowStep] = useState<'info' | 'matchmaker' | 'success'>('info');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const currentQuestion = QUESTIONS[currentQuestionIdx];
  const matchmakerProgress = ((currentQuestionIdx + 1) / QUESTIONS.length) * 100;

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
    setFlowStep('matchmaker');
    setTimeout(() => {
      document.getElementById('registration-flow')?.scrollIntoView({ behavior: 'smooth' });
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
    <section id="registration-flow" className="py-24 px-6 lg:px-24 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
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
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-2">Office Location</label>
                    <div className="relative">
                      <select required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-2 focus:ring-[#4c8bf5] outline-none">
                        <option value="">Select Office</option>
                        <option>Singapore (Galaxis)</option>
                        <option>Singapore (Solaris)</option>
                        <option>Shenzhen</option>
                        <option>Bangkok</option>
                        <option>Ho Chi Minh City</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                  </div>
                  
                  {/* Category Multi-Select */}
                  <div>
                    <label className="block text-sm font-bold text-[#000080] mb-4">Categories (Select all you wish to join)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-[#ff5e2c] hover:bg-[#e04d20] text-white rounded-xl font-black text-lg transition-all shadow-xl shadow-[#ff5e2c]/20 active:scale-95 mt-4">
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
                   <button onClick={() => currentQuestionIdx < QUESTIONS.length - 1 ? setCurrentQuestionIdx(v => v + 1) : setFlowStep('success')} className="px-10 py-4 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg">
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
              <p className="text-slate-500 mb-8 leading-relaxed">Registration complete for: <span className="font-bold text-[#000080]">{selectedCategories.join(', ')}</span>. We'll analyze your level and notify you soon.</p>
              <button onClick={() => { setFlowStep('info'); setCurrentQuestionIdx(0); setAnswers({}); setSelectedCategories([]); }} className="px-10 py-4 bg-[#4c8bf5] text-white rounded-xl font-bold shadow-lg">
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
    <main className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      
      <div className="lg:ml-80">
        <AboutSection />
        <RegistrationFlow />
      </div>

      <div className="lg:hidden w-full h-screen fixed inset-0 z-[-1] bg-[#000080]" />
    </main>
  );
}
