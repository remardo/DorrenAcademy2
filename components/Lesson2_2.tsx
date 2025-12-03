
import React, { useState } from 'react';
import { 
  Clock, LayoutGrid, Users, ArrowRight, CheckCircle, HelpCircle, 
  Ruler, Flame, Volume2, Droplets, Shield, RotateCcw, FileText, ChevronRight, Info
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson2_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // State for interactive elements
  const [selfCheck, setSelfCheck] = useState<number | null>(null);
  const [doorType, setDoorType] = useState<number>(1); // 0=Single, 1=1.5, 2=Double
  const [soundDb, setSoundDb] = useState<number>(32);
  const [zoneFocus, setZoneFocus] = useState<string | null>(null);
  const [handGameStep, setHandGameStep] = useState<number>(0);
  const [handGameResult, setHandGameResult] = useState<'correct' | 'wrong' | null>(null);
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const DOOR_TYPES = [
    { title: 'Однопольная', width: '900', desc: 'Стандарт для кабинетов.' },
    { title: 'Полуторная', width: '1300', desc: 'Широкий проем при необходимости.' },
    { title: 'Двупольная', width: '1600', desc: 'Коридоры и высокий трафик.' },
  ];

  const FIRE_RATINGS = [
    { id: 'EI30', title: 'EI30', time: '30 мин', desc: 'Базовый уровень для внутренних дверей.' },
    { id: 'EI60', title: 'EI60', time: '60 мин', desc: 'Стандарт для путей эвакуации и медцентров.' },
    { id: 'EI90', title: 'EI90+', time: '90+ мин', desc: 'Специальные технические зоны и преграды.' },
  ];

  const ZONES = [
    { id: 'ward', label: 'Палата в клинике', water: 'medium', wear: 'high', hint: 'Умеренная влагостойкость + Высокая износостойкость' },
    { id: 'shower', label: 'Душевой блок', water: 'critical', wear: 'medium', hint: 'Повышенная влагостойкость КРИТИЧНА' },
    { id: 'school', label: 'Коридор школы', water: 'low', wear: 'critical', hint: 'Антивандальность и износостойкость КРИТИЧНЫ' },
    { id: 'office', label: 'Офисный кабинет', water: 'low', wear: 'medium', hint: 'Базовые параметры' },
  ];

  const HAND_GAME = [
    { id: 1, type: 'left', text: 'Дверь открывается на вас, петли СЛЕВА', ans: 'Левая' },
    { id: 2, type: 'right', text: 'Дверь открывается на вас, петли СПРАВА', ans: 'Правая' },
  ];

  const SPEC_CARD_PARAMS = [
    { label: 'EI60', title: 'Огнестойкость 60 мин', desc: 'Держит огонь час. Стандарт для эвакуации.' },
    { label: 'Rw 38dB', title: 'Звукоизоляция 38 дБ', desc: 'Разговор за дверью слышен глухо, слов не разобрать.' },
    { label: '1500x2100', title: 'Размер', desc: 'Полуторная дверь. Широкий проем для оборудования.' },
    { label: 'Влагостойкое', title: 'Исполнение', desc: 'Защита от воды и химии (HPL, пластик).' },
    { label: 'Правая', title: 'Открывание', desc: 'Петли справа, когда тянешь на себя.' },
  ];
  const [activeSpecParam, setActiveSpecParam] = useState<string | null>(null);

  const QUIZ = [
    { id: 1, q: 'Что означает EI60?', opts: [{id:'a', t:'60 циклов открывания'}, {id:'b', t:'Держит огонь 60 минут'}, {id:'c', t:'Влажность 60%'}, {id:'d', t:'Шумоизоляция 60 дБ'}], correct: 'b', expl: 'EI — Integrity & Insulation, время в минутах.' },
    { id: 2, q: 'Какой индекс отвечает за звук?', opts: [{id:'a', t:'EI'}, {id:'b', t:'Rw'}, {id:'c', t:'S'}, {id:'d', t:'RH'}], correct: 'b', expl: 'Rw — взвешенный индекс звукоизоляции в децибелах.' },
    { id: 3, q: 'Как определить, что дверь Правая?', opts: [{id:'a', t:'Замок справа'}, {id:'b', t:'Петли справа (вид с улицы)'}, {id:'c', t:'Петли справа (открывание на себя)'}, {id:'d', t:'Открывается по эвакуации'}], correct: 'c', expl: 'Правило: встаем там, где дверь открывается НА СЕБЯ.' },
    { id: 4, q: 'Где критична влагостойкость?', opts: [{id:'a', t:'Офис'}, {id:'b', t:'Душевая / Санузел'}, {id:'c', t:'Кабинет директора'}, {id:'d', t:'Лестница'}], correct: 'b', expl: 'Мокрые зоны требуют защиты от разбухания.' },
    { id: 5, q: 'Что важно для тишины в отеле?', opts: [{id:'a', t:'EI60'}, {id:'b', t:'Rw и порог'}, {id:'c', t:'Сторона открывания'}, {id:'d', t:'Цвет'}], correct: 'b', expl: 'Индекс Rw и герметичность притвора (порог) определяют тишину.' },
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  const handleHandGuess = (guess: 'Левая' | 'Правая') => {
    if (handGameResult) return; // Prevent spamming
    
    if (guess === HAND_GAME[handGameStep].ans) {
      setHandGameResult('correct');
    } else {
      setHandGameResult('wrong');
    }
    setTimeout(() => {
      setHandGameResult(null);
      // Use functional update to ensure we cycle based on current state at execution time
      setHandGameStep(prev => (prev < HAND_GAME.length - 1 ? prev + 1 : 0));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="2.2" 
        title="Ключевые параметры" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. Hero */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 2. Ассортимент и типология
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 2.2. Ключевые параметры дверей
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Размеры, EI, Rw, сторона открывания. Учимся читать спецификацию и говорить на языке инженеров.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><LayoutGrid size={16}/> Теория + Практика</div>
                <div className="flex items-center gap-2"><Users size={16}/> Базовый уровень</div>
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
                >
                  Перейти к параметрам
                  <ArrowRight size={18} />
                </button>
                <div className="text-xs text-dorren-light/60 font-mono">
                  Вы на уроке 2.2. До конца модуля: ещё 2 урока.
                </div>
             </div>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             {/* Abstract Door Schematic */}
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl w-full max-w-md aspect-square relative">
                <div className="absolute top-4 right-4 bg-dorren-light text-dorren-dark text-xs font-bold px-2 py-1 rounded">EI60</div>
                <div className="absolute bottom-4 left-4 bg-dorren-light text-dorren-dark text-xs font-bold px-2 py-1 rounded">Rw 38dB</div>
                
                {/* Door Frame Drawing (CSS) */}
                <div className="w-full h-full border-4 border-white/30 rounded-t-full relative flex items-end justify-center">
                   <div className="w-[80%] h-[90%] border-x-4 border-t-4 border-white/50 relative">
                      <div className="absolute top-1/2 right-2 w-2 h-4 bg-dorren-light rounded-sm"></div> {/* Handle */}
                      <div className="absolute bottom-0 w-full text-center pb-2 text-white/50 text-xs font-mono">900 x 2100</div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">🚪</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. Intro & Self Check */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему параметры — это язык проекта</h2>
           <p className="text-gray-700 mb-6 leading-relaxed">
             Для заказчика дверь — это внешний вид. Для инженера — набор характеристик (EI, Rw, размер). 
             Менеджер DORREN должен уметь переводить с "инженерного" на "человеческий".
           </p>

           <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
              <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
                 <HelpCircle size={18} /> Самооценка
              </h3>
              <p className="text-sm text-gray-600 mb-4">Насколько уверенно вы ориентируетесь в параметрах?</p>
              <div className="space-y-2">
                 {[
                   {val: 1, text: 'Честно говоря, путаюсь в EI, Rw и открываниях.'},
                   {val: 2, text: 'Могу что-то объяснить, но не всегда уверен.'},
                   {val: 3, text: 'Читаю спецификации уверенно.'}
                 ].map((opt) => (
                   <label key={opt.val} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selfCheck === opt.val ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                      <input type="radio" name="selfcheck" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setSelfCheck(opt.val)} checked={selfCheck === opt.val} />
                      <span className="text-sm font-medium text-gray-800">{opt.text}</span>
                   </label>
                 ))}
              </div>
              {selfCheck && (
                <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                   После урока вы сможете читать карточки дверей как профессионал.
                </div>
              )}
           </div>
        </section>

        {/* 3. Door Types & Sizes */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-dorren-light/20 p-2 rounded text-dorren-dark"><Ruler size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Размеры и типы полотен</h2>
           </div>
           
           <div className="flex justify-center gap-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
              {DOOR_TYPES.map((type, idx) => (
                 <button 
                   key={idx}
                   onClick={() => setDoorType(idx)}
                   className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${doorType === idx ? 'bg-white text-dorren-dark shadow' : 'text-gray-500 hover:text-gray-900'}`}
                 >
                    {type.title}
                 </button>
              ))}
           </div>

           <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center animate-fade-in text-center min-h-[300px]">
              {/* CSS Visual of Doors */}
              <div className="flex items-end gap-1 h-40 mb-6">
                 {/* Left Leaf (for 1.5 and 2) */}
                 {(doorType === 1 || doorType === 2) && (
                    <div className={`border-2 border-dorren-dark bg-white relative shadow-sm transition-all ${doorType === 1 ? 'w-12' : 'w-24'} h-full rounded-sm`}>
                       <div className="absolute top-1/2 left-1 w-1 h-3 bg-gray-400 rounded-full"></div> {/* Hinge/Lock */}
                       <span className="absolute -bottom-6 w-full text-xs text-gray-500 font-mono">{doorType === 1 ? '300-500' : '700-900'}</span>
                    </div>
                 )}
                 {/* Main Leaf */}
                 <div className="w-32 h-full border-2 border-dorren-dark bg-white relative shadow-sm rounded-sm z-10">
                     <div className="absolute top-1/2 right-2 w-1 h-3 bg-dorren-dark rounded-full"></div> {/* Handle */}
                     <span className="absolute -bottom-6 w-full text-xs text-gray-500 font-mono">800-1000</span>
                 </div>
              </div>
              
              <h3 className="text-xl font-bold text-dorren-dark mb-2">{DOOR_TYPES[doorType].title}</h3>
              <p className="text-gray-600 mb-4">{DOOR_TYPES[doorType].desc}</p>
              <div className="bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full font-mono border border-blue-200">
                 Пример ширины проема: ~{DOOR_TYPES[doorType].width} мм
              </div>
              
              {doorType === 1 && (
                 <p className="text-xs text-gray-500 mt-4 max-w-sm">
                    ⚠️ Полуторная дверь удобна тем, что малая створка открывается только при необходимости (занос мебели), а в обычном режиме работает как стандартная.
                 </p>
              )}
           </div>
        </section>

        {/* 4. Fire Rating */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-2 rounded text-red-600"><Flame size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Огнестойкость (EI / EIS)</h2>
           </div>
           
           <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
              <p><strong>E (Integrity)</strong> — целостность (не пропускает огонь).<br/>
              <strong>I (Insulation)</strong> — теплоизоляция (не пропускает жар).<br/>
              <strong>S (Smoke)</strong> — дымогазонепроницаемость (критично для эвакуации).</p>
           </div>

           <div className="grid md:grid-cols-3 gap-4">
              {FIRE_RATINGS.map((rating) => (
                 <div key={rating.id} className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-red-300 hover:shadow-md transition-all cursor-default">
                    <div className="text-3xl font-black text-gray-200 group-hover:text-red-100 absolute top-4 right-4 transition-colors">{rating.time}</div>
                    <div className="relative z-10">
                       <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{rating.title}</h3>
                       <p className="text-sm text-gray-600">{rating.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 5. Sound Insulation (Rw) */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <div className="flex items-center gap-3 mb-6">
              <Volume2 size={24} className="text-dorren-light" />
              <h2 className="text-2xl font-bold">Звукоизоляция: Индекс Rw</h2>
           </div>
           
           <div className="mb-8">
              <input 
                 type="range" 
                 min="20" 
                 max="45" 
                 value={soundDb} 
                 onChange={(e) => setSoundDb(parseInt(e.target.value))}
                 className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-dorren-light"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                 <span>20 dB (Картон)</span>
                 <span>32 dB (База)</span>
                 <span>38 dB (Офис/Мед)</span>
                 <span>42+ dB (Отель)</span>
              </div>
           </div>

           <div className="bg-white/10 rounded-xl p-6 flex items-center justify-between border border-white/10">
              <div>
                 <span className="text-4xl font-bold text-dorren-light">{soundDb} dB</span>
                 <span className="text-sm text-gray-300 block mt-1">Индекс изоляции</span>
              </div>
              <div className="text-right max-w-xs">
                 <p className="font-medium text-white mb-1">
                    {soundDb < 30 ? 'Слышно всё, даже шепот.' : 
                     soundDb < 35 ? 'Слышна речь, но неразборчиво.' :
                     soundDb < 40 ? 'Громкий разговор слышен как фон.' :
                     'Тишина. Крики едва слышны.'}
                 </p>
                 <p className="text-xs text-gray-400">
                    {soundDb >= 38 ? 'Рекомендуется для отелей и кабинетов.' : 'Подходит для обычных помещений.'}
                 </p>
              </div>
           </div>
        </section>

        {/* 6. Moisture & Wear */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded text-blue-600"><Droplets size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Влага и Износ</h2>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {ZONES.map((zone) => (
                 <button 
                   key={zone.id}
                   onClick={() => setZoneFocus(zone.id)}
                   className={`p-4 rounded-xl border text-left transition-all ${zoneFocus === zone.id ? 'bg-dorren-dark text-white border-dorren-dark' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <span className="text-sm font-bold block mb-1">{zone.label}</span>
                 </button>
              ))}
           </div>

           <div className="min-h-[100px] bg-gray-50 rounded-xl p-6 border border-gray-200 flex items-center justify-center text-center">
              {zoneFocus ? (
                 <div className="animate-fade-in w-full">
                    <h3 className="font-bold text-lg text-dorren-dark mb-4">{ZONES.find(z => z.id === zoneFocus)?.label}</h3>
                    <div className="flex justify-around items-center">
                       <div className="flex flex-col items-center gap-2">
                          <Droplets size={24} className={ZONES.find(z => z.id === zoneFocus)?.water === 'critical' ? 'text-blue-600' : 'text-gray-300'} />
                          <span className="text-xs font-bold uppercase">Влага</span>
                       </div>
                       <div className="text-sm text-gray-700 font-medium bg-white px-4 py-2 rounded shadow-sm">
                          {ZONES.find(z => z.id === zoneFocus)?.hint}
                       </div>
                       <div className="flex flex-col items-center gap-2">
                          <Shield size={24} className={ZONES.find(z => z.id === zoneFocus)?.wear === 'critical' ? 'text-orange-600' : 'text-gray-300'} />
                          <span className="text-xs font-bold uppercase">Износ</span>
                       </div>
                    </div>
                 </div>
              ) : (
                 <p className="text-gray-400 italic">Выберите зону, чтобы увидеть приоритеты...</p>
              )}
           </div>
        </section>

        {/* 7. Opening Direction */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded text-green-600"><RotateCcw size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Левая или Правая?</h2>
           </div>
           
           <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-900">
              <strong>Золотое правило:</strong> Встаньте там, где дверь открывается <u>НА ВАС</u>. Если петли справа — дверь правая.
           </div>

           <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 bg-gray-100 rounded-full border-4 border-white shadow-inner flex items-center justify-center mb-6">
                 {/* Stick figure or Icon representing user */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-xs">ВЫ СТОИТЕ ЗДЕСЬ</div>
                 
                 {/* Door Schematic */}
                 <div className={`transition-all duration-300 ${HAND_GAME[handGameStep] && HAND_GAME[handGameStep].type === 'left' ? '-scale-x-100' : ''}`}>
                    <div className="w-32 h-2 bg-gray-800 rounded relative"> {/* Wall/Frame */}
                       <div className="absolute right-0 bottom-0 w-2 h-2 bg-dorren-dark rounded-full"></div> {/* Hinge */}
                       <div className="absolute right-0 bottom-1 w-[2px] h-24 bg-dorren-light origin-bottom -rotate-45"></div> {/* Door Leaf */}
                       <div className="absolute right-0 bottom-0 w-24 h-24 border-t-2 border-r-2 border-dorren-light/20 rounded-tr-full"></div> {/* Swing Path */}
                    </div>
                 </div>
              </div>
              
              <div className="text-center mb-6">
                 <p className="text-lg font-bold text-dorren-dark mb-1">{HAND_GAME[handGameStep] && HAND_GAME[handGameStep].text}</p>
                 <p className="text-sm text-gray-500">Какая это дверь?</p>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => handleHandGuess('Левая')} className="px-6 py-2 bg-white border border-gray-300 hover:border-dorren-dark rounded-lg font-bold transition-colors">Левая</button>
                 <button onClick={() => handleHandGuess('Правая')} className="px-6 py-2 bg-white border border-gray-300 hover:border-dorren-dark rounded-lg font-bold transition-colors">Правая</button>
              </div>

              {handGameResult && (
                 <div className={`mt-4 px-4 py-2 rounded font-bold animate-fade-in ${handGameResult === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {handGameResult === 'correct' ? 'Верно!' : 'Ошибка! Попробуйте еще раз.'}
                 </div>
              )}
           </div>
        </section>

        {/* 8. Spec Card Interactive */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <div className="flex items-center gap-3 mb-6">
              <FileText size={24} className="text-dorren-dark" />
              <h2 className="text-2xl font-bold text-dorren-dark">Читаем карточку товара</h2>
           </div>
           <p className="text-gray-600 mb-6">Нажмите на параметр, чтобы узнать, как объяснить его клиенту.</p>

           <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-200 relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-dorren-dark rounded-t-xl"></div>
               <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                  <div>
                     <h3 className="font-bold text-lg text-gray-900">Дверной блок TYPE-M</h3>
                     <p className="text-xs text-gray-500">Артикул: DR-2024-X</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold uppercase">В наличии</div>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  {SPEC_CARD_PARAMS.map((param, i) => (
                     <button 
                       key={i}
                       onClick={() => setActiveSpecParam(param.label)}
                       className={`text-left p-3 rounded border transition-all ${activeSpecParam === param.label ? 'bg-dorren-dark text-white border-dorren-dark scale-105 shadow-md' : 'bg-gray-50 text-gray-800 border-gray-200 hover:border-dorren-light'}`}
                     >
                        <span className="block text-xs opacity-70 mb-1">{param.title}</span>
                        <span className="block font-bold text-sm">{param.label}</span>
                     </button>
                  ))}
               </div>

               {/* Tooltip Area */}
               <div className="mt-6 min-h-[80px] bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-blue-200 p-1 rounded text-blue-800 mt-1"><Info size={16}/></div>
                  <div>
                     {activeSpecParam ? (
                        <div className="animate-fade-in">
                           <h4 className="font-bold text-blue-900 text-sm mb-1">{SPEC_CARD_PARAMS.find(p => p.label === activeSpecParam)?.title}</h4>
                           <p className="text-sm text-blue-800">{SPEC_CARD_PARAMS.find(p => p.label === activeSpecParam)?.desc}</p>
                        </div>
                     ) : (
                        <p className="text-sm text-blue-800/60 italic mt-1">Нажмите на любой параметр сверху...</p>
                     )}
                  </div>
               </div>
           </div>
        </section>

        {/* 9. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">5 вопросов на закрепление.</p>
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
                    ? 'Отлично! Вы говорите на языке инженеров.' 
                    : 'Хорошая попытка, но стоит повторить про EI и открывание.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">
                     Попробовать снова
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson2.3')}
                     className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2"
                   >
                     Следующий урок
                     <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 10. Summary */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
           <ul className="space-y-2">
             {[
               'Параметры дверей — это язык общения с проектировщиками.',
               'EI/EIS — огнестойкость (минуты), Rw — звук (дБ).',
               'Влага и износ диктуют выбор материалов (HPL, пластик, сталь).',
               'Правило "открывания на себя" спасает от ошибок с петлями.',
               'Задача менеджера — переводить параметры в выгоды (безопасность, тишина).'
             ].map((txt, i) => (
               <li key={i} className="flex gap-3 text-sm text-gray-700">
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