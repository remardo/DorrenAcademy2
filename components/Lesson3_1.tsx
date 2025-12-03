
import React, { useState } from 'react';
import { 
  ArrowRight, CheckCircle, Clock, Layers, Box, Shield, Eye, Flame, Volume2, 
  HelpCircle, ChevronRight, Scale, DollarSign, PenTool, LayoutTemplate, 
  Image as ImageIcon,
  Zap
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeAnatomy, setActiveAnatomy] = useState<string | null>(null);
  const [fillingType, setFillingType] = useState<string>('solid');
  const [edgeEnv, setEdgeEnv] = useState<string | null>(null);
  const [glazingType, setGlazingType] = useState<string>('none');
  
  // Configurator State
  const [configStep, setConfigStep] = useState(0);
  const [configScenario, setConfigScenario] = useState<string | null>(null);
  const [configSelections, setConfigSelections] = useState({
    filling: '',
    facing: '',
    edge: '',
    glazing: ''
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Data
  const ANATOMY_PARTS = [
    { id: 'frame', label: 'Каркас', title: 'Каркас полотна', desc: '«Скелет» полотна: задаёт геометрию, жёсткость, держит фурнитуру. Обычно комбинированный (дерево/фанера/МДФ).' },
    { id: 'filling', label: 'Заполнение', title: 'Внутреннее заполнение', desc: '«Начинка»: отвечает за вес, звукоизоляцию (Rw), огнестойкость (EI) и базовую жёсткость.' },
    { id: 'facing', label: 'Облицовка', title: 'Облицовка', desc: '«Кожа»: задаёт внешний вид, гигиеничность (HPL), стойкость к ударам и химии.' },
    { id: 'edge', label: 'Кромка', title: 'Кромка', desc: '«Броня по периметру»: защищает торцы от влаги и ударов. Самое уязвимое место.' },
    { id: 'glass', label: 'Остекление', title: 'Остекление', desc: '«Окно»: даёт обзор и свет, но влияет на звук и пожарку. Требует безопасного стекла.' }
  ];

  const FILLING_TYPES = [
    { id: 'honeycomb', label: 'Сотовое', w: 1, s: 1, f: 0, c: 1, desc: 'Минимальный вес и цена. Низкая звукоизоляция. Только для базовых задач.' },
    { id: 'tubular', label: 'Трубчатое', w: 2, s: 2, f: 1, c: 2, desc: 'Разумный компромисс. Легче сплошного, но тише сотового. Популярно в офисах.' },
    { id: 'solid', label: 'Сплошное', w: 3, s: 3, f: 2, c: 3, desc: 'Тяжелое, "солидное". Отличный звук. База для многих проектов.' },
    { id: 'mineral', label: 'Минераловатное (EI)', w: 3, s: 3, f: 3, c: 3, desc: 'Негорючее. Для противопожарных дверей. Хороший звук.' },
  ];

  const CONFIG_SCENARIOS = [
    { id: 'ward', title: 'Палата стационара', desc: 'Нужен баланс: тишина, гигиена, защита от каталок.' },
    { id: 'op', title: 'Операционный блок', desc: 'Максимальная стерильность, герметичность, обзор.' },
    { id: 'corridor', title: 'Коридор (Эвакуация)', desc: 'Огнестойкость, высокий трафик, удары.' },
    { id: 'office', title: 'Кабинет (Звук)', desc: 'Максимальная тишина для конфиденциальности.' }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Какое заполнение чаще всего даёт наилучший баланс огнестойкости и звукоизоляции в противопожарных дверях?', 
      opts: [{id:'a', t:'Сотовый картон'}, {id:'b', t:'Минераловатное / Огнезащитные плиты'}, {id:'c', t:'Пустое полотно'}, {id:'d', t:'Свинцовый лист'}], 
      correct: 'b', 
      expl: 'Минераловатное заполнение и специальные плиты — база для EI-дверей.' 
    },
    { 
      id: 2, 
      q: 'Какой тип облицовки оптимален для медицинских дверей с частой уборкой?', 
      opts: [{id:'a', t:'Шпон'}, {id:'b', t:'Краска по МДФ'}, {id:'c', t:'HPL-пластик'}, {id:'d', t:'Голый МДФ'}], 
      correct: 'c', 
      expl: 'HPL устойчив к химии и ударам.' 
    },
    { 
      id: 3, 
      q: 'Зачем выделяют усиленные зоны под петли и доводчик?', 
      opts: [{id:'a', t:'Ради красоты'}, {id:'b', t:'Для снижения цены'}, {id:'c', t:'Чтобы выдерживать нагрузки без разрушения'}, {id:'d', t:'Для упаковки'}], 
      correct: 'c', 
      expl: 'Это предотвращает вырывание крепежа.' 
    },
    { 
      id: 4, 
      q: 'Как большое остекление влияет на звукоизоляцию (без спецпакетов)?', 
      opts: [{id:'a', t:'Увеличивает'}, {id:'b', t:'Не влияет'}, {id:'c', t:'Снижает'}, {id:'d', t:'Зависит от коробки'}], 
      correct: 'c', 
      expl: 'Стекло обычно пропускает больше звука, чем глухое полотно.' 
    },
    { 
      id: 5, 
      q: 'Какую кромку предложить для коридора с тележками?', 
      opts: [{id:'a', t:'Без кромки'}, {id:'b', t:'Бумажная'}, {id:'c', t:'ABS или металл'}, {id:'d', t:'Лак'}], 
      correct: 'c', 
      expl: 'Нужна максимальная механическая защита торца.' 
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

  const resetConfigurator = () => {
    setConfigStep(0);
    setConfigScenario(null);
    setConfigSelections({ filling: '', facing: '', edge: '', glazing: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="3.1" 
        title="Конструкция полотна" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Layers className="absolute top-10 right-10 w-64 h-64 opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 3.1. Конструкция полотна двери Dorren
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем «пирог» двери: каркас, заполнение, облицовка, кромки. Как каждый слой влияет на вес, звук, огнестойкость и цену.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~20–25 минут</div>
                <div className="flex items-center gap-2"><PenTool size={16}/> Теория + Интерактив</div>
                <div className="flex items-center gap-2"><Scale size={16}/> Инженерный уровень</div>
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
                >
                  Посмотреть «разрез» полотна
                  <ArrowRight size={18} />
                </button>
             </div>
             <p className="mt-4 text-xs text-dorren-light/60">
                Вы начали модуль 3. Дальше — конструкция короба и притворы.
             </p>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 w-full aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                   <Layers size={64} className="text-dorren-light mx-auto mb-4 opacity-50" />
                   <div className="bg-black/50 p-2 rounded text-[10px] text-gray-400 font-mono border border-gray-600 max-w-xs mx-auto">
                     [ПРОМТ: Фотореалистичная 3D-иллюстрация дверного полотна в разрезе: виден каркас, соты/трубки, облицовка, кромка, стекло. Светлый фон, инженерный стиль.]
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему конструкция полотна — это «сердце» блока</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
              То, как спроектировано полотно, определяет половину успеха проекта. Именно оно даёт вес, жёсткость, звукоизоляцию, огнестойкость и ресурс. 
              Для клиента это ответы на вопросы: «Будет ли тихо?», «Выдержит ли удары?», «Пройдем ли пожарку?», «Почему так дорого?».
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что вы говорите клиенту о конструкции сейчас?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Говорю общими словами: "современные материалы, всё по нормам".'},
                 {id: 2, t: 'Называю пару слоёв (HPL, заполнение), не вдаваясь в детали.'},
                 {id: 3, t: 'Могу объяснить конструкцию и связать её с весом, звуком и ценой.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 После урока вы сможете уверенно обсуждать конструктив на уровне инженера.
              </div>
            )}
          </div>
        </section>

        {/* 3. ANATOMY INTERACTIVE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Анатомия полотна Dorren</h2>
           <p className="text-gray-600 mb-8">Нажмите на слой схемы, чтобы узнать детали.</p>

           <div className="flex flex-col md:flex-row gap-8">
              {/* Interactive SVG Diagram Placeholder */}
              <div className="md:w-1/2 relative h-80 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden select-none">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-300 font-bold text-4xl opacity-20">РАЗРЕЗ</div>
                 
                 {/* Layers Visualization (CSS stacked divs) */}
                 <div className="absolute inset-4 flex">
                    {/* Facing Left */}
                    <div 
                      onClick={() => setActiveAnatomy('facing')}
                      className={`w-4 h-full bg-blue-100 border-r border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors ${activeAnatomy === 'facing' ? 'bg-blue-300' : ''}`}
                      title="Облицовка"
                    ></div>
                    
                    {/* Frame/Filling Container */}
                    <div className="flex-1 flex flex-col h-full relative">
                       {/* Frame Top */}
                       <div 
                         onClick={() => setActiveAnatomy('frame')}
                         className={`w-full h-8 bg-amber-100 border-b border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors ${activeAnatomy === 'frame' ? 'bg-amber-300' : ''}`}
                         title="Каркас"
                       ></div>
                       
                       <div className="flex-1 flex">
                          {/* Frame Left */}
                          <div 
                            onClick={() => setActiveAnatomy('frame')}
                            className={`w-8 h-full bg-amber-100 border-r border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors ${activeAnatomy === 'frame' ? 'bg-amber-300' : ''}`}
                            title="Каркас"
                          ></div>
                          
                          {/* Filling */}
                          <div 
                            onClick={() => setActiveAnatomy('filling')}
                            className={`flex-1 h-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors pattern-grid-lg ${activeAnatomy === 'filling' ? 'bg-gray-300' : ''}`}
                            title="Заполнение"
                          >
                             {/* Glass Insert */}
                             <div 
                               onClick={(e) => { e.stopPropagation(); setActiveAnatomy('glass'); }}
                               className={`w-20 h-32 bg-cyan-100/50 border border-cyan-300 cursor-pointer hover:bg-cyan-200/50 flex items-center justify-center ${activeAnatomy === 'glass' ? 'bg-cyan-300/50' : ''}`}
                             >
                                <Eye size={16} className="text-cyan-600 opacity-50" />
                             </div>
                          </div>
                          
                          {/* Frame Right (Edge is on top of this technically, but let's simplify) */}
                          <div 
                             onClick={() => setActiveAnatomy('frame')}
                             className={`w-8 h-full bg-amber-100 border-l border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors ${activeAnatomy === 'frame' ? 'bg-amber-300' : ''}`}
                          ></div>
                       </div>
                       
                       {/* Frame Bottom */}
                       <div 
                         onClick={() => setActiveAnatomy('frame')}
                         className={`w-full h-8 bg-amber-100 border-t border-amber-200 cursor-pointer hover:bg-amber-200 transition-colors ${activeAnatomy === 'frame' ? 'bg-amber-300' : ''}`}
                       ></div>
                    </div>
                    
                    {/* Facing Right */}
                    <div 
                      onClick={() => setActiveAnatomy('facing')}
                      className={`w-4 h-full bg-blue-100 border-l border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors ${activeAnatomy === 'facing' ? 'bg-blue-300' : ''}`}
                    ></div>

                    {/* Edge (Overlay on right) */}
                    <div 
                       onClick={() => setActiveAnatomy('edge')}
                       className={`absolute top-0 right-0 w-2 h-full bg-gray-600 cursor-pointer hover:bg-gray-800 transition-colors ${activeAnatomy === 'edge' ? 'bg-red-500' : ''}`}
                       title="Кромка"
                    ></div>
                 </div>
              </div>

              {/* Info Panel */}
              <div className="md:w-1/2 flex flex-col justify-center">
                 {activeAnatomy ? (
                    <div className="animate-fade-in bg-dorren-bg p-6 rounded-xl border border-dorren-light/30">
                       <h3 className="text-xl font-bold text-dorren-dark mb-2">
                          {ANATOMY_PARTS.find(p => p.id === activeAnatomy)?.title}
                       </h3>
                       <p className="text-gray-700 leading-relaxed">
                          {ANATOMY_PARTS.find(p => p.id === activeAnatomy)?.desc}
                       </p>
                    </div>
                 ) : (
                    <div className="text-center text-gray-400 p-8 border-2 border-dashed border-gray-200 rounded-xl">
                       <p>Нажмите на любую зону схемы слева</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* 4. FRAME */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Каркас: на чём всё держится</h2>
           <p className="text-gray-700 mb-6">
             Каркас (рамка) — это не просто бруски по периметру. В нём скрыты усиления, которые держат петли и замки.
           </p>
           
           <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                 <h3 className="font-bold text-lg mb-3">Материалы</h3>
                 <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                    <li><strong>Дерево/LVL:</strong> Жёсткость, держит крепёж.</li>
                    <li><strong>МДФ:</strong> Подоснова для облицовки.</li>
                    <li><strong>Металл:</strong> Усиления и спецдвери.</li>
                 </ul>
                 
                 <h3 className="font-bold text-lg mb-3">Усиленные зоны</h3>
                 <p className="text-sm text-gray-600 mb-2">Где они находятся:</p>
                 <div className="flex flex-col gap-2">
                    {['Под петли (чтобы не вырвало)', 'Под замок (стабильность)', 'Под доводчик (верхняя зона)'].map((t,i) => (
                       <div key={i} className="bg-amber-50 px-3 py-2 rounded text-sm text-amber-900 border border-amber-100 flex items-center gap-2">
                          <CheckCircle size={14} className="text-amber-600"/> {t}
                       </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-center">
                 <div className="w-48 h-64 border-4 border-amber-200 relative bg-gray-50 rounded">
                    <span className="absolute -top-6 left-0 text-xs text-gray-400">Схема усилений</span>
                    {/* Closer Reinforcement */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-amber-300/50 border-b border-dashed border-amber-400 flex items-center justify-center text-[10px] text-amber-800 font-bold">ДОВОДЧИК</div>
                    
                    {/* Hinge Reinforcements */}
                    <div className="absolute top-16 right-0 w-8 h-12 bg-amber-300/50 border-l border-dashed border-amber-400"></div>
                    <div className="absolute bottom-16 right-0 w-8 h-12 bg-amber-300/50 border-l border-dashed border-amber-400"></div>
                    
                    {/* Lock Reinforcement */}
                    <div className="absolute top-1/2 left-0 w-12 h-16 -translate-y-1/2 bg-amber-300/50 border-r border-dashed border-amber-400 flex items-center justify-center text-[10px] text-amber-800 font-bold rotate-90">ЗАМОК</div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. FILLING */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Заполнение: чем «набита» дверь</h2>
           
           <div className="mb-6 flex flex-wrap gap-2">
              {FILLING_TYPES.map((type) => (
                 <button 
                   key={type.id}
                   onClick={() => setFillingType(type.id)}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${fillingType === type.id ? 'bg-dorren-light text-dorren-dark' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                    {type.label}
                 </button>
              ))}
           </div>
           
           <div className="bg-white/10 p-6 rounded-xl border border-white/10 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                 <div className="flex-1">
                    <h3 className="text-xl font-bold text-dorren-light mb-2">
                       {FILLING_TYPES.find(f => f.id === fillingType)?.label}
                    </h3>
                    <p className="text-gray-300 mb-6">
                       {FILLING_TYPES.find(f => f.id === fillingType)?.desc}
                    </p>
                    
                    <div className="space-y-4">
                       {[
                         { l: 'Вес', v: FILLING_TYPES.find(f => f.id === fillingType)?.w, i: Scale },
                         { l: 'Звук (Rw)', v: FILLING_TYPES.find(f => f.id === fillingType)?.s, i: Volume2 },
                         { l: 'Огонь (EI)', v: FILLING_TYPES.find(f => f.id === fillingType)?.f, i: Flame },
                         { l: 'Цена', v: FILLING_TYPES.find(f => f.id === fillingType)?.c, i: DollarSign },
                       ].map((stat, i) => (
                          <div key={i} className="flex items-center gap-4">
                             <div className="w-24 text-sm text-gray-400 flex items-center gap-2">
                                <stat.i size={14} /> {stat.l}
                             </div>
                             <div className="flex-1 flex gap-1">
                                {[1,2,3].map(lvl => (
                                   <div key={lvl} className={`h-2 flex-1 rounded-sm ${lvl <= (stat.v || 0) ? 'bg-dorren-light' : 'bg-white/10'}`}></div>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="md:w-1/3 flex items-center justify-center">
                    {/* Visual Placeholder for Filling Type */}
                    <div className="w-32 h-32 bg-white/5 border border-white/20 rounded flex items-center justify-center text-xs text-gray-500 font-mono text-center p-2">
                       [Разрез: {FILLING_TYPES.find(f => f.id === fillingType)?.label}]
                       <ImageIcon size={24} className="mx-auto mt-2 opacity-30" />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 6. FACING & EDGES */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Облицовка и кромки</h2>
           <p className="text-gray-600 mb-6">Внешний вид, гигиена и защита самого уязвимого места — торца.</p>

           <div className="grid md:grid-cols-2 gap-8">
              <div>
                 <h3 className="font-bold text-lg mb-2">Выберите среду:</h3>
                 <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      {id: 'ward', t: 'Палата'},
                      {id: 'wc', t: 'Санузел'},
                      {id: 'corridor', t: 'Коридор (тележки)'},
                      {id: 'office', t: 'Офис'}
                    ].map((env) => (
                       <button 
                         key={env.id}
                         onClick={() => setEdgeEnv(env.id)}
                         className={`p-3 rounded text-sm text-left border transition-all ${edgeEnv === env.id ? 'bg-dorren-dark text-white border-dorren-dark' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                       >
                          {env.t}
                       </button>
                    ))}
                 </div>
                 
                 <div className="min-h-[120px]">
                    {edgeEnv ? (
                       <div className="animate-fade-in bg-blue-50 p-4 rounded-lg border border-blue-100">
                          {edgeEnv === 'ward' && (
                             <>
                                <p className="font-bold text-blue-900 mb-1">Рекомендация:</p>
                                <ul className="text-sm text-blue-800 list-disc pl-4">
                                   <li><strong>Облицовка:</strong> HPL (гигиена, стойкость).</li>
                                   <li><strong>Кромка:</strong> ABS или ПВХ (защита от влаги).</li>
                                </ul>
                             </>
                          )}
                          {edgeEnv === 'wc' && (
                             <>
                                <p className="font-bold text-blue-900 mb-1">Рекомендация:</p>
                                <ul className="text-sm text-blue-800 list-disc pl-4">
                                   <li><strong>Облицовка:</strong> HPL/CPL влагостойкий.</li>
                                   <li><strong>Кромка:</strong> ABS/ПВХ с герметизацией.</li>
                                </ul>
                             </>
                          )}
                          {edgeEnv === 'corridor' && (
                             <>
                                <p className="font-bold text-blue-900 mb-1">Рекомендация:</p>
                                <ul className="text-sm text-blue-800 list-disc pl-4">
                                   <li><strong>Облицовка:</strong> HPL (антивандальный).</li>
                                   <li><strong>Кромка:</strong> Металл или толстый ABS (защита от ударов).</li>
                                </ul>
                             </>
                          )}
                          {edgeEnv === 'office' && (
                             <>
                                <p className="font-bold text-blue-900 mb-1">Рекомендация:</p>
                                <ul className="text-sm text-blue-800 list-disc pl-4">
                                   <li><strong>Облицовка:</strong> Краска/Шпон (эстетика).</li>
                                   <li><strong>Кромка:</strong> ABS в цвет или шпон.</li>
                                </ul>
                             </>
                          )}
                       </div>
                    ) : (
                       <p className="text-gray-400 italic text-sm">Нажмите на среду, чтобы получить рекомендацию.</p>
                    )}
                 </div>
              </div>
              
              <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-center p-4">
                     <LayoutTemplate size={48} className="text-gray-300 mx-auto mb-2" />
                     <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto border border-gray-300 p-1 rounded bg-white">
                        [ПРОМТ: Макро-рендер торца двери. Виден срез HPL, сердцевина и приклеенная кромка. Чёткий стык.]
                     </p>
                  </div>
              </div>
           </div>
        </section>

        {/* 7. GLAZING */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Остекление: свет и безопасность</h2>
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex justify-center gap-4 mb-6">
                 {[
                   {id: 'none', t: 'Без стекла'},
                   {id: 'porthole', t: 'Иллюминатор'},
                   {id: 'strip', t: 'Полоса'},
                   {id: 'full', t: 'Большое'}
                 ].map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setGlazingType(opt.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${glazingType === opt.id ? 'bg-dorren-light text-dorren-dark shadow' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    >
                       {opt.t}
                    </button>
                 ))}
              </div>
              
              <div className="bg-dorren-bg p-4 rounded-xl border border-dorren-light/20 flex gap-6 items-center">
                 <div className="text-center w-24">
                    <div className="text-4xl mb-2">
                       {glazingType === 'none' && '🚪'}
                       {glazingType === 'porthole' && '⏺️'}
                       {glazingType === 'strip' && '❙'}
                       {glazingType === 'full' && '🔲'}
                    </div>
                 </div>
                 <div className="flex-1">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                       <div className="flex justify-between border-b border-dorren-light/20 pb-1">
                          <span className="text-gray-600">Свет/Обзор</span>
                          <span className="font-bold text-dorren-dark">
                             {glazingType === 'none' ? 'Нет' : glazingType === 'full' ? 'Максимум' : 'Средне'}
                          </span>
                       </div>
                       <div className="flex justify-between border-b border-dorren-light/20 pb-1">
                          <span className="text-gray-600">Звук (Rw)</span>
                          <span className="font-bold text-dorren-dark">
                             {glazingType === 'none' ? 'Макс.' : 'Снижается'}
                          </span>
                       </div>
                       <div className="flex justify-between border-b border-dorren-light/20 pb-1">
                          <span className="text-gray-600">Стоимость</span>
                          <span className="font-bold text-dorren-dark">
                             {glazingType === 'none' ? 'База' : 'Растет'}
                          </span>
                       </div>
                       <div className="flex justify-between border-b border-dorren-light/20 pb-1">
                          <span className="text-gray-600">Безопасность</span>
                          <span className="font-bold text-dorren-dark">
                             {glazingType === 'none' ? '-' : 'Требует закалки/триплекса'}
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. CONFIGURATOR WIZARD */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-2">Интерактив: Соберите полотно</h2>
           <p className="text-gray-300 mb-6">Подберите конструкцию под задачу.</p>
           
           {configStep === 0 && (
              <div className="animate-fade-in">
                 <p className="font-bold mb-4 text-dorren-light">Шаг 1: Выберите сценарий</p>
                 <div className="grid md:grid-cols-2 gap-4">
                    {CONFIG_SCENARIOS.map((scen) => (
                       <button 
                         key={scen.id}
                         onClick={() => { setConfigScenario(scen.id); setConfigStep(1); }}
                         className="p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-left transition-all"
                       >
                          <h4 className="font-bold text-lg mb-1">{scen.title}</h4>
                          <p className="text-sm text-gray-400">{scen.desc}</p>
                       </button>
                    ))}
                 </div>
              </div>
           )}

           {configStep === 1 && (
              <div className="animate-fade-in space-y-6">
                 <p className="font-bold mb-2 text-dorren-light">Шаг 2: Конфигурация для "{CONFIG_SCENARIOS.find(s => s.id === configScenario)?.title}"</p>
                 
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Заполнение</label>
                    <div className="flex flex-wrap gap-2">
                       {['Сотовое', 'Трубчатое', 'Сплошное', 'Минераловатное'].map(opt => (
                          <button key={opt} onClick={() => setConfigSelections({...configSelections, filling: opt})} className={`px-3 py-1 rounded border text-sm ${configSelections.filling === opt ? 'bg-dorren-light text-dorren-dark border-dorren-light' : 'border-gray-500 text-gray-300'}`}>{opt}</button>
                       ))}
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Облицовка</label>
                    <div className="flex flex-wrap gap-2">
                       {['HPL', 'Краска', 'Шпон'].map(opt => (
                          <button key={opt} onClick={() => setConfigSelections({...configSelections, facing: opt})} className={`px-3 py-1 rounded border text-sm ${configSelections.facing === opt ? 'bg-dorren-light text-dorren-dark border-dorren-light' : 'border-gray-500 text-gray-300'}`}>{opt}</button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-xs uppercase text-gray-400 mb-2">Кромка</label>
                    <div className="flex flex-wrap gap-2">
                       {['ПВХ', 'ABS', 'Металл'].map(opt => (
                          <button key={opt} onClick={() => setConfigSelections({...configSelections, edge: opt})} className={`px-3 py-1 rounded border text-sm ${configSelections.edge === opt ? 'bg-dorren-light text-dorren-dark border-dorren-light' : 'border-gray-500 text-gray-300'}`}>{opt}</button>
                       ))}
                    </div>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button onClick={() => setConfigStep(0)} className="text-gray-400 text-sm hover:text-white">Назад</button>
                    <button 
                      onClick={() => setConfigStep(2)}
                      disabled={!configSelections.filling || !configSelections.facing || !configSelections.edge}
                      className="bg-dorren-light text-dorren-dark px-6 py-2 rounded font-bold disabled:opacity-50 hover:bg-white transition-colors"
                    >
                       Готово
                    </button>
                 </div>
              </div>
           )}

           {configStep === 2 && (
              <div className="animate-fade-in bg-white/10 p-6 rounded-xl border border-white/20">
                 <h3 className="text-xl font-bold text-dorren-light mb-4">Результат сборки</h3>
                 <div className="space-y-2 mb-6 text-sm">
                    <p><span className="text-gray-400">Сценарий:</span> {CONFIG_SCENARIOS.find(s => s.id === configScenario)?.title}</p>
                    <p><span className="text-gray-400">Состав:</span> {configSelections.filling} + {configSelections.facing} + {configSelections.edge}</p>
                 </div>
                 
                 <div className="bg-dorren-dark p-4 rounded border border-white/10 text-sm text-gray-300 italic">
                    {/* Simple dynamic feedback logic */}
                    {configScenario === 'ward' && configSelections.facing === 'HPL' && configSelections.filling === 'Сплошное' 
                       ? "✅ Отличный выбор! HPL для гигиены, сплошное заполнение для тишины."
                       : configScenario === 'corridor' && configSelections.filling === 'Минераловатное'
                       ? "✅ Правильно! Минераловатное заполнение необходимо для огнестойкости в коридорах."
                       : "⚠️ Решение рабочее, но проверьте: для медицины лучше HPL, для пожарки — минвата, для тишины — сплошное."}
                 </div>
                 
                 <button onClick={resetConfigurator} className="mt-6 text-dorren-light underline text-sm">Собрать другую дверь</button>
              </div>
           )}
        </section>

        {/* 9. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">5 вопросов по конструктиву.</p>
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
                  {calculateScore() >= 4 
                    ? 'Отлично! Вы разобрались в слоях полотна.' 
                    : 'Хорошая попытка, но стоит повторить раздел про заполнения.'}
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

        {/* 10. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы урока 3.1</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Полотно Dorren — это многослойная система, а не "доска с ручкой".',
               'Каркас держит геометрию и фурнитуру (петли, замки).',
               'Заполнение определяет вес, звук (Rw) и огнестойкость (EI).',
               'HPL и усиленные кромки — стандарт для медицины (защита от химии и ударов).',
               'Остекление влияет на звук и требует безопасного стекла (триплекс/закалка).',
               'Объясняя слои, вы объясняете цену и ценность двери.'
             ].map((txt, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
           <div className="text-center">
             <button 
               className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2 mx-auto"
               title="Следующий урок в разработке"
             >
                Следующий урок: Короба и притворы
                <ChevronRight size={16} />
             </button>
           </div>
        </section>

      </main>
    </div>
  );
};
