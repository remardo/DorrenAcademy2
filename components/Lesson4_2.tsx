
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  ShieldAlert, Move, Unlock, CheckCircle
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson4_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeTool, setActiveTool] = useState<'closer' | 'panic' | 'acs'>('closer');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const CONTENT = {
    closer: {
      title: 'Доводчики',
      desc: 'Обязательны для противопожарных дверей (чтобы закрыть дверь при пожаре). Обеспечивают плавность и контроль доступа.',
      types: [
        { t: 'Рычажная тяга', d: 'Классика ("колено"). Надежно, дешево, но торчит.' },
        { t: 'Скользящая шина', d: 'Аккуратно, не выступает. Эстетичный вариант.' },
        { t: 'Скрытый', d: 'Врезан в полотно. Невидим. Для премиум-объектов.' }
      ]
    },
    panic: {
      title: 'Система «Антипаника»',
      desc: 'Позволяет открыть запертую дверь изнутри нажатием тела на штангу. Спасает жизни при эвакуации.',
      types: [
        { t: 'Накладная штанга', d: 'Быстрый монтаж. Видна на полотне.' },
        { t: 'Врезная штанга', d: 'Механизм внутри двери. Видна только нажимная планка.' }
      ]
    },
    acs: {
      title: 'СКУД (Доступ)',
      desc: 'Электронное управление дверью. Карты, биометрия, кнопки.',
      types: [
        { t: 'Электрозащелка', d: 'Бюджетно. Удерживает "язычок" замка.' },
        { t: 'Электромагнит', d: 'Держит дверь магнитом. При пожаре отключается.' },
        { t: 'Электромоторный', d: 'Ригели выдвигаются мотором. Макс. взломостойкость.' }
      ]
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Зачем нужен доводчик на противопожарной двери?', 
      opts: [{id:'a', t:'Чтобы не хлопала'}, {id:'b', t:'Чтобы дверь гарантированно закрылась и отсекла огонь'}, {id:'c', t:'Для красоты'}, {id:'d', t:'Для удобства'}], 
      correct: 'b', 
      expl: 'Открытая дверь не защитит от пожара. Доводчик ее закрывает.' 
    },
    { 
      id: 2, 
      q: 'Как работает «Антипаника»?', 
      opts: [{id:'a', t:'Открывает дверь снаружи ключом'}, {id:'b', t:'Блокирует дверь'}, {id:'c', t:'Открывает изнутри нажатием на штангу даже если заперто'}, {id:'d', t:'Включает сирену'}], 
      correct: 'c', 
      expl: 'Обеспечивает беспрепятственный выход при эвакуации.' 
    },
    { 
      id: 3, 
      q: 'Какой доводчик самый незаметный?', 
      opts: [{id:'a', t:'Рычажный'}, {id:'b', t:'Скрытый'}, {id:'c', t:'Напольный'}, {id:'d', t:'Скользящий'}], 
      correct: 'b', 
      expl: 'Скрытый доводчик врезается в торец полотна и коробку.' 
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
        lessonId="4.2" 
        title="Специальная фурнитура" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 4. Фурнитура
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 4.2. Фурнитура для специальных задач</h1>
             <p className="text-xl text-gray-300 mb-8">
               Безопасность, автоматизация и доступная среда. Доводчики, антипаника, СКУД.
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
                <ShieldAlert size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Больше чем просто "открыть/закрыть"</h2>
           <p className="text-gray-700">
             Спецфурнитура превращает дверь в инженерную систему. Она спасает жизни (Антипаника), бережет тепло (Доводчик) и контролирует вход (СКУД).
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Типы спецфурнитуры</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'closer', t: 'Доводчики', i: Move},
               {id: 'panic', t: 'Антипаника', i: ShieldAlert},
               {id: 'acs', t: 'СКУД', i: Unlock}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTool(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTool === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeTool].title}</h3>
             <p className="text-gray-600 mb-6">{CONTENT[activeTool].desc}</p>
             
             <div className="grid md:grid-cols-3 gap-4">
               {CONTENT[activeTool].types.map((item, i) => (
                 <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                   <h4 className="font-bold text-gray-800 mb-2">{item.t}</h4>
                   <p className="text-sm text-gray-600">{item.d}</p>
                 </div>
               ))}
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
                   <button onClick={() => onNavigate('lesson4.3')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
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
               'Доводчик обязателен на противопожарных дверях.',
               'Антипаника обеспечивает быструю эвакуацию.',
               'СКУД требует электромеханических замков или защелок.',
               'Выбор фурнитуры — это вопрос безопасности, а не только цены.'
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
