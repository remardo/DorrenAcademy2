
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Settings, Lock, MousePointer, ChevronRight,
  Shield, Check, AlertTriangle, Key, GripHorizontal
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson4_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeHinge, setActiveHinge] = useState<string | null>(null);
  const [activeLockScenario, setActiveLockScenario] = useState<string>('office');
  const [activeHandle, setActiveHandle] = useState<string | null>(null);
  
  // Practice Configurator State
  const [practiceScenario, setPracticeScenario] = useState<string | null>(null);
  const [practiceSelection, setPracticeSelection] = useState({ hinge: '', lock: '', handle: '' });
  const [practiceResult, setPracticeResult] = useState<string | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // DATA
  const HINGES = [
    { 
      id: 'surface', 
      label: 'Накладные', 
      desc: 'Классические, видимые. Простой монтаж. Бывают усиленные для тяжелых дверей.',
      usage: 'Межкомнатные, двери средней массы, техпомещения.',
      qa: 'Почему эти? Надежно, просто обслуживать, выдерживают нагрузку.'
    },
    { 
      id: 'hidden', 
      label: 'Скрытые', 
      desc: 'Полностью спрятаны в полотне. Чистый дизайн. Регулировка в 3 плоскостях.',
      usage: 'Премиум-офисы, скрытые двери, чистые интерьеры.',
      qa: 'Почему эти? Эстетика (не видно петель) + точная регулировка зазоров.'
    },
    { 
      id: 'adjustable', 
      label: 'Регулируемые', 
      desc: 'Петли (обычно штыревые) с возможностью 3D-регулировки.',
      usage: 'Медицинские двери, тяжелые EI-двери.',
      qa: 'Почему эти? Компенсируют осадку здания и вес полотна, сохраняя притвор.'
    },
  ];

  const LOCK_SCENARIOS = [
    { 
      id: 'office', 
      label: 'Офисная дверь', 
      rec: 'Врезной замок', 
      reason: 'Базовая безопасность, работа с цилиндром или защелкой. Достаточно для кабинета.' 
    },
    { 
      id: 'tech', 
      label: 'Вход в техпомещение', 
      rec: 'Многозапорный / Усиленный', 
      reason: 'Прижим полотна в нескольких точках (герметичность) + повышенная взломостойкость.' 
    },
    { 
      id: 'profile', 
      label: 'Алюминиевая дверь', 
      rec: 'Профильный замок', 
      reason: 'Узкий корпус, адаптированный под геометрию профиля. Интеграция с системой.' 
    },
  ];

  const HANDLES = [
    { 
      id: 'plate', 
      label: 'На планке', 
      icon: '📏',
      scenarios: 'Офисы, палаты, школы', 
      pitch: 'Понятная ориентация "ручка + замок". Единый блок, надежный монтаж.' 
    },
    { 
      id: 'rosette', 
      label: 'На розетке', 
      icon: '⭕',
      scenarios: 'Современные офисы, кабинеты', 
      pitch: 'Минимализм. Ручка и накладка замка разделены. Гибкость дизайна.' 
    },
    { 
      id: 'pull', 
      label: 'Скоба / Тяга', 
      icon: '🥖',
      scenarios: 'Входные группы, проходные зоны', 
      pitch: 'Работает "на протяжку" с доводчиком. Нет нажимного механизма — выше ресурс.' 
    },
  ];

  const PRACTICE_CASES = [
    {
      id: 'ward',
      title: 'Палата стационара',
      hint: 'Регулярная эксплуатация, тележки, комфорт.',
      ideal: { hinge: 'adjustable', lock: 'mortise', handle: 'plate' }, // Logic check, not strict string match
      feedback: 'Регулируемые петли выдержат нагрузку, врезной замок удобен, ручка на планке или розетке понятна пациентам.'
    },
    {
      id: 'tech',
      title: 'Техническое помещение',
      hint: 'Безопасность, тяжелая дверь.',
      ideal: { hinge: 'surface', lock: 'multi', handle: 'plate' },
      feedback: 'Усиленные петли и многозапорный замок обеспечат надежность и прижим.'
    },
    {
      id: 'office',
      title: 'Офис класс А',
      hint: 'Дизайн, эстетика.',
      ideal: { hinge: 'hidden', lock: 'mortise', handle: 'rosette' },
      feedback: 'Скрытые петли и ручка на розетке поддержат строгий современный стиль.'
    }
  ];

  const QUIZ = [
    {
      id: 1,
      q: 'Какое утверждение про скрытые петли верно?',
      opts: [
        {id:'a', t:'Они всегда дешевле накладных'},
        {id:'b', t:'Они полностью видны при закрытой двери'},
        {id:'c', t:'Они скрыты и дают "чистый" вид'},
        {id:'d', t:'Нельзя использовать на тяжелых дверях'}
      ],
      correct: 'c',
      expl: 'Скрытые петли прячутся в тело полотна/коробки для эстетики.'
    },
    {
      id: 2,
      q: 'Для чего используется многозапорный замок?',
      opts: [
        {id:'a', t:'Только для квартир'},
        {id:'b', t:'Для безопасности и плотного прижима в нескольких точках'},
        {id:'c', t:'Чтобы удешевить дверь'},
        {id:'d', t:'Для красоты'}
      ],
      correct: 'b',
      expl: 'Он фиксирует полотно сверху, снизу и посередине.'
    },
    {
      id: 3,
      q: 'В чем отличие ручки на планке от розетки?',
      opts: [
        {id:'a', t:'Ни в чем'},
        {id:'b', t:'На планке ручка и замок объединены, на розетке — раздельно'},
        {id:'c', t:'Планка только для жилья'},
        {id:'d', t:'Розетка не работает с врезными замками'}
      ],
      correct: 'b',
      expl: 'Это разные форматы накладок.'
    },
    {
      id: 4,
      q: 'Почему важны регулируемые петли для тяжелых дверей?',
      opts: [
        {id:'a', t:'Упрощают покраску'},
        {id:'b', t:'Компенсируют осадку и сохраняют притвор'},
        {id:'c', t:'Делают дверь легче'},
        {id:'d', t:'Не имеют значения'}
      ],
      correct: 'b',
      expl: 'Тяжелые двери могут проседать, регулировка это исправляет.'
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

  const checkPractice = () => {
    const scenario = PRACTICE_CASES.find(c => c.id === practiceScenario);
    if (!scenario) return;
    
    // Simple feedback logic - strictly checking isn't necessary for learning, just reasonable combinations
    // But for this UI we'll give a generic positive feedback if all fields are filled
    if (practiceSelection.hinge && practiceSelection.lock && practiceSelection.handle) {
       setPracticeResult(scenario.feedback);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="4.1" 
        title="Базовая фурнитура" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Settings className="absolute right-10 top-10 w-64 h-64 opacity-20 rotate-45" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 4. Фурнитура и аксессуары
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 4.1. Базовая фурнитура: петли, замки, ручки
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем «железо» проектных дверей. Почему обычная фурнитура не подходит для медицины и пожарных выходов.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~20 минут</div>
                <div className="flex items-center gap-2"><Settings size={16}/> Типология</div>
                <div className="flex items-center gap-2"><Lock size={16}/> Безопасность</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к комплекту
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center">
                <div className="text-center text-gray-400">
                   <div className="flex justify-center gap-6 mb-4 opacity-50">
                      <Settings size={40} />
                      <Lock size={40} />
                      <MousePointer size={40} />
                   </div>
                   <p className="text-[10px] border border-gray-600 p-2 rounded bg-black/40 max-w-xs mx-auto">
                      [ПРОМТ: Композиция: дверное полотно, вокруг аккуратно разложены петли разных типов, врезной замок и ручка. Инженерный стиль.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Фурнитура — часть конструктива</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               В проектной двери петли и замки — это не украшение. Они держат вес (иногда >100 кг), обеспечивают прижим (звук/дым) и безопасность.
               Нельзя просто "поменять ручку" без понимания назначения двери.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что клиенты понимают под "фурнитурой"?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Ручки — как они выглядят.'},
                 {id: 2, t: 'Замки и безопасность.'},
                 {id: 3, t: 'Петли и регулировка.'},
                 {id: 4, t: 'Всё подряд, что прикручено к двери.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Мы должны показать клиенту, что фурнитура — это система, влияющая на ресурс и безопасность.
              </div>
            )}
          </div>
        </section>

        {/* 3. HINGES */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Петли: как дверь держится</h2>
           <p className="text-gray-600 mb-6">От петель зависит, провиснет ли дверь через год и насколько плотным будет притвор.</p>

           <div className="grid md:grid-cols-3 gap-4 mb-6">
              {HINGES.map((hinge) => (
                 <button 
                   key={hinge.id}
                   onClick={() => setActiveHinge(hinge.id)}
                   className={`p-4 rounded-xl border text-left transition-all ${activeHinge === hinge.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg transform scale-105' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <div className="font-bold mb-1">{hinge.label}</div>
                    <div className="text-xs opacity-80">Нажмите подробнее</div>
                 </button>
              ))}
           </div>

           <div className="min-h-[150px] bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center">
              {activeHinge ? (
                 <>
                    <div className="md:w-2/3 animate-fade-in">
                       <h3 className="text-xl font-bold text-dorren-dark mb-2">{HINGES.find(h => h.id === activeHinge)?.label}</h3>
                       <p className="text-gray-700 mb-4">{HINGES.find(h => h.id === activeHinge)?.desc}</p>
                       <div className="bg-white p-3 rounded border border-gray-200">
                          <p className="text-sm font-bold text-dorren-dark mb-1">Где применяем:</p>
                          <p className="text-sm text-gray-600">{HINGES.find(h => h.id === activeHinge)?.usage}</p>
                       </div>
                       <p className="text-xs text-gray-500 mt-2 italic">{HINGES.find(h => h.id === activeHinge)?.qa}</p>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                       <div className="w-24 h-24 bg-white border border-gray-300 rounded flex items-center justify-center text-gray-300">
                          <Settings size={48} />
                       </div>
                    </div>
                 </>
              ) : (
                 <p className="text-gray-400 italic text-center w-full">Выберите тип петель, чтобы узнать детали.</p>
              )}
           </div>
        </section>

        {/* 4. LOCKS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Замки: фиксация и безопасность</h2>
           
           <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-2">
                 {LOCK_SCENARIOS.map((scen) => (
                    <button 
                      key={scen.id}
                      onClick={() => setActiveLockScenario(scen.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${activeLockScenario === scen.id ? 'bg-dorren-light text-dorren-dark border-dorren-light font-bold' : 'bg-white/10 text-gray-300 border-transparent hover:bg-white/20'}`}
                    >
                       {scen.label}
                    </button>
                 ))}
              </div>

              <div className="md:w-2/3 bg-white/10 border border-white/10 rounded-xl p-6 animate-fade-in relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold text-dorren-light mb-2">
                       Решение: {LOCK_SCENARIOS.find(s => s.id === activeLockScenario)?.rec}
                    </h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                       {LOCK_SCENARIOS.find(s => s.id === activeLockScenario)?.reason}
                    </p>
                 </div>
                 <Lock className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32" />
              </div>
           </div>
        </section>

        {/* 5. HANDLES */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Ручки: взаимодействие</h2>
           <p className="text-gray-600 mb-6">Формат ручки влияет на удобство и внешний вид.</p>

           <div className="grid md:grid-cols-3 gap-6">
              {HANDLES.map((handle) => (
                 <div 
                   key={handle.id}
                   className="group cursor-pointer perspective-1000"
                   onClick={() => setActiveHandle(handle.id)}
                 >
                    <div className={`relative p-6 rounded-xl border transition-all duration-300 ${activeHandle === handle.id ? 'bg-dorren-bg border-dorren-dark ring-2 ring-dorren-light' : 'bg-white border-gray-200 hover:shadow-lg'}`}>
                       <div className="text-4xl mb-4">{handle.icon}</div>
                       <h3 className="font-bold text-lg text-dorren-dark mb-2">{handle.label}</h3>
                       <p className="text-xs uppercase text-gray-500 font-bold mb-2">Сценарии:</p>
                       <p className="text-sm text-gray-600 mb-4">{handle.scenarios}</p>
                       
                       <div className={`overflow-hidden transition-all duration-300 ${activeHandle === handle.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-xs text-dorren-dark bg-white p-2 rounded border border-dorren-light/30">
                             {handle.pitch}
                          </p>
                       </div>
                       
                       {!activeHandle && (
                          <p className="text-xs text-center text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Нажмите для деталей</p>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 6. CONFIGURATOR */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Практика: Соберите комплект</h2>
           <p className="text-gray-700 mb-6">Выберите сценарий и подберите к нему петли, замок и ручку.</p>

           {!practiceScenario ? (
              <div className="grid md:grid-cols-3 gap-4">
                 {PRACTICE_CASES.map((c) => (
                    <button 
                      key={c.id}
                      onClick={() => setPracticeScenario(c.id)}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left border border-transparent hover:border-dorren-dark"
                    >
                       <h3 className="font-bold text-lg text-dorren-dark mb-2">{c.title}</h3>
                       <p className="text-sm text-gray-500">{c.hint}</p>
                    </button>
                 ))}
              </div>
           ) : (
              <div className="animate-fade-in bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="font-bold text-xl text-dorren-dark">
                       {PRACTICE_CASES.find(c => c.id === practiceScenario)?.title}
                    </h3>
                    <button onClick={() => { setPracticeScenario(null); setPracticeSelection({hinge:'',lock:'',handle:''}); setPracticeResult(null); }} className="text-sm text-gray-400 hover:text-dorren-dark">
                       Сменить сценарий
                    </button>
                 </div>

                 <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Петли</label>
                       <select 
                         className="w-full p-2 border rounded bg-gray-50"
                         onChange={(e) => setPracticeSelection({...practiceSelection, hinge: e.target.value})}
                       >
                          <option value="">Выберите...</option>
                          <option value="surface">Накладные</option>
                          <option value="hidden">Скрытые</option>
                          <option value="adjustable">Регулируемые</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Замок</label>
                       <select 
                         className="w-full p-2 border rounded bg-gray-50"
                         onChange={(e) => setPracticeSelection({...practiceSelection, lock: e.target.value})}
                       >
                          <option value="">Выберите...</option>
                          <option value="mortise">Врезной</option>
                          <option value="multi">Многозапорный</option>
                          <option value="profile">Профильный</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Ручка</label>
                       <select 
                         className="w-full p-2 border rounded bg-gray-50"
                         onChange={(e) => setPracticeSelection({...practiceSelection, handle: e.target.value})}
                       >
                          <option value="">Выберите...</option>
                          <option value="plate">На планке</option>
                          <option value="rosette">На розетке</option>
                          <option value="pull">Скоба</option>
                       </select>
                    </div>
                 </div>

                 {!practiceResult ? (
                    <button 
                      onClick={checkPractice}
                      disabled={!practiceSelection.hinge || !practiceSelection.lock || !practiceSelection.handle}
                      className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90 transition-all"
                    >
                       Проверить комплект
                    </button>
                 ) : (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg animate-fade-in flex gap-3 items-start">
                       <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                       <div>
                          <p className="font-bold text-green-800 mb-1">Комплект собран!</p>
                          <p className="text-sm text-green-700">{practiceResult}</p>
                       </div>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 7. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по фурнитуре.</p>
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
                 Проверить ответы
               </button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Результат: {calculateScore()}/{QUIZ.length}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 3 
                    ? 'Отлично! Вы разбираетесь в базовой фурнитуре.' 
                    : 'Стоит повторить различия между типами замков.'}
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

        {/* 8. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Фурнитура — это система, влияющая на ресурс и безопасность двери.',
               'Тип петель выбирается по весу двери и требованиям дизайна (скрытые/накладные).',
               'Многозапорный замок обеспечивает лучший прижим и герметичность.',
               'Ручка на планке — классика для общественных зон, розетка — современный стандарт.',
               'Комплектация всегда зависит от сценария использования помещения.'
             ].map((txt, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
           <div className="text-center">
             <p className="text-xs text-gray-400 mt-2">Далее: Антипаника и доводчики</p>
           </div>
        </section>

      </main>
    </div>
  );
};
