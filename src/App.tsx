import React from 'react';
import { useState } from 'react';
import TypingTest from './components/TypingTest';
import TypingTutorial from './components/TypingTutorial';

function App() {
  const [showTutorial, setShowTutorial] = useState(true);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  const handleBackToTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {showTutorial ? (
        <TypingTutorial onComplete={handleTutorialComplete} />
      ) : (
        <div>
          <div className="text-center py-4">
            <button
              onClick={handleBackToTutorial}
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              ← Back to Tutorials
            </button>
          </div>
          <TypingTest />
        </div>
      )}
    </div>
  );
}

export default App;