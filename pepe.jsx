import React, { useState } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Target, Zap } from 'lucide-react';

const UltimateChemGame = () => {
  const [gameMode, setGameMode] = useState('menu');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [bestStreak, setBestStreak] = useState(0);
  
  const questions = {
    atomic_structure: [
      { q: "An atom has 19 protons and 20 neutrons. What is its mass number?", a: "39", options: ["19", "20", "39", "40"] },
      { q: "If an atom has atomic number 17, how many protons does it have?", a: "17", options: ["8", "17", "35", "52"] },
      { q: "Carbon-14 has 6 protons. How many neutrons does it have?", a: "8", options: ["6", "8", "14", "20"] },
      { q: "A neutral atom has 11 protons. How many electrons does it have?", a: "11", options: ["10", "11", "12", "22"] },
      { q: "What is the symbol for an isotope with mass number on top?", a: "ᴬ/ᶻX (A on top)", options: ["ᴬ/ᶻX (A on top)", "ᶻ/ᴬX (Z on top)", "X-A", "X(A,Z)"] },
      { q: "Oxygen-16 has 8 protons and 8 neutrons. What is its atomic number?", a: "8", options: ["8", "16", "24", "32"] },
      { q: "An element has 26 protons. What element is it?", a: "Iron (Fe)", options: ["Chromium (Cr)", "Iron (Fe)", "Cobalt (Co)", "Nickel (Ni)"] },
      { q: "How many protons are in Cl⁻ (chloride ion)?", a: "17", options: ["16", "17", "18", "35"] },
    ],
    
    electron_config: [
      { q: "How many electrons can the s sublevel hold?", a: "2", options: ["1", "2", "6", "10"] },
      { q: "How many electrons can the p sublevel hold?", a: "6", options: ["2", "6", "10", "14"] },
      { q: "How many electrons can the d sublevel hold?", a: "10", options: ["2", "6", "10", "14"] },
      { q: "What is the electron configuration of Nitrogen (N, #7)?", a: "1s² 2s² 2p³", options: ["1s² 2s² 2p³", "1s² 2s² 2p⁵", "1s² 2s³ 2p²", "1s² 2s² 2p⁴"] },
      { q: "What is the abbreviated config of Sodium (Na, #11)?", a: "[Ne] 3s¹", options: ["[He] 2s² 2p⁶ 3s¹", "[Ne] 3s¹", "[Ne] 3p¹", "[Ar] 3s¹"] },
      { q: "Which rule says: fill orbitals singly before pairing?", a: "Hund's Rule", options: ["Aufbau Principle", "Pauli Exclusion", "Hund's Rule", "Octet Rule"] },
      { q: "For Fe²⁺, which electrons are removed first?", a: "4s electrons", options: ["3d electrons", "4s electrons", "3p electrons", "1s electrons"] },
      { q: "What is the electron configuration of O²⁻?", a: "1s² 2s² 2p⁶", options: ["1s² 2s² 2p⁴", "1s² 2s² 2p⁶", "1s² 2s² 2p⁸", "1s² 2s² 2p²"] },
      { q: "How many valence electrons does Phosphorus (P) have?", a: "5", options: ["3", "5", "7", "15"] },
      { q: "What is the electron configuration of Mg²⁺?", a: "1s² 2s² 2p⁶", options: ["1s² 2s² 2p⁶ 3s²", "1s² 2s² 2p⁶", "1s² 2s²", "1s² 2s² 2p⁴"] },
    ],
    
    periodic_table: [
      { q: "What is the symbol for Sodium?", a: "Na", options: ["Na", "S", "So", "N"] },
      { q: "What is the symbol for Potassium?", a: "K", options: ["P", "K", "Po", "Pt"] },
      { q: "What is the symbol for Iron?", a: "Fe", options: ["Fe", "Ir", "I", "F"] },
      { q: "What is the symbol for Gold?", a: "Au", options: ["Go", "Gd", "Au", "Ag"] },
      { q: "What is the symbol for Silver?", a: "Ag", options: ["Si", "Sv", "Ag", "S"] },
      { q: "What is the symbol for Lead?", a: "Pb", options: ["Le", "Ld", "Pb", "P"] },
      { q: "What group are the Alkali Metals?", a: "Group 1A", options: ["Group 1A", "Group 2A", "Group 7A", "Group 8A"] },
      { q: "What group are the Halogens?", a: "Group 7A", options: ["Group 1A", "Group 2A", "Group 7A", "Group 8A"] },
      { q: "What group are the Noble Gases?", a: "Group 8A", options: ["Group 1A", "Group 2A", "Group 7A", "Group 8A"] },
      { q: "Which element is a Halogen?", a: "Bromine (Br)", options: ["Oxygen (O)", "Nitrogen (N)", "Bromine (Br)", "Argon (Ar)"] },
      { q: "Which element is a Noble Gas?", a: "Neon (Ne)", options: ["Fluorine (F)", "Neon (Ne)", "Oxygen (O)", "Nitrogen (N)"] },
      { q: "Is Silicon (Si) a metal, nonmetal, or metalloid?", a: "Metalloid", options: ["Metal", "Nonmetal", "Metalloid"] },
    ],
    
    ions_charges: [
      { q: "What charge does Sodium (Group 1A) form?", a: "+1", options: ["+1", "+2", "-1", "-2"] },
      { q: "What charge does Magnesium (Group 2A) form?", a: "+2", options: ["+1", "+2", "+3", "-2"] },
      { q: "What charge does Aluminum (Group 3A) form?", a: "+3", options: ["+1", "+2", "+3", "+4"] },
      { q: "What charge does Chlorine (Group 7A) form?", a: "-1", options: ["+1", "-1", "+7", "-7"] },
      { q: "What charge does Oxygen (Group 6A) form?", a: "-2", options: ["-1", "-2", "+2", "+6"] },
      { q: "What charge does Nitrogen (Group 5A) form?", a: "-3", options: ["-1", "-2", "-3", "+5"] },
      { q: "Which ion is formed when Ca loses 2 electrons?", a: "Ca²⁺", options: ["Ca⁺", "Ca²⁺", "Ca²⁻", "Ca⁻"] },
      { q: "Which ion is formed when F gains 1 electron?", a: "F⁻", options: ["F⁺", "F²⁺", "F⁻", "F²⁻"] },
      { q: "Do metals form cations or anions?", a: "Cations (positive)", options: ["Cations (positive)", "Anions (negative)", "Neutral", "Both"] },
      { q: "Do nonmetals form cations or anions?", a: "Anions (negative)", options: ["Cations (positive)", "Anions (negative)", "Neutral", "Both"] },
    ],
    
    diatomic: [
      { q: "Which is diatomic?", a: "Hydrogen (H₂)", options: ["Hydrogen (H₂)", "Helium", "Carbon", "Sodium"] },
      { q: "Which is NOT diatomic?", a: "Helium", options: ["Oxygen", "Nitrogen", "Helium", "Chlorine"] },
      { q: "How many elements are naturally diatomic?", a: "7", options: ["5", "7", "9", "11"] },
      { q: "Which is diatomic?", a: "Bromine (Br₂)", options: ["Neon", "Bromine (Br₂)", "Carbon", "Sodium"] },
      { q: "What does HONClBrIF help you remember?", a: "Diatomic elements", options: ["Noble gases", "Diatomic elements", "Alkali metals", "Halogens"] },
      { q: "Is Fluorine (F) diatomic?", a: "Yes (F₂)", options: ["Yes (F₂)", "No", "Sometimes", "Only at high temp"] },
      { q: "Is Argon (Ar) diatomic?", a: "No", options: ["Yes", "No", "Sometimes", "Only at low temp"] },
    ],
    
    trends: [
      { q: "As you go DOWN a group, atomic size...", a: "Increases", options: ["Increases", "Decreases", "Stays the same"] },
      { q: "As you go RIGHT across a period, atomic size...", a: "Decreases", options: ["Increases", "Decreases", "Stays the same"] },
      { q: "As you go DOWN a group, ionization energy...", a: "Decreases", options: ["Increases", "Decreases", "Stays the same"] },
      { q: "As you go RIGHT across a period, ionization energy...", a: "Increases", options: ["Increases", "Decreases", "Stays the same"] },
      { q: "Which has the larger atomic radius: Na or Mg?", a: "Na", options: ["Na", "Mg", "Same size"] },
      { q: "Which has the larger atomic radius: Li or K?", a: "K", options: ["Li", "K", "Same size"] },
      { q: "Which has higher ionization energy: F or Cl?", a: "F", options: ["F", "Cl", "Same"] },
      { q: "Which is more metallic: Na or Cl?", a: "Na", options: ["Na", "Cl", "Same"] },
      { q: "Which has higher ionization energy: C or Si?", a: "C", options: ["C", "Si", "Same"] },
      { q: "As you go DOWN a group, metallic character...", a: "Increases", options: ["Increases", "Decreases", "Stays the same"] },
    ],
    
    valence: [
      { q: "How many valence electrons does Chlorine have?", a: "7", options: ["5", "7", "17", "8"] },
      { q: "How many valence electrons does Oxygen have?", a: "6", options: ["4", "6", "8", "16"] },
      { q: "How many valence electrons does Sodium have?", a: "1", options: ["1", "2", "8", "11"] },
      { q: "How many valence electrons does Carbon have?", a: "4", options: ["2", "4", "6", "12"] },
      { q: "What is the octet rule?", a: "Atoms want 8 valence e⁻", options: ["Atoms want 8 valence e⁻", "Atoms want 8 protons", "8 energy levels", "8 neutrons"] },
      { q: "How many valence electrons does Magnesium have?", a: "2", options: ["2", "3", "8", "12"] },
      { q: "Noble gases have how many valence electrons?", a: "8 (except He has 2)", options: ["2", "6", "8 (except He has 2)", "18"] },
    ],
    
    states_matter: [
      { q: "Which state has definite shape and volume?", a: "Solid", options: ["Solid", "Liquid", "Gas", "Plasma"] },
      { q: "Which state takes the shape of its container?", a: "Liquid and Gas", options: ["Solid", "Liquid", "Gas", "Liquid and Gas"] },
      { q: "In which state do particles move fastest?", a: "Gas", options: ["Solid", "Liquid", "Gas", "All same"] },
      { q: "Solid → Liquid is called...", a: "Melting", options: ["Melting", "Freezing", "Boiling", "Sublimation"] },
      { q: "Solid → Gas is called...", a: "Sublimation", options: ["Melting", "Evaporation", "Sublimation", "Deposition"] },
      { q: "Gas → Liquid is called...", a: "Condensation", options: ["Melting", "Condensation", "Sublimation", "Freezing"] },
      { q: "Which element is liquid at room temperature?", a: "Mercury (Hg)", options: ["Iron", "Mercury (Hg)", "Oxygen", "Sodium"] },
    ],
    
    mixed_hard: [
      { q: "Fe²⁺ has lost electrons from which sublevel?", a: "4s", options: ["3d", "4s", "3p", "4p"] },
      { q: "Which is isoelectronic with Neon?", a: "O²⁻", options: ["Na⁺", "O²⁻", "Both", "Neither"] },
      { q: "Chlorine has two isotopes: Cl-35 (75%) and Cl-37 (25%). Atomic mass is closest to:", a: "35.5", options: ["35.0", "35.5", "36.0", "36.5"] },
      { q: "In period 4, the d-sublevel is actually...", a: "3d", options: ["3d", "4d", "5d", "2d"] },
      { q: "Which has the smallest radius: Na⁺, Na, or Na⁻?", a: "Na⁺", options: ["Na⁺", "Na", "Na⁻", "All same"] },
      { q: "Exception: Chromium's electron config ends in...", a: "4s¹ 3d⁵", options: ["4s² 3d⁴", "4s¹ 3d⁵", "4s² 3d⁵", "4s¹ 3d⁶"] },
      { q: "What must be equal in a neutral atom?", a: "Protons and electrons", options: ["Protons and neutrons", "Protons and electrons", "Neutrons and electrons", "All three"] },
      { q: "Which group is the most reactive metals?", a: "Alkali Metals (1A)", options: ["Alkali Metals (1A)", "Alkaline Earth (2A)", "Halogens (7A)", "Noble Gases (8A)"] },
    ]
  };

  const getRandomQuestion = (mode) => {
    const modeQuestions = questions[mode];
    if (usedQuestions.length >= modeQuestions.length) {
      setUsedQuestions([]);
    }
    const availableQuestions = modeQuestions.filter((q, idx) => !usedQuestions.includes(idx));
    const randomQ = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const questionIndex = modeQuestions.indexOf(randomQ);
    setCurrentQuestion(randomQ);
    setUsedQuestions(prev => [...prev, questionIndex]);
    setFeedback('');
  };

  const handleAnswer = (answer) => {
    setTotalQuestions(prev => prev + 1);
    if (answer === currentQuestion.a) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
      setFeedback('correct');
      setTimeout(() => getRandomQuestion(gameMode), 1000);
    } else {
      setStreak(0);
      setFeedback('wrong');
      setTimeout(() => getRandomQuestion(gameMode), 2000);
    }
  };

  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setUsedQuestions([]);
    getRandomQuestion(mode);
  };

  const resetGame = () => {
    setGameMode('menu');
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setCurrentQuestion(null);
    setFeedback('');
    setUsedQuestions([]);
  };

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-5xl font-bold mb-6 text-center tracking-wide">
        ⚛️ Ultimate Chemistry Quiz Game ⚛️
      </h1>

      {gameMode === 'menu' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {Object.keys(questions).map(mode => (
            <button
              key={mode}
              onClick={() => startGame(mode)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-xl font-semibold rounded-2xl p-6 shadow-xl transition-all border border-white/20 hover:scale-105"
            >
              {mode.replace(/_/g, ' ').toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {gameMode !== 'menu' && currentQuestion && (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl mt-6 w-full max-w-3xl shadow-2xl border border-white/20">
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="text-yellow-400" />
              <p className="text-lg font-semibold">Streak: {streak}</p>
            </div>
            <p className="text-lg">Best Streak: {bestStreak}</p>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.q}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                className={`p-4 rounded-2xl font-semibold border transition-all ${
                  feedback === 'correct' && opt === currentQuestion.a
                    ? 'bg-green-600 border-green-400 scale-105'
                    : feedback === 'wrong' && opt === currentQuestion.a
                    ? 'bg-blue-600 border-blue-400'
                    : feedback === 'wrong' && opt !== currentQuestion.a
                    ? 'opacity-50'
                    : 'bg-white/10 hover:bg-white/20 border-white/30 hover:scale-105'
                }`}
                disabled={feedback !== ''}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-2xl font-semibold transition-all shadow-lg"
            >
              <RotateCcw size={18} /> Quit
            </button>

            <div className="text-center">
              <p className="text-lg">Score: {score} / {totalQuestions}</p>
              <p className="text-sm opacity-70">Accuracy: {percentage}%</p>
            </div>
          </div>

          {feedback === 'correct' && (
            <div className="mt-6 text-center text-green-400 font-bold text-2xl flex justify-center items-center gap-2">
              <CheckCircle size={32} /> Correct!
            </div>
          )}
          {feedback === 'wrong' && (
            <div className="mt-6 text-center text-red-400 font-bold text-2xl flex justify-center items-center gap-2">
              <XCircle size={32} /> Wrong! Correct answer: {currentQuestion.a}
            </div>
          )}
        </div>
      )}

      {/* Encouragement / Achievement Section */}
      <div className="mt-12">
        {totalQuestions >= 10 && percentage >= 90 && (
          <div className="text-center">
            <Trophy className="mx-auto text-yellow-400 mb-3" size={64} />
            <h3 className="text-3xl font-bold mb-2">Chemistry Champion!</h3>
            <p className="text-lg">You mastered this topic with {percentage}% accuracy! 🔥</p>
          </div>
        )}

        {totalQuestions >= 5 && percentage < 70 && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-white shadow-2xl">
              <Target className="mx-auto mb-3 text-yellow-300" size={64} />
              <h3 className="text-3xl font-bold mb-2">Keep Going!</h3>
              <p className="text-lg">
                You’re scoring {percentage}% so far — review the tricky topics and try again!
              </p>
              <p className="mt-2 text-sm opacity-80">Every mistake helps you learn. 🔬</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UltimateChemGame;

