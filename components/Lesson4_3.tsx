
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  Shield, MousePointer, ChevronRight, AlertTriangle, 
  Layers, MoveVertical, Eye, Map, Maximize, XCircle
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson4_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [signageActive, setSignageActive] = useState<string | null>(null);
  
  // Practice
  const [practiceScenario, setPracticeScenario] = useState<string | null>(null);
  const [practiceSelections, setPracticeSelections] = useState<string[]>([]);
  const [practiceResult, setPracticeResult] = useState<string | null>(null);

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // DATA
  const ZONES = [
    { id: 'kick', label: 'Низ полотна', rec: 'Панель HPL / Нержавейка', desc: 'Защита от ударов каталок, тележек, ног. Высота 200-800 мм.' },
    { id: 'handle', label: 'Зона ручки', rec: 'Накладка (нерж. сталь)', desc: 'Защита от царапин ключами, ударов оборудованием.' },
    { id: 'edge', label: 'Кромки / Углы', rec: 'Профиль / Уголок', desc: 'Защита от сколов при ударах в торец.' },
    { id: 'wall', label: 'Стена рядом', rec: 'Настенный отбойник', desc: 'Защита отделки стен от ударов дверью или тележками.' }
  ];

  const SIGNAGE_ZONES = [
    { id: 'plate', label: 'Табличка', text: 'Номер / Назначение', desc: 'Понятная навигация. Контрастный шрифт, читаемость с расстояния.' },
    { id: 'icon', label: 'Пиктограмма', text: 'WC / Выход / МГН', desc: 'Универсальные символы для быстрой ориентации.' },
    { id: 'vision', label: 'Смотровое окно', text: 'Контроль', desc: 'Безопасность (избежать удара при открытии) и контроль пациента.' }
  ];

  const ACCESSORIES_LIST = [
    { id: 'kick_hpl', label: 'Ударозащитная панель (HPL)' },
    { id: 'kick_steel', label: 'Накладка (Нержавейка)' },
    { id: 'handle_plate', label: 'Накладка под ручку' },
    { id: 'wall_bumper', label: 'Настенный отбойник' },
    { id: 'thresh_flat', label: 'Порог-накладка (плоский)' },
    { id: 'thresh_anti', label: 'Антискользящая накладка' },
    { id: 'sign_txt', label: 'Табличка (Текст/Номер)' },
    { id: 'sign_icon', label: 'Пиктограмма (Символ)' },
    { id: 'vision', label: 'Смотровое окно' },
    { id: 'rail_mgn', label: 'Поручень МГН' }
  ];

  const SCENARIOS = [
    { 
      id: 'ward', 
      title: 'Палата стационара',
      desc: 'Тележки с едой, каталки, уборка.',
      correctIds: ['kick_hpl', 'sign_txt', 'vision'],
      optionalIds: ['handle_plate', 'thresh_flat', 'wall_bumper'],
      feedback: 'Обязательно: защита низа от тележек и табличка. Окно — для контроля. Порог — плоский или отсутствующий.'
    },
    { 
      id: 'exit', 
      title: 'Эвакуационный выход',
      desc: 'Высокий трафик, требования безопасности.',
      correctIds: ['kick_steel', 'thresh_flat', 'sign_icon', 'vision'],
      optionalIds: ['kick_hpl'],
      feedback: 'Критично: износостойкость (сталь/HPL), плоский порог, знак "Выход". Окно помогает избежать столкновений.'
    },
    { 
      id: 'wc_mgn', 
      title: 'Санузел МГН',
      desc: 'Доступность, влага.',
      correctIds: ['thresh_anti', 'sign_icon', 'rail_mgn', 'kick_hpl'],
      optionalIds: ['handle_plate', 'sign_txt'],
      feedback: 'Важно: поручни, антискользящий низкий порог, понятная пиктограмма. Окно обычно не ставят (приватность).'
    }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Для чего на полотне в коридоре используется панель HPL?', 
      opts: [{id:'a', t:'Для декора'}, {id:'b', t:'Для снижения веса'}, {id:'c', t:'Защита от ударов тележек'}, {id:'d', t:'Для звукоизоляции'}], 
      correct: 'c', 
      expl: 'Она принимает на себя механические повреждения, сохраняя само полотно.' 
    },
    { 
      id: 2, 
      q: 'Роль смотрового окна в служебном коридоре?', 
      opts: [{id:'a', t:'Снижает безопасность'}, {id:'b', t:'Позволяет избежать столкновения'}, {id:'c', t:'Только украшает'}, {id:'d', t:'Делает дверь огнестойкой'}], 
      correct: 'b', 
      expl: 'Человек видит, что за дверью кто-то есть, и открывает осторожнее.' 
    },
    { 
      id: 3, 
      q: 'Главное при выборе порога для санузла МГН?', 
      opts: [{id:'a', t:'Цвет'}, {id:'b', t:'Максимальная высота'}, {id:'c', t:'Минимальный перепад + гидроизоляция'}, {id:'d', t:'Коврик'}], 
      correct: 'c', 
      expl: 'Нужно удержать воду, но не создать препятствие для коляски.' 
    },
    { 
      id: 4, 
      q: 'Зачем накладка из нержавейки у ручки?', 
      opts: [{id:'a', t:'Сложнее открыть'}, {id:'b', t:'Скрыть кривой монтаж'}, {id:'c', t:'Защита от царапин и ударов'}, {id:'d', t:'Огнезащита'}], 
      correct: 'c', 
      expl: 'Эта зона постоянно контактирует с руками, ключами и предметами.' 
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

  const togglePracticeItem = (itemId: string) => {
    if (practiceSelections.includes(itemId)) {
      setPracticeSelections(prev => prev.filter(i => i !== itemId));
    } else {
      setPracticeSelections(prev => [...prev, itemId]);
    }
  };

  const checkPractice = () => {
    const scenario = SCENARIOS.find(s => s.id === practiceScenario);
    if (!scenario) return;

    const missingCorrect = scenario.correctIds.filter(id => !practiceSelections.includes(id));
    // We allow optional items, so we don't penalize extra selections too harshly for this demo,
    // but main focus is getting the core items right.
    
    if (missingCorrect.length === 0) {
      setPracticeResult('success');
    } else {
      setPracticeResult('incomplete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="4.3" 
        title="Аксессуары и защита" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Shield className="absolute right-10 top-10 w-64 h-64 opacity-20 rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 4. Фурнитура и аксессуары
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 4.3. Аксессуары и защита: отбойники, пороги, таблички
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем «броню» и «навигацию» двери. Как продлить срок службы и сделать пространство понятным.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><Shield size={16}/> Защита</div>
                <div className="flex items-center gap-2"><Map size={16}/> Навигация</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к защитным элементам
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <Layers size={40} />
                      <MoveVertical size={40} />
                      <Eye size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Отрезок мед. коридора: дверь с ударозащитной панелью, отбойник, порог, табличка, смотровое окно. Реализм.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему аксессуары — защита инвестиции</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               В проектах двери работают жестко: удары тележек, химия, потоки людей. Без защиты через год дверь потеряет вид.
               Аксессуары (отбойники, накладки) принимают удар на себя. Таблички помогают ориентироваться. Это не "опция", а необходимость.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Что «убивает» двери быстрее всего?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Тележки, каталки и удары по низу.'},
                 {id: 2, t: 'Чрезмерная уборка и химия.'},
                 {id: 3, t: 'Постоянное открывание.'},
                 {id: 4, t: 'Всё перечисленное вместе.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Именно совокупность факторов. Защитные панели и правильные пороги помогают двери Dorren служить годами.
              </div>
            )}
          </div>
        </section>

        {/* 3. BUMPERS & PROTECTION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Защита от ударов</h2>
           <p className="text-gray-700 mb-8">
              Нажмите на зону двери, чтобы узнать, как ее защитить.
           </p>

           <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Visual Door Diagram */}
              <div className="relative w-64 h-96 bg-gray-100 border border-gray-300 rounded-lg shadow-inner select-none">
                 {/* Door visual */}
                 <div className="absolute inset-2 bg-white border border-gray-200"></div>
                 
                 {/* Click Zones */}
                 <button 
                   onClick={() => setActiveZone('kick')}
                   className={`absolute bottom-2 left-2 right-2 h-24 border-2 border-dashed transition-all hover:bg-dorren-light/20 ${activeZone === 'kick' ? 'border-dorren-dark bg-dorren-light/30' : 'border-gray-300'}`}
                 >
                    <span className="bg-white text-xs px-1 rounded shadow-sm text-gray-500 absolute -top-3 left-1/2 -translate-x-1/2">Низ</span>
                 </button>

                 <button 
                   onClick={() => setActiveZone('handle')}
                   className={`absolute top-1/2 right-4 w-12 h-20 -translate-y-1/2 border-2 border-dashed transition-all hover:bg-dorren-light/20 ${activeZone === 'handle' ? 'border-dorren-dark bg-dorren-light/30' : 'border-gray-300'}`}
                 >
                    <span className="bg-white text-xs px-1 rounded shadow-sm text-gray-500 absolute -top-3 left-1/2 -translate-x-1/2">Ручка</span>
                 </button>

                 <button 
                   onClick={() => setActiveZone('edge')}
                   className={`absolute top-2 bottom-2 right-0 w-4 border-2 border-dashed transition-all hover:bg-dorren-light/20 ${activeZone === 'edge' ? 'border-dorren-dark bg-dorren-light/30' : 'border-gray-300'}`}
                 >
                 </button>

                 <button 
                   onClick={() => setActiveZone('wall')}
                   className={`absolute top-1/2 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full border-2 border-dashed flex items-center justify-center transition-all hover:bg-dorren-light/20 ${activeZone === 'wall' ? 'border-dorren-dark bg-dorren-light/30' : 'border-gray-300'}`}
                 >
                    <span className="text-[10px]">Стена</span>
                 </button>
              </div>

              {/* Info Panel */}
              <div className="flex-1 min-h-[150px]">
                 {activeZone ? (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                       <h3 className="text-xl font-bold text-dorren-dark mb-2">{ZONES.find(z => z.id === activeZone)?.label}</h3>
                       <div className="mb-4">
                          <span className="text-xs font-bold uppercase text-gray-500">Решение:</span>
                          <p className="font-medium text-gray-900">{ZONES.find(z => z.id === activeZone)?.rec}</p>
                       </div>
                       <p className="text-sm text-gray-600">{ZONES.find(z => z.id === activeZone)?.desc}</p>
                    </div>
                 ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 italic bg-gray-50/50 rounded-xl p-8 border border-dashed border-gray-200">
                       <p>Выберите зону на схеме</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* 4. THRESHOLDS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Пороги: удобство и защита</h2>
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Палата / Коридор', desc: 'Ровный пол. Автопорог скрыт в полотне. Накладка только для защиты кромки покрытия.' },
                { title: 'Эвакуация', desc: 'Минимум препятствий. Плоские накладки из стали/алюминия в зоне прохода.' },
                { title: 'Санузел МГН', desc: 'Низкий профиль или уклон. Антискользящая вставка. Гидроизоляция узла.' }
              ].map((item, i) => (
                 <div key={i} className="bg-white/10 p-6 rounded-xl border border-white/10">
                    <h3 className="font-bold text-dorren-light mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.desc}</p>
                 </div>
              ))}
           </div>
           
           <div className="mt-8 flex justify-center">
              <div className="bg-white/5 border border-white/10 p-4 rounded text-center max-w-sm">
                 <MoveVertical size={32} className="mx-auto text-gray-400 mb-2" />
                 <p className="text-xs text-gray-500 font-mono">[ПРОМТ: Разрез: слева ровный пол с плоской накладкой, справа автопорог]</p>
              </div>
           </div>
        </section>

        {/* 5. SIGNAGE & VISION */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Навигация и безопасность</h2>
           
           <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 space-y-2">
                 {SIGNAGE_ZONES.map(z => (
                    <button 
                      key={z.id}
                      onClick={() => setSignageActive(z.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${signageActive === z.id ? 'bg-dorren-bg border-dorren-dark shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                    >
                       <span className="font-bold text-gray-900 block">{z.label}</span>
                       <span className="text-xs text-gray-500">{z.text}</span>
                    </button>
                 ))}
              </div>

              <div className="flex-1 bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[200px]">
                 {signageActive ? (
                    <div className="animate-fade-in">
                       <h3 className="text-xl font-bold text-dorren-dark mb-2">
                          {SIGNAGE_ZONES.find(z => z.id === signageActive)?.label}
                       </h3>
                       <p className="text-gray-700 leading-relaxed">
                          {SIGNAGE_ZONES.find(z => z.id === signageActive)?.desc}
                       </p>
                       <div className="mt-4 p-4 bg-white rounded border border-gray-200 flex items-center justify-center h-32">
                          {signageActive === 'plate' && <div className="bg-dorren-dark text-white px-4 py-2 rounded font-mono">102 ПАЛАТА</div>}
                          {signageActive === 'icon' && <div className="text-4xl">♿ / 🚻</div>}
                          {signageActive === 'vision' && <div className="w-16 h-24 bg-blue-100 border-2 border-gray-300 rounded relative overflow-hidden"><div className="absolute inset-0 bg-white/50 skew-x-12"></div></div>}
                       </div>
                    </div>
                 ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 italic">
                       Выберите элемент навигации
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* 6. PRACTICE CONFIGURATOR */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Практика: Соберите комплект</h2>
           <p className="text-gray-700 mb-6">Подберите аксессуары под сценарий.</p>

           {!practiceScenario ? (
              <div className="grid md:grid-cols-3 gap-4">
                 {SCENARIOS.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setPracticeScenario(s.id)}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left border border-transparent hover:border-dorren-dark"
                    >
                       <h3 className="font-bold text-lg text-dorren-dark mb-2">{s.title}</h3>
                       <p className="text-sm text-gray-500">{s.desc}</p>
                    </button>
                 ))}
              </div>
           ) : (
              <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <div>
                       <h3 className="font-bold text-xl text-dorren-dark">{SCENARIOS.find(s => s.id === practiceScenario)?.title}</h3>
                       <p className="text-sm text-gray-500">{SCENARIOS.find(s => s.id === practiceScenario)?.desc}</p>
                    </div>
                    <button onClick={() => { setPracticeScenario(null); setPracticeResult(null); setPracticeSelections([]); }} className="text-sm text-gray-400 hover:text-dorren-dark">
                       Сменить
                    </button>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {ACCESSORIES_LIST.map(item => (
                       <button 
                         key={item.id}
                         onClick={() => !practiceResult && togglePracticeItem(item.id)}
                         className={`p-3 rounded text-sm text-left border transition-all ${
                            practiceSelections.includes(item.id) 
                              ? 'bg-dorren-light text-dorren-dark border-dorren-dark font-bold' 
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                         } ${practiceResult ? 'cursor-default opacity-80' : ''}`}
                       >
                          {item.label}
                          {practiceResult && SCENARIOS.find(s => s.id === practiceScenario)?.correctIds.includes(item.id) && (
                             <span className="float-right text-green-600">✓</span>
                          )}
                       </button>
                    ))}
                 </div>

                 {!practiceResult ? (
                    <button 
                      onClick={checkPractice}
                      className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all"
                    >
                       Проверить комплект
                    </button>
                 ) : (
                    <div className={`p-4 rounded-lg animate-fade-in flex gap-3 items-start ${practiceResult === 'success' ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                       {practiceResult === 'success' ? <CheckCircle className="text-green-600 shrink-0 mt-1" /> : <AlertTriangle className="text-yellow-600 shrink-0 mt-1" />}
                       <div>
                          <p className={`font-bold mb-1 ${practiceResult === 'success' ? 'text-green-800' : 'text-yellow-800'}`}>
                             {practiceResult === 'success' ? 'Отлично!' : 'Почти верно.'}
                          </p>
                          <p className="text-sm text-gray-700">{SCENARIOS.find(s => s.id === practiceScenario)?.feedback}</p>
                          <button onClick={() => { setPracticeResult(null); setPracticeSelections([]); }} className="text-xs underline mt-2 text-gray-500">Попробовать снова</button>
                       </div>
                    </div>
                 )}
              </div>
           )}
        </section>

        {/* 7. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по теме урока.</p>
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
                    ? 'Отлично! Вы готовы комплектовать двери.' 
                    : 'Рекомендуем повторить раздел о защите.'}
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
                     title="Модуль 4 завершен"
                   >
                     Модуль 4 завершен
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* 8. SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Главные выводы</h2>
           <ul className="space-y-3 mb-6">
             {[
               'Аксессуары — это защита инвестиций заказчика (двери живут дольше).',
               'Отбойники и панели обязательны в зонах с тележками и каталками.',
               'Пороги должны сочетать защиту пола и удобство прохода (особенно для МГН).',
               'Таблички и окна — это навигация и безопасность, а не просто декор.',
               'Комплект собирается под сценарий, а не "по умолчанию".'
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