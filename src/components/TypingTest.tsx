import React, { useState, useEffect, useRef } from 'react';
import { Clock, RotateCcw, Trophy, Target, Zap, Star, Award, Flame, Crown, Medal, ChevronRight, Play, Pause } from 'lucide-react';

interface TestResult {
  wpm: number;
  accuracy: number;
  timeSpent: number;
  level: number;
  step: number;
  score: number;
  streak: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

interface Level {
  id: number;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  minWpm: number;
  steps: {
    id: number;
    name: string;
    texts: string[];
    timeLimit: number;
  }[];
}

const levels: Level[] = [
  {
    id: 1,
    name: "Rookie Typist",
    description: "Master the basics",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: <Play className="h-5 w-5" />,
    minWpm: 15,
    steps: [
      {
        id: 1,
        name: "Simple Words",
        timeLimit: 45,
        texts: [
          "cat dog sun fun run big red car hat bat",
          "the and for are but not you all can had",
          "one two see way who boy did its let put"
        ]
      },
      {
        id: 2,
        name: "Short Sentences",
        timeLimit: 60,
        texts: [
          "The cat sat on the mat. It was a sunny day.",
          "I like to eat ice cream. The book is on the table.",
          "Dogs are friendly pets. Water is clear and cold."
        ]
      },
      {
        id: 3,
        name: "Basic Paragraphs",
        timeLimit: 90,
        texts: [
          "The sun shines bright today. Birds sing in the trees. Children play in the park. It is a beautiful morning.",
          "I went to the store yesterday. I bought some milk and bread. The cashier was very friendly. I walked home slowly.",
          "My favorite color is blue. It reminds me of the ocean. The waves are calm and peaceful. I love watching the sunset."
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Casual Typist",
    description: "Build your confidence",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    icon: <Target className="h-5 w-5" />,
    minWpm: 25,
    steps: [
      {
        id: 1,
        name: "Common Phrases",
        timeLimit: 60,
        texts: [
          "Technology has changed the way we communicate with each other in our daily lives.",
          "Reading books is one of the best ways to expand your knowledge and vocabulary.",
          "Exercise and healthy eating habits contribute to a better quality of life."
        ]
      },
      {
        id: 2,
        name: "Everyday Vocabulary",
        timeLimit: 75,
        texts: [
          "The weather forecast predicts rain for tomorrow, so remember to bring your umbrella when you leave the house.",
          "Online shopping has become increasingly popular because it offers convenience and a wide variety of products.",
          "Learning a new language requires dedication, practice, and patience, but the rewards are worth the effort."
        ]
      },
      {
        id: 3,
        name: "Mixed Content",
        timeLimit: 90,
        texts: [
          "Social media platforms have revolutionized how we share information and connect with friends around the world.",
          "Environmental conservation is crucial for protecting our planet's natural resources for future generations.",
          "The development of artificial intelligence continues to transform various industries and create new opportunities."
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Skilled Typist",
    description: "Develop your rhythm",
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    icon: <Zap className="h-5 w-5" />,
    minWpm: 40,
    steps: [
      {
        id: 1,
        name: "Professional Writing",
        timeLimit: 75,
        texts: [
          "The comprehensive analysis of market trends indicates a significant shift towards sustainable business practices.",
          "Educational institutions must adapt their curricula to prepare students for the challenges of the digital age.",
          "Effective communication skills are essential for building strong relationships in both personal and professional contexts."
        ]
      },
      {
        id: 2,
        name: "Technical Terms",
        timeLimit: 90,
        texts: [
          "Database management systems require careful optimization to ensure efficient query processing and data retrieval.",
          "The implementation of cybersecurity measures is critical for protecting sensitive information from unauthorized access.",
          "Machine learning algorithms can analyze vast amounts of data to identify patterns and make predictive models."
        ]
      },
      {
        id: 3,
        name: "Complex Structures",
        timeLimit: 105,
        texts: [
          "The interdisciplinary approach to problem-solving combines expertise from multiple fields to develop innovative solutions.",
          "Neuroplasticity demonstrates the brain's remarkable ability to reorganize and adapt throughout an individual's lifetime.",
          "Sustainable development requires balancing economic growth with environmental protection and social responsibility."
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Expert Typist",
    description: "Master advanced techniques",
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
    icon: <Award className="h-5 w-5" />,
    minWpm: 60,
    steps: [
      {
        id: 1,
        name: "Academic Writing",
        timeLimit: 90,
        texts: [
          "The phenomenological approach to qualitative research emphasizes the subjective experiences of participants.",
          "Quantum mechanics challenges our fundamental understanding of reality at the subatomic level.",
          "Postmodern architecture deliberately breaks from traditional design principles to create innovative structures."
        ]
      },
      {
        id: 2,
        name: "Scientific Literature",
        timeLimit: 105,
        texts: [
          "The implementation of CRISPR-Cas9 gene editing technology has revolutionized molecular biology research methodologies.",
          "Thermodynamic principles govern energy transformations within closed and open systems across multiple scales.",
          "Bioinformatics algorithms facilitate the analysis of complex genomic sequences and proteomic structures."
        ]
      },
      {
        id: 3,
        name: "Advanced Terminology",
        timeLimit: 120,
        texts: [
          "The epistemological foundations of scientific inquiry rest upon empirical observation and logical reasoning.",
          "Cryptocurrency blockchain technology utilizes cryptographic hash functions to ensure transaction integrity.",
          "Pharmacokinetic modeling predicts drug absorption, distribution, metabolism, and elimination processes."
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Typing Virtuoso",
    description: "Achieve typing mastery",
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    icon: <Crown className="h-5 w-5" />,
    minWpm: 80,
    steps: [
      {
        id: 1,
        name: "Philosophical Texts",
        timeLimit: 105,
        texts: [
          "The phenomenological reduction elucidates consciousness through epoché, bracketing existential presuppositions.",
          "Deconstructionist hermeneutics interrogates logocentrism's metaphysical foundations and binary oppositions.",
          "Existentialist philosophy emphasizes individual authenticity and the burden of radical freedom."
        ]
      },
      {
        id: 2,
        name: "Technical Specifications",
        timeLimit: 120,
        texts: [
          "Distributed computing architectures implement fault-tolerant consensus algorithms for Byzantine failure scenarios.",
          "Microservice orchestration platforms utilize containerization technologies for scalable deployment strategies.",
          "Neural network optimization employs backpropagation algorithms with stochastic gradient descent methodologies."
        ]
      },
      {
        id: 3,
        name: "Master Challenge",
        timeLimit: 150,
        texts: [
          "The epistemological implications of quantum entanglement challenge classical deterministic paradigms in physics.",
          "Poststructuralist literary criticism deconstructs authorial intentionality while privileging reader interpretation.",
          "Computational complexity theory analyzes algorithmic efficiency through asymptotic notation and complexity classes."
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Speed Demon",
    description: "Lightning fast typing",
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-200",
    icon: <Flame className="h-5 w-5" />,
    minWpm: 100,
    steps: [
      {
        id: 1,
        name: "Rapid Fire",
        timeLimit: 60,
        texts: [
          "Transcendental phenomenology investigates consciousness structures through eidetic reduction methodologies.",
          "Quantum field theory describes particle interactions via gauge symmetries and Feynman diagram calculations.",
          "Postcolonial discourse analysis examines power dynamics within hegemonic cultural representation systems."
        ]
      },
      {
        id: 2,
        name: "Ultimate Speed",
        timeLimit: 90,
        texts: [
          "Metamathematical investigations explore formal system consistency through Gödel's incompleteness theorems.",
          "Psychoanalytic semiotics deconstructs unconscious signification processes within linguistic representation structures.",
          "Topological manifold theory examines differential geometric properties of curved spacetime configurations."
        ]
      },
      {
        id: 3,
        name: "Legendary Mastery",
        timeLimit: 120,
        texts: [
          "Phenomenological hermeneutics elucidates interpretive understanding through Heideggerian existential analytics.",
          "Quantum chromodynamics describes strong nuclear force interactions via non-Abelian gauge field theories.",
          "Derrida's grammatology deconstructs Western metaphysics through différance and textual dissemination."
        ]
      }
    ]
  }
];

const TypingTest: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level>(levels[0]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentText, setCurrentText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentStepData = selectedLevel.steps.find(step => step.id === currentStep);

  useEffect(() => {
    resetTest();
  }, [selectedLevel, currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endTest();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isPaused]);

  useEffect(() => {
    if (isActive && userInput.length > 0) {
      calculateStats();
    }
  }, [userInput, isActive]);

  const resetTest = () => {
    if (!currentStepData) return;
    
    const randomText = currentStepData.texts[Math.floor(Math.random() * currentStepData.texts.length)];
    setCurrentText(randomText);
    setUserInput('');
    setIsActive(false);
    setTimeLeft(currentStepData.timeLimit);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setTestResult(null);
    setIsPaused(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
    setIsPaused(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const pauseTest = () => {
    setIsPaused(!isPaused);
  };

  const endTest = () => {
    setIsActive(false);
    setIsCompleted(true);
    const finalWpm = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    const timeSpent = (currentStepData?.timeLimit || 60) - timeLeft;
    const score = calculateScore(finalWpm, finalAccuracy, timeSpent);
    
    setTestResult({
      wpm: finalWpm,
      accuracy: finalAccuracy,
      timeSpent,
      level: selectedLevel.id,
      step: currentStep,
      score,
      streak: finalAccuracy >= 95 ? streak + 1 : 0
    });

    if (finalAccuracy >= 95) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTotalScore(prev => prev + score);
    checkAchievements(finalWpm, finalAccuracy, score);
    
    if (finalWpm >= selectedLevel.minWpm && finalAccuracy >= 90) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const calculateWPM = (): number => {
    if (!startTime) return 0;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    return Math.round(wordsTyped / timeElapsed);
  };

  const calculateAccuracy = (): number => {
    if (userInput.length === 0) return 100;
    const correctChars = userInput.split('').filter((char, index) => 
      char === currentText[index]
    ).length;
    return Math.round((correctChars / userInput.length) * 100);
  };

  const calculateScore = (wpm: number, accuracy: number, timeSpent: number): number => {
    const baseScore = wpm * accuracy / 100;
    const timeBonus = Math.max(0, ((currentStepData?.timeLimit || 60) - timeSpent) * 2);
    const streakBonus = streak * 10;
    return Math.round(baseScore + timeBonus + streakBonus);
  };

  const calculateStats = () => {
    setWpm(calculateWPM());
    setAccuracy(calculateAccuracy());
  };

  const checkAchievements = (wpm: number, accuracy: number, score: number) => {
    const newAchievements: Achievement[] = [];
    
    if (wpm >= 50 && !achievements.find(a => a.id === 'speed_demon')) {
      newAchievements.push({
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Reach 50 WPM',
        icon: <Flame className="h-6 w-6" />,
        unlocked: true
      });
    }
    
    if (accuracy === 100 && !achievements.find(a => a.id === 'perfectionist')) {
      newAchievements.push({
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Achieve 100% accuracy',
        icon: <Target className="h-6 w-6" />,
        unlocked: true
      });
    }
    
    if (streak >= 5 && !achievements.find(a => a.id === 'streak_master')) {
      newAchievements.push({
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Maintain 5+ test streak',
        icon: <Star className="h-6 w-6" />,
        unlocked: true
      });
    }

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      startTest();
    }
    
    if (value.length <= currentText.length) {
      setUserInput(value);
      
      if (value === currentText) {
        endTest();
      }
    }
  };

  const nextStep = () => {
    if (currentStep < selectedLevel.steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (selectedLevel.id < levels.length) {
      setSelectedLevel(levels[selectedLevel.id]);
      setCurrentStep(1);
    }
  };

  const getCharacterStatus = (index: number): string => {
    if (index >= userInput.length) return 'text-gray-400';
    return userInput[index] === currentText[index] ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = (): number => {
    return (userInput.length / currentText.length) * 100;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ultimate Typing Master
        </h1>
        <p className="text-xl text-gray-600">Master 6 levels • 18 challenging steps • Unlock achievements</p>
        <div className="flex justify-center items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Score: {totalScore}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold">Streak: {streak}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Medal className="h-5 w-5 text-purple-500" />
            <span className="font-semibold">Achievements: {achievements.length}</span>
          </div>
        </div>
      </div>

      {/* Level Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => !isActive && setSelectedLevel(level)}
            disabled={isActive}
            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 ${
              selectedLevel.id === level.id 
                ? `${level.bgColor} ${level.color} border-current shadow-lg` 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              {level.icon}
              <div className="font-bold text-lg">{level.name}</div>
            </div>
            <div className="text-sm opacity-75 mb-2">{level.description}</div>
            <div className="text-xs font-medium">Min WPM: {level.minWpm}</div>
            <div className="text-xs text-gray-500">{level.steps.length} steps</div>
          </button>
        ))}
      </div>

      {/* Step Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {selectedLevel.name} - Step {currentStep}: {currentStepData?.name}
          </h3>
          <div className="text-sm text-gray-600">
            {currentStep} of {selectedLevel.steps.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${selectedLevel.color.replace('text-', 'bg-')}`}
            style={{ width: `${(currentStep / selectedLevel.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600">Time Left</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{wpm}</div>
              <div className="text-sm text-gray-600">WPM</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-gray-800">{Math.round(getProgressPercentage())}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
          <div className="flex items-center space-x-3">
            <Trophy className="h-6 w-6 text-pink-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalScore}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Typing Area */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>

        {/* Text Display */}
        <div className="relative">
          <div className="text-xl leading-relaxed p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-32">
            {currentText.split('').map((char, index) => (
              <span
                key={index}
                className={`transition-colors duration-100 ${getCharacterStatus(index)} ${
                  index === userInput.length ? 'animate-pulse border-r-2 border-blue-500' : ''
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            disabled={isCompleted}
            placeholder={isActive ? "Keep typing..." : "Start typing to begin the test..."}
            className="w-full h-32 p-4 text-lg border-2 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            autoFocus
          />
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetTest}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
            
            {isActive && (
              <button
                onClick={pauseTest}
                className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {testResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {testResult.wpm >= selectedLevel.minWpm && testResult.accuracy >= 90 ? (
                  <Trophy className="h-20 w-20 text-yellow-500" />
                ) : (
                  <Target className="h-20 w-20 text-blue-500" />
                )}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {testResult.wpm >= selectedLevel.minWpm && testResult.accuracy >= 90 ? 'Excellent!' : 'Good Try!'}
              </h3>
              <p className="text-gray-600">
                {selectedLevel.name} - Step {testResult.step}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{testResult.wpm}</div>
                <div className="text-sm text-gray-600">WPM</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{testResult.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{testResult.timeSpent}s</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{testResult.score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>

            {testResult.wpm >= selectedLevel.minWpm && testResult.accuracy >= 90 && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium text-center">🎉 Step Completed Successfully!</p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={resetTest}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              {(testResult.wpm >= selectedLevel.minWpm && testResult.accuracy >= 90) && (
                <button
                  onClick={() => {
                    if (currentStep < selectedLevel.steps.length) {
                      nextStep();
                    } else if (selectedLevel.id < levels.length) {
                      nextStep();
                    }
                  }}
                  disabled={currentStep >= selectedLevel.steps.length && selectedLevel.id >= levels.length}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <Medal className="h-6 w-6 text-purple-500" />
            <span>Achievements Unlocked</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <div key={achievement.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                {achievement.icon}
                <div>
                  <div className="font-semibold text-gray-800">{achievement.name}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTest;