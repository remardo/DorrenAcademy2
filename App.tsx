






import React, { useState } from 'react';
import { Header, Footer } from './components/Navigation';
import { Hero } from './components/Hero';
import { WhyCourse, Audience, Results } from './components/Features';
import { Curriculum } from './components/Curriculum';
import { CompanyInfo, Format, FAQSection } from './components/Details';
import { Lesson1_1 } from './components/Lesson1_1';
import { Lesson1_2 } from './components/Lesson1_2';
import { Lesson1_3 } from './components/Lesson1_3';
import { Lesson2_1 } from './components/Lesson2_1';
import { Lesson2_2 } from './components/Lesson2_2';
import { Lesson2_3 } from './components/Lesson2_3';
import { Lesson3_1 } from './components/Lesson3_1';
import { Lesson3_2 } from './components/Lesson3_2';
import { Lesson3_3 } from './components/Lesson3_3';
import { Lesson3_4 } from './components/Lesson3_4';
import { Lesson4_1 } from './components/Lesson4_1';
import { Lesson4_2 } from './components/Lesson4_2';
import { Lesson4_3 } from './components/Lesson4_3';
import { Lesson5_1 } from './components/Lesson5_1';
import { Lesson5_2 } from './components/Lesson5_2';
import { Lesson5_3 } from './components/Lesson5_3';
import { Lesson6_1 } from './components/Lesson6_1';
import { Lesson6_2 } from './components/Lesson6_2';
import { Lesson6_3 } from './components/Lesson6_3';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'lesson1.1' | 'lesson1.2' | 'lesson1.3' | 'lesson2.1' | 'lesson2.2' | 'lesson2.3' | 'lesson3.1' | 'lesson3.2' | 'lesson3.3' | 'lesson3.4' | 'lesson4.1' | 'lesson4.2' | 'lesson4.3' | 'lesson5.1' | 'lesson5.2' | 'lesson5.3' | 'lesson6.1' | 'lesson6.2' | 'lesson6.3'>('landing');

  const handleNavigate = (view: string) => {
    window.scrollTo(0, 0);
    // Simple validation for type safety
    if (view === 'landing' || view.startsWith('lesson')) {
      setCurrentView(view as any);
    } else {
      setCurrentView('landing');
    }
  };

  const handleStartLesson = () => handleNavigate('lesson1.1');

  if (currentView === 'lesson1.1') {
    return <Lesson1_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson1.2') {
    return <Lesson1_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson1.3') {
    return <Lesson1_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson2.1') {
    return <Lesson2_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson2.2') {
    return <Lesson2_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson2.3') {
    return <Lesson2_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }
  
  if (currentView === 'lesson3.1') {
    return <Lesson3_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson3.2') {
    return <Lesson3_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson3.3') {
    return <Lesson3_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson3.4') {
    return <Lesson3_4 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson4.1') {
    return <Lesson4_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson4.2') {
    return <Lesson4_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson4.3') {
    return <Lesson4_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson5.1') {
    return <Lesson5_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson5.2') {
    return <Lesson5_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson5.3') {
    return <Lesson5_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson6.1') {
    return <Lesson6_1 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson6.2') {
    return <Lesson6_2 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'lesson6.3') {
    return <Lesson6_3 onBack={() => handleNavigate('landing')} onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-dorren-light/30">
      <Header onStartClick={handleStartLesson} />
      <main>
        <Hero onStartClick={handleStartLesson} />
        <WhyCourse />
        <Audience />
        <Results />
        <Curriculum onLessonStart={handleNavigate} />
        <CompanyInfo />
        <Format />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
