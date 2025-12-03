import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Target, CheckCircle, ChevronDown, ChevronRight, 
  Building2, Stethoscope, Hotel, GraduationCap, ShieldAlert,
  Info, Layout, Users, Shield, Zap, Heart
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson1_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [surveyAnswer, setSurveyAnswer] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'ordinary' | 'dorren'>('ordinary');
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- Data & Content ---

  const ROLES = [
    { id: 'manager', label: 'Менеджер / PM', text: 'Этот урок поможет вам проще объяснять заказчику, кто такие DORREN и чем наши решения отличаются от «обычных дверей» на рынке.' },
    { id: 'estimator', label: 'Инженер-сметчик', text: 'Вы увидите, почему двери DORREN — это не просто строка в смете, а комплексное решение под требования объекта и норм.' },
    { id: 'procurement', label: 'Закупки', text: 'Вы лучше поймете, зачем заказчики выбирают DORREN и почему важно сохранять параметры, заложенные в проекте.' },
    { id: 'executive', label: 'Руководитель', text: 'Урок задает общий инженерно-проектный контекст: чем DORREN ценен для сложных объектов и чем отличается наш подход.' },
  ];

  const HISTORY = [
    { year: '1999', title: 'Основание ГК «Зодчий»', desc: 'Первые продукты — лестницы. Старт большого пути.' },
    { year: '2000', title: 'Старт направления дверей', desc: 'Запуск производства межкомнатных дверей, ставшего основой развития.' },
    { year: '2000-е', title: 'Уход в проекты', desc: 'Постепенный переход от частной розницы к комплектации крупных объектов.' },
    { year: 'DORREN', title: 'Создание бренда', desc: 'Выделение проектного бренда на базе компетенций «Зодчего».' },
    { year: 'Сегодня', title: 'Управление проёмами', desc: 'Фокус на Smart-решениях, интеграции со СКУД и полном цикле.' },
  ];

  const SEGMENTS = [
    { icon: Stethoscope, title: 'Медицина', desc: 'Поликлиники, больницы, чистые помещения. Двери для палат, операционных, рентген-кабинетов.' },
    { icon: Building2, title: 'Жилые комплексы', desc: 'ЖК бизнес- и премиум-класса. Входные группы, МОПы, технические двери.' },
    { icon: Hotel, title: 'Отели', desc: 'Номерной фонд с требованиями по акустике и дизайну, служебные зоны.' },
    { icon: Layout, title: 'Бизнес-центры', desc: 'Офисы, переговорные, высокая проходимость и интеграция со СКУД.' },
    { icon: GraduationCap, title: 'Образование', desc: 'Школы и ВУЗы. Усиленные конструкции, безопасность, антивандальность.' },
    { icon: ShieldAlert, title: 'Спецобъекты', desc: 'Спорт, транспорт, объекты обороны. Сложные технические требования.' },
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Как лучше всего описать роль DORREN на объекте?', 
      options: [
        { id: 'a', text: 'Поставщик межкомнатных дверей по прайсу.' },
        { id: 'b', text: 'Розничный салон для частных клиентов.' },
        { id: 'c', text: 'Партнер по комплексным решениям для дверных проемов.' },
        { id: 'd', text: 'Компания только по монтажу.' }
      ], 
      correct: 'c' 
    },
    { 
      id: 2, 
      q: 'Какой сегмент НЕ относится к ключевым для DORREN?', 
      options: [
        { id: 'a', text: 'Медицинские объекты.' },
        { id: 'b', text: 'Жилые комплексы.' },
        { id: 'c', text: 'Бытовая мебель для дома.' },
        { id: 'd', text: 'Бизнес-центры.' }
      ], 
      correct: 'c' 
    },
    { 
      id: 3, 
      q: 'Что значит «управление проёмами»?', 
      options: [
        { id: 'a', text: 'Производство дешевых дверей.' },
        { id: 'b', text: 'Продажа только фурнитуры.' },
        { id: 'c', text: 'Проектирование, подбор, производство и сервис в контексте здания.' },
        { id: 'd', text: 'Работа только с деревом.' }
      ], 
      correct: 'c' 
    },
    { 
      id: 4, 
      q: 'Какая миссия у DORREN?', 
      options: [
        { id: 'a', text: 'Продать больше в розницу.' },
        { id: 'b', text: 'Создавать решения для безопасности и комфорта пространств.' },
        { id: 'c', text: 'Фокус только на дизайне.' },
        { id: 'd', text: 'Поставка без проектирования.' }
      ], 
      correct: 'b' 
    },
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="1.1" 
        title="DORREN: кто мы" 
        onBack={onBack} 
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-dorren-light mb-4">
                <Clock size={16} />
                <span className="text-sm font-medium">15–20 минут</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">DORREN: кто мы и чем отличаемся</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                От производителя дверей к партнеру по управлению дверными проемами на сложных объектах.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <label className="text-xs font-bold uppercase text-dorren-light tracking-wider mb-3 block">Выберите вашу роль</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setActiveRole(role.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeRole === role.id ? 'bg-dorren-light text-dorren-dark' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
                <div className="min-h-[3rem]">
                  {activeRole ? (
                    <p className="text-sm text-white animate-fade-in">{ROLES.find(r => r.id === activeRole)?.text}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Выберите роль, чтобы узнать, чем полезен этот урок...</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Abstract visual for header */}
            <div className="hidden md:block w-1/3">
              <div className="aspect-[3/4] bg-gradient-to-br from-dorren-light/20 to-transparent rounded-lg border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                 <div className="relative z-10 text-center">
                   <Target size={48} className="text-dorren-light mx-auto mb-4" />
                   <p className="text-xs font-mono text-dorren-light uppercase">Инженерный подход</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-10 relative z-10 space-y-16">
        
        {/* 2. Intro Block */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем вам этот урок</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>В проектах с участием DORREN двери — это не просто «фурнитура для проема». Это часть инженерной системы здания, влияющая на безопасность и комфорт. Чтобы уверенно разговаривать с заказчиками, важно понимать наш подход.</p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-4 flex items-center gap-2">
              <Info size={18} className="text-dorren-light" />
              Микро-опрос
            </h3>
            <p className="text-sm text-gray-600 mb-4">Насколько четко вы сейчас можете объяснить, чем DORREN отличается от обычного производителя?</p>
            <div className="space-y-3">
              {['Почти никак — знаю только, что мы «делаем двери»', 'Могу что-то сказать, но без структуры', 'Уверенно объясняю с примерами'].map((opt, i) => (
                <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${surveyAnswer === opt ? 'bg-white border-dorren-dark shadow-sm' : 'bg-transparent border-transparent hover:bg-white/50'}`}>
                  <input 
                    type="radio" 
                    name="intro_survey" 
                    value={opt} 
                    checked={surveyAnswer === opt}
                    onChange={() => setSurveyAnswer(opt)}
                    className="w-4 h-4 text-dorren-dark focus:ring-dorren-light"
                  />
                  <span className="text-sm font-medium">{opt}</span>
                </label>
              ))}
            </div>
            {surveyAnswer && (
              <div className="mt-4 p-3 bg-white/50 rounded text-sm text-dorren-dark/80 italic border-l-2 border-dorren-light animate-fade-in">
                После этого урока ваша формулировка станет структурированной: с упоминанием проектного подхода и управления проёмами.
              </div>
            )}
          </div>
        </section>

        {/* 3. Who is DORREN */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-dorren-dark text-white flex items-center justify-center font-bold rounded-lg text-xl">D</div>
            <h2 className="text-2xl font-bold text-dorren-dark">Кто такие DORREN</h2>
          </div>
          <div className="prose prose-lg text-gray-700 mb-8">
            <p className="leading-relaxed">
              <strong className="text-dorren-dark">DORREN</strong> — это подрядчик и поставщик комплексных решений по заполнению и управлению дверными проемами на статусных объектах.
            </p>
            <p className="text-base text-gray-600">Мы не розничная фабрика. Мы работаем там, где важны нормы, безопасность и ресурс.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Layout, label: 'Комплексность', desc: 'Закрываем объект под ключ: от проекта до монтажа' },
              { icon: Shield, label: 'Нормы', desc: 'Фокус на пожарной безопасности и санитарии' },
              { icon: Zap, label: 'Производство', desc: 'Полный цикл: дерево, металл, стекло' },
              { icon: Users, label: 'Сценарии', desc: 'Решения под конкретные задачи объекта' }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-dorren-light/50 transition-all text-center">
                <item.icon className="mx-auto text-dorren-dark mb-3 group-hover:text-dorren-light transition-colors" size={24} />
                <div className="font-bold text-sm text-gray-800">{item.label}</div>
                
                {/* Tooltip */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-dorren-dark text-white text-xs p-2 rounded w-48 -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-10 pointer-events-none">
                  {item.desc}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dorren-dark rotate-45"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. History Timeline */}
        <section className="bg-white p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-8">От «Зодчего» к DORREN</h2>
          <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
            {HISTORY.map((item, i) => (
              <div key={i} className="relative pl-8 group cursor-pointer" onClick={() => setActiveYear(activeYear === item.year ? null : item.year)}>
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${activeYear === item.year ? 'bg-dorren-light border-dorren-dark' : 'bg-white border-gray-300 group-hover:border-dorren-dark'}`}></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                  <span className={`font-mono font-bold text-lg transition-colors ${activeYear === item.year ? 'text-dorren-light' : 'text-gray-400 group-hover:text-dorren-dark'}`}>{item.year}</span>
                  <h3 className="font-bold text-dorren-dark">{item.title}</h3>
                </div>
                <div className={`mt-2 text-sm text-gray-600 transition-all overflow-hidden ${activeYear === item.year ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 sm:max-h-24 sm:opacity-100'}`}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Segments */}
        <section>
          <h2 className="text-2xl font-bold text-dorren-dark mb-2">Где мы работаем</h2>
          <p className="text-gray-600 mb-6">Объекты с повышенными требованиями.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SEGMENTS.map((seg, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md hover:border-dorren-light/30 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-dorren-bg flex items-center justify-center text-dorren-dark group-hover:bg-dorren-dark group-hover:text-white transition-colors">
                    <seg.icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{seg.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{seg.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Comparison Toggle */}
        <section className="bg-dorren-dark rounded-2xl p-8 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 text-center">В чем уникальность?</h2>
            
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 p-1 rounded-lg flex">
                <button 
                  onClick={() => setComparisonMode('ordinary')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${comparisonMode === 'ordinary' ? 'bg-white text-dorren-dark shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Обычный подход
                </button>
                <button 
                  onClick={() => setComparisonMode('dorren')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${comparisonMode === 'dorren' ? 'bg-dorren-light text-dorren-dark shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  Подход DORREN
                </button>
              </div>
            </div>

            <div className="min-h-[200px] transition-all duration-500 ease-in-out">
              {comparisonMode === 'ordinary' ? (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-sm text-gray-300">Продажа дверей по каталогу без привязки к объекту.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-sm text-gray-300">Фокус только на дизайне, игнорирование норм.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
                      <p className="text-sm text-gray-300">Нет ответственности за работу двери в системе здания.</p>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-8 flex items-center justify-center border border-white/10 opacity-50 grayscale">
                     <div className="w-32 h-48 border-2 border-white/30 rounded flex items-center justify-center">
                        <span className="text-xs text-white/50">Просто дверь</span>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 items-center animate-fade-in">
                   <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">✓</div>
                      <p className="text-sm text-white">Работа с объектом целиком: от аудита до сервиса.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">✓</div>
                      <p className="text-sm text-white">Подбор под нормы (EI60, dB, санитария).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">✓</div>
                      <p className="text-sm text-white">Интеграция в СКУД и Smart-системы.</p>
                    </div>
                  </div>
                  <div className="bg-dorren-light/10 rounded-xl p-8 flex items-center justify-center border border-dorren-light/30 relative">
                     <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4 opacity-20 p-4">
                        {[...Array(16)].map((_,i) => <div key={i} className="border border-white/30 rounded-sm"></div>)}
                     </div>
                     <div className="w-32 h-48 bg-white/10 backdrop-blur border-2 border-dorren-light rounded flex flex-col items-center justify-center relative z-10 shadow-lg shadow-dorren-light/20">
                        <span className="text-xs font-bold text-dorren-light">Smart Door</span>
                        <Zap size={16} className="text-dorren-light mt-2" />
                     </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Bg decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-dorren-light/10 rounded-full blur-3xl"></div>
        </section>

        {/* 7. Values */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="text-dorren-dark" size={24} />
            <h2 className="text-2xl font-bold text-dorren-dark">Ценности в практике</h2>
          </div>
          <div className="space-y-4">
             {[
               { title: 'Надежность', text: 'Пожарная и санитарная безопасность — приоритет №1.' },
               { title: 'Инженерная честность', text: 'Решения подбираются под реальную нагрузку, а не "чтобы продать".' },
               { title: 'Проектный подход', text: 'Отдельные продуктовые линии для медицины, школ и отелей.' },
               { title: 'Инновации', text: 'Развитие DORA: интеграция софта и железа в двери.' }
             ].map((val, i) => (
               <div key={i} className="flex gap-4 p-4 rounded-lg bg-white border border-gray-100 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-dorren-light mt-2.5 shrink-0" />
                 <div>
                   <h3 className="font-bold text-gray-900">{val.title}</h3>
                   <p className="text-sm text-gray-600">{val.text}</p>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* 8. Mini Case - Map */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Мини-кейс: Городская Клиника</h2>
           <p className="text-gray-600 mb-8">Нажмите на помещения, чтобы увидеть решения DORREN.</p>
           
           <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
             {/* Simple SVG Map Representation */}
             <svg className="w-full h-full" viewBox="0 0 800 450">
                {/* Background Grid */}
                <defs>
                   <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                   </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Rooms */}
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveRoom('ward')}>
                   <rect x="50" y="50" width="200" height="150" fill={activeRoom === 'ward' ? '#85CEE4' : 'white'} stroke="#183141" strokeWidth="2" />
                   <text x="150" y="125" textAnchor="middle" fill="#183141" fontSize="14" fontWeight="bold">Палата</text>
                </g>
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveRoom('operating')}>
                   <rect x="280" y="50" width="200" height="150" fill={activeRoom === 'operating' ? '#85CEE4' : 'white'} stroke="#183141" strokeWidth="2" />
                   <text x="380" y="125" textAnchor="middle" fill="#183141" fontSize="14" fontWeight="bold">Операционная</text>
                </g>
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveRoom('xray')}>
                   <rect x="50" y="230" width="150" height="150" fill={activeRoom === 'xray' ? '#85CEE4' : 'white'} stroke="#183141" strokeWidth="2" />
                   <text x="125" y="305" textAnchor="middle" fill="#183141" fontSize="14" fontWeight="bold">Рентген</text>
                </g>
                <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setActiveRoom('exit')}>
                   <rect x="550" y="50" width="200" height="330" fill={activeRoom === 'exit' ? '#85CEE4' : '#f8fafc'} stroke="#183141" strokeWidth="2" strokeDasharray="5,5" />
                   <text x="650" y="215" textAnchor="middle" fill="#183141" fontSize="14" fontWeight="bold">Эвак. выход</text>
                </g>
             </svg>
             
             {/* Tooltip Overlay */}
             {activeRoom && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg p-4 rounded-lg border border-dorren-dark/10 animate-fade-in flex justify-between items-center">
                   <div>
                      <h4 className="font-bold text-dorren-dark mb-1">
                        {activeRoom === 'ward' && 'Палата стационара'}
                        {activeRoom === 'operating' && 'Чистое помещение'}
                        {activeRoom === 'xray' && 'Рентген-кабинет'}
                        {activeRoom === 'exit' && 'Путь эвакуации'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activeRoom === 'ward' && 'Решение: K-TYPE с усиленной кромкой. Защита от ударов каталок.'}
                        {activeRoom === 'operating' && 'Решение: Герметичные двери HPL/Нержавейка. Устойчивость к санобработке.'}
                        {activeRoom === 'xray' && 'Решение: Дверь со свинцовым эквивалентом (Pb 1.0-2.5).'}
                        {activeRoom === 'exit' && 'Решение: Противопожарные двери EI60 с системой "Антипаника".'}
                      </p>
                   </div>
                   <button onClick={() => setActiveRoom(null)} className="text-gray-400 hover:text-dorren-dark">✕</button>
                </div>
             )}
             {!activeRoom && (
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dorren-dark/80 text-white text-xs px-3 py-1 rounded-full pointer-events-none">
                 Нажмите на комнату
               </div>
             )}
           </div>
        </section>

        {/* 9. Key Takeaways */}
        <section className="bg-dorren-bg p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-dorren-dark mb-4">Что важно запомнить</h2>
          <ul className="space-y-2">
            {[
              'DORREN — партнер по управлению проемами, а не просто фабрика.',
              'Работаем в проектном сегменте: медицина, ЖК, БЦ, школы.',
              'Закрываем объект под ключ: от проекта до сервиса.',
              'Фокус на безопасности и интеграции в системы здания.'
            ].map((item, i) => (
               <li key={i} className="flex items-start gap-2 text-gray-700">
                 <CheckCircle size={18} className="text-dorren-dark mt-0.5 shrink-0" />
                 <span>{item}</span>
               </li>
            ))}
          </ul>
        </section>

        {/* 10. Quiz */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-dorren-dark p-6 text-white">
             <h2 className="text-2xl font-bold">Проверка знаний</h2>
             <p className="text-dorren-light/80 text-sm">Ответьте на 4 вопроса, чтобы завершить урок.</p>
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
                         <span className="text-sm text-gray-700">{opt.text}</span>
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
                  {calculateScore() >= 3 ? 'Отличный результат!' : 'Хорошая попытка!'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {calculateScore() >= 3 
                    ? 'У вас сложилась правильная картинка о DORREN как проектном партнере.' 
                    : 'Рекомендуем еще раз просмотреть блоки «Кто мы» и «Чем отличаемся».'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">
                     Попробовать снова
                   </button>
                   <button 
                     onClick={() => onNavigate('lesson1.2')}
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