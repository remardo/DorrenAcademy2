
import React, { useState } from 'react';
import { 
  Clock, CheckCircle, ChevronRight, CheckSquare, 
  DoorOpen, Stethoscope, Flame, Zap, Shield, Volume2, Move,
  Info, ArrowRight, LayoutGrid, Users
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson2_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [checklist, setChecklist] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('public');
  const [selectorObject, setSelectorObject] = useState<string>('');
  const [selectorPriority, setSelectorPriority] = useState<string>('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- Data ---
  const SELF_CHECK = [
    'Я уверенно отличаю противопожарную дверь от обычной.',
    'Я знаю, зачем нужны рентгенозащитные двери и чем они отличаются конструктивно.',
    'Я понимаю, где на объекте нужны двери с повышенной звукоизоляцией.',
    'Я могу объяснить заказчику, что такое “антивандальная” дверь.'
  ];

  const PRODUCT_GROUPS = [
    { id: 'public', icon: Users, title: 'Общественные', sub: 'ТЦ, БЦ, школы, офисы', desc: 'Износостойкость, вандалостойкость и аккуратный вид при тысячах циклов.' },
    { id: 'medical', icon: Stethoscope, title: 'Медицинские', sub: 'Палаты, операционные, чистые зоны', desc: 'Гигиена, долговечность, безопасность и удобство для персонала.' },
    { id: 'fire', icon: Flame, title: 'Противопожарные', sub: 'Пути эвакуации, техпомещения', desc: 'Сдерживают огонь и дым (EI30/EI60), обеспечивают эвакуацию.' },
    { id: 'xray', icon: Zap, title: 'Рентгенозащитные', sub: 'Рентген, КТ, ангиографы', desc: 'Слой свинца внутри защищает от излучения.' },
    { id: 'vandal', icon: Shield, title: 'Антивандальные', sub: 'Школы, склады, входные группы', desc: 'Усиленные конструкции, устойчивые к ударам и нагрузкам.' },
    { id: 'sound', icon: Volume2, title: 'Звукоизоляционные', sub: 'Отели, переговорные, кабинеты', desc: 'Комфорт и приватность, снижение шума.' },
    { id: 'auto', icon: Move, title: 'Автоматические', sub: 'Входные группы, Smart-доступ', desc: 'Раздвижные, маятниковые, интеграция со СКУД.' },
  ];

  const DETAILED_GROUPS: Record<string, any> = {
    public: {
      title: 'Общественные двери',
      intro: 'Главное ожидание заказчика — чтобы они выдерживали трафик, не боялись тележек и ударов, сохраняли внешний вид.',
      zones: ['Входные группы и коридоры ТЦ и БЦ', 'Офисные коридоры и кабинеты', 'Общественные зоны школ и вузов', 'Технические и подсобные помещения'],
      specs: ['Усиленные полотна и короба', 'Износостойкие покрытия (HPL, порошок)', 'Отбойники из нержавейки', 'Ресурс в сотни тысяч циклов'],
      case: 'Пример: крупный ТЦ. Входные двери должны переживать тележки и чемоданы. Металлические двери с отбойниками сокращают затраты на ремонт.',
      imgPrompt: 'Фотореалистичный коридор ТЦ или БЦ: светлые стены, ряд массивных металлических дверей с остеклением и отбойниками, люди с тележками.'
    },
    medical: {
      title: 'Медицинские двери',
      intro: 'Заказчику важно, чтобы двери легко мылись, выдерживали тележки и каталку, не боялись дезсредств и соответствовали нормам.',
      zones: ['Палаты разных категорий', 'Кабинеты врачей', 'Операционные и чистые коридоры', 'Санузлы в клинике'],
      specs: ['Покрытия HPL/CPL устойчивые к химии', 'Защищённые кромки (алюминий/нержавейка)', 'Герметичное и чистовое исполнение', 'Звукоизоляция для палат'],
      case: 'В палате важны тишина и вид, в процедурной — гигиена. Используем блоки с антивандальным пластиком и защищёнными торцами.',
      imgPrompt: 'Светлый коридор клиники: гладкие HPL-двери с алюминиевыми торцами и смотровыми окнами. Стерильный стиль.'
    },
    fire: {
      title: 'Противопожарные двери',
      intro: 'Должны удержать огонь и дым. Заказчик спрашивает: “Нам нужно EI30 или EI60, чтобы пройти экспертизу”.',
      zones: ['Пути эвакуации (коридоры, холлы)', 'Лестничные клетки', 'Электрощитовые, серверные', 'Пожарные отсеки'],
      specs: ['Сертифицированная огнестойкость (EI30/60)', 'Интумесцентные уплотнители', 'Обязательные доводчики', 'Варианты: металл или дерево'],
      case: 'В коридоре клиники нужно EI60, но без индустриального вида. Ставим деревянные противопожарные двери в дизайне интерьера.',
      imgPrompt: 'Фрагмент лестничной клетки: противопожарная дверь с табличкой класса огнестойкости, доводчиком и уплотнителями.'
    },
    xray: {
      title: 'Рентгенозащитные двери',
      intro: 'Защищают от радиации. Внутри — свинец. Должны выглядеть как “обычная” дверь в медцентре.',
      zones: ['Рентген-кабинеты', 'Кабинеты КТ', 'Ангиографические', 'Радиологические отделения'],
      specs: ['Свинцовая плита внутри (1–2.5 мм Pb)', 'Свинцовое остекление', 'Гладкие поверхности для уборки', 'Интеграция с индикацией “Не входить”'],
      case: 'Диагностический центр: двери с Pb-защитой и смотровым окном, внешне неотличимые от остальных дверей клиники.',
      imgPrompt: 'Вход в рентген-кабинет: дверь с пиктограммой радиации, свинцовым стеклом и индикатором над входом.'
    },
    vandal: {
      title: 'Антивандальные / износостойкие',
      intro: 'Двери “на убой”: школы, казармы, склады. Заказчик хочет поставить и забыть про ремонты.',
      zones: ['Школы, вузы (классы, спортзалы)', 'Входные группы', 'Казармы и спецобъекты', 'Склады'],
      specs: ['Усиленные конструкции', 'Антивандальные покрытия (толстый HPL)', 'Сплошные отбойники', 'Усиленная фурнитура'],
      case: 'В школе двери страдают от ударов портфелями. Антивандальные двери с отбойниками сохраняют вид на годы.',
      imgPrompt: 'Коридор школы: усиленные двери с заметными отбойниками из нержавейки, следы активной эксплуатации, но дверь целая.'
    },
    sound: {
      title: 'Звукоизоляционные двери',
      intro: 'Двери, которые “держат звук”. Заказчик ожидает тишины и приватности в номерах и кабинетах.',
      zones: ['Номера в отелях', 'Переговорные', 'Кабинеты руководителей', 'Кабинеты психологов'],
      specs: ['Слоистое заполнение полотна', 'Опускающиеся пороги', 'Уплотнители по периметру', 'Часто совмещены с EI (для отелей)'],
      case: 'В отеле гость не должен слышать коридор. Двери проектируются с повышенной звукоизоляцией (до 42dB).',
      imgPrompt: 'Коридор отеля: массивные двери в номера с табличками, ковровое покрытие, атмосфера тишины.'
    },
    auto: {
      title: 'Автоматические решения',
      intro: 'Открываются сами, управляют потоками. Раздвижные, маятниковые, Smart-доступ.',
      zones: ['Входные группы', 'Коридоры с трафиком', 'Операционные (бесконтакт)', 'Smart-зоны'],
      specs: ['Приводы для раздвижных/распашных дверей', 'Интеграция со СКУД (FaceID, карты)', 'Бесконтактное открывание (локтевые кнопки)'],
      case: 'В клинике входные группы и операционные оснащены автоматикой для гигиены и скорости потока.',
      imgPrompt: 'Стеклянные автоматические раздвижные двери на входе в клинику, рядом элементы СКУД.'
    }
  };

  const QUIZ_QUESTIONS = [
    { 
      id: 1, 
      q: 'Заказчику нужны двери в рентген-кабинет с защитой и легкой уборкой. Какая группа?', 
      opts: [{id:'a', t:'Общественные'}, {id:'b', t:'Противопожарные'}, {id:'c', t:'Рентгенозащитные'}, {id:'d', t:'Звукоизоляционные'}], 
      correct: 'c',
      expl: 'Рентгенозащитные двери имеют свинцовую защиту внутри полотна и короба.'
    },
    { 
      id: 2, 
      q: 'В отеле гость слышит шум из коридора. Какая группа дверей нужна?', 
      opts: [{id:'a', t:'Звукоизоляционные'}, {id:'b', t:'Антивандальные'}, {id:'c', t:'Рентгенозащитные'}, {id:'d', t:'Автоматические'}], 
      correct: 'a',
      expl: 'Для номеров и переговорных используются двери с повышенной звукоизоляцией (dB).'
    },
    { 
      id: 3, 
      q: 'Школа хочет снизить расходы на ремонт дверей в коридорах. Что предложить?', 
      opts: [{id:'a', t:'Медицинские'}, {id:'b', t:'Антивандальные'}, {id:'c', t:'Автоматические'}, {id:'d', t:'Рентгенозащитные'}], 
      correct: 'b',
      expl: 'Усиленная конструкция и отбойники защищают от ударов и интенсивного трафика.'
    }
  ];

  const handleSelfCheck = (idx: number) => {
    setChecklist(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const getSelectorResult = () => {
    if (!selectorObject || !selectorPriority) return null;
    
    // Simple logic for demo purposes
    if (selectorObject === 'clinic' && selectorPriority === 'hygiene') return {
      title: 'Рекомендуемые группы:',
      items: ['Медицинские двери (база)', 'Двери для чистых помещений', 'Противопожарные (для эвакуации)']
    };
    if (selectorObject === 'school' && selectorPriority === 'wear') return {
      title: 'Рекомендуемые группы:',
      items: ['Антивандальные / износостойкие', 'Противопожарные (коридоры)', 'Общественные (классы)']
    };
    if (selectorObject === 'hotel' && selectorPriority === 'quiet') return {
      title: 'Рекомендуемые группы:',
      items: ['Звукоизоляционные (номера)', 'Противопожарные (входные в номер)', 'Служебные/Технические']
    };
    
    // Fallback generic response
    return {
      title: 'Возможные решения:',
      items: ['Общественные двери', 'Противопожарные двери', 'Специальные под задачу']
    };
  };

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="2.1" 
        title="Основные группы решений" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. Hero */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-dorren-light to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="md:w-1/2">
              <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 2. Ассортимент и типология
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 2.1. Основные группы дверных решений
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разложим ассортимент на понятные полки: от медицинских и общественных до противопожарных и защитных.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                 <div className="flex items-center gap-2"><Clock size={16}/> ~10–15 минут</div>
                 <div className="flex items-center gap-2"><LayoutGrid size={16}/> Теория + Практика</div>
                 <div className="flex items-center gap-2"><Users size={16}/> Базовый уровень</div>
              </div>

              <button 
                onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                Начать знакомство
                <ArrowRight size={18} />
              </button>
           </div>
           
           <div className="md:w-1/2 w-full">
              {/* Image Placeholder */}
              <div className="aspect-video bg-gray-800 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-dorren-dark to-gray-800 opacity-90"></div>
                 <div className="relative z-10 text-center px-6">
                    <DoorOpen size={64} className="text-dorren-light mx-auto mb-4 opacity-50" />
                    <p className="text-xs text-gray-500 font-mono border border-gray-600 p-2 rounded max-w-sm mx-auto">
                       [ПРОМТ: 3D-коллаж: коридор клиники с белыми дверями + фрагмент БЦ с металлической дверью + отель. Стиль B2B-каталога.]
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 space-y-16">

        {/* 2. Objectives & Self-Check */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Чему вы научитесь</h2>
           <p className="text-gray-700 mb-6">
             Ассортимент кажется сложным, но мы выделим 7 главных групп, с которыми вы будете работать каждый день.
           </p>
           
           <div className="grid md:grid-cols-2 gap-8">
              <div>
                 <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">После урока вы сможете:</h3>
                 <ul className="space-y-3">
                    {[
                      'Назвать 7 ключевых групп решений Dorren.',
                      'Объяснять отличия «языком клиента» (мед vs офис).',
                      'Понимать зоны применения (где нужна пожарка, где звук).',
                      'Быстро подбирать группу под типичный запрос.'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={16} className="text-dorren-dark mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
              
              <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
                 <h3 className="font-bold text-dorren-dark mb-3 text-sm uppercase tracking-wide">Чек-лист перед стартом</h3>
                 <p className="text-xs text-gray-500 mb-4">Отметьте, что вам уже знакомо:</p>
                 <div className="space-y-2">
                    {SELF_CHECK.map((item, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                         <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${checklist.includes(i) ? 'bg-dorren-dark border-dorren-dark text-white' : 'bg-white border-gray-300 group-hover:border-dorren-dark'}`}>
                            {checklist.includes(i) && <CheckSquare size={14} />}
                            <input type="checkbox" className="hidden" onChange={() => handleSelfCheck(i)} checked={checklist.includes(i)} />
                         </div>
                         <span className={`text-sm ${checklist.includes(i) ? 'text-gray-900' : 'text-gray-600'}`}>{item}</span>
                      </label>
                    ))}
                 </div>
                 {checklist.length > 0 && (
                    <p className="text-xs text-dorren-dark mt-4 animate-fade-in">
                       Отлично! Сохраните ответы, вернемся к ним в конце.
                    </p>
                 )}
              </div>
           </div>
        </section>

        {/* 3. Product Groups Overview */}
        <section id="overview">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">7 основных групп дверей</h2>
           <p className="text-gray-600 mb-8 max-w-3xl">
              Dorren проектирует готовые дверные блоки под задачу объекта. Вот основные функциональные группы.
           </p>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCT_GROUPS.map((group) => (
                <button 
                  key={group.id}
                  onClick={() => { setActiveTab(group.id); document.getElementById('details')?.scrollIntoView({behavior: 'smooth'}); }}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-dorren-light hover:shadow-md transition-all text-left group flex flex-col h-full"
                >
                   <div className="w-12 h-12 bg-dorren-bg text-dorren-dark rounded-lg flex items-center justify-center mb-4 group-hover:bg-dorren-dark group-hover:text-white transition-colors">
                      <group.icon size={24} />
                   </div>
                   <h3 className="font-bold text-lg text-gray-900 mb-1">{group.title}</h3>
                   <p className="text-xs text-dorren-dark font-medium mb-3 uppercase tracking-wide">{group.sub}</p>
                   <p className="text-sm text-gray-600 leading-relaxed mt-auto">{group.desc}</p>
                </button>
              ))}
           </div>
           
           {/* Visual Placeholder for All Doors */}
           <div className="mt-8 bg-gray-100 rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-xs text-gray-400 font-mono mb-2">[ПРОМТ: Изометрическая иллюстрация: 7 дверей в ряд (мед, пожарка, офис и т.д.)]</p>
              <div className="flex justify-center gap-4 opacity-30">
                 <DoorOpen size={32} /> <Stethoscope size={32} /> <Flame size={32} /> <Zap size={32} />
              </div>
           </div>
        </section>

        {/* 4. Detailed Tabs */}
        <section id="details" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="bg-gray-50 border-b border-gray-200 p-2 overflow-x-auto flex gap-2">
              {PRODUCT_GROUPS.map((group) => (
                 <button
                   key={group.id}
                   onClick={() => setActiveTab(group.id)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === group.id ? 'bg-dorren-dark text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                 >
                    {group.title}
                 </button>
              ))}
           </div>
           
           <div className="p-8 animate-fade-in">
              {activeTab && DETAILED_GROUPS[activeTab] && (
                 <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-3/5 space-y-8">
                       <div>
                          <h3 className="text-2xl font-bold text-dorren-dark mb-4">{DETAILED_GROUPS[activeTab].title}</h3>
                          <p className="text-lg text-gray-700 italic border-l-4 border-dorren-light pl-4">
                             "{DETAILED_GROUPS[activeTab].intro}"
                          </p>
                       </div>
                       
                       <div className="grid sm:grid-cols-2 gap-8">
                          <div>
                             <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Зоны применения</h4>
                             <ul className="space-y-2">
                                {DETAILED_GROUPS[activeTab].zones.map((z: string, i: number) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <div className="w-1.5 h-1.5 rounded-full bg-dorren-dark mt-1.5 shrink-0"></div>
                                      <span>{z}</span>
                                   </li>
                                ))}
                             </ul>
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase">Характеристики</h4>
                             <ul className="space-y-2">
                                {DETAILED_GROUPS[activeTab].specs.map((s: string, i: number) => (
                                   <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <CheckCircle size={14} className="text-green-600 mt-0.5 shrink-0" />
                                      <span>{s}</span>
                                   </li>
                                ))}
                             </ul>
                          </div>
                       </div>

                       <div className="bg-dorren-bg p-4 rounded-lg border border-dorren-light/30">
                          <span className="text-xs font-bold text-dorren-dark uppercase tracking-wide block mb-1">Мини-кейс</span>
                          <p className="text-sm text-gray-700">{DETAILED_GROUPS[activeTab].case}</p>
                       </div>
                    </div>

                    <div className="lg:w-2/5">
                       <div className="aspect-[3/4] bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                             {React.createElement(PRODUCT_GROUPS.find(g => g.id === activeTab)!.icon, { size: 40, className: 'text-dorren-dark' })}
                          </div>
                          <p className="text-xs text-gray-400 font-mono leading-relaxed border border-gray-300 p-2 rounded bg-white">
                             {DETAILED_GROUPS[activeTab].imgPrompt}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">Место для фотореалистичного рендера</p>
                       </div>
                    </div>
                 </div>
              )}
           </div>
        </section>

        {/* 5. Interactive Selector */}
        <section className="bg-dorren-dark rounded-2xl p-8 text-white">
           <h2 className="text-2xl font-bold mb-6">Подберите группу под задачу</h2>
           <p className="text-gray-300 mb-8 max-w-2xl">
              Выберите тип объекта и приоритет — система подскажет, какие двери Dorren здесь работают.
           </p>
           
           <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-dorren-light mb-2">Тип объекта</label>
                    <select 
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:border-dorren-light outline-none"
                      onChange={(e) => setSelectorObject(e.target.value)}
                    >
                       <option value="">Выберите...</option>
                       <option value="clinic">Многопрофильная клиника</option>
                       <option value="mall">Торговый центр</option>
                       <option value="school">Школа / ВУЗ</option>
                       <option value="hotel">Отель</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-dorren-light mb-2">Главный приоритет</label>
                    <select 
                      className="w-full bg-white/10 border border-white/20 rounded p-3 text-white focus:border-dorren-light outline-none"
                      onChange={(e) => setSelectorPriority(e.target.value)}
                    >
                       <option value="">Выберите...</option>
                       <option value="hygiene">Гигиена и чистые помещения</option>
                       <option value="wear">Износостойкость и вандалостойкость</option>
                       <option value="quiet">Тишина и приватность</option>
                       <option value="fire">Пожарная безопасность</option>
                    </select>
                 </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10 min-h-[200px]">
                 {selectorObject && selectorPriority ? (
                    <div className="animate-fade-in">
                       <h3 className="font-bold text-dorren-light mb-4 text-lg">
                          {getSelectorResult()?.title}
                       </h3>
                       <ul className="space-y-3">
                          {getSelectorResult()?.items.map((item, i) => (
                             <li key={i} className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-green-400 mt-0.5 shrink-0" />
                                <span className="text-gray-200">{item}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                       <Info size={32} className="mb-2 opacity-50" />
                       <p>Выберите параметры слева,<br/>чтобы увидеть рекомендацию.</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* 6. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">3 вопроса по группам.</p>
           </div>
           
           {!showQuizResult ? (
             <div className="p-6 space-y-8">
               {QUIZ_QUESTIONS.map((q, idx) => (
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
                 disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                 className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90 transition-all"
               >
                 Проверить
               </button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Результат: {calculateScore()}/{QUIZ_QUESTIONS.length}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() === 3 
                    ? 'Отлично! Вы разбираетесь в типах дверей.' 
                    : 'Неплохо, но можно повторить раздел с карточками.'}
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

        {/* 7. Summary */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
           <ul className="space-y-2 mb-6">
              {[
                'Dorren проектирует готовые дверные блоки под задачу (а не просто полотна).',
                'Каждая группа отвечает за своё: гигиена, пожарка, защита, звук.',
                'На объекте группы комбинируются (дверь может быть и EI60, и звукоизоляционной).',
                'Задача менеджера — понять "боль" заказчика и подобрать группу.'
              ].map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-dorren-dark mt-1.5 shrink-0"></div>
                  {t}
                </li>
              ))}
           </ul>
           <div className="text-center">
             <button 
               onClick={() => onNavigate('lesson2.2')}
               className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto"
             >
                Следующий урок: Параметры
                <ArrowRight size={16} />
             </button>
             <p className="text-xs text-gray-400 mt-2">Далее: Размеры, EI, Rw и открывание</p>
           </div>
        </section>

      </main>
    </div>
  );
};