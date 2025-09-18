import React, { useState, useEffect, useRef } from 'react';
import { 
  Hand, 
  ArrowRight, 
  CheckCircle, 
  Play, 
  RotateCcw, 
  Target, 
  Clock,
  BookOpen,
  Lightbulb,
  Trophy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TutorialLesson {
  id: number;
  title: string;
  description: string;
  type: 'theory' | 'practice';
  content?: string;
  exercises?: string[];
  tips?: string[];
  targetKeys?: string[];
  timeLimit?: number;
  minAccuracy?: number;
}

interface TutorialModule {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lessons: TutorialLesson[];
}

const tutorialModules: TutorialModule[] = [
  {
    id: 1,
    title: "Finger Positioning",
    description: "Learn proper hand placement and finger assignments",
    icon: <Hand className="h-6 w-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    lessons: [
      {
        id: 1,
        title: "Home Row Position",
        description: "Master the foundation of touch typing",
        type: 'theory',
        content: "The home row is your typing foundation. Place your fingers on ASDF (left hand) and JKL; (right hand). Your thumbs should rest on the spacebar. This is your starting position for all typing.",
        tips: [
          "Keep your wrists straight and floating above the keyboard",
          "Curve your fingers naturally like holding a small ball",
          "Maintain light contact with the keys",
          "Keep your feet flat on the floor"
        ]
      },
      {
        id: 2,
        title: "Home Row Practice",
        description: "Practice typing with home row keys only",
        type: 'practice',
        exercises: [
          "asdf jkl;",
          "aaa sss ddd fff jjj kkk lll ;;;",
          "as df jk l; sa fd kj ;l",
          "ask lad fad jak sad fall"
        ],
        targetKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
        timeLimit: 60,
        minAccuracy: 90
      },
      {
        id: 3,
        title: "Finger Assignment",
        description: "Learn which finger types which key",
        type: 'theory',
        content: "Each finger has specific keys assigned to it. Left pinky: Q, A, Z. Left ring: W, S, X. Left middle: E, D, C. Left index: R, T, F, G, V, B. Right index: Y, U, H, J, N, M. Right middle: I, K, comma. Right ring: O, L, period. Right pinky: P, semicolon, slash.",
        tips: [
          "Never use the wrong finger for a key",
          "Return to home row after each keystroke",
          "Build muscle memory through repetition",
          "Start slowly and focus on accuracy"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Basic Keys",
    description: "Master the most common letters and combinations",
    icon: <Target className="h-6 w-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    lessons: [
      {
        id: 1,
        title: "Top Row Introduction",
        description: "Learn Q, W, E, R, T, Y, U, I, O, P",
        type: 'practice',
        exercises: [
          "qwerty uiop",
          "quit work type your power",
          "query write report update print",
          "the quick brown fox jumps over"
        ],
        targetKeys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        timeLimit: 90,
        minAccuracy: 85
      },
      {
        id: 2,
        title: "Bottom Row Practice",
        description: "Master Z, X, C, V, B, N, M keys",
        type: 'practice',
        exercises: [
          "zxcv bnm",
          "zoom box cave move barn name",
          "zebra exact voice brave number",
          "amazing complex voice brown number"
        ],
        targetKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        timeLimit: 90,
        minAccuracy: 85
      },
      {
        id: 3,
        title: "All Letters Combined",
        description: "Practice with all alphabet keys",
        type: 'practice',
        exercises: [
          "the quick brown fox jumps over lazy dog",
          "pack my box with five dozen liquor jugs",
          "amazingly few discotheques provide jukeboxes",
          "jackdaws love my big sphinx of quartz"
        ],
        timeLimit: 120,
        minAccuracy: 80
      }
    ]
  },
  {
    id: 3,
    title: "Numbers & Symbols",
    description: "Learn to type numbers and common symbols",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    lessons: [
      {
        id: 1,
        title: "Number Row",
        description: "Master 1234567890",
        type: 'practice',
        exercises: [
          "1234567890",
          "12 34 56 78 90",
          "call me at 555-1234 or 555-5678",
          "the year 2024 has 365 days and 12 months"
        ],
        targetKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        timeLimit: 90,
        minAccuracy: 85
      },
      {
        id: 2,
        title: "Common Symbols",
        description: "Practice punctuation and symbols",
        type: 'practice',
        exercises: [
          "! @ # $ % ^ & * ( )",
          "hello! how are you? i'm fine.",
          "email@domain.com costs $19.99 (50% off)",
          "use ctrl+c to copy & ctrl+v to paste"
        ],
        timeLimit: 120,
        minAccuracy: 80
      },
      {
        id: 3,
        title: "Mixed Practice",
        description: "Combine letters, numbers, and symbols",
        type: 'practice',
        exercises: [
          "password123! user@email.com $29.99",
          "the meeting is at 3:30 pm on 12/25/2024",
          "download file.zip (2.5mb) from www.site.com",
          "invoice #12345 total: $1,234.56 due 30 days"
        ],
        timeLimit: 150,
        minAccuracy: 75
      }
    ]
  },
  {
    id: 4,
    title: "Speed Building",
    description: "Techniques to increase your typing speed",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200",
    lessons: [
      {
        id: 1,
        title: "Rhythm and Flow",
        description: "Develop consistent typing rhythm",
        type: 'theory',
        content: "Typing speed comes from rhythm, not rushing. Focus on maintaining a steady pace rather than bursts of speed. Think of typing like playing piano - smooth, consistent movements create the best results.",
        tips: [
          "Type at a comfortable, sustainable pace",
          "Focus on smooth finger movements",
          "Avoid looking at the keyboard",
          "Practice regularly for short periods"
        ]
      },
      {
        id: 2,
        title: "Common Word Patterns",
        description: "Practice frequent letter combinations",
        type: 'practice',
        exercises: [
          "the and for are but not you all can had",
          "that with have this will been from they",
          "there their where when what which while",
          "through thought although enough right might"
        ],
        timeLimit: 90,
        minAccuracy: 85
      },
      {
        id: 3,
        title: "Speed Drills",
        description: "Push your limits with timed exercises",
        type: 'practice',
        exercises: [
          "she sells seashells by the seashore",
          "peter piper picked a peck of pickled peppers",
          "how much wood would a woodchuck chuck",
          "red leather yellow leather red leather yellow"
        ],
        timeLimit: 60,
        minAccuracy: 80
      }
    ]
  },
  {
    id: 5,
    title: "Advanced Techniques",
    description: "Master advanced typing skills and shortcuts",
    icon: <Trophy className="h-6 w-6" />,
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    lessons: [
      {
        id: 1,
        title: "Keyboard Shortcuts",
        description: "Learn essential productivity shortcuts",
        type: 'theory',
        content: "Keyboard shortcuts dramatically improve productivity. Master Ctrl+C (copy), Ctrl+V (paste), Ctrl+X (cut), Ctrl+Z (undo), Ctrl+A (select all), Ctrl+S (save), and Ctrl+F (find).",
        tips: [
          "Use shortcuts instead of mouse when possible",
          "Practice shortcuts until they become automatic",
          "Learn application-specific shortcuts",
          "Combine shortcuts for complex operations"
        ]
      },
      {
        id: 2,
        title: "Touch Typing Mastery",
        description: "Type without looking at the keyboard",
        type: 'practice',
        exercises: [
          "technology innovation development programming",
          "artificial intelligence machine learning algorithms",
          "database management system architecture design",
          "cybersecurity encryption authentication protocols"
        ],
        timeLimit: 120,
        minAccuracy: 90
      },
      {
        id: 3,
        title: "Final Challenge",
        description: "Demonstrate your complete typing mastery",
        type: 'practice',
        exercises: [
          "The comprehensive analysis of contemporary technological advancements reveals unprecedented opportunities for innovation across multiple industries and sectors.",
          "Sophisticated algorithms and machine learning models continue to revolutionize data processing capabilities while maintaining security and privacy standards.",
          "Professional development requires continuous learning, adaptation to emerging technologies, and collaboration with diverse teams to achieve organizational objectives."
        ],
        timeLimit: 180,
        minAccuracy: 85
      }
    ]
  }
];

interface TypingTutorialProps {
  onComplete: () => void;
}

const TypingTutorial: React.FC<TypingTutorialProps> = ({ onComplete }) => {
  const [currentModule, setCurrentModule] = useState<number>(1);
  const [currentLesson, setCurrentLesson] = useState<number>(1);
  const [userInput, setUserInput] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const module = tutorialModules.find(m => m.id === currentModule);
  const lesson = module?.lessons.find(l => l.id === currentLesson);
  const currentText = lesson?.type === 'practice' ? lesson.exercises?.[currentExercise] || '' : '';

  useEffect(() => {
    if (lesson?.type === 'practice') {
      resetExercise();
    }
  }, [currentModule, currentLesson, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      endExercise();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && userInput.length > 0) {
      calculateStats();
    }
  }, [userInput, isActive]);

  const resetExercise = () => {
    setUserInput('');
    setIsActive(false);
    setTimeLeft(lesson?.timeLimit || 60);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setShowResults(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const startExercise = () => {
    setIsActive(true);
    setStartTime(Date.now());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const endExercise = () => {
    setIsActive(false);
    setIsCompleted(true);
    const finalWpm = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    
    if (finalAccuracy >= (lesson?.minAccuracy || 80)) {
      const lessonKey = `${currentModule}-${currentLesson}`;
      setCompletedLessons(prev => new Set([...prev, lessonKey]));
    }
    
    setShowResults(true);
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

  const calculateStats = () => {
    setWpm(calculateWPM());
    setAccuracy(calculateAccuracy());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    if (!isActive && value.length > 0) {
      startExercise();
    }
    
    if (value.length <= currentText.length) {
      setUserInput(value);
      
      if (value === currentText) {
        endExercise();
      }
    }
  };

  const nextExercise = () => {
    if (lesson?.exercises && currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      nextLesson();
    }
  };

  const nextLesson = () => {
    if (module && currentLesson < module.lessons.length) {
      setCurrentLesson(currentLesson + 1);
      setCurrentExercise(0);
    } else if (currentModule < tutorialModules.length) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(1);
      setCurrentExercise(0);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);
      setCurrentExercise(0);
    } else if (currentModule > 1) {
      const prevModule = tutorialModules.find(m => m.id === currentModule - 1);
      if (prevModule) {
        setCurrentModule(currentModule - 1);
        setCurrentLesson(prevModule.lessons.length);
        setCurrentExercise(0);
      }
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
    if (lesson?.type === 'theory') return 100;
    return (userInput.length / currentText.length) * 100;
  };

  const getTotalProgress = (): number => {
    const totalLessons = tutorialModules.reduce((sum, module) => sum + module.lessons.length, 0);
    return (completedLessons.size / totalLessons) * 100;
  };

  const isLessonCompleted = (moduleId: number, lessonId: number): boolean => {
    return completedLessons.has(`${moduleId}-${lessonId}`);
  };

  const canProceedToLevels = (): boolean => {
    return getTotalProgress() >= 80; // Need to complete 80% of tutorials
  };

  if (!module || !lesson) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Typing Tutorial
        </h1>
        <p className="text-lg text-gray-600">Master the fundamentals before taking on the challenges</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getTotalProgress()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500">Overall Progress: {Math.round(getTotalProgress())}%</p>
      </div>

      {/* Module Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tutorialModules.map(tutorialModule => (
          <button
            key={tutorialModule.id}
            onClick={() => {
              setCurrentModule(tutorialModule.id);
              setCurrentLesson(1);
              setCurrentExercise(0);
            }}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
              currentModule === tutorialModule.id 
                ? `${tutorialModule.bgColor} ${tutorialModule.color} border-current` 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              {tutorialModule.icon}
            </div>
            <div className="font-semibold text-sm">{tutorialModule.title}</div>
            <div className="text-xs opacity-75 mt-1">{tutorialModule.lessons.length} lessons</div>
          </button>
        ))}
      </div>

      {/* Current Lesson */}
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{lesson.title}</h2>
            <p className="text-gray-600">{lesson.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            {isLessonCompleted(currentModule, currentLesson) && (
              <CheckCircle className="h-6 w-6 text-green-500" />
            )}
            <span className="text-sm text-gray-500">
              Lesson {currentLesson} of {module.lessons.length}
            </span>
          </div>
        </div>

        {lesson.type === 'theory' ? (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-gray-700">{lesson.content}</p>
            </div>
            
            {lesson.tips && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-blue-700">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Practice Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-lg font-bold text-blue-700">{formatTime(timeLeft)}</div>
                    <div className="text-xs text-blue-600">Time Left</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="text-lg font-bold text-green-700">{wpm}</div>
                    <div className="text-xs text-green-600">WPM</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-lg font-bold text-purple-700">{accuracy}%</div>
                <div className="text-xs text-purple-600">Accuracy</div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="text-lg font-bold text-orange-700">{Math.round(getProgressPercentage())}%</div>
                <div className="text-xs text-orange-600">Progress</div>
              </div>
            </div>

            {/* Exercise Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>

            {/* Text Display */}
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <div className="text-xl leading-relaxed font-mono">
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
                placeholder={isActive ? "Keep typing..." : "Start typing to begin..."}
                className="w-full h-24 p-4 text-lg border-2 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 resize-none font-mono"
                autoFocus
              />
              
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetExercise}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Exercise Navigation */}
            {lesson.exercises && lesson.exercises.length > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Exercise {currentExercise + 1} of {lesson.exercises.length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            onClick={prevLesson}
            disabled={currentModule === 1 && currentLesson === 1}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-600">Module {currentModule}: {module.title}</div>
          </div>

          <button
            onClick={lesson.type === 'theory' ? nextLesson : nextExercise}
            disabled={lesson.type === 'practice' && (!isCompleted || accuracy < (lesson.minAccuracy || 80))}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && lesson.type === 'practice' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {accuracy >= (lesson.minAccuracy || 80) ? (
                  <CheckCircle className="h-16 w-16 text-green-500" />
                ) : (
                  <Target className="h-16 w-16 text-orange-500" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {accuracy >= (lesson.minAccuracy || 80) ? 'Great Job!' : 'Keep Practicing!'}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{wpm}</div>
                <div className="text-sm text-gray-600">WPM</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            {accuracy >= (lesson.minAccuracy || 80) ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center">✅ Lesson completed successfully!</p>
              </div>
            ) : (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-center">
                  Need {lesson.minAccuracy || 80}% accuracy to proceed. Keep practicing!
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResults(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Tutorial Button */}
      {canProceedToLevels() && (
        <div className="text-center">
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold flex items-center space-x-3 mx-auto"
          >
            <Trophy className="h-6 w-6" />
            <span>Start Typing Challenges!</span>
            <ArrowRight className="h-6 w-6" />
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Congratulations! You've completed the tutorials and are ready for the challenges.
          </p>
        </div>
      )}
    </div>
  );
};

export default TypingTutorial;