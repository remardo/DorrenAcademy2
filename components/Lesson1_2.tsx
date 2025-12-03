
import React, { useState } from 'react';
import { 
  Clock, Target, CheckCircle, ChevronRight, AlertTriangle, 
  Settings, PenTool, Factory, Hammer, Wrench, ArrowRight,
  FileSpreadsheet, Search, CheckSquare, XCircle
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson1_2: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [knowledgeLevel, setKnowledgeLevel] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [scenarioChoice, setScenarioChoice] = useState<number | null>(null);
  const [activeProductionStep, setActiveProductionStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- Data ---
  const ROLES = [
    { id: 'sales', label: 'Продажи / PM', text: 'Этот урок поможет вам объяснять заказчику, почему DORREN нужно подключать уже на стадии проекта, а не только на этапе поставки дверей.' },
    { id: 'estimator', label: 'Инженер-сметчик', text: 'Вы увидите, как ваши спецификации связаны с работой проектного офиса, производства и сервиса, и где ошибки особенно дороги.' },
    { id: 'procurement', label: 'Закупки', text: 'Вы поймёте, в какой момент лучше всего согласовывать замену дверей и почему важны параметры, заложенные на ранних этапах.' },
    { id: 'architect', label: 'Проектировщик', text: 'Урок показывает, как DORREN помогает подбирать узлы и решения, которые проходят экспертизу и работают в эксплуатации.' },
    { id: 'boss', label: 'Руководитель', text: 'Вы увидите, на каких этапах DORREN снижает риски по срокам, качеству, нормам и эксплуатации, и как это влияет на экономику проекта.' },
  ];

  const STAGES = [
    { id: 1, title: 'Проектирование', icon: PenTool, short: 'Анализ данных, подбор решений, узлы' },
    { id: 2, title: 'Спецификация', icon: FileSpreadsheet, short: 'Сводная таблица решений по объекту' },
    { id: 3, title: 'Производство', icon: Factory, short: 'Изготовление на собственной базе' },
    { id: 4, title: 'Монтаж', icon: Hammer, short: 'Поставка, шеф-монтаж, контроль' },
    { id: 5, title: 'Эксплуатация', icon: Settings, short: 'Сервис, ремонт, модернизация' },
  ];

  const PRODUCTION_STEPS = [
    { title: 'Материалы', desc: 'Отбор и сушка бруса, входной контроль металла и комплектующих.' },
    { title: 'Каркас', desc: 'Сборка каркаса, заполнение (сотовое/противопожарное), усиление.' },
    { title: 'Облицовка', desc: 'Нанесение HPL/CPL пластика, шпона или покраска эмалью.' },
    { title: 'Комплектация', desc: 'Врезка замков, установка уплотнителей, подготовка фурнитуры.' },
    { title: 'Контроль', desc: 'Проверка геометрии, зазоров и финальная маркировка.' },
  ];

  const INSTALLATION_CHECKLIST = [
    'Проверены зазоры и притворы по нормативам',
    'Короба закреплены по узлам (тип анкеров)',
    'Установлена вся фурнитура (доводчики, антипаника)',
    'Противопожарные двери без нарушения геометрии'
  ];

  const QUIZ = [
    { id: 1, q: 'Какой этап НЕ входит в жизненный цикл проекта DORREN?', options: [{id:'a', t:'Проектирование'}, {id:'b', t:'Спецификация'}, {id:'c', t:'Логотипирование'}, {id:'d', t:'Производство'}], correct: 'c' },
    { id: 2, q: 'Когда формируется спецификация дверей?', options: [{id:'a', t:'На этапе эксплуатации'}, {id:'b', t:'После монтажа'}, {id:'c', t:'После утверждения проектных решений'}, {id:'d', t:'При сносе здания'}], correct: 'c' },
    { id: 3, q: 'Зачем подключать DORREN на этапе проекта?', options: [{id:'a', t:'Чтобы получить скидку'}, {id:'b', t:'Заложить корректные решения и узлы'}, {id:'c', t:'Чтобы не мешать строителям'}, {id:'d', t:'Забронировать склад'}], correct: 'b' },
    { id: 4, q: 'Какова роль DORREN на этапе эксплуатации?', options: [{id:'a', t:'Только новые продажи'}, {id:'b', t:'Никакой'}, {id:'c', t:'Сервис, ремонт и модернизация'}, {id:'d', t:'Охрана объекта'}], correct: 'c' },
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
        lessonId="1.2" 
        title="Роль DORREN в жизненном цикле" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. Cover */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-dorren-light mb-4">
                <Clock size={16} />
                <span className="text-sm font-medium">15–20 минут</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Роль DORREN в жизненном цикле проекта</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                От стадии проекта до эксплуатации: где мы создаём ценность для объекта.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <label className="text-xs font-bold uppercase text-dorren-light tracking-wider mb-3 block">Ваша зона ответственности</label>
                <select 
                  className="w-full bg-white text-gray-900 rounded p-2 mb-4 text-sm font-medium focus:ring-2 focus:ring-dorren-light outline-none"
                  onChange={(e) => setActiveRole(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Выберите роль...</option>
                  {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
                <div className="min-h-[3rem]">
                  {activeRole ? (
                    <p className="text-sm text-white animate-fade-in">{ROLES.find(r => r.id === activeRole)?.text}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Выберите роль, чтобы узнать цели урока...</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block w-1/3 pt-8">
               <div className="aspect-square rounded-full border-4 border-dorren-light/20 flex items-center justify-center relative animate-spin-slow">
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-white/20"></div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-dorren-light text-dorren-dark rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-2xl shadow-lg shadow-dorren-light/50">D</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-dorren-light">Life Cycle</span>
                  </div>
                  {/* Planetary dots */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-4 h-4 bg-white/50 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16">

        {/* 2. Intro */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем вам этот урок</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            На каждом объекте десятки дверей, и они «рождаются» не в момент поставки, а гораздо раньше — на стадии проекта. 
            Важно видеть весь жизненный цикл, чтобы объяснять заказчику наши решения и предотвращать ошибки.
          </p>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <Target size={18} /> Самооценка
            </h3>
            <p className="text-sm text-gray-600 mb-4">Насколько хорошо вы представляете роль DORREN на разных этапах?</p>
            <div className="space-y-2">
               {['Плохо: знаю только «поставку»', 'В целом понимаю, но без деталей', 'Хорошо знаю все стадии'].map((opt, i) => (
                 <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${knowledgeLevel === opt ? 'bg-white border-dorren-dark' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="level" value={opt} onChange={() => setKnowledgeLevel(opt)} className="text-dorren-dark focus:ring-dorren-light"/>
                    <span className="text-sm font-medium">{opt}</span>
                 </label>
               ))}
            </div>
            {knowledgeLevel && (
               <div className="mt-4 text-sm text-dorren-dark/80 italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Отлично. В этом уроке мы разложим всё по полочкам.
               </div>
            )}
          </div>
        </section>

        {/* 3. Customer Lifecycle View */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Взгляд заказчика</h2>
           <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
              <div className="flex items-center justify-between min-w-[600px] relative">
                 {/* Line */}
                 <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 z-0"></div>
                 
                 {[
                   { t: 'Планирование', i: '💡', d: 'Идея, бюджет, сроки' },
                   { t: 'Проектирование', i: '📐', d: 'Чертежи и решения' },
                   { t: 'Стройка', i: '🏗️', d: 'Монтаж и работы' },
                   { t: 'Эксплуатация', i: '🏢', d: 'Работа здания' }
                 ].map((step, i) => (
                   <div key={i} className="relative z-10 flex flex-col items-center text-center w-1/4">
                      <div className="w-16 h-16 bg-white border-2 border-dorren-light rounded-full flex items-center justify-center text-2xl shadow-sm mb-3">
                        {step.i}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{step.t}</h3>
                      <p className="text-xs text-gray-500 max-w-[120px]">{step.d}</p>
                   </div>
                 ))}
              </div>
           </div>
           <p className="text-sm text-gray-500 mt-4 px-2">
             Для заказчика двери — лишь один из элементов, но от них зависит безопасность и сдача объекта.
           </p>
        </section>

        {/* 4. DORREN Lifecycle (5 Stages) */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-2">5 этапов для DORREN</h2>
           <p className="text-gray-600 mb-8">Нажмите на этап, чтобы узнать детали.</p>

           <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {STAGES.map((stage) => {
                 const isActive = activeStage === stage.id;
                 return (
                   <button 
                     key={stage.id}
                     onClick={() => setActiveStage(stage.id)}
                     className={`flex flex-col items-center p-4 rounded-xl transition-all border ${isActive ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg scale-105 z-10' : 'bg-white text-gray-500 border-gray-200 hover:border-dorren-light'}`}
                   >
                     <stage.icon size={24} className={`mb-2 ${isActive ? 'text-dorren-light' : 'text-gray-400'}`} />
                     <span className="text-xs font-bold uppercase tracking-wider mb-1">{stage.id}. {stage.title}</span>
                   </button>
                 );
              })}
           </div>

           {/* Detail View for Stages */}
           {activeStage && (
             <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8 animate-fade-in shadow-lg relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-6 h-6 bg-white border-t border-l border-gray-200 rotate-45"></div>
                
                {activeStage === 1 && (
                   <div className="space-y-4">
                      <h3 className="text-xl font-bold text-dorren-dark flex items-center gap-2"><PenTool /> Проектирование</h3>
                      <p className="text-gray-700">Формирование «ДНК» объекта. Мы не продаем, а подбираем решения.</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Анализ исходных данных и зонирования.</li>
                        <li>Разработка узлов примыкания под стены и перегородки.</li>
                        <li>Сверка с нормами (ГОСТ, СанПиН, Пожарная безопасность).</li>
                      </ul>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
                        <span className="text-red-800 font-bold text-xs uppercase">Риск без DORREN</span>
                        <p className="text-red-700 text-sm">Некорректные узлы → переделки на стройке. Двери не по нормам → отказ в приемке.</p>
                      </div>
                   </div>
                )}

                {activeStage === 2 && (
                   <div className="space-y-4">
                      <h3 className="text-xl font-bold text-dorren-dark flex items-center gap-2"><FileSpreadsheet /> Спецификация</h3>
                      <p className="text-gray-700">Переводим решения в цифры. Единый язык для сметы, закупки и производства.</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Формирование сводной таблицы дверей по объекту.</li>
                        <li>Стандартизация кодов и названий.</li>
                        <li>Фиксация критических параметров (EI, dB, HPL).</li>
                      </ul>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mt-4">
                         <span className="text-yellow-800 font-bold text-xs uppercase">Интерактив</span>
                         <p className="text-sm text-yellow-800 mb-2">Какие параметры в спецификации НЕЛЬЗЯ менять без согласования?</p>
                         <div className="flex gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-white border rounded text-xs text-gray-400 line-through">Цвет ручки</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-200 rounded text-xs font-bold">Огнестойкость (EI)</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 border border-green-200 rounded text-xs font-bold">Тип короба</span>
                         </div>
                      </div>
                   </div>
                )}

                {activeStage === 3 && (
                   <div className="space-y-6">
                      <h3 className="text-xl font-bold text-dorren-dark flex items-center gap-2"><Factory /> Производство</h3>
                      <p className="text-gray-700">Превращаем спецификацию в реальность на собственной базе.</p>
                      
                      {/* Virtual Tour */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                         <div className="flex justify-between mb-4 text-xs font-bold text-gray-400 uppercase">
                            {PRODUCTION_STEPS.map((s, i) => (
                              <button key={i} onClick={() => setActiveProductionStep(i)} className={`px-2 hover:text-dorren-dark ${activeProductionStep === i ? 'text-dorren-dark underline decoration-2 underline-offset-4' : ''}`}>
                                Шаг {i+1}
                              </button>
                            ))}
                         </div>
                         <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0 text-2xl shadow-sm">
                              {activeProductionStep === 0 && '🪵'}
                              {activeProductionStep === 1 && '🏗️'}
                              {activeProductionStep === 2 && '🎨'}
                              {activeProductionStep === 3 && '🔩'}
                              {activeProductionStep === 4 && '✅'}
                            </div>
                            <div>
                               <h4 className="font-bold text-gray-900">{PRODUCTION_STEPS[activeProductionStep].title}</h4>
                               <p className="text-sm text-gray-600">{PRODUCTION_STEPS[activeProductionStep].desc}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                )}

                {activeStage === 4 && (
                   <div className="space-y-4">
                      <h3 className="text-xl font-bold text-dorren-dark flex items-center gap-2"><Hammer /> Монтаж</h3>
                      <p className="text-gray-700">Точка встречи проекта, производства и стройки.</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Логистика и маркировка по помещениям.</li>
                        <li>Шеф-монтаж и инструкции для подрядчиков.</li>
                        <li>Авторский надзор за критичными зонами.</li>
                      </ul>
                      <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h4 className="font-bold text-sm text-gray-800 mb-3">Чек-лист перед сдачей</h4>
                        <div className="space-y-2">
                           {INSTALLATION_CHECKLIST.map((item, i) => (
                             <label key={i} className="flex items-center gap-2 cursor-pointer">
                               <input type="checkbox" className="w-4 h-4 rounded text-dorren-dark focus:ring-dorren-light" />
                               <span className="text-sm text-gray-600">{item}</span>
                             </label>
                           ))}
                        </div>
                      </div>
                   </div>
                )}

                {activeStage === 5 && (
                   <div className="space-y-4">
                      <h3 className="text-xl font-bold text-dorren-dark flex items-center gap-2"><Settings /> Эксплуатация и сервис</h3>
                      <p className="text-gray-700">Двери живут вместе с объектом. Мы не исчезаем после сдачи.</p>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Сервис и ремонт (замена уплотнителей, фурнитуры).</li>
                        <li>Модернизация при смене назначения помещений.</li>
                        <li>Обновление ПО для Smart-дверей.</li>
                      </ul>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                         <span className="text-blue-800 font-bold text-xs uppercase">Важно</span>
                         <p className="text-sm text-blue-800">Грамотный сервис продлевает жизнь двери и снижает стоимость владения.</p>
                      </div>
                   </div>
                )}
             </div>
           )}
        </section>

        {/* 5. Scenario */}
        <section className="bg-dorren-dark text-white rounded-2xl p-8">
           <h2 className="text-2xl font-bold mb-4">Сценарий: «Поздно спохватились»</h2>
           <p className="text-gray-300 mb-6">Когда, по вашему опыту, чаще всего вспоминают про двери?</p>
           
           {!scenarioChoice ? (
             <div className="space-y-3">
               <button onClick={() => setScenarioChoice(1)} className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors">
                 А. Когда уже идет стройка и нужно «закрыть проемы»
               </button>
               <button onClick={() => setScenarioChoice(2)} className="w-full text-left p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors">
                 Б. На стадии тендера, когда проект готов
               </button>
               <button onClick={() => setScenarioChoice(3)} className="w-full text-left p-4 bg-dorren-light text-dorren-dark font-bold rounded-lg shadow-lg hover:bg-white transition-colors">
                 В. С самого начала — на стадии концепции
               </button>
             </div>
           ) : (
             <div className="animate-fade-in">
                <div className={`p-4 rounded-lg mb-4 ${scenarioChoice === 3 ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                   {scenarioChoice === 3 ? (
                     <p className="font-bold">✅ Верно! Это идеальный сценарий.</p>
                   ) : (
                     <p className="font-bold">⚠️ Типичная ошибка.</p>
                   )}
                </div>
                <p className="text-gray-300 mb-4">
                   {scenarioChoice === 3 
                     ? 'DORREN помогает проектировщикам сразу заложить корректные узлы и избежать переделок. Это экономит бюджет и нервы.' 
                     : 'Позднее подключение ведет к пересогласованиям, конфликтам узлов на стройке и риску не сдать объект пожарным.'}
                </p>
                <button onClick={() => setScenarioChoice(null)} className="text-sm underline text-dorren-light hover:text-white">Попробовать снова</button>
             </div>
           )}
        </section>

        {/* 6. Mini Case */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold text-dorren-dark">Мини-кейс: Медцентр</h2>
             <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">Успех</div>
           </div>
           
           <div className="relative border-l-2 border-dorren-light/30 pl-6 space-y-6">
              {[
                { s: 'Проект', t: 'Анализ зонирования. Подобраны HPL двери для чистых зон.' },
                { s: 'Спецификация', t: 'Создана детальная таблица с привязкой к помещениям.' },
                { s: 'Производство', t: 'Запуск отдельных линий для рентген-дверей.' },
                { s: 'Монтаж', t: 'Шеф-монтаж в операционных. Сдача технадзору.' },
                { s: 'Эксплуатация', t: 'Регулярная замена уплотнителей, проверка автоматики.' }
              ].map((item, i) => (
                <div key={i} className="relative">
                   <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-dorren-light border-2 border-white shadow-sm"></div>
                   <h4 className="font-bold text-gray-900 text-sm">{item.s}</h4>
                   <p className="text-gray-600 text-sm">{item.t}</p>
                </div>
              ))}
           </div>
        </section>

        {/* 7. Summary */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
           <ul className="space-y-3">
             {[
               'Жизненный цикл = 5 этапов: Проект → Спецификация → Производство → Монтаж → Сервис.',
               'DORREN создает ценность на каждом этапе, а не только при "отгрузке".',
               'Чем раньше мы подключаемся, тем меньше рисков.',
               'Спецификация — главный документ, связывающий всех участников.',
               'Сервис продлевает жизнь инвестициям заказчика.'
             ].map((txt, i) => (
               <li key={i} className="flex gap-3 text-gray-700 text-sm">
                 <CheckCircle size={16} className="text-dorren-dark shrink-0 mt-0.5" />
                 <span>{txt}</span>
               </li>
             ))}
           </ul>
        </section>

        {/* 8. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-dorren-dark p-6 text-white">
             <h2 className="text-2xl font-bold">Проверка знаний</h2>
             <p className="text-dorren-light/80 text-sm">4 вопроса для закрепления.</p>
           </div>
           
           {!showQuizResult ? (
             <div className="p-6 md:p-8 space-y-8">
               {QUIZ.map((q, idx) => (
                 <div key={q.id}>
                   <h3 className="font-semibold text-gray-900 mb-3">{idx + 1}. {q.q}</h3>
                   <div className="space-y-2">
                     {q.options.map((opt) => (
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
                 className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
               >
                 Проверить ответы
                 <ChevronRight size={18} />
               </button>
             </div>
           ) : (
             <div className="p-8 text-center animate-fade-in">
                <div className="w-20 h-20 bg-dorren-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-dorren-dark">{calculateScore()}/{QUIZ.length}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {calculateScore() >= 3 ? 'Отличный результат!' : 'Повторение — мать учения'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 3 
                    ? 'Вы хорошо понимаете, на каких этапах DORREN участвует в проекте.' 
                    : 'Рекомендуем вернуться к блокам «5 этапов».'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">
                     Попробовать снова
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson1.3')}
                     className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2"
                   >
                     Следующий урок
                     <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

      </main>
    </div>
  );
};
