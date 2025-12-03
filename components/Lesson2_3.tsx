
import React, { useState } from 'react';
import { 
  Clock, ArrowRight, CheckCircle, HelpCircle, 
  Grip, Stethoscope, Shield, Droplets, Volume2, Users, Info
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson2_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [checklist, setChecklist] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const MAPPING_CARDS = [
    { id: 'ward', title: 'Палата', sub: 'Комфорт + Санитария', icon: '🛏️', logic: 'Тишина + HPL покрытие', solution: 'K-TYPE с усиленной кромкой, HPL, опция Rw' },
    { id: 'op', title: 'Операционная', sub: 'Чистота + Герметичность', icon: '😷', logic: 'Стерильность + Автоматика', solution: 'C-TYPE (нержавейка/HPL), герметичный контур' },
    { id: 'proc', title: 'Процедурная', sub: 'Гигиена + Ресурс', icon: '💉', logic: 'Моющиеся стены и двери', solution: 'Универсальная мед. дверь, влагостойкая' },
    { id: 'wc', title: 'Санузел', sub: 'Влага + Химия', icon: '🚿', logic: 'Вода + Агрессивная уборка', solution: 'Влагостойкая (Aqua), защищенный торец' },
    { id: 'tech', title: 'Подсобка', sub: 'Функция + Экономия', icon: '🧹', logic: 'Ресурс без переплат', solution: 'K-TYPE Lite / Техническая дверь' },
    { id: 'exit', title: 'Эвак. выход', sub: 'Огонь + Дым', icon: '🏃', logic: 'Безопасность людей', solution: 'EI60 / EIS60 + Антипаника + Доводчик' },
    { id: 'store', title: 'Склад', sub: 'Удары + Нагрузка', icon: '📦', logic: 'Механическая прочность', solution: 'Усиленная / Противопожарная (по категории)' },
    { id: 'xray', title: 'Рентген', sub: 'Радиация', icon: '☢️', logic: 'Защита Pb (свинец)', solution: 'Рентгенозащитная (0.5 - 2.5mm Pb)' },
  ];

  const MATRIX_ROWS = [
    { label: 'Палата', ei: 1, s: 1, rw: 3, h2o: 2, wear: 2, clean: 2 },
    { label: 'Операционная', ei: 1, s: 1, rw: 2, h2o: 3, wear: 2, clean: 3 },
    { label: 'Эвак. выход', ei: 3, s: 3, rw: 1, h2o: 1, wear: 3, clean: 1 },
    { label: 'Санузел', ei: 1, s: 1, rw: 2, h2o: 3, wear: 2, clean: 2 },
  ];

  const SCENARIOS = [
    { 
      id: 1, 
      text: 'Новый корпус. Палата VIP. Рядром шумный коридор. Нужна тишина и гигиена.',
      opts: [
        { id: 'a', t: 'Техническая дверь', f: false, fb: 'Слишком просто, нет звукоизоляции.' },
        { id: 'b', t: 'K-TYPE (HPL) + Rw 38dB', f: true, fb: 'Верно! HPL для гигиены, Rw для комфорта.' },
        { id: 'c', t: 'Металлическая дверь', f: false, fb: 'Слишком индустриально для палаты.' }
      ]
    },
    { 
      id: 2, 
      text: 'Путь эвакуации из стационара на лестницу.',
      opts: [
        { id: 'a', t: 'Обычная распашная', f: false, fb: 'Нарушение норм пожарной безопасности.' },
        { id: 'b', t: 'Рентгенозащитная', f: false, fb: 'Избыточно и дорого.' },
        { id: 'c', t: 'EI60 + Антипаника', f: true, fb: 'Правильно. Защита от огня и быстрый выход.' }
      ]
    },
    { 
      id: 3, 
      text: 'Вход в рентген-кабинет.',
      opts: [
        { id: 'a', t: 'Дверь с Pb (свинцом)', f: true, fb: 'Да, свинец задерживает излучение.' },
        { id: 'b', t: 'Стеклянная дверь', f: false, fb: 'Стекло не задерживает рентген (без Pb).' },
        { id: 'c', t: 'Противопожарная', f: false, fb: 'EI не защищает от радиации.' }
      ]
    }
  ];

  const QUIZ = [
    { id: 1, q: 'Где критична герметичность и автоматика?', opts: [{id:'a', t:'Склад'}, {id:'b', t:'Операционная'}, {id:'c', t:'Кабинет'}, {id:'d', t:'Санузел'}], correct: 'b', expl: 'Чистые помещения требуют изоляции среды.' },
    { id: 2, q: 'Что главное для эвакуационного выхода?', opts: [{id:'a', t:'Дизайн'}, {id:'b', t:'Звукоизоляция'}, {id:'c', t:'EI + Антипаника'}, {id:'d', t:'Влагостойкость'}], correct: 'c', expl: 'Спасение жизней при пожаре.' },
    { id: 3, q: 'Базовый приоритет для санузла?', opts: [{id:'a', t:'Влагостойкость'}, {id:'b', t:'Рентген-защита'}, {id:'c', t:'Огнестойкость'}, {id:'d', t:'Звук 42dB'}], correct: 'a', expl: 'Агрессивная влажная среда.' },
    { id: 4, q: 'Спец. требование для рентген-кабинета?', opts: [{id:'a', t:'Вентиляция'}, {id:'b', t:'Свинец (Pb)'}, {id:'c', t:'Усиленные петли'}, {id:'d', t:'Окно в пол'}], correct: 'b', expl: 'Защита персонала от ионизирующего излучения.' },
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  const handleChecklist = (idx: number) => {
    setChecklist(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="2.3" 
        title="Маппинг помещений" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. Hero */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dorren-light/5 -skew-x-12"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 2. Ассортимент и типология
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 2.3. Маппинг: тип помещения → тип двери
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Переводим «палату» и «склад» в технические требования. Учимся подбирать решение не глядя в каталог.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                 <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                 <div className="flex items-center gap-2"><Grip size={16}/> Матрица подбора</div>
                 <div className="flex items-center gap-2"><Stethoscope size={16}/> Фокус: Медицина</div>
              </div>

              <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                Посмотреть маппинг
                <ArrowRight size={18} />
              </button>
           </div>
           
           <div className="md:w-1/2 w-full flex justify-center">
              {/* Abstract Plan */}
              <div className="bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl w-full max-w-md aspect-video relative grid grid-cols-3 grid-rows-2 gap-2">
                 <div className="bg-dorren-light/20 rounded flex items-center justify-center text-xs text-dorren-light font-mono">Палата</div>
                 <div className="bg-dorren-light/20 rounded flex items-center justify-center text-xs text-dorren-light font-mono">Палата</div>
                 <div className="bg-red-500/20 rounded flex items-center justify-center text-xs text-red-200 font-mono row-span-2">Эвакуация</div>
                 <div className="bg-blue-500/20 rounded flex items-center justify-center text-xs text-blue-200 font-mono">Санузел</div>
                 <div className="bg-green-500/20 rounded flex items-center justify-center text-xs text-green-200 font-mono">Чистая зона</div>
                 
                 {/* Door icons */}
                 <div className="absolute top-1/2 left-[33%] w-1 h-6 bg-white -translate-y-1/2"></div>
                 <div className="absolute top-1/2 left-[66%] w-1 h-6 bg-red-400 -translate-y-1/2"></div>
              </div>
           </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. Intro */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем нужен маппинг</h2>
           <p className="text-gray-700 mb-6 leading-relaxed">
             Заказчик говорит «Палата» — вы слышите «HPL, Rw38, отбойник». Заказчик говорит «Склад» — вы слышите «Техническая дверь, усиленная».
             Это ментальная таблица, которая ускоряет работу в разы.
           </p>

           <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
              <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
                 <HelpCircle size={18} /> Как вы действуете сейчас?
              </h3>
              <div className="space-y-2 mb-4">
                 {[
                   'Спрашиваю у коллег',
                   'Ищу похожий старый проект',
                   'Листаю каталог наугад',
                   'Есть своя «табличка в голове»'
                 ].map((t, i) => (
                   <label key={i} className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checklist.includes(i) ? 'bg-dorren-dark border-dorren-dark text-white' : 'bg-white border-gray-300'}`}>
                         {checklist.includes(i) && <CheckCircle size={14} />}
                         <input type="checkbox" className="hidden" onChange={() => handleChecklist(i)} checked={checklist.includes(i)} />
                      </div>
                      <span className="text-sm text-gray-700">{t}</span>
                   </label>
                 ))}
              </div>
              {checklist.length > 0 && <p className="text-xs text-dorren-dark italic animate-fade-in">Давайте систематизируем этот опыт.</p>}
           </div>
        </section>

        {/* 3. Principles */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">4 вопроса перед выбором</h2>
           <div className="grid md:grid-cols-4 gap-4">
              {[
                { i: Shield, t: 'Безопасность', d: 'Огонь (EI)? Дым? Эвакуация?' },
                { i: Droplets, t: 'Среда', d: 'Влага? Химия? Чистое помещение?' },
                { i: Volume2, t: 'Комфорт', d: 'Нужна ли тишина (Rw)?' },
                { i: Users, t: 'Трафик', d: 'Тележки? Удары? Автоматика?' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-all">
                   <div className="w-12 h-12 bg-dorren-bg text-dorren-dark rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.i size={24} />
                   </div>
                   <h3 className="font-bold text-gray-900 mb-2">{item.t}</h3>
                   <p className="text-sm text-gray-500">{item.d}</p>
                </div>
              ))}
           </div>
        </section>

        {/* 4. Cards Mapping */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Маппинг по типам помещений</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {MAPPING_CARDS.map((card) => (
                 <button 
                   key={card.id}
                   onClick={() => setActiveCard(card.id)}
                   className={`p-4 rounded-xl border text-left transition-all h-full flex flex-col ${activeCard === card.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg ring-2 ring-offset-2 ring-dorren-light' : 'bg-white text-gray-900 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                    <p className={`text-xs uppercase tracking-wide mb-auto ${activeCard === card.id ? 'text-dorren-light' : 'text-gray-500'}`}>{card.sub}</p>
                    
                    {activeCard === card.id && (
                       <div className="mt-4 pt-4 border-t border-white/20 animate-fade-in">
                          <p className="text-sm mb-2"><strong className="text-dorren-light">Логика:</strong> {card.logic}</p>
                          <p className="text-sm"><strong>Решение:</strong> {card.solution}</p>
                       </div>
                    )}
                 </button>
              ))}
           </div>
           {!activeCard && (
              <p className="text-center text-gray-400 mt-4 text-sm italic">Нажмите на карточку, чтобы увидеть решение</p>
           )}
        </section>

        {/* 5. Matrix */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Матрица параметров</h2>
           <table className="w-full min-w-[600px] text-sm text-left">
              <thead>
                 <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-3 font-medium">Помещение</th>
                    <th className="py-3 font-medium text-center">Огонь (EI)</th>
                    <th className="py-3 font-medium text-center">Дым (S)</th>
                    <th className="py-3 font-medium text-center">Звук (Rw)</th>
                    <th className="py-3 font-medium text-center">Влага</th>
                    <th className="py-3 font-medium text-center">Износ</th>
                    <th className="py-3 font-medium text-center">Чистота</th>
                 </tr>
              </thead>
              <tbody>
                 {MATRIX_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                       <td className="py-4 font-bold text-dorren-dark">{row.label}</td>
                       {[row.ei, row.s, row.rw, row.h2o, row.wear, row.clean].map((val, idx) => (
                          <td key={idx} className="text-center">
                             <div className={`w-3 h-3 rounded-full mx-auto ${val === 3 ? 'bg-red-500' : val === 2 ? 'bg-dorren-light' : 'bg-gray-200'}`} title={val === 3 ? 'Критично' : val === 2 ? 'Важно' : 'Базово'}></div>
                          </td>
                       ))}
                    </tr>
                 ))}
              </tbody>
           </table>
           <div className="flex gap-4 mt-4 text-xs text-gray-500 justify-end">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Критично</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-dorren-light"></div> Важно</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200"></div> Не ключевое</div>
           </div>
        </section>

        {/* 6. Scenarios */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Тренировка: Подберите дверь</h2>
           
           <div className="space-y-8">
              {SCENARIOS.map((scen) => (
                 <div key={scen.id} className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-lg mb-4 flex gap-2">
                       <Info className="text-dorren-light shrink-0" />
                       {scen.text}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-3">
                       {scen.opts.map((opt) => (
                          <button 
                            key={opt.id}
                            onClick={() => setActiveScenario(scen.id * 10 + (opt.id.charCodeAt(0)))}
                            className={`p-3 rounded text-sm text-left transition-all ${activeScenario === (scen.id * 10 + opt.id.charCodeAt(0)) ? (opt.f ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500') : 'bg-white/10 hover:bg-white/20 border-transparent'} border`}
                          >
                             <div className="font-bold mb-1">{opt.t}</div>
                             {activeScenario === (scen.id * 10 + opt.id.charCodeAt(0)) && (
                                <div className={`text-xs ${opt.f ? 'text-green-300' : 'text-red-300'}`}>{opt.fb}</div>
                             )}
                          </button>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 7. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка маппинга</h2>
             <p className="text-gray-600 text-sm">4 вопроса.</p>
           </div>
           
           {!showQuizResult ? (
             <div className="p-6 space-y-8">
               {QUIZ.map((q, idx) => (
                 <div key={q.id}>
                   <h3 className="font-semibold text-gray-900 mb-3">{idx + 1}. {q.q}</h3>
                   <div className="space-y-2">
                     {q.opts.map((opt) => (
                       <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === opt.id ? 'bg-dorren-bg border-dorren-dark' : 'hover:bg-gray-50 border-gray-200'}`}>
                         <input 
                           type="radio" 
                           name={`q_${q.id}`} 
                           checked={quizAnswers[q.id] === opt.id}
                           onChange={() => handleQuizSelect(q.id, opt.id)}
                           className="text-dorren-dark focus:ring-dorren-light"
                         />
                         <span className="text-sm text-gray-700">{opt.t}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               ))}
               
               <button 
                 onClick={() => setShowQuizResult(true)}
                 disabled={Object.keys(quizAnswers).length < QUIZ.length}
                 className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90 transition-all"
               >
                 Проверить
               </button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Результат: {calculateScore()}/{QUIZ.length}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 3 
                    ? 'Отлично! Вы готовы подбирать двери.' 
                    : 'Попробуйте пройти раздел с карточками еще раз.'}
                </p>
                <button 
                  onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} 
                  className="text-dorren-dark hover:underline font-medium"
                >
                  Пройти заново
                </button>
             </div>
           )}
        </section>

        {/* 8. Summary */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
           <ul className="space-y-2 mb-6">
             {[
               'Начинаем с функции помещения, а не с каталога.',
               'Палаты = Комфорт + Гигиена.',
               'Операционные = Стерильность + Герметичность.',
               'Эвакуация = Огонь + Дым + Антипаника.',
               'Санузлы = Влага + Химия.',
               'Задача: быстро перевести «комнату» в «набор свойств».'
             ].map((txt, i) => (
               <li key={i} className="flex gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
           <div className="text-center">
             <button 
               className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2 mx-auto"
             >
                Следующий урок: Конструкция (Скоро)
                <ArrowRight size={16} />
             </button>
             <p className="text-xs text-gray-400 mt-2">Модуль 3: Технический конструктив</p>
           </div>
        </section>

      </main>
    </div>
  );
};
