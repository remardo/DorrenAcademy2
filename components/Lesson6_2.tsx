
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  FileText, CheckCircle, AlertTriangle, Move, Flame
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson6_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeCheck, setActiveCheck] = useState<'width' | 'open' | 'fire'>('width');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  const CONTENT = {
    width: {
      title: 'Ширина проёма',
      norm: 'СП 1.13130: Ширина эвакуационного выхода должна быть не менее 0.8м (в чистоте).',
      impact: 'Дверное полотно 800мм не дает чистый проем 800мм (мешает коробка). Нужно полотно 900мм.',
    },
    open: {
      title: 'Направление открывания',
      norm: 'СП 1.13130: Двери на путях эвакуации должны открываться по направлению выхода из здания.',
      impact: 'Нельзя делать дверь "внутрь" комнаты, если там >15 человек. Это риск давки.',
    },
    fire: {
      title: 'Огнестойкость',
      norm: 'ФЗ-123: Противопожарные преграды должны соответствовать типу помещения.',
      impact: 'Дверь в электрощитовую, на лестницу, в лифтовый холл ОБЯЗАНА быть EI30/EI60.',
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Какая ширина полотна обычно дает чистый проем 800мм?', 
      opts: [{id:'a', t:'800мм'}, {id:'b', t:'900мм'}, {id:'c', t:'700мм'}, {id:'d', t:'600мм'}], 
      correct: 'b', 
      expl: 'Коробка съедает часть ширины. Полотно 900 -> Проем ~800.' 
    },
    { 
      id: 2, 
      q: 'Куда должна открываться дверь из конференц-зала (50 чел)?', 
      opts: [{id:'a', t:'Внутрь'}, {id:'b', t:'Наружу (по ходу эвакуации)'}, {id:'c', t:'Как красивее'}, {id:'d', t:'Вбок (раздвижная)'}], 
      correct: 'b', 
      expl: 'Массовое пребывание людей требует открывания наружу.' 
    },
    { 
      id: 3, 
      q: 'Что будет, если поставить обычную дверь вместо EI60?', 
      opts: [{id:'a', t:'Штраф и предписание о замене'}, {id:'b', t:'Ничего'}, {id:'c', t:'Экономия'}, {id:'d', t:'Премия'}], 
      correct: 'a', 
      expl: 'Это грубое нарушение пожарной безопасности.' 
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
  
  const handlePractice = (val: string) => {
      if(val === '900') setPracticeFeedback('Верно! Полотно 900мм даст световой проем около 800мм.');
      else setPracticeFeedback('Нет. Полотно 800мм даст проем около 700мм, что мало для эвакуации.');
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="6.2" 
        title="Влияние норм" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 6. Нормы
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 6.2. Влияние норм на выбор двери</h1>
             <p className="text-xl text-gray-300 mb-8">
               Ширина, открывание, огнестойкость. Как требования превращаются в характеристики продукта.
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
                <FileText size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Нормы диктуют характеристики</h2>
           <p className="text-gray-700">
             Мы не выбираем ширину двери "на глаз". Мы смотрим в СП и видим требование "не менее 1.2м". Мы не выбираем EI60 "на всякий случай", это требование пожарной карты.
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">3 главных параметра из норм</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'width', t: 'Ширина', i: Move},
               {id: 'open', t: 'Открывание', i: ArrowRight},
               {id: 'fire', t: 'Огнестойкость', i: Flame}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveCheck(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCheck === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in bg-gray-50 p-6 rounded-xl border border-gray-200">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeCheck].title}</h3>
             <p className="text-sm font-bold text-gray-800 mb-2">Норма:</p>
             <p className="text-gray-700 mb-4 bg-white p-3 rounded border border-gray-200">{CONTENT[activeCheck].norm}</p>
             <p className="text-sm font-bold text-dorren-dark mb-2">Влияние на продукт:</p>
             <p className="text-gray-700">{CONTENT[activeCheck].impact}</p>
           </div>
        </section>

        {/* PRACTICE */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Мини-тренировка</h2>
           <p className="text-gray-300 mb-6">Нужен чистый проем 800мм. Какое полотно брать?</p>
           <div className="flex gap-4">
              <button onClick={() => handlePractice('800')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold border border-white/20">800 мм</button>
              <button onClick={() => handlePractice('900')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold border border-white/20">900 мм</button>
           </div>
           {practiceFeedback && (
              <div className="mt-4 p-4 bg-white/10 rounded animate-fade-in">
                 {practiceFeedback}
              </div>
           )}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Результат: {calculateScore()}/{QUIZ.length}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 3 
                    ? 'Отлично! Вы видите связь между нормой и дверью.' 
                    : 'Рекомендуем повторить разделы про эвакуацию и огнестойкость.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button 
                     onClick={() => { setShowQuizResult(false); setQuizAnswers({}); setPracticeFeedback(null); }} 
                     className="text-gray-500 hover:text-dorren-dark px-4 py-2"
                   >
                     Пройти заново
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson6.3')}
                     className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2"
                   >
                     Следующий урок
                     <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 9. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Нормы — это не бюрократия, а инструкция по безопасности людей.',
               'Направление открывания на путях эвакуации должно быть «по ходу движения».',
               'Класс огнестойкости (EI) — это время, которое дверь сдерживает огонь.',
               'Минимальная ширина проёма критична для эвакуации и МГН.',
               'Если сомневаетесь в нормах — всегда зовите инженера Dorren.'
             ].map((txt, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
           <div className="text-center mt-6">
              <button 
               onClick={() => onNavigate('lesson6.3')}
               className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto"
             >
                Следующий урок: Коммуникация с заказчиком
                <ArrowRight size={16} />
             </button>
           </div>
        </section>

      </main>
    </div>
  );
};
