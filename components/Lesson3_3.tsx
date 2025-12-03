
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Wind, Volume2, Flame, Shield, CheckCircle, 
  AlertTriangle, MousePointer, Layers, MoveVertical, Droplets, Mic
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [rebateType, setRebateType] = useState<'single' | 'double'>('single');
  const [activeSeal, setActiveSeal] = useState<string | null>(null);
  const [thresholdRoom, setThresholdRoom] = useState<string | null>(null);
  
  // Practice State
  const [practiceStep, setPracticeStep] = useState<string | null>(null);
  const [practiceFixes, setPracticeFixes] = useState<string[]>([]);
  const [showGoodNode, setShowGoodNode] = useState(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const THRESHOLD_MATRIX = [
    { id: 'op', label: 'Операционная', static: 'poor', flat: 'good', auto: 'best' },
    { id: 'corridor', label: 'Коридор стационара', static: 'poor', flat: 'good', auto: 'best' },
    { id: 'ward', label: 'Палата', static: 'ok', flat: 'good', auto: 'best' },
    { id: 'wc_common', label: 'Санузел общий', static: 'ok', flat: 'ok', auto: 'good' },
    { id: 'wc_mgn', label: 'Санузел МГН', static: 'poor', flat: 'best', auto: 'good' },
    { id: 'tech', label: 'Техническое пом.', static: 'best', flat: 'poor', auto: 'ok' },
  ];

  const SEAL_TYPES = [
    { id: 'contour', label: 'Контурные', icon: Wind, desc: 'Базовая защита от шума, воздуха и пыли. Ставится в паз.' },
    { id: 'magnetic', label: 'Магнитные', icon: Layers, desc: 'Мягкое притягивание, герметичность, комфорт. Для VIP и медзон.' },
    { id: 'intumescent', label: 'Терморасширяющиеся (EI)', icon: Flame, desc: 'При пожаре вспениваются и блокируют дым и огонь.' },
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Что даёт двойной притвор по сравнению с одинарным?', 
      opts: [
        {id:'a', t:'Только декоративный элемент'}, 
        {id:'b', t:'Улучшенную звукоизоляцию и эффективность дымо/огнезащиты'}, 
        {id:'c', t:'Упрощение монтажа'}, 
        {id:'d', t:'Удешевление конструкции'}
      ], 
      correct: 'b', 
      expl: 'Двойной притвор позволяет разместить несколько контуров уплотнений.' 
    },
    { 
      id: 2, 
      q: 'Какая роль терморасширяющихся уплотнителей в EI-дверях?', 
      opts: [
        {id:'a', t:'Увеличивать звукопоглощение'}, 
        {id:'b', t:'Улучшать внешний вид'}, 
        {id:'c', t:'При пожаре расширяться и перекрывать зазоры'}, 
        {id:'d', t:'Уменьшать вес двери'}
      ], 
      correct: 'c', 
      expl: 'Они блокируют проход огня и горячих газов при нагреве.' 
    },
    { 
      id: 3, 
      q: 'Когда логичнее применять автоматический опускающийся порог?', 
      opts: [
        {id:'a', t:'В коридорах с каталками и маршрутах МГН'}, 
        {id:'b', t:'На технических складах'}, 
        {id:'c', t:'Там, где не важна герметичность'}, 
        {id:'d', t:'Никогда, это лишнее'}
      ], 
      correct: 'a', 
      expl: 'Он обеспечивает ровный пол для колес и герметичность.' 
    },
    { 
      id: 4, 
      q: 'Что будет, если оставить большой зазор по низу без порога в медкоридоре?', 
      opts: [
        {id:'a', t:'Улучшится вентиляция'}, 
        {id:'b', t:'Ничего страшного'}, 
        {id:'c', t:'Шум, запахи и дым (при пожаре) проникнут в коридор'}, 
        {id:'d', t:'Дверь станет легче'}
      ], 
      correct: 'c', 
      expl: 'Щель по низу — главный путь для звука и дыма.' 
    },
    { 
      id: 5, 
      q: 'Где чаще всего размещают контурные уплотнители?', 
      opts: [
        {id:'a', t:'На полу'}, 
        {id:'b', t:'По периметру притвора в коробке/полотне'}, 
        {id:'c', t:'В замковой зоне'}, 
        {id:'d', t:'Внутри полотна'}
      ], 
      correct: 'b', 
      expl: 'Они идут по всему периметру примыкания.' 
    },
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  const handlePracticeFix = (issue: string) => {
    if (!practiceFixes.includes(issue)) {
      const newFixes = [...practiceFixes, issue];
      setPracticeFixes(newFixes);
      if (newFixes.length >= 3) {
        setTimeout(() => setShowGoodNode(true), 1500);
      }
    }
    setPracticeStep(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="3.3" 
        title="Притвор и пороги" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-dorren-light to-transparent"></div>
           <div className="absolute right-20 top-20 w-64 h-64 border-4 border-white/20 rounded-full"></div>
           <div className="absolute right-10 top-32 w-48 h-48 border-4 border-white/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 3.3. Притвор, уплотнения, пороги
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираемся, как «щели и пороги» влияют на звук, дым и огнестойкость. Почему это критические элементы, а не мелочи.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><Volume2 size={16}/> Звукоизоляция</div>
                <div className="flex items-center gap-2"><Wind size={16}/> Герметичность</div>
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
                >
                  Перейти к «анатомии притвора»
                  <ArrowRight size={18} />
                </button>
             </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center">
                {/* Abstract Node Visualization */}
                <div className="relative w-48 h-48">
                   <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-400 rounded-l"></div> {/* Wall/Frame */}
                   <div className="absolute right-0 top-2 bottom-2 w-32 bg-gray-600 rounded-r border-l-4 border-dorren-light"></div> {/* Door */}
                   {/* Seals */}
                   <div className="absolute left-4 top-0 bottom-0 w-1 bg-red-500/50"></div>
                   <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-400/50"></div>
                   <div className="absolute -bottom-8 left-0 right-0 text-center text-xs text-gray-400 font-mono bg-black/50 px-2 py-1 rounded">
                      [ПРОМТ: 3D-разрез притвора с уплотнителями]
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему «щели» важнее, чем кажется</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Даже самое тяжёлое полотно не даст звукоизоляции, если притвор пропускает воздух.
               Притвор — это система управляемых зазоров. Уплотнители закрывают путь шуму, дыму и огню.
               Для клиента это разница между "дует и слышно" и "тихо и безопасно".
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> О чём клиенты спрашивают чаще всего?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Про шум и запахи ("очень слышно из коридора").'},
                 {id: 2, t: 'Про сквозняки и продувание.'},
                 {id: 3, t: 'Про дым и требования пожарной безопасности.'},
                 {id: 4, t: 'Почти не спрашивают, пока не столкнутся с проблемой.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Всё это зависит от качества притвора. Давайте разберем, как сделать его герметичным.
              </div>
            )}
          </div>
        </section>

        {/* 3. REBATE TYPES */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Притвор: Одинарный vs Двойной</h2>
           
           <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                 <button 
                   onClick={() => setRebateType('single')}
                   className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${rebateType === 'single' ? 'bg-white text-dorren-dark shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                    Одинарный
                 </button>
                 <button 
                   onClick={() => setRebateType('double')}
                   className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${rebateType === 'double' ? 'bg-white text-dorren-dark shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                    Двойной
                 </button>
              </div>
           </div>

           <div className="flex flex-col md:flex-row gap-8 items-center animate-fade-in">
              <div className="md:w-1/2 flex justify-center">
                 {/* CSS Diagram of Rebate */}
                 <div className="relative w-64 h-64 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                    {/* Frame (Fixed) */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-dorren-dark">
                       {/* Rebate Step 1 */}
                       <div className="absolute right-0 top-10 w-4 h-full bg-gray-50"></div> 
                       {/* Rebate Step 2 (for Double) */}
                       {rebateType === 'double' && (
                          <div className="absolute right-4 top-10 w-4 h-full bg-gray-200"></div>
                       )}
                    </div>
                    
                    {/* Door Leaf (Moving) */}
                    <div className={`absolute top-12 bottom-12 right-8 w-32 bg-dorren-light/20 border-l-4 border-dorren-light transition-all duration-500 ${rebateType === 'single' ? 'left-16' : 'left-20'}`}>
                        <div className="absolute left-0 top-0 bottom-0 w-full flex flex-col justify-center items-center opacity-20">
                           <span className="font-bold text-dorren-dark rotate-90">ПОЛОТНО</span>
                        </div>
                    </div>

                    {/* Seals Visualization */}
                    <div className="absolute left-16 top-12 bottom-12 w-1 bg-black/50 z-10"></div>
                    {rebateType === 'double' && (
                       <div className="absolute left-20 top-12 bottom-12 w-1 bg-red-500/50 z-10"></div>
                    )}

                    {/* Noise/Smoke Arrows */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                       {rebateType === 'single' ? (
                          <>
                             <div className="flex items-center gap-1 text-red-500 text-xs font-bold animate-pulse"><Wind size={14}/> Шум</div>
                             <div className="flex items-center gap-1 text-gray-500 text-xs font-bold animate-pulse"><Wind size={14}/> Дым</div>
                          </>
                       ) : (
                          <>
                             <div className="flex items-center gap-1 text-green-600 text-xs font-bold opacity-50"><Shield size={14}/> Тихо</div>
                          </>
                       )}
                    </div>
                 </div>
              </div>

              <div className="md:w-1/2 space-y-4">
                 <h3 className="text-xl font-bold text-dorren-dark">
                    {rebateType === 'single' ? 'Одинарный притвор' : 'Двойной притвор'}
                 </h3>
                 <p className="text-gray-700">
                    {rebateType === 'single' 
                       ? 'Базовая звукоизоляция и уплотнение. Одна ступень прилегания. Подходит для офисов и палат без строгих норм.' 
                       : 'Повышенная звукоизоляция и защита от дыма. Две ступени, два контура уплотнителей. Стандарт для EI-дверей и хорошей акустики.'}
                 </p>
                 
                 <div className="bg-dorren-bg p-4 rounded-lg">
                    <h4 className="font-bold text-sm text-dorren-dark mb-2 uppercase">Влияние</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                       <li className="flex gap-2 items-center">
                          <Volume2 size={16} className={rebateType === 'double' ? 'text-green-600' : 'text-gray-400'} />
                          {rebateType === 'single' ? 'Звук: Базовый' : 'Звук: Высокий (доп. барьер)'}
                       </li>
                       <li className="flex gap-2 items-center">
                          <Flame size={16} className={rebateType === 'double' ? 'text-red-600' : 'text-gray-400'} />
                          {rebateType === 'single' ? 'Огонь: Возможно (с термолентой)' : 'Огонь: Оптимально (место для 2 контуров)'}
                       </li>
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. SEALS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Уплотнители: виды и задачи</h2>
           <p className="text-gray-300 mb-8">
              Это не просто "резинка". Разные контуры отвечают за разные задачи.
           </p>

           <div className="grid md:grid-cols-3 gap-6">
              {SEAL_TYPES.map((seal) => (
                 <button 
                   key={seal.id}
                   onClick={() => setActiveSeal(seal.id)}
                   className={`p-6 rounded-xl border text-left transition-all h-full flex flex-col ${activeSeal === seal.id ? 'bg-dorren-light text-dorren-dark border-dorren-light scale-105 shadow-xl' : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/20'}`}
                 >
                    <seal.icon size={32} className="mb-4" />
                    <h3 className="font-bold text-lg mb-2">{seal.label}</h3>
                    <p className="text-sm opacity-80 leading-relaxed">{seal.desc}</p>
                 </button>
              ))}
           </div>

           {activeSeal && (
              <div className="mt-8 bg-white/10 p-6 rounded-xl border border-white/20 animate-fade-in flex items-center gap-6">
                 <div className="hidden md:flex w-16 h-16 bg-white/20 rounded-full items-center justify-center shrink-0">
                    <CheckCircle size={32} className="text-dorren-light" />
                 </div>
                 <div>
                    <h4 className="font-bold text-dorren-light mb-1">Где устанавливается?</h4>
                    <p className="text-gray-200 text-sm">
                       {activeSeal === 'contour' && 'По периметру притвора: в паз коробки или полотна. Основной барьер.'}
                       {activeSeal === 'magnetic' && 'Встроен в коробку и полотно. Магниты притягиваются при закрытии.'}
                       {activeSeal === 'intumescent' && 'Вклеен в паз коробки/полотна. В обычном состоянии скрыт, при +150°C вспучивается.'}
                    </p>
                 </div>
              </div>
           )}
        </section>

        {/* 5. THRESHOLDS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Пороги: статика или автоматика?</h2>
           <p className="text-gray-700 mb-6">
              Выбор порога зависит от назначения помещения. Наведите на ячейку, чтобы увидеть статус.
           </p>

           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                 <thead>
                    <tr className="bg-gray-100 text-gray-600">
                       <th className="p-3 rounded-tl-lg">Помещение</th>
                       <th className="p-3">Статический порог</th>
                       <th className="p-3">Ровный пол (нет порога)</th>
                       <th className="p-3 rounded-tr-lg">Авто-порог</th>
                    </tr>
                 </thead>
                 <tbody>
                    {THRESHOLD_MATRIX.map((row) => (
                       <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                          <td className="p-3 font-bold text-dorren-dark">{row.label}</td>
                          {[row.static, row.flat, row.auto].map((val, idx) => (
                             <td key={idx} className="p-3">
                                <div 
                                  className={`w-full py-1 px-2 rounded text-center text-xs font-bold cursor-help transition-all
                                    ${val === 'best' ? 'bg-green-100 text-green-800 ring-1 ring-green-300' : 
                                      val === 'good' ? 'bg-blue-50 text-blue-800' :
                                      val === 'ok' ? 'bg-gray-100 text-gray-500' :
                                      'bg-red-50 text-red-400 opacity-50'}`}
                                  title={val === 'best' ? 'Рекомендовано!' : val === 'poor' ? 'Нежелательно' : ''}
                                >
                                   {val === 'best' ? '★ Лучший выбор' : 
                                    val === 'good' ? 'Хорошо' : 
                                    val === 'ok' ? 'Допустимо' : 
                                    'Не рекомендуется'}
                                </div>
                             </td>
                          ))}
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg flex gap-4 items-start">
                 <div className="bg-white p-2 rounded border border-gray-200"><MoveVertical size={24} className="text-gray-400"/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Статический порог</h4>
                    <p className="text-xs text-gray-600 mt-1">Плюс: Надежная герметичность и защита от воды.<br/>Минус: Спотыкание, барьер для каталок.</p>
                 </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg flex gap-4 items-start">
                 <div className="bg-white p-2 rounded border border-gray-200"><Layers size={24} className="text-dorren-light"/></div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Автоматический порог</h4>
                    <p className="text-xs text-gray-600 mt-1">Плюс: Ровный пол (безбарьерная среда) + изоляция.<br/>Идеально для медицины и путей эвакуации.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* 6. PRACTICE: BAD VS GOOD */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20 select-none">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Практика: Найдите ошибки</h2>
           <p className="text-gray-700 mb-6">
              Перед вами "плохой" узел коридорной двери. Найдите 3 проблемы, чтобы превратить его в "хороший".
           </p>

           <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
              
              {!showGoodNode ? (
                 <div className="relative w-72 h-72 bg-white border-2 border-red-200 rounded-xl shadow-lg p-4">
                    <div className="absolute top-2 left-2 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">ПЛОХОЙ УЗЕЛ</div>
                    
                    {/* Visual of Bad Node */}
                    <div className="h-full flex flex-col justify-between relative">
                       <div className="w-4 bg-gray-400 h-full absolute left-0"></div> {/* Frame */}
                       <div className="w-32 bg-gray-200 h-full absolute left-6 border-l border-gray-300"></div> {/* Door */}
                       
                       {/* Hotspot 1: Gap/Single Rebate */}
                       <button 
                         onClick={() => { setPracticeStep('rebate'); handlePracticeFix('rebate'); }}
                         className={`absolute left-4 top-1/3 w-6 h-6 rounded-full animate-pulse border-2 border-white shadow-md flex items-center justify-center transition-colors ${practiceFixes.includes('rebate') ? 'bg-green-500' : 'bg-red-500 text-white'}`}
                       >
                          {practiceFixes.includes('rebate') ? <CheckCircle size={14}/> : '!'}
                       </button>

                       {/* Hotspot 2: Missing Seal */}
                       <button 
                         onClick={() => { setPracticeStep('seal'); handlePracticeFix('seal'); }}
                         className={`absolute left-4 top-2/3 w-6 h-6 rounded-full animate-pulse border-2 border-white shadow-md flex items-center justify-center transition-colors ${practiceFixes.includes('seal') ? 'bg-green-500' : 'bg-red-500 text-white'}`}
                       >
                          {practiceFixes.includes('seal') ? <CheckCircle size={14}/> : '!'}
                       </button>

                       {/* Hotspot 3: Bottom Gap */}
                       <button 
                         onClick={() => { setPracticeStep('threshold'); handlePracticeFix('threshold'); }}
                         className={`absolute left-6 bottom-0 w-6 h-6 rounded-full animate-pulse border-2 border-white shadow-md flex items-center justify-center transition-colors ${practiceFixes.includes('threshold') ? 'bg-green-500' : 'bg-red-500 text-white'}`}
                       >
                          {practiceFixes.includes('threshold') ? <CheckCircle size={14}/> : '!'}
                       </button>

                       {/* Smoke/Noise Arrows */}
                       <div className="absolute left-8 top-1/2 flex flex-col gap-2 opacity-50 pointer-events-none">
                          <Wind className="text-red-400" />
                          <Mic className="text-red-400" />
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="relative w-72 h-72 bg-white border-2 border-green-200 rounded-xl shadow-lg p-4 animate-fade-in">
                    <div className="absolute top-2 left-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">ХОРОШИЙ УЗЕЛ</div>
                    {/* Visual of Good Node */}
                    <div className="h-full flex flex-col justify-between relative">
                       <div className="w-8 bg-dorren-dark h-full absolute left-0"></div> {/* Double Rebate Frame */}
                       <div className="w-32 bg-dorren-light/20 h-full absolute left-10 border-l-4 border-dorren-light"></div> {/* Door */}
                       
                       {/* Seals */}
                       <div className="absolute left-8 top-0 bottom-0 w-1 bg-black"></div>
                       <div className="absolute left-4 top-0 bottom-0 w-1 bg-red-500"></div>
                       
                       {/* Drop Seal */}
                       <div className="absolute left-10 bottom-0 w-32 h-2 bg-black/80"></div>

                       {/* Blocked Icons */}
                       <div className="absolute left-2 top-1/2 flex flex-col gap-2">
                          <Shield className="text-green-600" />
                       </div>
                    </div>
                 </div>
              )}

              {/* Feedback Area */}
              <div className="md:w-1/2 min-h-[150px]">
                 {practiceStep === 'rebate' && (
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm animate-fade-in">
                       <h4 className="font-bold text-red-700 mb-1">Проблема: Большой зазор</h4>
                       <p className="text-sm text-gray-600">Одинарный притвор пропускает звук. <strong>Решение:</strong> Двойной притвор.</p>
                    </div>
                 )}
                 {practiceStep === 'seal' && (
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm animate-fade-in">
                       <h4 className="font-bold text-red-700 mb-1">Проблема: Нет уплотнителя</h4>
                       <p className="text-sm text-gray-600">Голый металл/дерево. <strong>Решение:</strong> Добавить контурный + терморасширяющийся уплотнитель.</p>
                    </div>
                 )}
                 {practiceStep === 'threshold' && (
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm animate-fade-in">
                       <h4 className="font-bold text-red-700 mb-1">Проблема: Щель внизу</h4>
                       <p className="text-sm text-gray-600">Свободный проход для дыма. <strong>Решение:</strong> Автоматический выпадающий порог.</p>
                    </div>
                 )}
                 {showGoodNode && (
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center animate-fade-in">
                       <CheckCircle size={32} className="text-green-600 mx-auto mb-2" />
                       <h4 className="font-bold text-green-800 text-lg">Узел исправлен!</h4>
                       <p className="text-sm text-green-700 mt-2">
                          Теперь дверь герметична, безопасна и удобна для прохода.
                       </p>
                    </div>
                 )}
                 {!practiceStep && !showGoodNode && (
                    <p className="text-gray-500 italic">Нажмите на красные маркеры на схеме, чтобы исправить ошибки.</p>
                 )}
              </div>
           </div>
        </section>

        {/* 7. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">5 вопросов по теме.</p>
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
                  {calculateScore() >= 4 
                    ? 'Отлично! Вы понимаете важность "мелочей".' 
                    : 'Хорошая попытка, но стоит повторить раздел про пороги.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">
                     Попробовать снова
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson3.4')}
                     className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2"
                   >
                     Следующий урок
                     <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 8. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Притвор и уплотнители — это не декор, а функциональная система (звук, дым, огонь).',
               'Двойной притвор обязателен для высоких требований по акустике и EI.',
               'Терморасширяющиеся уплотнители работают только при пожаре, блокируя зазоры.',
               'Автоматический порог — стандарт для медицинской безбарьерной среды.',
               'Плохой узел сводит на нет качества хорошего полотна.'
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
