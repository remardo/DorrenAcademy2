
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Frame, Square, LayoutTemplate, ChevronRight, 
  Ruler, Layers, Monitor, Info, CheckSquare, 
  AlertTriangle, Maximize
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson5_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeNodeType, setActiveNodeType] = useState<string>('framed');
  const [wallThickness, setWallThickness] = useState<number>(150);
  
  // Practice
  const [practiceScenario, setPracticeScenario] = useState<string | null>(null);
  const [practiceSelections, setPracticeSelections] = useState({ node: '', extension: '', casing: '' });
  const [practiceResult, setPracticeResult] = useState<string | null>(null);

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // DATA
  const NODE_TYPES = [
    { 
      id: 'straight', 
      label: 'Прямой проём', 
      desc: 'Без наличников или со скрытым коробом. Минимализм.', 
      reqs: ['Идеальная геометрия стен', 'Откосы под покраску/штукатурку', 'Скрытые петли'],
      visualClass: 'border-l-4 border-gray-400' 
    },
    { 
      id: 'framed', 
      label: 'С обрамлением', 
      desc: 'Классика: Короб + Добор + Наличники. Универсально.', 
      reqs: ['Компенсирует неровности', 'Закрывает монтажный шов', 'Простой монтаж'],
      visualClass: 'border-4 border-dorren-dark' 
    },
    { 
      id: 'paneled', 
      label: 'С панелями', 
      desc: 'Интеграция в стеновые панели (HPL/Шпон). Единая плоскость.', 
      reqs: ['Учет толщины панели', 'Специальные узлы стыковки', 'Высокая точность'],
      visualClass: 'bg-blue-50 border-y-4 border-blue-300' 
    }
  ];

  const SCENARIOS = [
    { 
      id: 'corridor', 
      title: 'Коридор без панелей', 
      hint: 'Стандартная отделка, нужна защита углов и шва.',
      ideal: { node: 'framed', extension: 'yes', casing: 'both' },
      feedback: 'Классическое обрамление с наличниками с двух сторон защитит углы и скроет шов.'
    },
    { 
      id: 'hpl', 
      title: 'Коридор с HPL панелями', 
      hint: 'Стены зашиты панелями на всю высоту.',
      ideal: { node: 'paneled', extension: 'yes', casing: 'none_or_min' }, // Flexible logic handling below
      feedback: 'Дверь должна стать частью стены. Доборы нужны для вывода в плоскость панелей.'
    },
    { 
      id: 'office', 
      title: 'Минимализм в офисе', 
      hint: 'Дизайн-проект "без лишних деталей".',
      ideal: { node: 'straight', extension: 'yes', casing: 'none' },
      feedback: 'Прямой проем (скрытый короб) или тонкий кант. Наличники не используются.'
    }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Что нужно знать для подбора длины добора?', 
      opts: [{id:'a', t:'Высоту полотна'}, {id:'b', t:'Тип фурнитуры'}, {id:'c', t:'Фактическую толщину стены с отделкой'}, {id:'d', t:'Цвет ручки'}], 
      correct: 'c', 
      expl: 'Добор компенсирует разницу между толщиной стены и глубиной короба.' 
    },
    { 
      id: 2, 
      q: 'Какой узел нужен для коридора с HPL-панелями?', 
      opts: [{id:'a', t:'Прямой без учета панелей'}, {id:'b', t:'Обычное обрамление поверх'}, {id:'c', t:'Интеграция в панельную систему'}, {id:'d', t:'Арочный'}], 
      correct: 'c', 
      expl: 'Дверь должна быть в одной плоскости с панелями для гигиены и эстетики.' 
    },
    { 
      id: 3, 
      q: 'Требование для прямого проема (без наличников)?', 
      opts: [{id:'a', t:'Массивные наличники'}, {id:'b', t:'Кривые стены допустимы'}, {id:'c', t:'Идеальная геометрия и отделка откосов'}, {id:'d', t:'Только кирпич'}], 
      correct: 'c', 
      expl: 'Стык стены и короба виден, поэтому отделка должна быть безупречной.' 
    },
    { 
      id: 4, 
      q: 'Функция наличника?', 
      opts: [{id:'a', t:'Увеличить вес'}, {id:'b', t:'Закрыть монтажный шов и стык'}, {id:'c', t:'Сделать дверь огнестойкой'}, {id:'d', t:'Никакой'}], 
      correct: 'b', 
      expl: 'Декоративная планка, закрывающая технологические зазоры.' 
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
    const scen = SCENARIOS.find(s => s.id === practiceScenario);
    if (!scen) return;
    
    // Simplified validation logic
    let isCorrect = false;
    if (scen.id === 'corridor' && practiceSelections.node === 'framed' && practiceSelections.casing === 'both') isCorrect = true;
    if (scen.id === 'hpl' && practiceSelections.node === 'paneled') isCorrect = true;
    if (scen.id === 'office' && practiceSelections.node === 'straight' && practiceSelections.casing === 'none') isCorrect = true;

    if (isCorrect) {
       setPracticeResult(scen.feedback);
    } else {
       setPracticeResult('Подумайте еще. Учтите стиль и конструктив.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="5.2" 
        title="Узлы примыкания" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Frame className="absolute right-10 top-10 w-64 h-64 opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 5. Узлы примыкания
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 5.2. Прямой проём, обрамление, панели
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем три базовых сценария оформления проема. Как учитывать толщину стены и подбирать доборы.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~20 минут</div>
                <div className="flex items-center gap-2"><Square size={16}/> Наличники</div>
                <div className="flex items-center gap-2"><Layers size={16}/> Панели</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к типам узлов
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <LayoutTemplate size={40} />
                      <Frame size={40} />
                      <Maximize size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Три узла: дверь без наличников, дверь с наличниками, дверь в стеновых панелях. Инженерная графика.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. INTRO */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Узел примыкания: как дверь «садится» в стену</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Дверь не висит в воздухе. Она стыкуется со стеной. Этот стык нужно оформить: закрыть пену, компенсировать толщину стены, защитить углы.
               Выбор узла (наличники, панели или "невидимка") меняет внешний вид и требования к строителям.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> О чем часто забывают при заказе?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'О реальной толщине стены с отделкой.'},
                 {id: 2, t: 'О цвете наличников.'},
                 {id: 3, t: 'О числе петель.'},
                 {id: 4, t: 'О ширине полотна.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Именно толщина стены диктует ширину добора. Без этого размера монтаж невозможен.
              </div>
            )}
          </div>
        </section>

        {/* 3. NODE TYPES OVERVIEW */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Три базовых варианта</h2>
           
           <div className="flex flex-wrap gap-2 mb-8">
              {NODE_TYPES.map(type => (
                 <button 
                   key={type.id}
                   onClick={() => setActiveNodeType(type.id)}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeNodeType === type.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                 >
                    {type.label}
                 </button>
              ))}
           </div>

           <div className="flex flex-col md:flex-row gap-8 items-center animate-fade-in">
              <div className="md:w-1/2">
                 <h3 className="text-xl font-bold text-dorren-dark mb-2">
                    {NODE_TYPES.find(n => n.id === activeNodeType)?.label}
                 </h3>
                 <p className="text-gray-700 mb-6 border-l-4 border-dorren-light pl-4 italic">
                    {NODE_TYPES.find(n => n.id === activeNodeType)?.desc}
                 </p>
                 <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-gray-400">Особенности:</p>
                    {NODE_TYPES.find(n => n.id === activeNodeType)?.reqs.map((r, i) => (
                       <div key={i} className="flex gap-2 items-start text-sm text-gray-600">
                          <CheckCircle size={14} className="text-green-600 mt-1 shrink-0"/>
                          {r}
                       </div>
                    ))}
                 </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                 {/* Visual Representation (Abstract CSS) */}
                 <div className="w-64 h-64 bg-gray-50 border border-gray-200 rounded-xl relative flex items-center justify-center">
                    {activeNodeType === 'straight' && (
                       <div className="relative w-40 h-40 bg-gray-200"> {/* Wall */}
                          <div className="absolute inset-y-0 right-10 w-1 bg-gray-400"></div> {/* Flush Frame */}
                          <div className="absolute inset-y-2 right-12 w-20 bg-white border border-gray-300 shadow-sm"></div> {/* Door */}
                          <div className="absolute right-0 top-1/2 translate-x-full text-xs text-gray-400 w-20 pl-2">Штукатурка (откос)</div>
                       </div>
                    )}
                    {activeNodeType === 'framed' && (
                       <div className="relative w-40 h-40 bg-gray-200"> {/* Wall */}
                          <div className="absolute inset-y-0 right-10 w-4 bg-dorren-dark"></div> {/* Frame */}
                          <div className="absolute inset-y-0 right-0 w-2 bg-dorren-dark"></div> {/* Casing Back */}
                          <div className="absolute inset-y-0 right-14 w-2 bg-dorren-dark"></div> {/* Casing Front */}
                          <div className="absolute inset-y-2 right-14 w-20 bg-white border border-gray-300"></div> {/* Door */}
                       </div>
                    )}
                    {activeNodeType === 'paneled' && (
                       <div className="relative w-40 h-40 bg-gray-200"> {/* Wall */}
                          <div className="absolute inset-y-0 right-0 w-2 bg-blue-200"></div> {/* Panel */}
                          <div className="absolute inset-y-0 right-12 w-2 bg-blue-200"></div> {/* Panel */}
                          <div className="absolute inset-y-0 right-10 w-2 bg-dorren-dark"></div> {/* Frame */}
                          <div className="absolute inset-y-2 right-10 w-20 bg-white border border-gray-300"></div> {/* Door */}
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* 4. WALL THICKNESS SLIDER */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Толщина стены и доборы</h2>
           <p className="text-gray-300 mb-8">
              Как меняется конструкция при увеличении толщины стены? Подвигайте слайдер.
           </p>

           <div className="mb-8">
              <input 
                type="range" 
                min="80" 
                max="300" 
                step="10"
                value={wallThickness} 
                onChange={(e) => setWallThickness(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-dorren-light"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-mono">
                 <span>80 мм (Тонкая)</span>
                 <span>150 мм (Средняя)</span>
                 <span>300 мм (Толстая)</span>
              </div>
           </div>

           <div className="bg-white/10 p-8 rounded-xl border border-white/10 flex flex-col items-center">
              <p className="text-xl font-bold mb-6 font-mono text-dorren-light">{wallThickness} мм</p>
              
              {/* CSS Diagram */}
              <div className="relative h-40 flex items-center">
                 {/* Frame (Fixed ~80px visual) */}
                 <div className="h-32 w-20 bg-gray-800 border border-gray-600 relative z-20 flex items-center justify-center text-[10px] text-gray-400">
                    Короб (80)
                 </div>
                 
                 {/* Extension (Variable) */}
                 {wallThickness > 80 && (
                    <div 
                      style={{ width: `${(wallThickness - 80) * 1.5}px` }} 
                      className="h-32 bg-dorren-light/20 border-y border-dorren-light/50 relative z-10 flex items-center justify-center text-[10px] text-dorren-light transition-all duration-300"
                    >
                       Добор ({wallThickness - 80})
                    </div>
                 )}

                 {/* Casing (Fixed) */}
                 <div className="h-40 w-4 bg-gray-300 rounded relative z-30 shadow-lg -ml-1"></div>
                 <div className="h-40 w-4 bg-gray-300 rounded relative z-30 shadow-lg absolute left-0 -ml-2"></div>
              </div>

              <p className="mt-6 text-sm text-gray-300 text-center max-w-md">
                 {wallThickness <= 80 
                    ? 'Стена тонкая. Короб перекрывает толщину полностью. Добор не нужен (или минимальный).' 
                    : `Стена толще короба. Необходим добор шириной ${wallThickness - 80} мм, чтобы закрыть торец стены.`}
              </p>
           </div>
        </section>

        {/* 5. PRACTICE CONFIGURATOR */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Практика: Подберите узел</h2>
           
           {!practiceScenario ? (
              <div className="grid md:grid-cols-3 gap-4">
                 {SCENARIOS.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setPracticeScenario(s.id)}
                      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left border border-transparent hover:border-dorren-dark"
                    >
                       <h3 className="font-bold text-lg text-dorren-dark mb-2">{s.title}</h3>
                       <p className="text-sm text-gray-500">{s.hint}</p>
                    </button>
                 ))}
              </div>
           ) : (
              <div className="bg-white rounded-xl animate-fade-in">
                 <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-xl text-dorren-dark">
                       {SCENARIOS.find(s => s.id === practiceScenario)?.title}
                    </h3>
                    <button onClick={() => { setPracticeScenario(null); setPracticeResult(null); setPracticeSelections({node:'', extension:'', casing:''}); }} className="text-sm text-gray-400 hover:text-dorren-dark">
                       Сменить
                    </button>
                 </div>

                 <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Тип узла</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelections({...practiceSelections, node: e.target.value})}>
                          <option value="">...</option>
                          <option value="straight">Прямой (скрытый)</option>
                          <option value="framed">С обрамлением</option>
                          <option value="paneled">С панелями</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Доборы</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelections({...practiceSelections, extension: e.target.value})}>
                          <option value="">...</option>
                          <option value="yes">Да (Стена толще)</option>
                          <option value="no">Нет (Тонкая стена)</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Наличники</label>
                       <select className="w-full p-2 border rounded bg-gray-50" onChange={(e) => setPracticeSelections({...practiceSelections, casing: e.target.value})}>
                          <option value="">...</option>
                          <option value="both">С двух сторон</option>
                          <option value="none">Нет (Скрытые/Панели)</option>
                          <option value="none_or_min">Минимальные/Нет</option>
                       </select>
                    </div>
                 </div>

                 {!practiceResult ? (
                    <button 
                      onClick={checkPractice}
                      disabled={!practiceSelections.node || !practiceSelections.extension || !practiceSelections.casing}
                      className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90 transition-all"
                    >
                       Проверить
                    </button>
                 ) : (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg animate-fade-in">
                       <p className="font-bold text-green-800 mb-1">Результат</p>
                       <p className="text-sm text-green-700">{practiceResult}</p>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 6. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по узлам.</p>
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
                    ? 'Отлично! Вы разбираетесь в оформлении проемов.' 
                    : 'Рекомендуем повторить различия между типами узлов.'}
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
                     title="Модуль 5 завершен"
                   >
                     Модуль 5 завершен
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 7. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Узел примыкания определяет внешний вид и чистоту монтажа.',
               'Прямой проем — это минимализм, но требует идеальных стен.',
               'Обрамление (наличники) — классика, скрывающая неровности.',
               'Панели HPL требуют интеграции двери в общую плоскость стены.',
               'Толщина стены диктует ширину доборов. Это нужно мерить "в чистоте".'
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
