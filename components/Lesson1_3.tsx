
import React, { useState } from 'react';
import { 
  Clock, Target, CheckCircle, ChevronRight, FileText, 
  BookOpen, FileSpreadsheet, PenTool, LayoutTemplate, 
  Monitor, Search, AlertTriangle, ArrowRight, Book,
  FileCheck, Globe, MousePointer
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson1_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [searchMethod, setSearchMethod] = useState<string | null>(null);
  const [activeDocType, setActiveDocType] = useState<number | null>(null);
  const [catalogScenario, setCatalogScenario] = useState<number | null>(null);
  const [atrScenario, setAtrScenario] = useState<string | null>(null);
  const [specErrorFound, setSpecErrorFound] = useState<boolean>(false);
  const [caseStep, setCaseStep] = useState(0);
  const [caseHistory, setCaseHistory] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- Data ---
  const ROLES = [
    { id: 'sales', label: 'Продажи / PM', text: 'В этом уроке вы увидите, какие документы помогают быстро ответить на технические вопросы клиента и подготовить аргументированное КП.' },
    { id: 'estimator', label: 'Инженер-сметчик', text: 'Вы разберётесь, где брать исходные данные для смет и как проверять, что спецификация соответствует каталогу и АТР.' },
    { id: 'procurement', label: 'Закупки', text: 'Урок поможет понять, какие параметры проверять в паспортах, спецификациях и как не «уронить» качество заменами.' },
    { id: 'architect', label: 'Проектировщик', text: 'Вы увидите, какие альбомы узлов и каталоги решений есть у DORREN и как использовать их в проектной документации.' },
    { id: 'service', label: 'Эксплуатация', text: 'Будет понятно, где искать паспорта, инструкции и рекомендации по эксплуатации и замене компонентов дверей.' },
  ];

  const DOC_TYPES = [
    { id: 1, icon: BookOpen, title: 'Каталоги и матрицы', desc: 'Первичный подбор, описание серий, назначение.', users: 'Продажи, Проектировщики' },
    { id: 2, icon: PenTool, title: 'АТР и типовые узлы', desc: 'Как дверь крепится к стенам. Разрезы, примыкания.', users: 'Проектировщики, Монтажники' },
    { id: 3, icon: FileCheck, title: 'Паспорта и сертификаты', desc: 'Подтверждение норм (EI, dB), правила эксплуатации.', users: 'Сметчики, Надзор, Эксплуатация' },
    { id: 4, icon: FileSpreadsheet, title: 'Рабочие спецификации', desc: 'Сводная таблица дверей по конкретному объекту.', users: 'Закупки, Логистика, Смета' },
    { id: 5, icon: LayoutTemplate, title: 'Презентации', desc: 'Визуализация решений для заказчика.', users: 'Продажи, Маркетинг' },
    { id: 6, icon: Monitor, title: 'Цифровые инструменты', desc: 'Конфигуратор, BIM, портал знаний.', users: 'Все роли' },
  ];

  const CATALOG_SCENARIOS = [
    { id: 1, text: 'Дверь для палаты стационара', hint: 'Матрица решений: Медицина -> Палата. Каталог: Серия K-TYPE/HPL.' },
    { id: 2, text: 'Коридор БЦ, высокая проходимость', hint: 'Матрица решений: Офисы -> Коридор. Каталог: Усиленные петли, отбойники.' },
    { id: 3, text: 'Тех. помещение, влажность', hint: 'Матрица решений: Технические зоны. Каталог: Влагостойкое исполнение (Aqua).' },
  ];

  const CASE_STEPS = [
    { 
      q: 'Вопрос 1: Заказчик просит показать конструкцию двери в операционную в разрезе.', 
      options: [
        { id: 'cat', text: 'Каталог' },
        { id: 'atr', text: 'АТР (Альбом тех. решений)' },
        { id: 'pass', text: 'Паспорт' }
      ],
      correct: 'atr',
      expl: 'АТР содержит чертежи узлов, разрезы коробов и схемы примыкания.'
    },
    { 
      q: 'Вопрос 2: Нужно подтвердить огнестойкость и правила эксплуатации.', 
      options: [
        { id: 'pres', text: 'Презентация' },
        { id: 'pass', text: 'Технический паспорт + Сертификат' },
        { id: 'spec', text: 'Спецификация' }
      ],
      correct: 'pass',
      expl: 'Паспорт описывает правила эксплуатации, а сертификат подтверждает EI.'
    },
    { 
      q: 'Вопрос 3: Нужна сводная таблица по всем дверям объекта.', 
      options: [
        { id: 'spec', text: 'Рабочая спецификация' },
        { id: 'atr', text: 'АТР' },
        { id: 'bim', text: 'BIM-модель' }
      ],
      correct: 'spec',
      expl: 'Спецификация — это основной сводный документ по количеству и параметрам дверей на объекте.'
    }
  ];

  const QUIZ = [
    { id: 1, q: 'Какой документ нужен, чтобы показать узел примыкания к стене?', options: [{id:'a', t:'Каталог'}, {id:'b', t:'АТР'}, {id:'c', t:'Презентация'}, {id:'d', t:'Спецификация'}], correct: 'b' },
    { id: 2, q: 'Где искать правила эксплуатации и гарантии?', options: [{id:'a', t:'Технический паспорт'}, {id:'b', t:'Презентация'}, {id:'c', t:'Матрица решений'}, {id:'d', t:'Смета'}], correct: 'a' },
    { id: 3, q: 'Что нужно для подготовки КП?', options: [{id:'a', t:'Каталог/Матрица + Презентация'}, {id:'b', t:'Только паспорт'}, {id:'c', t:'Только спецификация'}, {id:'d', t:'Только АТР'}], correct: 'a' },
    { id: 4, q: 'Опора для сметы и закупки это:', options: [{id:'a', t:'Презентация'}, {id:'b', t:'Рабочая спецификация'}, {id:'c', t:'АТР'}, {id:'d', t:'Сертификат'}], correct: 'b' },
    { id: 5, q: 'Цифровые инструменты DORREN:', options: [{id:'a', t:'Конфигуратор, BIM, Портал'}, {id:'b', t:'Только бумажный каталог'}, {id:'c', t:'Презентации'}, {id:'d', t:'Акты'}], correct: 'a' },
  ];

  const handleCaseAnswer = (optId: string) => {
    const currentStepData = CASE_STEPS[caseStep];
    if (optId === currentStepData.correct) {
      if (caseStep < CASE_STEPS.length - 1) {
        setCaseStep(caseStep + 1);
        setCaseHistory([...caseHistory, 'success']);
      } else {
        setCaseStep(caseStep + 1); // Finish
        setCaseHistory([...caseHistory, 'success']);
      }
    } else {
       alert('Не совсем верно. Попробуйте еще раз.');
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
        lessonId="1.3" 
        title="Документы и инструменты" 
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
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Документы и инструменты DORREN</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Где искать ответы: каталоги, АТР, паспорта, спецификации и цифровые сервисы.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <label className="text-xs font-bold uppercase text-dorren-light tracking-wider mb-3 block">Ваша роль</label>
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
                    <p className="text-sm text-gray-400 italic">Выберите роль, чтобы узнать полезность урока...</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="hidden md:block w-1/3 pt-4">
               {/* Isometric illustration placeholder */}
               <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 transform rotate-6 skew-y-3">
                       <div className="w-16 h-20 bg-white shadow-lg rounded flex items-center justify-center"><BookOpen className="text-dorren-dark"/></div>
                       <div className="w-16 h-20 bg-dorren-light shadow-lg rounded flex items-center justify-center"><PenTool className="text-dorren-dark"/></div>
                       <div className="w-16 h-20 bg-dorren-dark border border-white/20 shadow-lg rounded flex items-center justify-center"><FileSpreadsheet className="text-white"/></div>
                       <div className="w-16 h-20 bg-white shadow-lg rounded flex items-center justify-center"><Monitor className="text-dorren-dark"/></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16">

        {/* 2. Intro */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем нам система документов</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>В проектах DORREN нельзя полагаться на «память». Дверные решения должны быть подтверждены документами. Этот урок — ваша «карта местности».</p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3">Как вы ищете документы сейчас?</h3>
            <div className="space-y-2">
               {['Пишу коллегам в мессенджер', 'Листаю общую папку наугад', 'Использую поиск по базе/порталу'].map((opt, i) => (
                 <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${searchMethod === opt ? 'bg-white border-dorren-dark' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="search" value={opt} onChange={() => setSearchMethod(opt)} className="text-dorren-dark focus:ring-dorren-light"/>
                    <span className="text-sm font-medium">{opt}</span>
                 </label>
               ))}
            </div>
            {searchMethod && (
               <div className="mt-4 text-sm text-dorren-dark/80 italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 После урока вы сможете находить нужное быстрее, не отвлекая коллег.
               </div>
            )}
          </div>
        </section>

        {/* 3. Document Map */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Карта документов DORREN</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DOC_TYPES.map((doc) => (
                 <button 
                   key={doc.id}
                   onClick={() => setActiveDocType(doc.id)}
                   className={`p-4 rounded-xl text-left transition-all border ${activeDocType === doc.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg scale-105 z-10' : 'bg-white text-gray-700 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <doc.icon size={24} className={`mb-3 ${activeDocType === doc.id ? 'text-dorren-light' : 'text-dorren-dark'}`} />
                    <h3 className="font-bold text-sm leading-tight mb-1">{doc.title}</h3>
                 </button>
              ))}
           </div>
           
           {activeDocType && (
              <div className="mt-6 bg-white border border-gray-200 p-6 rounded-xl shadow-sm animate-fade-in relative">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t border-l border-gray-200 rotate-45"></div>
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                       <h4 className="text-lg font-bold text-dorren-dark mb-2 flex items-center gap-2">
                          {React.createElement(DOC_TYPES.find(d => d.id === activeDocType)!.icon, { size: 20 })}
                          {DOC_TYPES.find(d => d.id === activeDocType)!.title}
                       </h4>
                       <p className="text-gray-600 mb-4">{DOC_TYPES.find(d => d.id === activeDocType)!.desc}</p>
                       <div className="text-sm bg-gray-50 p-3 rounded inline-block">
                          <span className="font-bold text-gray-500 uppercase text-xs block mb-1">Основные пользователи:</span>
                          {DOC_TYPES.find(d => d.id === activeDocType)!.users}
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </section>

        {/* 4. Catalogs & Matrix */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">1. Каталоги и матрицы</h2>
           <p className="text-gray-600 mb-6">Первая точка входа. Помогают подобрать тип двери под зону.</p>
           
           <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-800">Попробуйте подобрать решение:</h3>
              <div className="grid md:grid-cols-3 gap-3">
                 {CATALOG_SCENARIOS.map((scenario) => (
                    <button 
                      key={scenario.id} 
                      onClick={() => setCatalogScenario(scenario.id)}
                      className={`p-3 text-sm text-left rounded border transition-colors ${catalogScenario === scenario.id ? 'bg-dorren-bg border-dorren-dark font-medium' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                    >
                      {scenario.text}
                    </button>
                 ))}
              </div>
              {catalogScenario && (
                 <div className="bg-blue-50 text-blue-900 p-4 rounded text-sm animate-fade-in">
                    <strong>Алгоритм:</strong> {CATALOG_SCENARIOS.find(s => s.id === catalogScenario)?.hint}
                 </div>
              )}
           </div>
        </section>

        {/* 5. ATR */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">2. АТР и типовые узлы</h2>
           <p className="text-gray-600 mb-6">Как дверь «встраивается» в здание. Критично для проектировщиков.</p>
           
           <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                 {/* CSS based Technical Drawing */}
                 <div className="relative h-64 w-full bg-gray-50 border border-gray-300 rounded overflow-hidden cursor-crosshair group">
                    <div className="absolute top-0 bottom-0 left-10 w-4 bg-gray-300 pattern-diagonal-lines"></div> {/* Wall */}
                    <div className="absolute top-10 bottom-10 left-14 w-2 bg-dorren-dark"></div> {/* Frame */}
                    <div className="absolute top-12 bottom-12 left-16 w-32 bg-dorren-light/20 border-l border-dorren-dark"></div> {/* Door Leaf */}
                    <div className="absolute top-10 left-10 w-6 h-2 bg-black"></div> {/* Anchor */}
                    
                    {/* Interactive Hotspots */}
                    <button 
                      className="absolute top-1/2 left-8 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:scale-125 transition-transform"
                      onClick={() => setAtrScenario('wall')}
                    >1</button>
                    <button 
                      className="absolute top-1/3 left-14 w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center hover:scale-125 transition-transform"
                      onClick={() => setAtrScenario('frame')}
                    >2</button>
                 </div>
              </div>
              <div className="md:w-1/2">
                 <div className="min-h-[100px]">
                    {!atrScenario && <p className="text-gray-500 text-sm italic">Нажмите на точки на схеме (1 или 2).</p>}
                    {atrScenario === 'wall' && (
                       <div className="animate-fade-in">
                          <h4 className="font-bold text-dorren-dark">Узел примыкания к стене</h4>
                          <p className="text-sm text-gray-600">В АТР ищут: тип анкеров, требования к усилению проема (для ГКЛ), зазоры на пену.</p>
                       </div>
                    )}
                    {atrScenario === 'frame' && (
                       <div className="animate-fade-in">
                          <h4 className="font-bold text-dorren-dark">Дверной короб</h4>
                          <p className="text-sm text-gray-600">В АТР ищут: сечение профиля, наличие уплотнителя, четверть под добор.</p>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* 6. Spec Error Finder */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">4. Рабочие спецификации</h2>
           <p className="text-gray-600 mb-6">Мост между проектом и производством. Найдите ошибку в строке спецификации.</p>
           
           <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-100">
             <p className="text-sm text-yellow-800 font-medium">Задача: Дверь в эвакуационный выход. Найдите подозрительный параметр.</p>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-100 text-gray-600 font-bold">
                 <tr>
                   <th className="p-2">Поз.</th>
                   <th className="p-2">Назначение</th>
                   <th className="p-2">Тип</th>
                   <th className="p-2">Огнестойкость</th>
                   <th className="p-2">Фурнитура</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-b">
                   <td className="p-2">D-101</td>
                   <td className="p-2">Палата</td>
                   <td className="p-2">HPL</td>
                   <td className="p-2">-</td>
                   <td className="p-2">Офисная</td>
                 </tr>
                 <tr 
                   className={`border-b cursor-pointer transition-colors ${specErrorFound ? 'bg-red-100' : 'hover:bg-gray-50'}`}
                   onClick={() => setSpecErrorFound(true)}
                 >
                   <td className="p-2 font-mono">D-205</td>
                   <td className="p-2 font-bold text-dorren-dark">Эвак. выход</td>
                   <td className="p-2">Металл</td>
                   <td className="p-2 text-red-600 font-bold">{specErrorFound ? 'НЕТ (Ошибка!)' : '-'}</td>
                   <td className="p-2">Антипаника</td>
                 </tr>
               </tbody>
             </table>
           </div>
           {specErrorFound && (
              <div className="mt-4 text-red-600 text-sm font-bold animate-fade-in flex items-center gap-2">
                 <AlertTriangle size={16} />
                 Ошибка! Эвакуационный выход обязан иметь класс огнестойкости (например, EI60).
              </div>
           )}
        </section>

        {/* 7. Search Algorithm */}
        <section>
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Как быстро найти документ</h2>
           <div className="bg-dorren-bg p-6 rounded-xl">
              <ol className="space-y-4">
                 {[
                   'Сформулируйте задачу (что доказать/узнать?).',
                   'Определите тип (Продукт → Каталог, Узел → АТР, Нормы → Паспорт).',
                   'Используйте фильтры на портале (по объекту или серии).',
                   'Сохраните ссылку в заметках проекта.'
                 ].map((step, i) => (
                   <li key={i} className="flex gap-3 items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-dorren-dark text-white text-xs font-bold shrink-0">{i+1}</span>
                      <span className="text-gray-700 text-sm">{step}</span>
                   </li>
                 ))}
              </ol>
           </div>
        </section>

        {/* 8. Mini Case */}
        <section className="bg-white border-2 border-dorren-light/20 rounded-2xl p-8">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-dorren-light text-dorren-dark p-2 rounded-lg"><Target size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Мини-кейс: Проверяем логику</h2>
           </div>

           {caseStep < CASE_STEPS.length ? (
             <div className="animate-fade-in">
                <div className="flex gap-2 mb-4">
                   {CASE_STEPS.map((_, i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${i <= caseStep ? 'bg-dorren-dark' : 'bg-gray-200'}`}></div>
                   ))}
                </div>
                <h3 className="font-bold text-lg mb-4">{CASE_STEPS[caseStep].q}</h3>
                <div className="grid gap-3 mb-6">
                   {CASE_STEPS[caseStep].options.map((opt) => (
                      <button 
                        key={opt.id}
                        onClick={() => handleCaseAnswer(opt.id)}
                        className="text-left p-4 border border-gray-200 rounded-lg hover:border-dorren-dark hover:bg-gray-50 transition-all font-medium text-gray-700"
                      >
                        {opt.text}
                      </button>
                   ))}
                </div>
             </div>
           ) : (
             <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-dorren-dark mb-2">Отлично!</h3>
                <p className="text-gray-600">Вы прошли кейс. Теперь вы знаете, что АТР — для узлов, паспорт — для норм, а спецификация — для сводных данных.</p>
                <button onClick={() => setCaseStep(0)} className="mt-4 text-sm text-gray-500 underline">Протий заново</button>
             </div>
           )}
        </section>

        {/* 9. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-dorren-dark p-6 text-white">
             <h2 className="text-2xl font-bold">Проверка знаний</h2>
             <p className="text-dorren-light/80 text-sm">5 вопросов для закрепления.</p>
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
                  {calculateScore() >= 4 ? 'Превосходно!' : 'Хорошо, но можно лучше'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 4
                    ? 'Вы отлично ориентируетесь в документации DORREN.' 
                    : 'Рекомендуем пересмотреть раздел «Карта документов».'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">
                     Попробовать снова
                   </button>
                   <button onClick={() => onNavigate('lesson2.1')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2">
                     Перейти к Модулю 2
                     <ArrowRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

      </main>
    </div>
  );
};