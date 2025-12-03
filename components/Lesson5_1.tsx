
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  BrickWall, LayoutGrid, Hammer, ChevronRight, 
  Layers, Square, Construction, AlertTriangle, Monitor,
  Info, Maximize, Anchor, MousePointer
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson5_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeOverview, setActiveOverview] = useState<string>('concrete');
  const [activeComparison, setActiveComparison] = useState<string | null>(null);
  
  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // DATA
  const OVERVIEW_ITEMS = [
    { id: 'concrete', label: 'Бетон', desc: 'Монолит, ЖБИ. Самое жесткое основание.' },
    { id: 'brick', label: 'Кирпич', desc: 'Полнотелый, пустотелый, блоки.' },
    { id: 'drywall', label: 'ГКЛ-перегородка', desc: 'Гипсокартон по металлокаркасу. Требует усиления.' },
    { id: 'sandwich', label: 'Сэндвич-панель', desc: 'Быстровозводимые здания. Тонкая обшивка.' },
    { id: 'modular', label: 'Модульная система', desc: 'Офисные перегородки (стекло/алюминий).' }
  ];

  const DETAILS = {
    concrete: {
      title: 'Бетон и кирпич: надежная база',
      intro: 'Самые "понятные" основания. Дают отличную жесткость для тяжелых дверей (EI60, рентген).',
      points: [
        'Бетон: Высокая несущая способность. Крепление анкерами.',
        'Кирпич: Важно не попасть в шов и не расколоть край. Для пустотелых блоков — хим. анкера.',
        'Правило: Соблюдать отступы от края проема, чтобы не сколоть угол.'
      ],
      imgPrompt: 'Разрез: Монолитная стена, дверная коробка зафиксирована анкером, шов заполнен пеной.'
    },
    brick: {
      title: 'Бетон и кирпич: надежная база',
      intro: 'Самые "понятные" основания. Дают отличную жесткость для тяжелых дверей (EI60, рентген).',
      points: [
        'Бетон: Высокая несущая способность. Крепление анкерами.',
        'Кирпич: Важно не попасть в шов и не расколоть край. Для пустотелых блоков — хим. анкера.',
        'Правило: Соблюдать отступы от края проема, чтобы не сколоть угол.'
      ],
      imgPrompt: 'Разрез: Кирпичная стена, дюбель входит в тело кирпича, коробка выставлена по уровню.'
    },
    drywall: {
      title: 'ГКЛ по металлокаркасу',
      intro: 'Стандарт для офисов. Сам ГКЛ дверь не держит — вся нагрузка на каркас.',
      points: [
        'Обязательно: Усиленные стоечные профили (UA) или закладной брус.',
        'Крепление: Короб крутится к металлу каркаса, а не к листу гипсокартона.',
        'Риск: Без усиления тяжелая дверь расшатает перегородку и пойдут трещины.'
      ],
      imgPrompt: 'Разрез: ГКЛ стена, внутри виден двойной усиленный профиль и брус, к которому прикручена дверь.'
    },
    sandwich: {
      title: 'Сэндвич-панели',
      intro: 'Тонкий металл (0.5 мм) и пена внутри. Нельзя крепить "просто саморезом".',
      points: [
        'Решение: Обхватная коробка (портал) или сквозные шпильки.',
        'Усиление: Часто нужна закладная труба внутри панели или рама снаружи.',
        'Важно: Герметизация стыков, чтобы не нарушить теплоизоляцию.'
      ],
      imgPrompt: 'Разрез: Сэндвич-панель, дверной короб обхватывает проем с двух сторон (обжимная рама).'
    },
    modular: {
      title: 'Модульные перегородки',
      intro: 'Конструктор. Дверь должна быть частью системы профилей.',
      points: [
        'Совместимость: Толщина и геометрия короба Dorren должны подойти к профилю перегородки.',
        'Крепление: Через специальные сухари или адаптеры системы.',
        'Дизайн: Единые линии остекления и горизонталей.'
      ],
      imgPrompt: 'Офис: Стеклянная перегородка, в которую интегрирован дверной блок. Видны алюминиевые профили.'
    }
  };

  const COMPARISON_DATA = [
    { id: 'rigidity', label: 'Жёсткость', vals: ['Высокая', 'Средняя', 'Низкая (нужно усиление)', 'Низкая (нужна рама)', 'Зависит от профиля'] },
    { id: 'fixing', label: 'Крепление', vals: ['Анкера', 'Дюбели / Хим. анкера', 'Саморезы в каркас', 'Шпильки / Обжим', 'Системный крепеж'] },
    { id: 'risks', label: 'Главный риск', vals: ['Сколоть край', 'Попасть в пустоту', 'Прогиб стены', 'Смятие панели', 'Несовпадение размеров'] },
    { id: 'doors', label: 'Тип дверей', vals: ['Любые (вкл. Рентген)', 'Любые', 'Офисные / Легкие', 'Технические / Влагостойкие', 'Офисные / Стеклянные'] }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Почему в ГКЛ нельзя крепить короб только к листу гипсокартона?', 
      opts: [{id:'a', t:'Долго монтировать'}, {id:'b', t:'ГКЛ не несет нагрузку, нужен каркас'}, {id:'c', t:'Некрасиво'}, {id:'d', t:'Запрещает производитель пены'}], 
      correct: 'b', 
      expl: 'Гипс раскрошится от динамических нагрузок двери.' 
    },
    { 
      id: 2, 
      q: 'Лучшее основание для тяжелой рентгенозащитной двери?', 
      opts: [{id:'a', t:'Одинарный ГКЛ'}, {id:'b', t:'Стекло'}, {id:'c', t:'Бетон или полнотелый кирпич'}, {id:'d', t:'Сэндвич-панель'}], 
      correct: 'c', 
      expl: 'Бетон обеспечивает максимальную жесткость и несущую способность.' 
    },
    { 
      id: 3, 
      q: 'Особенность монтажа в сэндвич-панель?', 
      opts: [{id:'a', t:'Можно на клей'}, {id:'b', t:'Нужна обхватная рама или закладные'}, {id:'c', t:'Только на пену'}, {id:'d', t:'Никаких особенностей'}], 
      correct: 'b', 
      expl: 'Тонкая обшивка панели не удержит крепеж, нужно распределить нагрузку.' 
    },
    { 
      id: 4, 
      q: 'Что важно для модульной перегородки?', 
      opts: [{id:'a', t:'Цвет стен'}, {id:'b', t:'Высота потолка'}, {id:'c', t:'Совместимость профильных систем'}, {id:'d', t:'Наличие порога'}], 
      correct: 'c', 
      expl: 'Дверной модуль должен физически стыковаться с профилем перегородки.' 
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
        lessonId="5.1" 
        title="Типы стен" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <BrickWall className="absolute right-10 top-10 w-64 h-64 opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 5. Узлы примыкания
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 5.1. Типы стен и особенности монтажа
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Бетон, кирпич, ГКЛ, сэндвич. Как конструктив стены влияет на выбор крепежа и подготовку проема.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15 минут</div>
                <div className="flex items-center gap-2"><Construction size={16}/> Монтаж</div>
                <div className="flex items-center gap-2"><Anchor size={16}/> Крепеж</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к типам стен
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <BrickWall size={40} />
                      <Layers size={40} />
                      <Square size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: 4 разреза стены: бетон, кирпич, ГКЛ профиль, сэндвич-панель. Везде встроен один и тот же дверной короб.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Дверь работает только вместе со стеной</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Дверь — это часть узла «стена–проем–короб». В бетоне она стоит "намертво", в слабом ГКЛ может шататься вместе с перегородкой.
               Тип стены определяет крепеж (анкер или саморез), усиление и стоимость монтажа.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что вы первым делом спросите у проектировщика?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Только цвет полотна.'},
                 {id: 2, t: 'Размеры проема + Тип стены/перегородки.'},
                 {id: 3, t: 'Класс огнестойкости.'},
                 {id: 4, t: 'Направление открывания.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Верно! Без понимания стены мы не сможем подобрать правильный короб и крепеж.
              </div>
            )}
          </div>
        </section>

        {/* 3. WALL TYPES OVERVIEW */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">С чем мы работаем</h2>
           
           <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {OVERVIEW_ITEMS.map((item) => (
                 <button 
                   key={item.id}
                   onClick={() => setActiveOverview(item.id)}
                   className={`px-4 py-3 rounded-xl border min-w-[140px] text-left transition-all ${activeOverview === item.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg' : 'bg-gray-50 border-gray-200 hover:border-dorren-light text-gray-600'}`}
                 >
                    <div className="font-bold text-sm mb-1">{item.label}</div>
                    <div className={`text-xs ${activeOverview === item.id ? 'text-dorren-light' : 'text-gray-400'}`}>Нажмите</div>
                 </button>
              ))}
           </div>

           <div className="bg-dorren-bg/20 rounded-xl p-8 border border-dorren-light/20 animate-fade-in flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-3/5">
                 <h3 className="text-xl font-bold text-dorren-dark mb-4">{DETAILS[activeOverview as keyof typeof DETAILS].title}</h3>
                 <p className="text-gray-700 mb-6 italic border-l-4 border-dorren-light pl-4">
                    {DETAILS[activeOverview as keyof typeof DETAILS].intro}
                 </p>
                 <ul className="space-y-3">
                    {DETAILS[activeOverview as keyof typeof DETAILS].points.map((pt, i) => (
                       <li key={i} className="flex gap-3 text-sm text-gray-800">
                          <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5"/>
                          {pt}
                       </li>
                    ))}
                 </ul>
              </div>
              
              <div className="md:w-2/5 flex justify-center">
                 <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center p-4 relative shadow-sm">
                    {/* Abstract Visual based on type */}
                    <div className="absolute inset-0 opacity-10">
                       {activeOverview === 'concrete' && <div className="w-full h-full bg-gray-500"></div>}
                       {activeOverview === 'brick' && <div className="w-full h-full pattern-diagonal-lines bg-red-100"></div>}
                       {activeOverview === 'drywall' && <div className="w-full h-full flex justify-between px-8"><div className="w-1 h-full bg-gray-400"></div><div className="w-1 h-full bg-gray-400"></div></div>}
                       {activeOverview === 'sandwich' && <div className="w-full h-full border-x-4 border-blue-200 bg-yellow-50"></div>}
                    </div>
                    
                    <div className="text-center relative z-10">
                       <Hammer size={32} className="text-gray-400 mx-auto mb-2"/>
                       <p className="text-[10px] text-gray-500 font-mono bg-white/80 p-2 rounded border border-gray-100">
                          {DETAILS[activeOverview as keyof typeof DETAILS].imgPrompt}
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 4. COMPARISON MATRIX */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Сравнение оснований</h2>
           <p className="text-gray-300 mb-8">Выберите тип стены, чтобы увидеть специфику.</p>

           <div className="grid md:grid-cols-5 gap-2 mb-6">
              {['Бетон', 'Кирпич', 'ГКЛ', 'Сэндвич', 'Модуль'].map((label, idx) => (
                 <button 
                   key={idx} 
                   onClick={() => setActiveComparison(idx.toString())}
                   className={`p-3 rounded text-sm font-bold transition-all ${activeComparison === idx.toString() ? 'bg-dorren-light text-dorren-dark' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                    {label}
                 </button>
              ))}
           </div>

           <div className="bg-white/10 border border-white/10 rounded-xl p-6 min-h-[200px]">
              {activeComparison ? (
                 <div className="space-y-4 animate-fade-in">
                    {COMPARISON_DATA.map(row => (
                       <div key={row.id} className="flex flex-col sm:flex-row sm:items-center border-b border-white/10 pb-2 last:border-0">
                          <span className="text-xs uppercase font-bold text-gray-400 w-32 mb-1 sm:mb-0">{row.label}</span>
                          <span className="text-sm font-medium">{row.vals[parseInt(activeComparison)]}</span>
                       </div>
                    ))}
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                    <MousePointer size={32} className="mb-2 opacity-50"/>
                    <p>Нажмите на кнопку сверху</p>
                 </div>
              )}
           </div>
        </section>

        {/* 5. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по монтажу.</p>
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
                    ? 'Отлично! Вы понимаете, как стена влияет на дверь.' 
                    : 'Рекомендуем повторить раздел про ГКЛ и сэндвич-панели.'}
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
                     title="Урок завершен"
                   >
                     Урок завершен
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 6. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Дверь — часть узла. Без крепкой стены дверь работать не будет.',
               'Бетон/Кирпич = Надежность. ГКЛ = Требует усиления каркаса.',
               'Сэндвич-панели требуют обхватных рам (порталов) для распределения нагрузки.',
               'В модульных перегородках важна системная совместимость профилей.',
               'Уточняйте тип стен на старте, чтобы не переделывать узлы потом.'
             ].map((txt, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
           <div className="text-center">
              <p className="text-xs text-gray-400 mt-2">Далее: Типовые узлы примыкания</p>
           </div>
        </section>

      </main>
    </div>
  );
};
