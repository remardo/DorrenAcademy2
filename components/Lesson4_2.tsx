
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Settings, Lock, Key, ChevronRight, Zap, Shield, 
  Move, Accessibility, LogOut, CheckSquare, Layers,
  CreditCard, Bell, MousePointer, Info, X
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson4_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [closerScenario, setCloserScenario] = useState<string | null>(null);
  const [panicAnswer, setPanicAnswer] = useState<string | null>(null);
  const [acsStep, setAcsStep] = useState(0); // 0=Event, 1=Reaction, 2=Result
  const [acsSelection, setAcsSelection] = useState<{event?: string, reaction?: string}>({});
  const [mgnActive, setMgnActive] = useState<string | null>(null);
  
  // Practice
  const [practiceScenario, setPracticeScenario] = useState<string | null>(null);
  const [practiceResult, setPracticeResult] = useState<string | null>(null);
  const [practiceSelection, setPracticeSelection] = useState({ closer: '', panic: '', lock: '', mgn: '' });

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // DATA
  const CLOSERS = [
    { id: 'surface', label: 'Накладной', usage: ['Офисы', 'Коридоры', 'Техпомещения'], pros: 'Простота, ремонтопригодность.', cons: 'Виден на полотне.' },
    { id: 'floor', label: 'Напольный', usage: ['Стеклянные двери', 'Маятниковые', 'Входные группы'], pros: 'Скрыт, мощный, чистый дизайн.', cons: 'Сложный монтаж в пол.' },
    { id: 'integrated', label: 'Интегрированный', usage: ['Премиум-офисы', 'Отели', 'Чистые зоны'], pros: 'Невидим, гигиеничен.', cons: 'Требует подготовки полотна.' }
  ];

  const ACS_EVENTS = [
    { id: 'card', label: 'Карта доступа', icon: CreditCard },
    { id: 'fire', label: 'Пожарная тревога', icon: Zap },
    { id: 'schedule', label: 'Рабочее время', icon: Clock }
  ];

  const MGN_HOTSPOTS = [
    { id: 'handle', x: 70, y: 50, label: 'Удобная ручка', desc: 'Увеличенная скоба или нажимная ручка, за которую можно взяться локтем.' },
    { id: 'rail', x: 20, y: 60, label: 'Поручень', desc: 'Опора для равновесия при открывании двери.' },
    { id: 'emergency', x: 70, y: 40, label: 'Аварийный доступ', desc: 'Возможность открыть дверь снаружи монетой/ключом, если человеку внутри стало плохо.' }
  ];

  const PRACTICE_CASES = [
    { 
      id: 'mall', title: 'Эвакуация из ТЦ', 
      hint: 'Массовый проход, безопасность.',
      ideal: { closer: 'surface', panic: 'yes', lock: 'mech_or_el', mgn: 'flat' },
      feedback: 'Накладной доводчик надежен, Антипаника обязательна для эвакуации.' 
    },
    { 
      id: 'server', title: 'Серверная (СКУД)', 
      hint: 'Контроль доступа, мало людей.',
      ideal: { closer: 'surface', panic: 'no', lock: 'el', mgn: 'no' },
      feedback: 'Электромеханический замок для СКУД, антипаника не обязательна (если не путь эвакуации).' 
    },
    { 
      id: 'wc', title: 'Санузел МГН', 
      hint: 'Доступность, безопасность внутри.',
      ideal: { closer: 'adjust', panic: 'no', lock: 'mech', mgn: 'yes' },
      feedback: 'Поручни и удобная ручка обязательны. Доводчик должен быть мягким или отсутствовать.' 
    }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Зачем нужна «антипаника»?', 
      opts: [{id:'a', t:'Для красоты'}, {id:'b', t:'Против взлома'}, {id:'c', t:'Быстрый выход нажатием тела'}, {id:'d', t:'Для экономии'}], 
      correct: 'c', 
      expl: 'Открывание без рук и ключей в стрессовой ситуации.' 
    },
    { 
      id: 2, 
      q: 'Доводчик для стандартной офисной двери?', 
      opts: [{id:'a', t:'Только напольный'}, {id:'b', t:'Накладной'}, {id:'c', t:'Интегрированный'}, {id:'d', t:'Не нужен'}], 
      correct: 'b', 
      expl: 'Самое распространенное и ремонтопригодное решение.' 
    },
    { 
      id: 3, 
      q: 'Роль электромеханического замка?', 
      opts: [{id:'a', t:'Декор'}, {id:'b', t:'Управление доступом по сигналу'}, {id:'c', t:'Огнезащита'}, {id:'d', t:'Уплотнение'}], 
      correct: 'b', 
      expl: 'Позволяет открывать/закрывать дверь удаленно или по карте.' 
    },
    { 
      id: 4, 
      q: 'Что важно для двери МГН?', 
      opts: [{id:'a', t:'Круглая скользкая ручка'}, {id:'b', t:'Удобная ручка и поручни'}, {id:'c', t:'Электронный замок'}, {id:'d', t:'Тугой доводчик'}], 
      correct: 'b', 
      expl: 'Эргономика и опора критичны для маломобильных людей.' 
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
    const scen = PRACTICE_CASES.find(c => c.id === practiceScenario);
    if (scen && practiceSelection.closer && practiceSelection.lock && practiceSelection.mgn && practiceSelection.panic) {
       setPracticeResult(scen.feedback);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="4.2" 
        title="Спецфурнитура" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 4. Фурнитура и аксессуары
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 4.2. Фурнитура для специальных задач
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Доводчики, «антипаника», СКУД и решения для МГН. Как превратить дверь в систему безопасности и комфорта.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~20 минут</div>
                <div className="flex items-center gap-2"><LogOut size={16}/> Эвакуация</div>
                <div className="flex items-center gap-2"><Lock size={16}/> СКУД</div>
                <div className="flex items-center gap-2"><Accessibility size={16}/> МГН</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к обзору
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <Settings size={40} />
                      <LogOut size={40} />
                      <Accessibility size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Фрагмент двери: доводчик сверху, штанга антипаника, считыватель карты на стене, поручень. Технический стиль.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Безопасность, автоматизация и доступность</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Дверь на сложном объекте — это часть систем безопасности (пожарка, эвакуация), контроля доступа (СКУД) и безбарьерной среды.
               Специальная фурнитура интегрирует дверь в эти системы.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что чаще всего недооценивают?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Эвакуацию и «антипанику».'},
                 {id: 2, t: 'Интеграцию со СКУД.'},
                 {id: 3, t: 'Требования МГН (ручки, поручни).'},
                 {id: 4, t: 'Всё считают «мелочами».'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Важно видеть картину целиком: как дверь будет работать при пожаре, как в нее войдет человек на коляске, как она закроется на ночь.
              </div>
            )}
          </div>
        </section>

        {/* 3. CLOSERS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Доводчики: управление закрыванием</h2>
           
           <div className="grid md:grid-cols-3 gap-6 mb-8">
              {CLOSERS.map(c => (
                 <div key={c.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-lg text-dorren-dark mb-2">{c.label}</h3>
                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                       {c.usage.map((u,i) => <div key={i}>• {u}</div>)}
                    </div>
                    <div className="text-sm">
                       <span className="text-green-600 font-bold block">＋ {c.pros}</span>
                       <span className="text-red-500 block">－ {c.cons}</span>
                    </div>
                 </div>
              ))}
           </div>

           {/* Matrix Interactive */}
           <div className="bg-dorren-bg/30 p-6 rounded-xl border border-dorren-light/20">
              <h3 className="font-bold text-dorren-dark mb-4">Помощник выбора</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                 {[
                   {id: 'office', label: 'Офисная дверь'},
                   {id: 'glass', label: 'Стеклянная дверь'},
                   {id: 'fire', label: 'Противопожарная'}
                 ].map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setCloserScenario(s.id)}
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${closerScenario === s.id ? 'bg-dorren-dark text-white' : 'bg-white border hover:bg-gray-50'}`}
                    >
                       {s.label}
                    </button>
                 ))}
              </div>
              
              <div className="min-h-[80px] bg-white p-4 rounded border border-gray-200">
                 {closerScenario === 'office' && <p className="text-gray-700">➜ <strong>Накладной доводчик.</strong> Надежно, недорого, легко регулировать.</p>}
                 {closerScenario === 'glass' && <p className="text-gray-700">➜ <strong>Напольный доводчик.</strong> Скрытый монтаж, удерживает тяжелое стекло.</p>}
                 {closerScenario === 'fire' && <p className="text-gray-700">➜ <strong>Накладной (реже скрытый).</strong> Обязателен для EI-дверей. Должен иметь сертификат.</p>}
                 {!closerScenario && <p className="text-gray-400 italic">Выберите тип двери выше.</p>}
              </div>
           </div>
        </section>

        {/* 4. PANIC HARDWARE */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Антипаника: Эвакуация</h2>
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                 <p className="text-gray-300 mb-6">
                    На путях эвакуации (ТЦ, школы, больницы) дверь должна открываться изнутри одним нажатием тела или руки, без ключей.
                 </p>
                 <div className="bg-white/10 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-dorren-light mb-4">Сценарий: Выход из ТЦ на лестницу</h3>
                    <p className="text-sm mb-4">Какую фурнитуру поставим?</p>
                    <div className="space-y-2">
                       {[
                         {id: 'handle', t: 'Обычная ручка + замок'},
                         {id: 'pull', t: 'Скоба + ключ'},
                         {id: 'panic', t: 'Штанга «Антипаника»'}
                       ].map(opt => (
                          <button 
                            key={opt.id}
                            onClick={() => setPanicAnswer(opt.id)}
                            className={`w-full text-left p-3 rounded border transition-all ${panicAnswer === opt.id ? (opt.id === 'panic' ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500') : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                          >
                             {opt.t}
                          </button>
                       ))}
                    </div>
                    {panicAnswer === 'panic' && <p className="mt-3 text-sm text-green-400 animate-fade-in">Верно! Нажатие штанги мгновенно открывает дверь.</p>}
                    {panicAnswer && panicAnswer !== 'panic' && <p className="mt-3 text-sm text-red-400 animate-fade-in">Опасно! В панике люди не смогут найти ключ или повернуть ручку.</p>}
                 </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                 <div className="w-full aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-6 text-center">
                    <div>
                       <LogOut size={48} className="mx-auto mb-2 text-dorren-light opacity-80" />
                       <p className="text-[10px] text-gray-400 font-mono">[ПРОМТ: Дверь с горизонтальной штангой на уровне пояса]</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. ACS & LOCKS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Электромеханика и СКУД</h2>
           <p className="text-gray-700 mb-8">
              Как дверь реагирует на события? Постройте цепочку.
           </p>

           <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-6 rounded-xl border border-gray-200">
              {/* Step 1: Event */}
              <div className="w-full md:w-1/3 space-y-2">
                 <p className="text-xs font-bold uppercase text-gray-400">Событие</p>
                 {ACS_EVENTS.map(ev => (
                    <button 
                      key={ev.id}
                      onClick={() => { setAcsSelection({...acsSelection, event: ev.id}); setAcsStep(1); }}
                      className={`w-full p-3 rounded flex items-center gap-3 border transition-all ${acsSelection.event === ev.id ? 'bg-white border-dorren-dark shadow-sm' : 'bg-transparent border-transparent hover:bg-white'}`}
                    >
                       <ev.icon size={18} className="text-dorren-dark"/>
                       <span className="text-sm font-medium">{ev.label}</span>
                    </button>
                 ))}
              </div>

              <ArrowRight className="text-gray-300 hidden md:block" />

              {/* Step 2: Reaction */}
              <div className={`w-full md:w-1/3 space-y-2 transition-opacity ${acsStep >= 1 ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                 <p className="text-xs font-bold uppercase text-gray-400">Реакция двери</p>
                 <button onClick={() => { setAcsSelection({...acsSelection, reaction: 'open'}); setAcsStep(2); }} className={`w-full p-3 rounded text-left border text-sm ${acsSelection.reaction === 'open' ? 'bg-white border-dorren-dark' : 'hover:bg-white'}`}>Отрыть замок (Разблокировка)</button>
                 <button onClick={() => { setAcsSelection({...acsSelection, reaction: 'close'}); setAcsStep(2); }} className={`w-full p-3 rounded text-left border text-sm ${acsSelection.reaction === 'close' ? 'bg-white border-dorren-dark' : 'hover:bg-white'}`}>Закрыть (Блокировка)</button>
              </div>

              <ArrowRight className="text-gray-300 hidden md:block" />

              {/* Step 3: Result */}
              <div className={`w-full md:w-1/3 bg-white p-4 rounded border border-gray-200 transition-opacity ${acsStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <p className="text-xs font-bold uppercase text-gray-400 mb-2">Решение</p>
                 <p className="text-sm text-gray-800">
                    {acsSelection.event === 'fire' && acsSelection.reaction === 'open' ? '✅ Правильно. Fail-safe замок: при тревоге питание отключается, дверь открыта.' :
                     acsSelection.event === 'card' && acsSelection.reaction === 'open' ? '✅ Стандартно. Замок открывается импульсом от контроллера СКУД.' :
                     acsSelection.event === 'schedule' && acsSelection.reaction === 'open' ? '✅ Режим "Офис": дверь открыта в рабочие часы.' :
                     '⚠️ Проверьте логику. Например, при пожаре дверь должна открываться.'}
                 </p>
                 {acsStep >= 2 && <button onClick={() => { setAcsStep(0); setAcsSelection({}); }} className="text-xs text-dorren-dark mt-2 underline">Сброс</button>}
              </div>
           </div>
        </section>

        {/* 6. MGN ACCESSIBILITY */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Доступная среда (МГН)</h2>
           <p className="text-gray-700 mb-8">Найдите элементы адаптации на схеме двери санузла.</p>

           <div className="relative max-w-md mx-auto aspect-[4/3] bg-gray-100 rounded-xl border border-gray-300 overflow-hidden">
              {/* Room visual CSS */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-1/3 h-2/3 bg-white border-2 border-gray-400 relative">
                    <div className="absolute right-2 top-1/2 w-2 h-8 bg-gray-800 rounded"></div> {/* Small handle */}
                 </div>
                 <div className="absolute left-10 h-32 w-2 bg-gray-400 rounded"></div> {/* Wall rail */}
              </div>

              {/* Hotspots */}
              {MGN_HOTSPOTS.map(hs => (
                 <button 
                   key={hs.id}
                   style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                   onClick={() => setMgnActive(hs.id)}
                   className="absolute w-8 h-8 -ml-4 -mt-4 bg-dorren-light text-dorren-dark rounded-full flex items-center justify-center font-bold shadow-lg hover:scale-110 transition-transform z-10"
                 >
                    ?
                 </button>
              ))}

              {/* Popup */}
              {mgnActive && (
                 <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-xl border border-gray-200 z-20 animate-fade-in">
                    <div className="flex justify-between items-start">
                       <h4 className="font-bold text-dorren-dark">{MGN_HOTSPOTS.find(h => h.id === mgnActive)?.label}</h4>
                       <button onClick={() => setMgnActive(null)}><X size={16} className="text-gray-400"/></button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{MGN_HOTSPOTS.find(h => h.id === mgnActive)?.desc}</p>
                 </div>
              )}
           </div>
        </section>

        {/* 7. PRACTICE CONFIGURATOR */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Практика: Соберите спецкомплект</h2>
           
           {!practiceScenario ? (
              <div className="grid md:grid-cols-3 gap-4">
                 {PRACTICE_CASES.map(c => (
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
              <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="font-bold text-xl text-dorren-dark">
                       {PRACTICE_CASES.find(c => c.id === practiceScenario)?.title}
                    </h3>
                    <button onClick={() => { setPracticeScenario(null); setPracticeResult(null); setPracticeSelection({closer:'', panic:'', lock:'', mgn:''}); }} className="text-sm text-gray-400 hover:text-dorren-dark">
                       Сменить
                    </button>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Доводчик</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelection({...practiceSelection, closer: e.target.value})}>
                          <option value="">...</option>
                          <option value="surface">Накладной</option>
                          <option value="floor">Напольный</option>
                          <option value="adjust">Мягкий / С фиксацией</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Антипаника</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelection({...practiceSelection, panic: e.target.value})}>
                          <option value="">...</option>
                          <option value="yes">Нужна</option>
                          <option value="no">Не нужна</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Замок</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelection({...practiceSelection, lock: e.target.value})}>
                          <option value="">...</option>
                          <option value="mech">Механический</option>
                          <option value="el">Электромеханический (СКУД)</option>
                          <option value="mech_or_el">Мех. или Электро (с антипаникой)</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">МГН Фурнитура</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelection({...practiceSelection, mgn: e.target.value})}>
                          <option value="">...</option>
                          <option value="yes">Поручни + Большая ручка</option>
                          <option value="no">Обычная</option>
                          <option value="flat">Плоский порог</option>
                       </select>
                    </div>
                 </div>

                 {!practiceResult ? (
                    <button 
                      onClick={checkPractice}
                      className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                    >
                       Проверить
                    </button>
                 ) : (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg animate-fade-in flex gap-3 items-start">
                       <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                       <div>
                          <p className="font-bold text-green-800 mb-1">Решение принято!</p>
                          <p className="text-sm text-green-700">{practiceResult}</p>
                       </div>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 8. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по спецфурнитуре.</p>
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
                    ? 'Отлично! Вы понимаете, как фурнитура решает задачи безопасности.' 
                    : 'Рекомендуем повторить разделы про СКУД и антипанику.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button 
                     onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} 
                     className="text-gray-500 hover:text-dorren-dark px-4 py-2"
                   >
                     Пройти заново
                   </button>
                   <button 
                     className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2"
                     title="Модуль завершен"
                   >
                     Модуль 4 завершен
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
               'Спецфурнитура превращает дверь в инструмент безопасности (эвакуация, доступ).',
               'Доводчики выбираются под вес, дизайн и задачи.',
               '«Антипаника» обязательна на эвакуационных путях для быстрого выхода.',
               'Электромеханика связывает дверь с системой здания (СКУД, пожарка).',
               'Для МГН критичны поручни, удобные ручки и аварийное открывание.'
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
