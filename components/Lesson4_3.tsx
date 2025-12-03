
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Shield, CheckCircle, PlusSquare, Map
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson4_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeAcc, setActiveAcc] = useState<'protect' | 'signs' | 'stops'>('protect');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const CONTENT = {
    protect: {
      title: 'Защита (Отбойники)',
      desc: 'Защищают полотно от ударов тележек, каталок, ног. Продлевают жизнь двери в разы.',
      types: [
        { t: 'Пластина HPL/INOX', d: 'Плоская накладка внизу (для ног/швабры) или по центру (для каталок).' },
        { t: 'Угловой профиль', d: 'Защищает кромку двери (самое слабое место).' },
        { t: 'Отбойная доска', d: 'Деревянная или пластиковая полоса на стене и двери.' }
      ]
    },
    signs: {
      title: 'Навигация и окна',
      desc: 'Помогают ориентироваться и обеспечивают безопасность (видно, что за дверью).',
      types: [
        { t: 'Смотровое окно', d: 'Контроль пациента или встречного потока.' },
        { t: 'Таблички/Пиктограммы', d: 'Номер палаты, знаки "Не входить", "Радиация".' },
        { t: 'Вентрешетка', d: 'Для циркуляции воздуха (санузлы, электрощитовые).' }
      ]
    },
    stops: {
      title: 'Упоры и фиксаторы',
      desc: 'Предотвращают удар двери о стену.',
      types: [
        { t: 'Напольный упор', d: 'Классика. Не дает двери удариться ручкой о стену.' },
        { t: 'Настенный упор', d: 'Если теплый пол и сверлить нельзя.' },
        { t: 'Фиксатор открывания', d: 'В доводчике или ножной (для проветривания).' }
      ]
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Зачем нужна пластина из нержавейки внизу двери?', 
      opts: [{id:'a', t:'Для красоты'}, {id:'b', t:'Защита от ударов ногами и шваброй'}, {id:'c', t:'Утяжелить дверь'}, {id:'d', t:'Заземление'}], 
      correct: 'b', 
      expl: 'Низ двери страдает чаще всего при уборке и эксплуатации.' 
    },
    { 
      id: 2, 
      q: 'Что защищает самое уязвимое место двери (торец)?', 
      opts: [{id:'a', t:'Угловой профиль'}, {id:'b', t:'Глазок'}, {id:'c', t:'Доводчик'}, {id:'d', t:'Наличник'}], 
      correct: 'a', 
      expl: 'Угловой профиль прикрывает кромку от сколов.' 
    },
    { 
      id: 3, 
      q: 'Где нужна вентиляционная решетка?', 
      opts: [{id:'a', t:'В кабинете директора'}, {id:'b', t:'В операционной'}, {id:'c', t:'В санузлах и техпомещениях'}, {id:'d', t:'На складе'}], 
      correct: 'c', 
      expl: 'Обеспечивает переток воздуха во влажных и технических зонах.' 
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
        lessonId="4.3" 
        title="Аксессуары и защита" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 4. Фурнитура
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 4.3. Аксессуары и защита</h1>
             <p className="text-xl text-gray-300 mb-8">
               Отбойники, стопоры, решетки. Как продлить жизнь двери и сэкономить на ремонте.
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
                <Shield size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Мелочи, которые берегут бюджет</h2>
           <p className="text-gray-700">
             Заказчик часто хочет сэкономить на отбойниках. Объясните: замена разбитого полотна через год обойдется в 10 раз дороже, чем полоса нержавейки сейчас.
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Виды аксессуаров</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'protect', t: 'Защита', i: Shield},
               {id: 'signs', t: 'Инфо / Окна', i: Map},
               {id: 'stops', t: 'Упоры', i: PlusSquare}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveAcc(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeAcc === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeAcc].title}</h3>
             <p className="text-gray-600 mb-6">{CONTENT[activeAcc].desc}</p>
             
             <div className="grid md:grid-cols-3 gap-4">
               {CONTENT[activeAcc].types.map((item, i) => (
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
                   <button onClick={() => onNavigate('lesson5.1')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
                      Начать Модуль 5 <ChevronRight size={16} />
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
               'Аксессуары берегут бюджет заказчика на эксплуатацию.',
               'Отбойники обязательны в медицине и ритейле.',
               'Упоры спасают стены и ручки.',
               'Вентрешетки нужны для циркуляции воздуха.'
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
