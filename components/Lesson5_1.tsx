
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Layers, CheckCircle, BrickWall, Hammer
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson5_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeWall, setActiveWall] = useState<'concrete' | 'drywall' | 'sandwich'>('concrete');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const CONTENT = {
    concrete: {
      title: 'Бетон / Кирпич / Блок',
      desc: 'Твердое основание. Самый простой и надежный монтаж.',
      features: ['Крепление на анкера.', 'Выдержит любую тяжелую дверь.', 'Требует перфоратора.'],
      risk: 'Если блок рыхлый (пеноблок), нужны спец. дюбеля.'
    },
    drywall: {
      title: 'Гипсокартон (ГКЛ)',
      desc: 'Перегородка на металлокаркасе. Требует подготовки.',
      features: ['Обязательны закладные (брус) в профиле проема!', 'Крепление саморезами к профилю.', 'Легко деформируется.'],
      risk: 'Монтаж тяжелой двери без усиления проема приведет к шатанию перегородки.'
    },
    sandwich: {
      title: 'Сэндвич-панель',
      desc: 'Металл-утеплитель-металл. Мягкая внутри.',
      features: ['Нужна обжимная коробка (П-образная).', 'Крепление насквозь шпильками.', 'Сложно обеспечить жесткость.'],
      risk: 'Затягивание крепежа может смять панель.'
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Главное требование для монтажа двери в ГКЛ?', 
      opts: [{id:'a', t:'Использовать клей'}, {id:'b', t:'Усиление проема (закладные) внутри стены'}, {id:'c', t:'Легкая дверь'}, {id:'d', t:'Только пена'}], 
      correct: 'b', 
      expl: 'Профиль ГКЛ сам по себе слаб. Нужен брус или усиленный профиль UA.' 
    },
    { 
      id: 2, 
      q: 'Как крепить дверь в сэндвич-панель?', 
      opts: [{id:'a', t:'На анкера'}, {id:'b', t:'На пену'}, {id:'c', t:'Обжимная коробка / шпильки'}, {id:'d', t:'Сварка'}], 
      correct: 'c', 
      expl: 'Обжимная коробка стягивает панель с двух сторон.' 
    },
    { 
      id: 3, 
      q: 'В чем риск пеноблока?', 
      opts: [{id:'a', t:'Он твердый'}, {id:'b', t:'Он рыхлый, обычный анкер может выпасть'}, {id:'c', t:'Он горит'}, {id:'d', t:'Он прозрачный'}], 
      correct: 'b', 
      expl: 'Нужен химический анкер или специальные дюбеля для ячеистого бетона.' 
    }
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="5.1" 
        title="Типы стен" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 5. Узлы примыкания
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 5.1. Типы стен</h1>
             <p className="text-xl text-gray-300 mb-8">
               Бетон, ГКЛ, сэндвич. Куда мы ставим дверь и почему это важно знать до заказа.
             </p>
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Начать урок <ArrowRight size={18} />
             </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="bg-white/10 border border-white/20 p-8 rounded-full">
                <BrickWall size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Дверь держится за стену</h2>
           <p className="text-gray-700">
             Самая частая ошибка: заказать тяжелую дверь в перегородку из ГКЛ без усиления. Стена начнет шататься и трескаться.
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Основные типы стен</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'concrete', t: 'Бетон / Блок', i: BrickWall},
               {id: 'drywall', t: 'ГКЛ', i: Layers},
               {id: 'sandwich', t: 'Сэндвич', i: Layers}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveWall(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeWall === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeWall].title}</h3>
             <p className="text-gray-600 mb-6">{CONTENT[activeWall].desc}</p>
             
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
               <h4 className="font-bold text-gray-800 mb-2">Особенности:</h4>
               <ul className="list-disc pl-5 space-y-2 mb-4">
                 {CONTENT[activeWall].features.map((f, i) => (
                   <li key={i} className="text-sm text-gray-700">{f}</li>
                 ))}
               </ul>
               <div className="bg-red-50 p-3 rounded text-sm text-red-800 border border-red-100">
                 <strong>Риск:</strong> {CONTENT[activeWall].risk}
               </div>
             </div>
           </div>
        </section>

        {/* QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
           </div>
           {!showQuizResult ? (
             <div className="p-6 space-y-6">
               {QUIZ.map((q, idx) => (
                 <div key={q.id}>
                   <h3 className="font-semibold text-gray-900 mb-2">{idx + 1}. {q.q}</h3>
                   <div className="space-y-2">
                     {q.opts.map((opt) => (
                       <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === opt.id ? 'bg-dorren-bg border-dorren-dark' : 'hover:bg-gray-50 border-gray-200'}`}>
                         <input type="radio" name={`q_${q.id}`} checked={quizAnswers[q.id] === opt.id} onChange={() => handleQuizSelect(q.id, opt.id)} className="text-dorren-dark focus:ring-dorren-light"/>
                         <span className="text-sm text-gray-700">{opt.t}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               ))}
               <button onClick={() => setShowQuizResult(true)} disabled={Object.keys(quizAnswers).length < QUIZ.length} className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90">Проверить</button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Результат: {calculateScore()}/{QUIZ.length}</h3>
                <div className="flex gap-4 justify-center mt-6">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">Заново</button>
                   <button onClick={() => onNavigate('lesson5.2')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
                      Следующий урок <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Узнайте тип стены до заказа дверей.',
               'ГКЛ требует усиления проема (закладные) на этапе стройки.',
               'Сэндвич-панели требуют специальных обжимных коробок.',
               'Тяжелая дверь на слабой стене — это гарантийный случай (отказ).'
             ].map((txt, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
        </section>

      </main>
    </div>
  );
};
