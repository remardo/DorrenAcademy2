
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  AlertTriangle, XCircle, ChevronRight, 
  Maximize, RotateCcw, Layout, Map, MousePointer, 
  Info, Ruler, Layers, Move, Ban
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson5_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // State for interactives
  const [introPoll, setIntroPoll] = useState<string | null>(null);
  
  // Error 1: Size
  const [sizeInput, setSizeInput] = useState({ opening: 900, block: 880 });
  
  // Error 2: Thickness
  const [extensionState, setExtensionState] = useState<'short' | 'long' | 'correct'>('correct');
  
  // Error 3: Direction
  const [directionState, setDirectionState] = useState<'in' | 'out' | 'flip'>('in');
  
  // Error 4: Conflict
  const [showConflicts, setShowConflicts] = useState(false);

  // Practice
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [scenarioStep, setScenarioStep] = useState<number>(0); // For multi-step interaction inside a scenario

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const QUIZ = [
    { 
      id: 1, 
      q: 'Проём подготовлен по размерам, но при монтаже двери выясняется, что чистый пол поднялся на 40 мм. К чему это приведет?', 
      opts: [
        {id:'a', t:'Дверь станет легче'}, 
        {id:'b', t:'Полотно заденет пол, потребуется подрезка или изменение проема'}, 
        {id:'c', t:'Дверь будет открываться быстрее'}, 
        {id:'d', t:'Никаких последствий'}
      ], 
      correct: 'b', 
      expl: 'Высота проема уменьшилась, стандартное полотно не влезет по высоте.' 
    },
    { 
      id: 2, 
      q: 'Какая ошибка чаще всего связана с несогласованной толщиной стены?', 
      opts: [
        {id:'a', t:'Неправильный цвет двери'}, 
        {id:'b', t:'Появление "ступеньки" между коробом и стеной / проблема с добором'}, 
        {id:'c', t:'Неправильный выбор фурнитуры'}, 
        {id:'d', t:'Нарушение уровня пола'}
      ], 
      correct: 'b', 
      expl: 'Если стена толще короба, нужен добор. Если тоньше — короб будет торчать.' 
    },
    { 
      id: 3, 
      q: 'На эвакуационном пути дверь открывается против направления потока людей. Что это значит?', 
      opts: [
        {id:'a', t:'Просто неудобство'}, 
        {id:'b', t:'Нарушение норм пожарной безопасности (риск затора)'}, 
        {id:'c', t:'Эстетический минус'}, 
        {id:'d', t:'Повод заменить ручку'}
      ], 
      correct: 'b', 
      expl: 'Двери на путях эвакуации должны открываться по ходу движения.' 
    },
    { 
      id: 4, 
      q: 'Две двери в узком коридоре при открывании сталкиваются. Это ошибка:', 
      opts: [
        {id:'a', t:'Цвета'}, 
        {id:'b', t:'Бренда'}, 
        {id:'c', t:'Планирования (конфликт створок)'}, 
        {id:'d', t:'Замка'}
      ], 
      correct: 'c', 
      expl: 'Нужно менять направление открывания или смещать проемы.' 
    }
  ];

  const SCENARIOS = [
    {
      id: 1,
      title: 'Коридор с палатами',
      desc: 'Две двери напротив друг друга + радиатор.',
      mistakes: ['collision', 'radiator'],
      solution: 'Сменить направление открывания одной двери ("внутрь" палаты) или сместить проемы.',
      mapType: 'corridor'
    },
    {
      id: 2,
      title: 'Санузел МГН и Техпомещение',
      desc: 'Тесный блок с оборудованием.',
      mistakes: ['blocked_mgn', 'blocked_panel'],
      solution: 'Дверь МГН — наружу (безопасность). Техпомещение — наружу (доступ к щиту).',
      mapType: 'wc'
    },
    {
      id: 3,
      title: 'Стена с панелями',
      desc: 'Дизайнерский коридор.',
      mistakes: ['thickness', 'casing'],
      solution: 'Использовать короб для панелей или скрытый короб. Учесть общую толщину.',
      mapType: 'panels'
    }
  ];

  // Helpers
  const calculateGap = () => sizeInput.opening - sizeInput.block;
  const isGapOk = () => {
    const gap = calculateGap();
    return gap >= 20 && gap <= 50; // Simplified logic: 10-25mm per side
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
        lessonId="5.3" 
        title="Типовые ошибки" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <AlertTriangle className="absolute right-10 top-10 w-64 h-64 opacity-20 -rotate-12 text-red-500" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 5. Узлы примыкания
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 5.3. Типовые ошибки в дверных узлах и как их избежать
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем главные проблемы: неверные размеры, толщина стен, конфликты открывания. Учимся видеть риски на плане.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><Map size={16}/> Анализ планов</div>
                <div className="flex items-center gap-2"><AlertTriangle size={16}/> Работа над ошибками</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к разбору ошибок
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-red-400 opacity-80">
                      <Layout size={40} />
                      <Ban size={40} />
                      <Move size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Инфографика-план: фрагмент этажа, красные маркеры на дверях, которые бьются друг о друга или о стены. Инженерный стиль.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. COST OF ERRORS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Ошибки в узлах = Сроки и Деньги</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Типовые ошибки почти всегда всплывают на монтаже, когда стены уже готовы.
               Дверь не влезает, наличник не закрывает пену, створка бьет по дорогой сантехнике.
               Результат: переделка отделки, перезаказ дверей, срыв сдачи.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Когда дешевле всего поймать ошибку?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 'use', t: 'В эксплуатации (жалобы клиента).'},
                 {id: 'install', t: 'На монтаже (по факту).'},
                 {id: 'plan', t: 'На этапе чтения планов и ТЗ.'},
                 {id: 'order', t: 'При заказе на заводе.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introPoll === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroPoll(opt.id)} checked={introPoll === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introPoll && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 {introPoll === 'plan' ? 'Абсолютно верно. Исправление на бумаге стоит 0 рублей.' : 'Нет. Чем позже найдена ошибка, тем дороже ее исправить. Лучший момент — план.'}
              </div>
            )}
          </div>
        </section>

        {/* 3. ERROR 1: SIZE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-red-500">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Ошибка №1: Проём «не того размера»</h2>
           <p className="text-gray-600 mb-6">Классика: проём в бетоне 900мм, а блок заказан 880мм. Зазор всего 10мм на сторону — мало для пены.</p>

           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Ruler size={18}/> Калькулятор монтажного зазора</h3>
              
              <div className="flex flex-col md:flex-row gap-6 items-end mb-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Ширина проёма (мм)</label>
                    <input 
                      type="number" 
                      value={sizeInput.opening}
                      onChange={(e) => setSizeInput({...sizeInput, opening: parseInt(e.target.value) || 0})}
                      className="border border-gray-300 rounded p-2 w-32"
                    />
                 </div>
                 <div className="text-2xl text-gray-300 font-light">-</div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Ширина блока (мм)</label>
                    <input 
                      type="number" 
                      value={sizeInput.block}
                      onChange={(e) => setSizeInput({...sizeInput, block: parseInt(e.target.value) || 0})}
                      className="border border-gray-300 rounded p-2 w-32"
                    />
                 </div>
                 <div className="text-2xl text-gray-300 font-light">=</div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Зазор (общий)</label>
                    <div className={`p-2 rounded font-bold w-32 text-center ${isGapOk() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                       {calculateGap()} мм
                    </div>
                 </div>
              </div>

              <div className="text-sm">
                 {calculateGap() < 20 && <p className="text-red-600 font-bold">⚠️ Слишком узко! Некуда залить пену. Короб может деформироваться.</p>}
                 {calculateGap() > 60 && <p className="text-red-600 font-bold">⚠️ Слишком широко! Наличник может не перекрыть пену. Слабое крепление.</p>}
                 {isGapOk() && <p className="text-green-700 font-bold">✅ Отлично. Зазор 10-25 мм на сторону — оптимально.</p>}
              </div>
           </div>
        </section>

        {/* 4. ERROR 2: THICKNESS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-blue-500">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Ошибка №2: Несогласованная толщина</h2>
           <p className="text-gray-600 mb-6">Проект: 100 мм. Факт с плиткой: 115 мм. Короб не встает, добора не хватает.</p>

           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 space-y-3">
                 <p className="font-bold text-sm text-gray-800 mb-2">Выберите ситуацию с добором:</p>
                 <button 
                   onClick={() => setExtensionState('short')}
                   className={`w-full p-3 rounded border text-left text-sm transition-all ${extensionState === 'short' ? 'bg-red-50 border-red-300 ring-1 ring-red-300' : 'bg-white hover:bg-gray-50'}`}
                 >
                    ❌ Добор короткий (стены шире)
                 </button>
                 <button 
                   onClick={() => setExtensionState('long')}
                   className={`w-full p-3 rounded border text-left text-sm transition-all ${extensionState === 'long' ? 'bg-red-50 border-red-300 ring-1 ring-red-300' : 'bg-white hover:bg-gray-50'}`}
                 >
                    ❌ Добор длинный (стены уже)
                 </button>
                 <button 
                   onClick={() => setExtensionState('correct')}
                   className={`w-full p-3 rounded border text-left text-sm transition-all ${extensionState === 'correct' ? 'bg-green-50 border-green-300 ring-1 ring-green-300' : 'bg-white hover:bg-gray-50'}`}
                 >
                    ✅ Корректный размер
                 </button>
              </div>

              <div className="w-full md:w-1/2 flex justify-center">
                 {/* CSS Wall Section Visualization */}
                 <div className="relative h-40 w-64 bg-gray-100 border border-gray-300 rounded flex items-center justify-center overflow-hidden">
                    {/* Wall */}
                    <div className="h-full w-40 bg-gray-300 relative z-10 flex items-center justify-center text-xs text-gray-500">
                       Стена
                    </div>
                    {/* Frame & Extension */}
                    <div className="absolute h-32 bg-dorren-dark/20 border-y-2 border-dorren-dark w-full flex items-center justify-center z-20 transition-all duration-500"
                       style={{ width: extensionState === 'short' ? '140px' : extensionState === 'long' ? '180px' : '160px' }}
                    >
                       <span className="text-[10px] bg-white px-1">Короб + Добор</span>
                    </div>
                    {/* Casing Hints */}
                    <div className="absolute left-10 h-full w-1 bg-red-500/50 z-30"></div> {/* Wall Edge Left */}
                    <div className="absolute right-10 h-full w-1 bg-red-500/50 z-30"></div> {/* Wall Edge Right */}
                 </div>
              </div>
           </div>
           
           <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded">
              {extensionState === 'short' && 'Образуется "полка" из стены, которую не закрыть наличником. Требуется замена добора.'}
              {extensionState === 'long' && 'Короб торчит из стены. Наличник повиснет в воздухе. Нужно пилить добор на месте (риск сколов).'}
              {extensionState === 'correct' && 'Короб и добор идеально совпадают с плоскостью стены. Наличник ложится плотно.'}
           </div>
        </section>

        {/* 5. ERROR 3: DIRECTION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-8 border-l-yellow-500">
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">Ошибка №3: Открывание «не туда»</h2>
           <p className="text-gray-600 mb-6">Дверь блокирует проход или бьется о мебель. Проверьте на симуляторе.</p>

           <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-100 rounded-xl p-8 relative h-64 overflow-hidden border border-gray-300">
                 {/* Room */}
                 <div className="absolute top-0 bottom-0 left-0 w-8 bg-gray-400"></div> {/* Wall L */}
                 <div className="absolute top-0 right-0 w-32 h-4 bg-gray-400"></div> {/* Wall T */}
                 <div className="absolute bottom-0 right-0 w-32 h-4 bg-gray-400"></div> {/* Wall B */}
                 
                 {/* Furniture/Obstacle */}
                 <div className="absolute top-10 left-12 w-24 h-12 bg-blue-200 border border-blue-400 flex items-center justify-center text-[10px] text-blue-800">
                    Шкаф / Радиатор
                 </div>

                 {/* Door Logic */}
                 <div className="absolute top-1/2 left-8 w-2 h-16 bg-dorren-dark -translate-y-1/2"></div> {/* Frame */}
                 
                 <div className={`absolute top-1/2 left-8 h-2 bg-red-500 origin-left transition-all duration-500 ${
                    directionState === 'in' ? 'w-24 rotate-45' : 
                    directionState === 'out' ? 'w-24 -rotate-135' : 
                    'w-24 rotate-[135deg]' // Flip hinge side logic simplified for demo
                 }`}></div>
                 
                 {/* Arc */}
                 <div className={`absolute top-1/2 left-8 w-48 h-48 border-2 border-dashed border-red-300 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-opacity ${directionState === 'in' ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>

              <div className="space-y-4">
                 <div className="flex gap-2">
                    <button onClick={() => setDirectionState('in')} className={`px-4 py-2 rounded text-sm border ${directionState === 'in' ? 'bg-dorren-dark text-white' : 'bg-white'}`}>Внутрь (к шкафу)</button>
                    <button onClick={() => setDirectionState('out')} className={`px-4 py-2 rounded text-sm border ${directionState === 'out' ? 'bg-dorren-dark text-white' : 'bg-white'}`}>Наружу (в коридор)</button>
                 </div>
                 
                 <div className="bg-yellow-50 p-4 rounded text-sm text-yellow-900 border border-yellow-200">
                    {directionState === 'in' && '⚠️ Ошибка: Створка бьется о шкаф/радиатор. Проход заужен.'}
                    {directionState === 'out' && '✅ Оптимально для комнаты (не занимает место), но проверьте, не перекрывает ли коридор.'}
                 </div>
              </div>
           </div>
        </section>

        {/* 6. ERROR 4: CONFLICTS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Ошибка №4: Конфликт дверей</h2>
           <p className="text-gray-300 mb-6">Две двери рядом могут заблокировать друг друга при одновременном открытии.</p>

           <div className="bg-white/10 p-8 rounded-xl border border-white/10 relative h-64 flex items-center justify-center">
              {/* Floor plan abstract */}
              <div className="relative w-64 h-40">
                 <div className="absolute top-0 left-0 right-0 h-2 bg-gray-500"></div>
                 <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-500"></div>
                 
                 {/* Door 1 */}
                 <div className="absolute top-2 left-10 w-2 h-2 bg-white rounded-full"></div>
                 <div className="absolute top-2 left-10 w-16 h-1 bg-white origin-left rotate-45 transition-transform"></div>
                 
                 {/* Door 2 */}
                 <div className="absolute top-2 left-32 w-2 h-2 bg-white rounded-full"></div>
                 <div className="absolute top-2 left-32 w-16 h-1 bg-white origin-left rotate-[135deg] transition-transform"></div>

                 {/* Conflict Zone */}
                 <div className={`absolute top-10 left-20 w-12 h-12 bg-red-500/50 rounded-full blur-md animate-pulse transition-opacity duration-500 ${showConflicts ? 'opacity-100' : 'opacity-0'}`}></div>
                 
                 {/* Arcs */}
                 {showConflicts && (
                    <>
                       <div className="absolute top-2 left-10 w-32 h-32 border border-dashed border-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                       <div className="absolute top-2 left-32 w-32 h-32 border border-dashed border-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    </>
                 )}
              </div>

              <button 
                onClick={() => setShowConflicts(!showConflicts)}
                className="absolute bottom-4 right-4 bg-dorren-light text-dorren-dark px-4 py-2 rounded text-sm font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                 {showConflicts ? 'Скрыть зоны' : 'Показать конфликт'}
                 <Maximize size={16} />
              </button>
           </div>
        </section>

        {/* 7. PRACTICE SCENARIOS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Практика: Найдите решение</h2>
           <p className="text-gray-700 mb-8">
              Представьте, что вы проверяете план. Выберите сценарий и найдите ошибку.
           </p>

           <div className="grid md:grid-cols-3 gap-6 mb-8">
              {SCENARIOS.map((scen) => (
                 <button 
                   key={scen.id}
                   onClick={() => { setActiveScenario(scen.id); setScenarioStep(0); }}
                   className={`p-6 rounded-xl border text-left transition-all ${activeScenario === scen.id ? 'bg-dorren-bg border-dorren-dark ring-1 ring-dorren-dark' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                 >
                    <h3 className="font-bold text-gray-900 mb-2">{scen.title}</h3>
                    <p className="text-xs text-gray-500">{scen.desc}</p>
                 </button>
              ))}
           </div>

           {activeScenario && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 animate-fade-in shadow-lg">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-dorren-dark">{SCENARIOS.find(s => s.id === activeScenario)?.title}</h3>
                    <button onClick={() => setActiveScenario(null)} className="text-gray-400 hover:text-gray-600"><XCircle /></button>
                 </div>
                 
                 {scenarioStep === 0 ? (
                    <div className="text-center py-8">
                       <p className="text-lg text-gray-700 mb-6">Какие ошибки вы видите?</p>
                       <div className="flex flex-wrap gap-4 justify-center">
                          <button onClick={() => setScenarioStep(1)} className="px-6 py-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-bold border border-red-200">
                             Конфликт открывания
                          </button>
                          <button onClick={() => setScenarioStep(1)} className="px-6 py-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-bold border border-red-200">
                             Проблема с доборами
                          </button>
                          <button onClick={() => setScenarioStep(1)} className="px-6 py-3 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-bold border border-red-200">
                             Блокировка доступа
                          </button>
                       </div>
                       <p className="text-xs text-gray-400 mt-4">(В учебном режиме любой выбор верный, чтобы показать решение)</p>
                    </div>
                 ) : (
                    <div className="animate-fade-in bg-green-50 p-6 rounded-lg border border-green-200">
                       <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                          <CheckCircle size={20}/> Верное решение
                       </h4>
                       <p className="text-gray-800 text-sm leading-relaxed mb-4">
                          {SCENARIOS.find(s => s.id === activeScenario)?.solution}
                       </p>
                       <button onClick={() => setScenarioStep(0)} className="text-xs text-green-700 underline">Попробовать другой вариант</button>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 8. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса на внимательность.</p>
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
                    ? 'Отлично! Вы научились видеть подводные камни.' 
                    : 'Рекомендуем повторить раздел про размеры и направление.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button 
                     onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} 
                     className="text-gray-500 hover:text-dorren-dark px-4 py-2"
                   >
                     Пройти заново
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson6.1')}
                     className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2"
                   >
                     Перейти к Модулю 6
                     <ArrowRight size={16} />
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
               'Ошибки в узлах — это переделки и деньги. Дешевле всего исправить их на бумаге.',
               'Всегда проверяйте соответствие размера проема, блока и чистого пола.',
               'Толщина стены должна учитывать все слои (плитку, панели), иначе короб не встанет.',
               'Направление открывания должно быть логичным, безопасным и не создавать конфликтов.',
               'Задача менеджера — увидеть риск конфликта с мебелью и инженерией заранее.'
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
