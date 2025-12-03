
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Flame, Move, Maximize, LogOut, ShieldAlert, 
  AlertTriangle, CheckSquare, X, ChevronRight,
  MousePointer, Map, Layout
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson6_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // Intro Poll
  const [introPoll, setIntroPoll] = useState<string | null>(null);

  // Direction Interactive
  const [openingDir, setOpeningDir] = useState<'bad' | 'good'>('bad');

  // Fire Case
  const [fireCaseSelections, setFireCaseSelections] = useState<string[]>([]);
  const [fireCaseSubmitted, setFireCaseSubmitted] = useState(false);

  // Width Interactive
  const [widthState, setWidthState] = useState<'narrow' | 'normal' | 'wide'>('normal');

  // Evacuation Map
  const [activeEvacStep, setActiveEvacStep] = useState<number | null>(null);

  // Practice
  const [activePracticeScenario, setActivePracticeScenario] = useState<number | null>(null);
  const [practiceSelections, setPracticeSelections] = useState<string[]>([]);
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const FIRE_CASE_OPTIONS = [
    { id: 'ei', text: 'Требование по классу огнестойкости' },
    { id: 'close', text: 'Возможные требования к самозакрыванию' },
    { id: 'smoke', text: 'Возможные требования по дымогазонепроницаемости' },
    { id: 'design', text: 'Только цвет и дизайн' }
  ];

  const PRACTICE_SCENARIOS = [
    {
      id: 1,
      title: 'Дверь из коридора стационара на лестничную клетку',
      factors: ['dir', 'ei', 'width', 'evac'],
      feedback: 'Это классический эвакуационный выход. Критичны: направление (наружу), EI (защита от огня), ширина (для потока/каталок) и фурнитура (антипаника).'
    },
    {
      id: 2,
      title: 'Дверь в процедурный кабинет из коридора',
      factors: ['width', 'dir'], // EI and evac usually dependent on specific project logic, but width/dir always relevant for usage
      feedback: 'Важна ширина для проезда каталок и направление, чтобы не блокировать коридор. Требования эвакуации зависят от того, считается ли кабинет помещением с массовым пребыванием, но базово - комфорт и логистика.'
    },
    {
      id: 3,
      title: 'Дверь в небольшой склад (бытовку) в общем коридоре',
      factors: ['dir', 'ei'], // EI often required for tech rooms/storage
      feedback: 'Направление — чтобы не бить людей в коридоре. Часто требуется противопожарная дверь (склад горючих материалов), даже если людей там нет.'
    }
  ];

  const QUIZ = [
    {
      id: 1,
      q: 'Какое утверждение о направлении открывания двери на пути эвакуации ближе к реальности?',
      opts: [
        {id: 'a', t: 'Дверь всегда должна открываться внутрь помещения'},
        {id: 'b', t: 'Направление выбирается только по дизайну'},
        {id: 'c', t: 'Определяется схемой эвакуации, часто «по ходу движения»'},
        {id: 'd', t: 'Направление не влияет на безопасность'}
      ],
      correct: 'c',
      expl: 'На путях эвакуации двери должны открываться по ходу движения, чтобы поток людей мог свободно выйти.'
    },
    {
      id: 2,
      q: 'Зачем на двери между коридором и лестницей может требоваться класс огнестойкости?',
      opts: [
        {id: 'a', t: 'Чтобы дверь выглядела массивнее'},
        {id: 'b', t: 'Чтобы защищать путь эвакуации от огня'},
        {id: 'c', t: 'Чтобы дверь было сложнее открыть'},
        {id: 'd', t: 'Чтобы меньше скрипела'}
      ],
      correct: 'b',
      expl: 'Противопожарные преграды локализуют огонь и дают людям время на спасение.'
    },
    {
      id: 3,
      q: 'Почему важно учитывать минимальную ширину дверного проёма?',
      opts: [
        {id: 'a', t: 'Ради симметрии на фасаде'},
        {id: 'b', t: 'Для удобства перевозки двери'},
        {id: 'c', t: 'Для безопасного прохода людей и МГН'},
        {id: 'd', t: 'Для декора'}
      ],
      correct: 'c',
      expl: 'Узкая дверь становится «бутылочным горлышком» при эвакуации и барьером для колясок.'
    },
    {
      id: 4,
      q: 'Какую роль играют требования к путям эвакуации при выборе двери?',
      opts: [
        {id: 'a', t: 'Никакой, выбираем по цене'},
        {id: 'b', t: 'Определяют обязательные параметры (EI, ширина, фурнитура)'},
        {id: 'c', t: 'Влияют только на цвет ручек'},
        {id: 'd', t: 'Определяют, кто будет пользоваться дверью'}
      ],
      correct: 'b',
      expl: 'Если дверь на пути эвакуации, нормы жестко диктуют её характеристики.'
    }
  ];

  // Logic
  const toggleFireOption = (id: string) => {
    if (fireCaseSelections.includes(id)) {
      setFireCaseSelections(prev => prev.filter(i => i !== id));
    } else {
      setFireCaseSelections(prev => [...prev, id]);
    }
  };

  const handlePracticeToggle = (factor: string) => {
    if (practiceSelections.includes(factor)) {
      setPracticeSelections(prev => prev.filter(f => f !== factor));
    } else {
      setPracticeSelections(prev => [...prev, factor]);
    }
  };

  const checkPractice = () => {
    const scenario = PRACTICE_SCENARIOS.find(s => s.id === activePracticeScenario);
    if (!scenario) return;
    
    // Simple check: user must select at least the key factors. 
    // We won't be too strict about "extra" selections for educational purposes, 
    // but they should catch the main ones.
    const missing = scenario.factors.filter(f => !practiceSelections.includes(f));
    
    if (missing.length === 0) {
      setPracticeFeedback(scenario.feedback);
    } else {
      setPracticeFeedback('Вы отметили не все критические факторы. Подумайте еще раз о безопасности и удобстве.');
    }
  };

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
        lessonId="6.2" 
        title="Влияние норм на выбор" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Move className="absolute right-10 top-10 w-64 h-64 opacity-20 rotate-45" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 6. Нормативные требования
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 6.2. Как нормы влияют на выбор двери
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Направление открывания, огнестойкость, ширина проема. Превращаем требования документов в конкретные решения Dorren.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><LogOut size={16}/> Эвакуация</div>
                <div className="flex items-center gap-2"><Flame size={16}/> Огнестойкость</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к влиянию норм
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <Move size={40} />
                      <Flame size={40} />
                      <Maximize size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Дверь с наложенной инфографикой: стрелка открывания, значок огня, размерная линия ширины. Технический стиль.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. NORMS AS CONSTRAINTS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Нормы = Рамки выбора</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Выбирая дверь, мы смотрим не только на дизайн. Сначала мы проверяем ограничения: куда можно открывать? какая ширина минимальна? нужен ли сертификат EI?
               Задача менеджера — перевести ситуацию на объекте в набор требований к двери.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что будет, если игнорировать нормы?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 'beauty', t: 'Ничего, главное — красота.'},
                 {id: 'risk', t: 'Проблемы при сдаче, переделки, штрафы.'},
                 {id: 'hard', t: 'Просто дверь будет туго открываться.'},
                 {id: 'none', t: 'Нормы не влияют на выбор.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introPoll === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroPoll(opt.id)} checked={introPoll === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introPoll && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 {introPoll === 'risk' ? 'Абсолютно верно. Игнорирование норм — самый дорогой путь.' : 'Неверно. Ошибки в нормах приводят к дорогим переделкам.'}
              </div>
            )}
          </div>
        </section>

        {/* 3. OPENING DIRECTION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-green-500">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Направление открывания</h2>
           <p className="text-gray-600 mb-6">Безопасность и логика движения. Куда должна открываться дверь?</p>

           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 bg-gray-100 rounded-xl p-8 relative h-64 w-full flex items-center justify-center border border-gray-300">
                 {/* Simulation Corridor */}
                 <div className="absolute top-0 bottom-0 left-0 w-2 bg-gray-400"></div> {/* Wall */}
                 <div className="absolute top-0 bottom-0 right-0 w-2 bg-gray-400"></div> {/* Wall */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-300 text-6xl font-bold rotate-90 select-none">КОРИДОР</div>
                 
                 {/* People Flow */}
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col gap-1 items-center animate-pulse">
                    <ArrowRight className="rotate-90 text-green-500" />
                    <ArrowRight className="rotate-90 text-green-500" />
                 </div>

                 {/* Door */}
                 <div className="absolute top-1/2 left-0 w-2 h-16 bg-dorren-dark -translate-y-1/2 z-10"></div> {/* Frame */}
                 <div 
                   className={`absolute top-1/2 left-0 h-2 bg-dorren-light transition-all duration-500 origin-left z-20 ${
                      openingDir === 'bad' ? 'w-24 rotate-[-45deg]' : 'w-24 rotate-[135deg]' // -45 blocks corridor, 135 opens against wall inside room or flat along wall
                   }`}
                 ></div>
                 
                 {/* Collision Alert */}
                 {openingDir === 'bad' && (
                    <div className="absolute top-1/2 left-16 -translate-y-1/2 text-red-600 bg-white/80 p-1 rounded text-xs font-bold border border-red-500">
                       БЛОКИРУЕТ!
                    </div>
                 )}
              </div>

              <div className="md:w-1/2 space-y-4">
                 <h3 className="font-bold text-gray-900">Выберите вариант:</h3>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => setOpeningDir('bad')}
                      className={`px-4 py-2 rounded text-sm font-bold border transition-all ${openingDir === 'bad' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-white hover:bg-gray-50'}`}
                    >
                       Против потока
                    </button>
                    <button 
                      onClick={() => setOpeningDir('good')}
                      className={`px-4 py-2 rounded text-sm font-bold border transition-all ${openingDir === 'good' ? 'bg-green-50 border-green-300 text-green-800' : 'bg-white hover:bg-gray-50'}`}
                    >
                       По ходу / К стене
                    </button>
                 </div>
                 
                 <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
                    {openingDir === 'bad' 
                       ? 'Дверь перекрывает коридор, мешает эвакуации и движению каталок. Высокий риск травм.' 
                       : 'Дверь прижимается к стене или открывается внутрь помещения (если не эвакуация), оставляя проход свободным.'}
                 </div>
                 <p className="text-xs text-gray-500">
                    *На путях эвакуации дверь обычно должна открываться "наружу" (по ходу выхода), но так, чтобы не блокировать соседей.
                 </p>
              </div>
           </div>
        </section>

        {/* 4. FIRE RESISTANCE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-red-500">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Классы огнестойкости</h2>
           <p className="text-gray-600 mb-6">
              Когда дверь должна "держать огонь". Кейс: Дверь на лестничную клетку.
           </p>

           <div className="bg-red-50 p-6 rounded-xl border border-red-100">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                 <ShieldAlert size={18}/> Что обязательно для такой двери?
              </h3>
              <div className="space-y-2 mb-4">
                 {FIRE_CASE_OPTIONS.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="checkbox" 
                         className="rounded text-red-600 focus:ring-red-500"
                         checked={fireCaseSelections.includes(opt.id)}
                         onChange={() => !fireCaseSubmitted && toggleFireOption(opt.id)}
                         disabled={fireCaseSubmitted}
                       />
                       <span className={`text-sm ${fireCaseSubmitted && opt.id !== 'design' ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                          {opt.text}
                       </span>
                    </label>
                 ))}
              </div>
              
              {!fireCaseSubmitted ? (
                 <button onClick={() => setFireCaseSubmitted(true)} className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-700">
                    Проверить
                 </button>
              ) : (
                 <div className="animate-fade-in text-sm text-red-800 bg-white/50 p-3 rounded border border-red-200">
                    <p className="font-bold mb-1">Верно!</p>
                    <p>Для защиты путей эвакуации важны: класс EI (огнестойкость), доводчик (самозакрывание) и часто S (дым). Дизайн вторичен.</p>
                 </div>
              )}
           </div>
        </section>

        {/* 5. WIDTH */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Минимальная ширина проёма</h2>
           <p className="text-gray-600 mb-8">
              Чтобы прошли все: люди, каталки, оборудование.
           </p>

           <div className="flex flex-col items-center">
              <div className="flex justify-center gap-4 mb-6 w-full max-w-md">
                 {['narrow', 'normal', 'wide'].map((w) => (
                    <button 
                      key={w}
                      onClick={() => setWidthState(w as any)}
                      className={`flex-1 py-2 rounded text-sm font-bold border transition-all ${widthState === w ? 'bg-dorren-dark text-white border-dorren-dark' : 'bg-white hover:bg-gray-50'}`}
                    >
                       {w === 'narrow' ? 'Узкий' : w === 'normal' ? 'Норма' : 'Широкий'}
                    </button>
                 ))}
              </div>

              <div className="relative h-64 w-full max-w-lg bg-gray-100 border border-gray-300 rounded-lg flex items-end justify-center overflow-hidden">
                 {/* Door Opening Visual */}
                 <div 
                   className="h-56 bg-white border-x-4 border-gray-400 absolute bottom-0 transition-all duration-500 flex items-end justify-center"
                   style={{ width: widthState === 'narrow' ? '120px' : widthState === 'normal' ? '200px' : '280px' }}
                 >
                    {/* Dimension Line */}
                    <div className="absolute top-10 w-full border-t border-gray-400 flex justify-between px-1">
                       <div className="h-2 w-px bg-gray-400"></div>
                       <span className="text-xs -mt-5 font-mono text-gray-500">
                          {widthState === 'narrow' ? '700' : widthState === 'normal' ? '900' : '1100'}
                       </span>
                       <div className="h-2 w-px bg-gray-400"></div>
                    </div>

                    {/* Silhouettes */}
                    <div className="relative flex items-end">
                       {/* Person */}
                       <div className="w-10 h-32 bg-dorren-dark/50 rounded-t-full mx-1"></div> 
                       {/* Wheelchair/Stretcher simulation */}
                       <div className="w-24 h-24 border-2 border-dorren-dark/50 rounded flex items-center justify-center mx-1 bg-dorren-light/20 relative">
                          <span className="text-[8px] text-dorren-dark">Каталка</span>
                          {/* Collision X */}
                          {widthState === 'narrow' && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <X className="text-red-600 w-full h-full opacity-80" />
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-6 text-center text-sm max-w-lg">
                 {widthState === 'narrow' && <p className="text-red-600 font-bold">Риск "бутылочного горлышка". Каталка не пройдет, эвакуация замедлится.</p>}
                 {widthState === 'normal' && <p className="text-green-700 font-bold">Оптимально для большинства задач (офис, палата).</p>}
                 {widthState === 'wide' && <p className="text-blue-700 font-bold">Отлично для операционных и главных входов. Свободный трафик.</p>}
              </div>
           </div>
        </section>

        {/* 6. EVACUATION ROUTES */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Пути эвакуации</h2>
           <p className="text-gray-300 mb-8">
              Двери на этом маршруте — критические точки. Пройдите путь.
           </p>

           <div className="bg-white/10 p-6 rounded-xl border border-white/10 relative">
              <div className="flex justify-between items-center relative z-10">
                 {/* Step 1: Corridor */}
                 <div className="text-center">
                    <button 
                      onClick={() => setActiveEvacStep(1)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${activeEvacStep === 1 ? 'bg-dorren-light text-dorren-dark border-white scale-110' : 'bg-transparent text-gray-400 border-gray-500 hover:border-dorren-light'}`}
                    >
                       <Move size={24}/>
                    </button>
                    <p className="text-xs mt-2 text-gray-300">Коридор</p>
                 </div>

                 <ArrowRight className="text-gray-500" />

                 {/* Step 2: Vestibule */}
                 <div className="text-center">
                    <button 
                      onClick={() => setActiveEvacStep(2)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${activeEvacStep === 2 ? 'bg-dorren-light text-dorren-dark border-white scale-110' : 'bg-transparent text-gray-400 border-gray-500 hover:border-dorren-light'}`}
                    >
                       <LogOut size={24}/>
                    </button>
                    <p className="text-xs mt-2 text-gray-300">Тамбур</p>
                 </div>

                 <ArrowRight className="text-gray-500" />

                 {/* Step 3: Stairs */}
                 <div className="text-center">
                    <button 
                      onClick={() => setActiveEvacStep(3)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${activeEvacStep === 3 ? 'bg-dorren-light text-dorren-dark border-white scale-110' : 'bg-transparent text-gray-400 border-gray-500 hover:border-dorren-light'}`}
                    >
                       <Maximize size={24}/>
                    </button>
                    <p className="text-xs mt-2 text-gray-300">Лестница</p>
                 </div>
              </div>

              {/* Info Box */}
              <div className="mt-8 bg-black/20 p-4 rounded border border-white/10 min-h-[80px]">
                 {activeEvacStep === 1 && <p><strong>Дверь в коридоре:</strong> Не должна сужать проход при открывании. Без порогов (или плоские). Фурнитура — нажимная ручка.</p>}
                 {activeEvacStep === 2 && <p><strong>Дверь в тамбур:</strong> Часто дымогазонепроницаемая (EIS). Самозакрывание (доводчик). Остекление для обзора.</p>}
                 {activeEvacStep === 3 && <p><strong>Дверь на лестницу:</strong> Огнестойкая (EI30/EI60). Система «Антипаника» (для массовых объектов). Открывание строго по ходу.</p>}
                 {!activeEvacStep && <p className="text-gray-400 italic text-center">Нажмите на этап маршрута</p>}
              </div>
           </div>
        </section>

        {/* 7. PRACTICE: SELECTION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Практика: Подберите дверь под нормы</h2>
           
           {!activePracticeScenario ? (
              <div className="grid md:grid-cols-3 gap-4">
                 {PRACTICE_SCENARIOS.map((s) => (
                    <button 
                      key={s.id}
                      onClick={() => { setActivePracticeScenario(s.id); setPracticeSelections([]); setPracticeFeedback(null); }}
                      className="bg-gray-50 p-6 rounded-xl text-left hover:bg-gray-100 transition-all border border-gray-200 hover:border-dorren-dark"
                    >
                       <h3 className="font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                       <div className="flex gap-2">
                          <span className="text-xs bg-white border px-2 py-1 rounded">Нажмите для разбора</span>
                       </div>
                    </button>
                 ))}
              </div>
           ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-6 animate-fade-in shadow-lg">
                 <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-lg text-dorren-dark">
                       {PRACTICE_SCENARIOS.find(s => s.id === activePracticeScenario)?.title}
                    </h3>
                    <button onClick={() => setActivePracticeScenario(null)} className="text-gray-400 hover:text-gray-600">
                       <X />
                    </button>
                 </div>

                 <p className="text-sm text-gray-600 mb-4">Отметьте факторы, которые ТОЧНО нужно учесть:</p>

                 <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      {id: 'dir', label: 'Направление (эвакуация)'},
                      {id: 'ei', label: 'Класс огнестойкости'},
                      {id: 'width', label: 'Минимальная ширина'},
                      {id: 'evac', label: 'Требования путей эвакуации'}
                    ].map((f) => (
                       <button 
                         key={f.id}
                         onClick={() => handlePracticeToggle(f.id)}
                         className={`p-3 text-sm text-left rounded border transition-all ${practiceSelections.includes(f.id) ? 'bg-dorren-dark text-white border-dorren-dark' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                       >
                          {practiceSelections.includes(f.id) ? <CheckSquare size={16} className="inline mr-2"/> : <div className="inline-block w-4 h-4 mr-2 border border-gray-400 rounded bg-white align-middle"></div>}
                          {f.label}
                       </button>
                    ))}
                 </div>

                 {!practiceFeedback ? (
                    <button 
                      onClick={checkPractice}
                      className="bg-dorren-dark text-white px-6 py-2 rounded font-bold hover:bg-opacity-90"
                    >
                       Проверить
                    </button>
                 ) : (
                    <div className="bg-green-50 p-4 rounded border border-green-200 animate-fade-in">
                       <p className="text-sm text-green-800 font-bold mb-1">Разбор:</p>
                       <p className="text-sm text-gray-700">{practiceFeedback}</p>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 8. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по нормам.</p>
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
                     className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2"
                     title="Модуль 6 завершен (в этом курсе)"
                   >
                     Завершить
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
        </section>

      </main>
    </div>
  );
};
