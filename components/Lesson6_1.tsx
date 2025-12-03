
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Flame, Stethoscope, Settings, ChevronRight, 
  FileText, ShieldAlert, BookOpen, AlertTriangle, 
  MousePointer, CheckSquare, X
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson6_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // State
  const [introPoll, setIntroPoll] = useState<string | null>(null);
  const [activeMapCard, setActiveMapCard] = useState<string | null>(null);
  const [spCaseSelection, setSpCaseSelection] = useState<string[]>([]);
  const [spCaseSubmitted, setSpCaseSubmitted] = useState(false);
  const [sanitaryChecklist, setSanitaryChecklist] = useState<string[]>([]);
  const [activeGostCard, setActiveGostCard] = useState<number | null>(null);
  
  // Practice State
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, string[]>>({});
  const [practiceFeedback, setPracticeFeedback] = useState<Record<number, boolean>>({});

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const MAP_CARDS = [
    { 
      id: 'sp', 
      icon: Flame, 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      title: 'СП: Пожарная безопасность', 
      desc: 'Своды правил (СП). Отвечают за эвакуацию и поведение при пожаре.',
      questions: ['Какой класс огнестойкости (EI)?', 'В какую сторону открывать?', 'Нужен ли доводчик?', 'Какая ширина проема?']
    },
    { 
      id: 'san', 
      icon: Stethoscope, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      border: 'border-blue-200',
      title: 'СанПиН: Медицина и гигиена', 
      desc: 'Санитарные правила. Требования к среде, материалам и уборке.',
      questions: ['Можно ли мыть хлоркой?', 'Есть ли щели для пыли?', 'Пройдет ли каталка?', 'Насколько гладкая поверхность?']
    },
    { 
      id: 'gost', 
      icon: Settings, 
      color: 'text-gray-700', 
      bg: 'bg-gray-100', 
      border: 'border-gray-300',
      title: 'ГОСТ: Испытания и ресурс', 
      desc: 'Стандарты на изделия. Методы испытаний и технические условия.',
      questions: ['Сколько циклов выдержит петля?', 'Как подтвердить звукоизоляцию?', 'Соответствует ли геометрия?']
    }
  ];

  const SP_OPTIONS = [
    { id: 'ei', text: 'Определённый класс огнестойкости (EI/EIS)', correct: true },
    { id: 'dir', text: 'Дверь должна открываться по направлению эвакуации', correct: true },
    { id: 'close', text: 'Наличие доводчика (самозакрывание)', correct: true },
    { id: 'beauty', text: 'Нужна только красивая отделка', correct: false }
  ];

  const SANITARY_ITEMS = [
    { id: 'wash', text: 'Поверхность легко моется', valid: true },
    { id: 'chem', text: 'Стойкость к дезинфекции', valid: true },
    { id: 'smooth', text: 'Нет щелей и острых кромок', valid: true },
    { id: 'white', text: 'Цвет строго белый', valid: false },
  ];

  const GOST_PAIRS = [
    { id: 1, title: 'Огнестойкая дверь (Эвакуация)', content: 'Испытания по ГОСТ на огнестойкость. Классы EI (потеря целостности/теплоизоляции) и S (дымогазонепроницаемость).' },
    { id: 2, title: 'Звукоизоляционная дверь (Палата)', content: 'ГОСТ на методы измерения звукоизоляции. Индекс Rw (дБ). Требования к уплотнителям.' }
  ];

  const PRACTICE_CASES = [
    { 
      id: 1, 
      title: 'Дверь из коридора стационара на лестницу', 
      correct: ['sp', 'san', 'gost'], 
      hint: 'Это путь эвакуации (СП), это медучреждение (СанПиН), дверь должна быть качественной (ГОСТ).' 
    },
    { 
      id: 2, 
      title: 'Дверь в санузел персонала (админ. блок ТЦ)', 
      correct: ['sp', 'gost'], 
      hint: 'СП (если выход в коридор эвакуации) и ГОСТ. Санитарные требования здесь стандартные, не медицинские.' 
    },
    { 
      id: 3, 
      title: 'Дверь в палату интенсивной терапии', 
      correct: ['sp', 'san', 'gost'], 
      hint: 'Критические требования по гигиене (СанПиН), часто по пожарке (СП) и надежности (ГОСТ).' 
    }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Какой документ диктует ширину эвакуационного выхода?', 
      opts: [{id:'a', t:'Дизайн-код'}, {id:'b', t:'СП (Своды правил)'}, {id:'c', t:'СанПиН'}, {id:'d', t:'Инструкция завхоза'}], 
      correct: 'b', 
      expl: 'СП по пожарной безопасности регламентируют параметры путей эвакуации.' 
    },
    { 
      id: 2, 
      q: 'Что регулируют Санитарные правила в дверях?', 
      opts: [{id:'a', t:'Цвет стен'}, {id:'b', t:'Зарплату врачей'}, {id:'c', t:'Гигиену, материалы, доступность'}, {id:'d', t:'Сигнализацию'}], 
      correct: 'c', 
      expl: 'Требования к поверхности, уборке и отсутствию барьеров для бактерий.' 
    },
    { 
      id: 3, 
      q: 'За что отвечают ГОСТы?', 
      opts: [{id:'a', t:'За рекламу'}, {id:'b', t:'За методы испытаний и технические показатели'}, {id:'c', t:'За расстановку мебели'}, {id:'d', t:'За стоимость'}], 
      correct: 'b', 
      expl: 'ГОСТ описывает, как проверить дверь на прочность, звук и огнестойкость.' 
    },
    { 
      id: 4, 
      q: 'Роль менеджера в работе с нормами?', 
      opts: [{id:'a', t:'Игнорировать их'}, {id:'b', t:'Знать наизусть все пункты'}, {id:'c', t:'Понимать структуру и вовлекать инженеров'}, {id:'d', t:'Решать всё самому'}], 
      correct: 'c', 
      expl: 'Важно видеть риски и "карту" норм, а детали оставит инженерам.' 
    }
  ];

  // Handlers
  const handleSpSelect = (id: string) => {
    setSpCaseSelection(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSanitaryToggle = (id: string) => {
    setSanitaryChecklist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const togglePracticeOption = (caseId: number, option: string) => {
    const current = practiceAnswers[caseId] || [];
    const updated = current.includes(option) ? current.filter(o => o !== option) : [...current, option];
    setPracticeAnswers({...practiceAnswers, [caseId]: updated});
  };

  const checkPracticeCase = (caseId: number) => {
    const scenario = PRACTICE_CASES.find(c => c.id === caseId);
    if (!scenario) return;
    const selected = practiceAnswers[caseId] || [];
    
    // Simple logic: check if all required are selected. We won't penalize extra "gost" as it's almost always relevant.
    // Ideally we want exact match of 'important' norms.
    const missing = scenario.correct.filter(x => !selected.includes(x));
    
    if (missing.length === 0) {
      setPracticeFeedback({...practiceFeedback, [caseId]: true});
    } else {
      alert(`Не совсем точно. Подумайте, применимы ли здесь нормы: ${missing.join(', ').toUpperCase()}`);
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
        lessonId="6.1" 
        title="Основные документы" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <FileText className="absolute right-10 top-10 w-64 h-64 opacity-20 -rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 6. Нормативные требования
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 6.1. Основные документы: СП, СанПиН, ГОСТы
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем «каркас» норм. Без юридических деталей — только то, что влияет на выбор двери, фурнитуры и монтажа.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15 минут</div>
                <div className="flex items-center gap-2"><Flame size={16}/> СП</div>
                <div className="flex items-center gap-2"><Stethoscope size={16}/> СанПиН</div>
                <div className="flex items-center gap-2"><Settings size={16}/> ГОСТ</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к карте нормативов
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-6 text-dorren-light opacity-90">
                      <div className="p-4 border-2 border-dorren-light/50 rounded-full bg-white/5"><Flame size={32} /></div>
                      <div className="p-4 border-2 border-dorren-light/50 rounded-full bg-white/5"><Stethoscope size={32} /></div>
                      <div className="p-4 border-2 border-dorren-light/50 rounded-full bg-white/5"><Settings size={32} /></div>
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Инфографика: дверь в центре, вокруг три орбиты с иконками огня, медицины и шестеренки. Инженерный стиль.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем менеджеру знать нормы?</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               На проектах часто говорят: «Нормы — это для инженеров». Но именно менеджер первым слышит от заказчика требования «по пожарке» или «по СанПиНу».
               Если вы не понимаете базу, вы рискуете пообещать невозможное или пропустить критический риск.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Какова ваша задача?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 'all', t: 'Выучить наизусть все пункты СП и ГОСТ.'},
                 {id: 'base', t: 'Понимать «карту норм» и вовремя привлекать инженера.'},
                 {id: 'ignore', t: 'Игнорировать нормы, это дело технарей.'},
                 {id: 'later', t: 'Вспомнить о нормах при сдаче объекта.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introPoll === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroPoll(opt.id)} checked={introPoll === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introPoll && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 {introPoll === 'base' ? 'Именно так. Знать всё невозможно, но понимать структуру — обязательно.' : 'Нет. Ваша цель — понимать структуру и вовремя эскалировать вопросы.'}
              </div>
            )}
          </div>
        </section>

        {/* 3. NORMS MAP */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Три круга требований</h2>
           <p className="text-gray-600 mb-8">
              Упрощённо, вокруг двери есть три основных блока правил. Нажмите на карточку, чтобы узнать детали.
           </p>

           <div className="grid md:grid-cols-3 gap-6">
              {MAP_CARDS.map((card) => (
                 <button 
                   key={card.id}
                   onClick={() => setActiveMapCard(activeMapCard === card.id ? null : card.id)}
                   className={`relative p-6 rounded-xl border-2 text-left transition-all h-full flex flex-col ${activeMapCard === card.id ? `ring-2 ring-offset-2 ring-dorren-light ${card.bg} ${card.border}` : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg'}`}
                 >
                    <div className={`mb-4 ${card.color} bg-white w-12 h-12 rounded-full flex items-center justify-center border border-gray-100 shadow-sm`}>
                       <card.icon size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{card.desc}</p>
                    
                    {activeMapCard === card.id && (
                       <div className="mt-auto pt-4 border-t border-black/5 animate-fade-in">
                          <p className="text-xs font-bold uppercase text-gray-500 mb-2">На что влияет:</p>
                          <ul className="space-y-1">
                             {card.questions.map((q, i) => (
                                <li key={i} className="text-xs text-gray-700 flex gap-2">
                                   <ChevronRight size={12} className="mt-0.5 shrink-0" /> {q}
                                </li>
                             ))}
                          </ul>
                       </div>
                    )}
                    
                    {!activeMapCard && <div className="mt-auto text-xs text-center text-gray-400">Нажмите для деталей</div>}
                 </button>
              ))}
           </div>
        </section>

        {/* 4. SP (FIRE) DEEP DIVE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-red-500">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><Flame size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">СП: Пожарная безопасность</h2>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div>
                 <p className="text-gray-700 mb-4 font-medium">
                    Своды правил (СП) определяют эвакуацию. Главный вопрос: "Смогут ли люди быстро выйти?"
                 </p>
                 <ul className="space-y-3 mb-6 text-sm text-gray-600">
                    <li className="flex gap-2"><CheckCircle size={16} className="text-red-500 shrink-0"/> Ширина проема (чтобы не было давки).</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-red-500 shrink-0"/> Открывание по ходу движения.</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-red-500 shrink-0"/> Класс огнестойкости (EI) для преград.</li>
                 </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                 <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <ShieldAlert size={18}/> Мини-кейс
                 </h3>
                 <p className="text-sm text-gray-800 mb-4">
                    Дано: Дверь из коридора отделения на лестничную клетку. Это путь эвакуации. Что из списка обязательно?
                 </p>
                 <div className="space-y-2 mb-4">
                    {SP_OPTIONS.map((opt) => (
                       <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="rounded text-red-600 focus:ring-red-500"
                            checked={spCaseSelection.includes(opt.id)}
                            onChange={() => handleSpSelect(opt.id)}
                            disabled={spCaseSubmitted}
                          />
                          <span className={`text-sm ${spCaseSubmitted && opt.correct ? 'font-bold text-green-700' : 'text-gray-700'}`}>
                             {opt.text}
                          </span>
                       </label>
                    ))}
                 </div>
                 {!spCaseSubmitted ? (
                    <button onClick={() => setSpCaseSubmitted(true)} className="bg-red-600 text-white text-xs px-4 py-2 rounded font-bold hover:bg-red-700">Проверить</button>
                 ) : (
                    <p className="text-xs text-red-800 italic animate-fade-in">
                       На путях эвакуации важны: EI (чтобы огонь не прошел), направление (чтобы не блокировать поток) и доводчик (чтобы отсечь дым). Дизайн — вторичен.
                    </p>
                 )}
              </div>
           </div>
        </section>

        {/* 5. SANPIN DEEP DIVE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-blue-500">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Stethoscope size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">СанПиН: Медицинские требования</h2>
           </div>

           <div className="grid md:grid-cols-2 gap-12">
              <div>
                 <p className="text-gray-700 mb-6">
                    Здесь главные слова: <strong>Гигиена</strong> и <strong>Доступность</strong>. Дверь не должна быть источником инфекций.
                 </p>
                 
                 <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-500 uppercase">Чек-лист для палатной двери:</p>
                    {SANITARY_ITEMS.map((item) => (
                       <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-100">
                          <span className="text-sm text-gray-700">{item.text}</span>
                          <button 
                            onClick={() => handleSanitaryToggle(item.id)}
                            className={`w-6 h-6 rounded flex items-center justify-center border ${sanitaryChecklist.includes(item.id) ? (item.valid ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white') : 'bg-white border-gray-300 text-transparent'}`}
                          >
                             {sanitaryChecklist.includes(item.id) && (item.valid ? <CheckCircle size={14}/> : <X size={14}/>)}
                          </button>
                       </div>
                    ))}
                 </div>
                 {sanitaryChecklist.includes('white') && (
                    <p className="text-xs text-gray-500 mt-2 italic">
                       *Цвет двери — это дизайн, а не СанПиН. Нормы требуют, чтобы поверхность мылась, а цвет может быть любым.
                    </p>
                 )}
              </div>

              <div className="flex items-center justify-center bg-blue-50/50 rounded-xl border border-blue-100">
                 <div className="text-center p-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-blue-300">
                       <Stethoscope size={40} />
                    </div>
                    <p className="text-[10px] text-gray-400 bg-white p-2 rounded border border-gray-200">
                       [ПРОМТ: Чистый коридор клиники, гладкая дверь HPL в палату, нет порогов. Светлый, стерильный стиль.]
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* 6. GOST DEEP DIVE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-gray-500">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-gray-200 p-2 rounded-lg text-gray-700"><Settings size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">ГОСТ: Стандарты и испытания</h2>
           </div>

           <p className="text-gray-700 mb-8">
              ГОСТы отвечают на вопрос "Как проверить?". Как доказать, что дверь выдержит 100 000 открываний или задержит звук?
           </p>

           <div className="grid md:grid-cols-2 gap-6">
              {GOST_PAIRS.map((card) => (
                 <div 
                   key={card.id}
                   className={`cursor-pointer perspective-1000 h-48 group`}
                   onClick={() => setActiveGostCard(activeGostCard === card.id ? null : card.id)}
                 >
                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${activeGostCard === card.id ? 'rotate-y-180' : ''}`}>
                       {/* Front */}
                       <div className="absolute inset-0 bg-gray-100 rounded-xl border border-gray-300 flex flex-col items-center justify-center p-6 backface-hidden shadow-sm hover:shadow-md">
                          <BookOpen size={32} className="text-gray-400 mb-3" />
                          <h3 className="font-bold text-gray-800 text-center">{card.title}</h3>
                          <p className="text-xs text-gray-500 mt-2">Нажмите, чтобы увидеть суть ГОСТа</p>
                       </div>
                       
                       {/* Back */}
                       <div className="absolute inset-0 bg-dorren-dark text-white rounded-xl border border-gray-700 flex items-center justify-center p-6 backface-hidden rotate-y-180">
                          <p className="text-sm text-center leading-relaxed">
                             {card.content}
                          </p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 7. PRACTICE: NORMS MAPPER */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Практика: Какие нормы "включаются"?</h2>
           <p className="text-gray-700 mb-6">Выберите, какие блоки норм применимы к ситуации.</p>

           <div className="space-y-6">
              {PRACTICE_CASES.map((scenario) => (
                 <div key={scenario.id} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                       <h3 className="font-bold text-gray-900">{scenario.title}</h3>
                       <button onClick={() => checkPracticeCase(scenario.id)} className="text-xs bg-dorren-dark text-white px-3 py-1 rounded hover:bg-opacity-90">Проверить</button>
                    </div>
                    
                    <div className="flex gap-4">
                       {['sp', 'san', 'gost'].map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => togglePracticeOption(scenario.id, opt)}
                            className={`px-4 py-2 rounded border text-sm font-bold transition-all ${
                               practiceAnswers[scenario.id]?.includes(opt) 
                                 ? 'bg-dorren-light text-dorren-dark border-dorren-dark' 
                                 : 'bg-gray-50 text-gray-500 border-gray-200'
                            }`}
                          >
                             {opt === 'sp' ? 'СП (Пожарка)' : opt === 'san' ? 'СанПиН (Гигиена)' : 'ГОСТ (Качество)'}
                          </button>
                       ))}
                    </div>

                    {practiceFeedback[scenario.id] && (
                       <div className="mt-4 p-3 bg-green-50 text-green-800 text-sm rounded border border-green-200 animate-fade-in flex items-start gap-2">
                          <CheckCircle size={16} className="mt-0.5 shrink-0"/>
                          {scenario.hint}
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </section>

        {/* 8. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по теме.</p>
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
                    ? 'Отлично! Вы понимаете структуру норм.' 
                    : 'Рекомендуем пробежаться по карточкам СП и СанПиН еще раз.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button 
                     onClick={() => { setShowQuizResult(false); setQuizAnswers({}); setPracticeFeedback({}); }} 
                     className="text-gray-500 hover:text-dorren-dark px-4 py-2"
                   >
                     Пройти заново
                   </button>
                   <button 
                     className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2"
                     title="Модуль завершен (демо)"
                   >
                     Модуль 6 завершен
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 9. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Вокруг двери 3 кита: СП (пожарка/эвакуация), СанПиН (гигиена) и ГОСТ (качество).',
               'СП диктует ширину, открывание и огнестойкость на путях выхода.',
               'СанПиН требует гладкости и доступности для МГН в медучреждениях.',
               'ГОСТ — это доказательная база (протоколы испытаний и сертификаты).',
               'Не нужно знать цифры наизусть, нужно понимать логику и звать инженера.'
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
