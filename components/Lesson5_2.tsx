
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Frame, CheckCircle, PenTool
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson5_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeNode, setActiveNode] = useState<'classic' | 'flush' | 'portal'>('classic');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const CONTENT = {
    classic: {
      title: 'Классическое обрамление',
      desc: 'Коробка + Наличники с двух сторон. Закрывает монтажный шов.',
      features: ['Скрывает неровности проема.', 'Телескопические наличники регулируются по толщине стены.', 'Самый популярный вариант.'],
    },
    flush: {
      title: 'Скрытый короб (Invisible)',
      desc: 'Дверь в одной плоскости со стеной. Без наличников.',
      features: ['Монтируется ДО чистовой отделки.', 'Требует идеальных стен.', 'Эффект "невидимки".'],
    },
    portal: {
      title: 'Обхватной (Портал)',
      desc: 'Для толстых стен. Коробка + Добор + Наличник.',
      features: ['Закрывает всю толщину стены.', 'Защищает откосы.', 'Солидный вид.'],
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Когда монтируется скрытый короб?', 
      opts: [{id:'a', t:'В самом конце'}, {id:'b', t:'До чистовой отделки стен'}, {id:'c', t:'Вместе с мебелью'}, {id:'d', t:'В любой момент'}], 
      correct: 'b', 
      expl: 'Его нужно зашпаклевать в стену.' 
    },
    { 
      id: 2, 
      q: 'Зачем нужен телескопический наличник?', 
      opts: [{id:'a', t:'Чтобы выдвигаться как телескоп'}, {id:'b', t:'Чтобы компенсировать небольшую разницу в толщине стены'}, {id:'c', t:'Для красоты'}, {id:'d', t:'Для вентиляции'}], 
      correct: 'b', 
      expl: 'Ножка наличника входит в паз и может двигаться.' 
    },
    { 
      id: 3, 
      q: 'Что делать, если стена очень толстая?', 
      opts: [{id:'a', t:'Ставить добор'}, {id:'b', t:'Красить откос'}, {id:'c', t:'Ломать стену'}, {id:'d', t:'Ничего'}], 
      correct: 'a', 
      expl: 'Доборный элемент позволяет перекрыть любую толщину стены.' 
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
        lessonId="5.2" 
        title="Узлы примыкания" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 5. Узлы примыкания
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 5.2. Как оформить проём</h1>
             <p className="text-xl text-gray-300 mb-8">
               Наличники, доборы, скрытый монтаж. Как сделать красиво и технологично.
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
                <Frame size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Стык стены и двери</h2>
           <p className="text-gray-700">
             Это место всегда проблемное: пена, неровный край обоев или штукатурки. Задача узла — скрыть технологический зазор.
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Варианты оформления</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'classic', t: 'Наличники', i: Frame},
               {id: 'flush', t: 'Скрытый', i: PenTool},
               {id: 'portal', t: 'Портал', i: Frame}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveNode(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeNode === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeNode].title}</h3>
             <p className="text-gray-600 mb-6">{CONTENT[activeNode].desc}</p>
             
             <ul className="space-y-3 mb-6">
               {CONTENT[activeNode].features.map((f, i) => (
                 <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                   <CheckCircle size={16} className="text-green-600 shrink-0 mt-0.5" />
                   {f}
                 </li>
               ))}
             </ul>
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
                   <button onClick={() => onNavigate('lesson5.3')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
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
               'Наличники — самый простой способ закрыть шов.',
               'Скрытые двери требуют раннего монтажа и высокой квалификации строителей.',
               'Толстые стены закрываются доборами.',
               'Всегда меряйте толщину стены в нескольких точках.'
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
