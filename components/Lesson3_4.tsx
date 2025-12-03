
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Shield, Flame, Zap, CheckCircle, Layers, 
  Thermometer, Mic, Eye, AlertTriangle
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_4: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'fire' | 'medical' | 'xray'>('fire');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  const TABS = [
    { id: 'fire', label: 'Противопожарные (EI)', icon: Flame },
    { id: 'medical', label: 'Медицинские (HPL)', icon: Shield },
    { id: 'xray', label: 'Рентгенозащитные (Pb)', icon: Zap },
  ];

  const CONTENT = {
    fire: {
      title: 'Противопожарная дверь (EI30 / EI60)',
      layers: [
        { name: 'Заполнение', desc: 'Минеральная вата высокой плотности или огнестойкая плита. Не горит, держит жар.' },
        { name: 'Термолента', desc: 'Вспенивающийся уплотнитель по периметру. При 150°C расширяется и герметизирует щели от дыма.' },
        { name: 'Усиление', desc: 'Стальной каркас или усиленная обвязка под доводчик (обязателен!).' },
        { name: 'Фурнитура', desc: 'Только стальная огнестойкая фурнитура. ЦАМ и алюминий расплавятся.' }
      ],
      warning: 'Нельзя врезать обычные глазки или решетки без сертификата!'
    },
    medical: {
      title: 'Медицинская дверь (HPL)',
      layers: [
        { name: 'Облицовка HPL', desc: 'Пластик высокого давления (2 мм). Стойкий к химии, ударам, царапинам.' },
        { name: 'Торец', desc: 'Алюминиевая или нержавеющая кромка. Защищает самое слабое место от ударов каталок.' },
        { name: 'Герметичность', desc: 'Отсутствие пор, легкая моемость. Заподлицо с коробкой (опция).' },
        { name: 'Остекление', desc: 'Заподлицо с полотном, чтобы не скапливалась пыль на штапиках.' }
      ],
      warning: 'Обычный шпон или краска быстро облезут от дезрастворов.'
    },
    xray: {
      title: 'Рентгенозащитная дверь',
      layers: [
        { name: 'Свинцовый лист', desc: 'Непрерывный слой свинца (0.5–2.5 мм) внутри полотна и коробки.' },
        { name: 'Перекрытие', desc: 'Увеличенный нахлест полотна на короб, чтобы излучение не прошло в щель.' },
        { name: 'Стекло', desc: 'Специальное рентгенозащитное стекло (с высоким содержанием свинца).' },
        { name: 'Вес', desc: 'Очень тяжелая дверь. Требует усиленных петель (3-4 шт) или автоматики.' }
      ],
      warning: 'Монтажная пена не защищает от радиации! Зазоры закрываются свинцовыми наличниками.'
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Что происходит с термолентой при пожаре?', 
      opts: [{id:'a', t:'Она плавится'}, {id:'b', t:'Вспенивается и закрывает зазоры'}, {id:'c', t:'Выделяет воду'}, {id:'d', t:'Ничего'}], 
      correct: 'b', 
      expl: 'Термолента расширяется, блокируя путь дыму и угарному газу.' 
    },
    { 
      id: 2, 
      q: 'В чем главная особенность рентгенозащитной двери?', 
      opts: [{id:'a', t:'Она прозрачная'}, {id:'b', t:'Она стерильная'}, {id:'c', t:'Внутри сплошной лист свинца'}, {id:'d', t:'Она легче обычной'}], 
      correct: 'c', 
      expl: 'Свинец (Pb) является барьером для рентгеновского излучения.' 
    },
    { 
      id: 3, 
      q: 'Почему в операционных используют HPL покрытие?', 
      opts: [{id:'a', t:'Дешево'}, {id:'b', t:'Красиво'}, {id:'c', t:'Стойкость к химии и ударам'}, {id:'d', t:'Защита от радиации'}], 
      correct: 'c', 
      expl: 'HPL выдерживает агрессивную санитарную обработку.' 
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="3.4" 
        title="Специальные конструктивы" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 3.4. Специальные конструктивы</h1>
             <p className="text-xl text-gray-300 mb-8">
               Противопожарные, медицинские и рентгенозащитные двери: что у них внутри и почему обычная дверь не подойдет.
             </p>
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Начать урок <ArrowRight size={18} />
             </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="bg-white/10 border border-white/20 p-8 rounded-full">
                <Layers size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        {/* INTRO */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Не все двери одинаковы</h2>
           <p className="text-gray-700">
             Внешне специальная дверь может выглядеть как обычная офисная. Но внутри скрыты технологии, спасающие жизни (EI) или здоровье (Pb, HPL). Ошибка в конструктиве здесь недопустима.
           </p>
        </section>

        {/* INTERACTIVE CONSTRUCTION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Разрез спецдверей</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {TABS.map((tab) => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.icon size={18} />
                 {tab.label}
               </button>
             ))}
           </div>

           <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
             <div className="md:w-1/2 bg-gray-50 border border-gray-200 rounded-xl p-8 flex items-center justify-center relative min-h-[300px]">
               {/* Abstract visualization of layers */}
               <div className="w-40 h-64 bg-white border-2 border-gray-300 relative shadow-lg transform rotate-y-12 transition-all">
                  {activeTab === 'fire' && (
                    <>
                      <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center border border-red-200 m-2"><Flame className="text-red-300 opacity-50" size={48}/></div>
                      <div className="absolute -right-1 top-0 bottom-0 w-2 bg-black/80" title="Термолента"></div>
                    </>
                  )}
                  {activeTab === 'medical' && (
                    <>
                       <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center border border-blue-200"><Shield className="text-blue-300 opacity-50" size={48}/></div>
                       <div className="absolute -right-1 top-0 bottom-0 w-1 bg-gray-400" title="Алюминиевый торец"></div>
                    </>
                  )}
                  {activeTab === 'xray' && (
                    <>
                       <div className="absolute inset-0 bg-gray-800/20 flex items-center justify-center border border-gray-400"><Zap className="text-yellow-500 opacity-50" size={48}/></div>
                       <div className="absolute inset-2 border-4 border-gray-600 opacity-30" title="Свинец"></div>
                    </>
                  )}
                  <span className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-gray-400 font-mono">РАЗРЕЗ</span>
               </div>
             </div>
             
             <div className="md:w-1/2">
               <h3 className="text-xl font-bold text-dorren-dark mb-4">{CONTENT[activeTab].title}</h3>
               <ul className="space-y-4 mb-6">
                 {CONTENT[activeTab].layers.map((layer, i) => (
                   <li key={i} className="text-sm text-gray-700">
                     <span className="font-bold text-gray-900 block">{layer.name}</span>
                     {layer.desc}
                   </li>
                 ))}
               </ul>
               <div className="bg-red-50 p-4 rounded-lg border border-red-100 flex gap-3 items-start">
                  <AlertTriangle size={20} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-800 font-medium">{CONTENT[activeTab].warning}</p>
               </div>
             </div>
           </div>
        </section>

        {/* QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
           </div>
           {!showQuizResult ? (
             <div className="p-6 space-y-6">
               {QUIZ.map((q, idx) => (
                 <div key={q.id}>
                   <h3 className="font-semibold text-gray-900 mb-2">{idx + 1}. {q.q}</h3>
                   <div className="space-y-2">
                     {q.opts.map((opt) => (
                       <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${quizAnswers[q.id] === opt.id ? 'bg-dorren-bg border-dorren-dark' : 'hover:bg-gray-50 border-gray-200'}`}>
                         <input type="radio" name={`q_${q.id}`} checked={quizAnswers[q.id] === opt.id} onChange={() => handleQuizSelect(q.id, opt.id)} className="text-dorren-dark focus:ring-dorren-light"/>
                         <span className="text-sm text-gray-700">{opt.t}</span>
                       </label>
                     ))}
                   </div>
                 </div>
               ))}
               <button onClick={() => setShowQuizResult(true)} disabled={Object.keys(quizAnswers).length < QUIZ.length} className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90">Проверить</button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Результат: {calculateScore()}/{QUIZ.length}</h3>
                <div className="flex gap-4 justify-center mt-6">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">Заново</button>
                   <button onClick={() => onNavigate('lesson4.1')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
                      Начать Модуль 4 <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Спецдвери защищают от огня (EI), инфекций (Medical) и радиации (Pb).',
               'В противопожарных дверях главное — целостность и герметичность (термолента).',
               'В медицинских — устойчивость к химии (HPL) и ударам (торцы).',
               'В рентгенозащитных — непрерывный свинцовый контур, включая коробку.'
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
