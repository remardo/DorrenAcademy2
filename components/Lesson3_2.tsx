
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, Box, Shield, 
  HelpCircle, ChevronRight, PenTool, 
  LayoutTemplate, Frame, BrickWall, Wrench, AlertTriangle, Hammer,
  CheckCircle, XCircle
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeFrameType, setActiveFrameType] = useState<string>('wood');
  const [thresholdScenario, setThresholdScenario] = useState<string>('medical');
  const [wallType, setWallType] = useState<string>('concrete');
  const [practiceStep, setPracticeStep] = useState<string | null>(null);
  const [practiceCorrect, setPracticeCorrect] = useState<boolean>(false);
  
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const FRAME_TYPES = [
    { 
      id: 'wood', 
      title: 'Деревянный / МДФ', 
      subtitle: 'Классика для интерьеров',
      pros: ['Эстетика (шпон, RAL)', 'Скрывает монтажный шов наличником', 'Доступная цена'],
      usage: 'Жилые комплексы, офисы, зоны без жестких норм',
      pitch: 'Решение для помещений с умеренной нагрузкой, где важен внешний вид.'
    },
    { 
      id: 'steel', 
      title: 'Стальной цельносварной', 
      subtitle: 'Прочность и стабильность',
      pros: ['Максимальная жёсткость', 'Огнестойкость (EI)', 'Долговечность (мед/школы)'],
      usage: 'Медицина, пути эвакуации, школы, ТЦ',
      pitch: '“Скелет” тяжёлой двери. Держит геометрию при больших нагрузках и пожаре.'
    },
    { 
      id: 'hidden', 
      title: 'Скрытый / Алюминий', 
      subtitle: 'Современный дизайн',
      pros: ['Минимализм (“дверь-невидимка”)', 'Интеграция в плоскость стены', 'Нет видимых наличников'],
      usage: 'Премиум-офисы, VIP-палаты, дизайнерские интерьеры',
      pitch: 'Чистый проём без лишних деталей. Требует идеальной подготовки стен.'
    }
  ];

  const WALL_MOUNTING = {
    concrete: {
      title: 'Бетон / Монолит',
      steps: ['Установка по уровню', 'Фиксация распорками', 'Анкерное крепление', 'Запенивание шва'],
      mistake: 'Плохая очистка проема от пыли перед пеной — пена отслоится.'
    },
    brick: {
      title: 'Кирпич',
      steps: ['Крепление в тело кирпича (не в шов!)', 'Использование дюбелей под кирпич', 'Контроль усилия (чтобы не расколоть)'],
      mistake: 'Перетяжка анкеров — коробку выгнет “бочкой”.'
    },
    drywall: {
      title: 'ГКЛ (Гипсокартон)',
      steps: ['Опора на усиленный профиль', 'Крепление к металлокаркасу', 'Закладные под тяжёлые двери'],
      mistake: 'Крепление только к листу ГКЛ без каркаса — дверь вырвет.'
    },
    sandwich: {
      title: 'Сэндвич-панель',
      steps: ['Обхватной короб (рама)', 'Сквозное крепление / шпильки', 'Распределение нагрузки'],
      mistake: 'Монтаж без ответной рамы — панель сомнется.'
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Для коридора с каталками и доступным маршрутом МГН мы рекомендуем:', 
      opts: [
        {id:'a', t:'Стальной короб с высоким порогом'}, 
        {id:'b', t:'Короб без порога + автопорог'}, 
        {id:'c', t:'Деревянный короб с порогом'}, 
        {id:'d', t:'Любой вариант'}
      ], 
      correct: 'b', 
      expl: 'Ровный пол критичен для каталок, а автопорог обеспечивает изоляцию.' 
    },
    { 
      id: 2, 
      q: 'Где критичнее всего использовать стальные цельносварные короба?', 
      opts: [
        {id:'a', t:'Гостевые санузлы'}, 
        {id:'b', t:'Палаты без требований EI'}, 
        {id:'c', t:'Противопожарные и нагруженные зоны'}, 
        {id:'d', t:'Дизайнерские интерьеры'}
      ], 
      correct: 'c', 
      expl: 'Сталь обеспечивает стабильность геометрии при пожаре и нагрузках.' 
    },
    { 
      id: 3, 
      q: 'В ГКЛ-перегородке дверь должна крепиться:', 
      opts: [
        {id:'a', t:'К листу ГКЛ саморезами'}, 
        {id:'b', t:'Только на пену'}, 
        {id:'c', t:'К усиленному металлокаркасу'}, 
        {id:'d', t:'К потолку'}
      ], 
      correct: 'c', 
      expl: 'Лист ГКЛ не выдержит динамическую нагрузку двери.' 
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

  const handlePracticeClick = (part: string) => {
    if (practiceStep === part) {
        setPracticeCorrect(true);
        setTimeout(() => {
            setPracticeStep(null);
            setPracticeCorrect(false);
        }, 2000);
    } else {
        alert("Не совсем верно. Попробуйте найти элемент на схеме.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="3.2" 
        title="Конструкция коробки" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dorren-dark via-dorren-dark/90 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                3.2. Конструкция коробки дверей Dorren
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираемся, какие бывают дверные короба, как они крепятся к стенам и почему от коробки зависят пожарная безопасность, акустика и комфорт движения.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><Frame size={16}/> Типы коробов</div>
                <div className="flex items-center gap-2"><Wrench size={16}/> Узлы монтажа</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к материалу
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/10 p-3 rounded flex items-center gap-3">
                      <div className="bg-dorren-light text-dorren-dark p-2 rounded"><PenTool size={20}/></div>
                      <span className="text-sm font-bold">Менеджеры</span>
                   </div>
                   <div className="bg-white/10 p-3 rounded flex items-center gap-3">
                      <div className="bg-dorren-light text-dorren-dark p-2 rounded"><LayoutTemplate size={20}/></div>
                      <span className="text-sm font-bold">Сметчики</span>
                   </div>
                </div>
                <div className="mt-6 text-sm text-gray-300">
                   <p className="mb-2 font-bold text-dorren-light">После урока вы сможете:</p>
                   <ul className="list-disc pl-5 space-y-1">
                      <li>Различать типы коробок (сталь, дерево, скрытые).</li>
                      <li>Подбирать решение "порог vs автопорог".</li>
                      <li>Понимать узлы крепления (бетон, ГКЛ).</li>
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему короб — это половина дверного решения</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Для клиента "дверь" — это полотно и ручка. Но для инженера Dorren это связка "полотно + короб + стена".
               Короб отвечает за геометрию, герметичность (звук/дым), пожарную безопасность и ресурс петлевой группы.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Мини-опрос
            </h3>
            <p className="text-sm text-gray-700 mb-3">С чем у ваших клиентов чаще всего ассоциируется "дверь"?</p>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Красивое полотно и цвет'},
                 {id: 2, t: 'Фурнитура (замки, ручки)'},
                 {id: 3, t: 'Коробка и узел в стене'},
                 {id: 4, t: 'Не задумываются, просто "дверь"'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Внимание обычно уходит на полотно. Ваша задача — показать, что "короб + узел" — это ключ к ресурсу и безопасности.
              </div>
            )}
          </div>
        </section>

        {/* 3. FRAME TYPES */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Основные типы коробок Dorren</h2>
           
           <div className="grid md:grid-cols-3 gap-4 mb-8">
              {FRAME_TYPES.map((type) => (
                 <button 
                   key={type.id}
                   onClick={() => setActiveFrameType(type.id)}
                   className={`p-4 rounded-xl border text-left transition-all h-full flex flex-col ${activeFrameType === type.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg scale-105 z-10' : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <div className="text-lg font-bold mb-1">{type.title}</div>
                    <div className={`text-xs mb-auto ${activeFrameType === type.id ? 'text-dorren-light' : 'text-gray-500'}`}>{type.subtitle}</div>
                 </button>
              ))}
           </div>
           
           <div className="bg-gray-50 border border-gray-200 p-8 rounded-xl animate-fade-in">
              {FRAME_TYPES.map((type) => type.id === activeFrameType && (
                 <div key={type.id} className="grid md:grid-cols-2 gap-8">
                    <div>
                       <h3 className="text-xl font-bold text-dorren-dark mb-4">{type.title}</h3>
                       <p className="text-gray-700 italic border-l-4 border-dorren-light pl-4 mb-6">
                          "{type.pitch}"
                       </p>
                       
                       <div className="space-y-4">
                          <div>
                             <h4 className="font-bold text-sm text-gray-900 uppercase mb-2">Где применяем</h4>
                             <p className="text-sm text-gray-600">{type.usage}</p>
                          </div>
                          <div>
                             <h4 className="font-bold text-sm text-gray-900 uppercase mb-2">Особенности</h4>
                             <ul className="space-y-1">
                                {type.pros.map((pro, i) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                      <CheckCircle size={14} className="text-green-600 mt-1 shrink-0" />
                                      {pro}
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200 p-8">
                       <div className="text-center">
                          <Box size={64} className="text-gray-300 mx-auto mb-4" />
                          <p className="text-[10px] text-gray-400 max-w-[200px] mx-auto border border-gray-300 p-1 rounded">
                             [ПРОМТ: Техническая иллюстрация сечения короба: {type.title}. Чёткие линии, штриховка материала.]
                          </p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 4. THRESHOLDS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Порог или без порога?</h2>
           <p className="text-gray-300 mb-8">
              Порог влияет на герметичность, звук и удобство. Выберите сценарий, чтобы увидеть рекомендацию.
           </p>
           
           <div className="flex flex-wrap gap-2 mb-8">
              {[
                {id: 'tech', label: 'Техническое помещение'},
                {id: 'medical', label: 'Коридор с каталками'},
                {id: 'exit', label: 'Эвакуационный выход'}
              ].map((scen) => (
                 <button 
                   key={scen.id}
                   onClick={() => setThresholdScenario(scen.id)}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${thresholdScenario === scen.id ? 'bg-dorren-light text-dorren-dark' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                    {scen.label}
                 </button>
              ))}
           </div>
           
           <div className="bg-white/10 border border-white/20 p-6 rounded-xl animate-fade-in flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-dorren-light mb-2">
                    {thresholdScenario === 'tech' && 'Классический порог'}
                    {thresholdScenario === 'medical' && 'Без порога + Автопорог'}
                    {thresholdScenario === 'exit' && 'Без порога + Автопорог'}
                 </h3>
                 <p className="text-gray-300 mb-4">
                    {thresholdScenario === 'tech' && 'Нужна максимальная герметичность и защита от сквозняков/воды. Барьер для тележек здесь не критичен.'}
                    {thresholdScenario === 'medical' && 'Критически важен ровный пол для плавного хода каталок. Автопорог опускается при закрытии для звукоизоляции.'}
                    {thresholdScenario === 'exit' && 'На путях эвакуации перепады высот недопустимы (риск споткнуться). Используем плоский пол.'}
                 </p>
                 <div className="text-xs bg-black/30 p-2 rounded inline-block">
                    {thresholdScenario === 'tech' ? 'Плюс: Изоляция. Минус: Спотыкание.' : 'Плюс: Безбарьерная среда. Минус: Сложнее механизм.'}
                 </div>
              </div>
              
              <div className="w-32 h-32 bg-white/5 border border-white/10 rounded flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-4xl mb-2">{thresholdScenario === 'tech' ? '🚪🛑' : '🚪✨'}</div>
                    <span className="text-[10px] text-gray-400">Схема узла</span>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. WALL MOUNTING */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Крепление коробки в разных стенах</h2>
           
           <div className="border-b border-gray-200 flex gap-4 overflow-x-auto mb-6">
              {Object.entries(WALL_MOUNTING).map(([key, data]) => (
                 <button 
                   key={key}
                   onClick={() => setWallType(key)}
                   className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${wallType === key ? 'border-dorren-dark text-dorren-dark' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                 >
                    {data.title}
                 </button>
              ))}
           </div>
           
           <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              <div>
                 <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600"/> Чек-лист монтажа
                 </h4>
                 <ul className="space-y-3">
                    {WALL_MOUNTING[wallType as keyof typeof WALL_MOUNTING].steps.map((step, i) => (
                       <li key={i} className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                          <span className="font-bold text-gray-400">{i+1}.</span> {step}
                       </li>
                    ))}
                 </ul>
              </div>
              
              <div>
                 <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                       <AlertTriangle size={18}/> Критическая ошибка
                    </h4>
                    <p className="text-sm text-red-700">
                       {WALL_MOUNTING[wallType as keyof typeof WALL_MOUNTING].mistake}
                    </p>
                 </div>
                 <div className="mt-4 flex justify-center">
                     <BrickWall size={48} className="text-gray-300" />
                 </div>
              </div>
           </div>
        </section>

        {/* 6. PRACTICE (HOTSPOT) */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm select-none">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Практика: Узел в разрезе</h2>
           <p className="text-gray-600 mb-6">Найдите элементы узла примыкания.</p>
           
           {practiceStep ? (
               <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-4 text-center text-blue-800 font-bold animate-pulse">
                  Найдите на схеме: {practiceStep === 'frame' ? 'Стойка коробки' : practiceStep === 'wall' ? 'Стеновая конструкция' : practiceStep === 'foam' ? 'Монтажный шов (пена)' : 'Порог / Пол'}
               </div>
           ) : (
               <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <span className="text-sm text-gray-500 mr-2 py-2">Нажмите, чтобы найти:</span>
                  {[
                    {id: 'frame', l: 'Стойка коробки'},
                    {id: 'wall', l: 'Стена'},
                    {id: 'foam', l: 'Монтажный шов'},
                    {id: 'floor', l: 'Пол'}
                  ].map(item => (
                     <button key={item.id} onClick={() => setPracticeStep(item.id)} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm font-medium transition-colors">
                        {item.l}
                     </button>
                  ))}
               </div>
           )}

           <div className="relative h-64 w-full max-w-lg mx-auto bg-white border border-gray-300 rounded overflow-hidden">
               {/* ABSTRACT CSS DIAGRAM */}
               
               {/* Wall (Left) */}
               <div 
                 onClick={() => handlePracticeClick('wall')}
                 className="absolute top-0 bottom-10 left-0 w-1/3 bg-gray-200 pattern-diagonal-lines cursor-pointer hover:opacity-80 transition-opacity border-r border-gray-300"
                 title="Стена"
               ></div>
               
               {/* Floor (Bottom) */}
               <div 
                 onClick={() => handlePracticeClick('floor')}
                 className="absolute bottom-0 left-0 right-0 h-10 bg-gray-300 border-t border-gray-400 cursor-pointer hover:bg-gray-400 transition-colors"
                 title="Пол"
               ></div>
               
               {/* Foam (Gap) */}
               <div 
                 onClick={() => handlePracticeClick('foam')}
                 className="absolute top-0 bottom-10 left-[33.3%] w-8 bg-yellow-100 cursor-pointer hover:bg-yellow-200 transition-colors flex items-center justify-center"
                 title="Пена"
               >
                  <div className="w-1 h-full bg-yellow-300/50"></div>
               </div>

               {/* Frame (Profile) */}
               <div 
                 onClick={() => handlePracticeClick('frame')}
                 className="absolute top-0 bottom-10 left-[calc(33.3%+2rem)] w-16 bg-dorren-dark cursor-pointer hover:bg-dorren-dark/90 transition-colors shadow-lg"
                 title="Коробка"
               >
                  {/* Door Leaf Hint */}
                  <div className="absolute top-4 bottom-4 right-0 w-2 bg-white/20"></div>
               </div>

               {/* Success Message Overlay */}
               {practiceCorrect && (
                   <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-sm animate-fade-in z-20">
                      <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                         <CheckCircle className="text-green-600" size={32} />
                         <div>
                            <p className="font-bold text-green-800">Верно!</p>
                            <p className="text-xs text-green-700">Элемент найден.</p>
                         </div>
                      </div>
                   </div>
               )}
           </div>
        </section>

        {/* 7. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">3 вопроса по теме урока.</p>
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
                  {calculateScore() === 3 
                    ? 'Отлично! Вы разбираетесь в коробах.' 
                    : 'Хорошая попытка, но стоит повторить раздел про монтаж.'}
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
               'Дверной блок = Полотно + Короб + Узел в стене.',
               'Стальные короба — стандарт для медицины и пожарной безопасности.',
               'Ровный пол + автопорог = идеальное решение для путей эвакуации и каталок.',
               'Тип крепления короба зависит от стены (бетон/кирпич/ГКЛ) — это нужно знать заранее.',
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
                Следующий урок: Притворы и пороги
                <ChevronRight size={16} />
             </button>
           </div>
        </section>

      </main>
    </div>
  );
};
