
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, CheckCircle, 
  MessageSquare, User, ShieldAlert, ChevronRight, 
  FileText, AlertTriangle, MessageCircle, ThumbsUp, 
  ThumbsDown, ArrowDown, Briefcase, Zap
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson6_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // State
  const [introPoll, setIntroPoll] = useState<string | null>(null);
  
  // Dialogues State
  const [dialogueState, setDialogueState] = useState<{ [key: number]: 'bad' | 'good' }>({
    1: 'bad',
    2: 'bad',
    3: 'bad'
  });

  // Trainer State
  const [trainerAnswers, setTrainerAnswers] = useState<{ [key: number]: string | null }>({
    1: null,
    2: null,
    3: null
  });
  const [trainerFeedback, setTrainerFeedback] = useState<{ [key: number]: string | null }>({});

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const ALGORITHM_STEPS = [
    { 
      step: 1, 
      title: 'Есть Требование', 
      icon: FileText,
      desc: 'Фиксируем источник: нормы (СП/СанПиН), проектное решение или условия эксплуатации. "Почему мы вообще об этом говорим?"' 
    },
    { 
      step: 2, 
      title: 'Есть Решение', 
      icon: CheckCircle,
      desc: 'Показываем продукт Dorren: тип двери, конструктив, узел. "Мы подобрали вот это, чтобы закрыть требование."' 
    },
    { 
      step: 3, 
      title: 'Есть Последствия', 
      icon: AlertTriangle,
      desc: 'Объясняем риски отклонения: технические, юридические, эксплуатационные. "Если убрать, то произойдет..."' 
    }
  ];

  const PHRASING_EXAMPLES = [
    {
      topic: 'Замена противопожарной двери',
      bad: 'Так нельзя, вас пожарные штрафанут.',
      good: 'Здесь путь эвакуации. По требованиям нужна дверь, которая держит огонь и дым. Если поставить обычную, этот участок перестанет быть безопасным, возникнут риски при проверках.'
    },
    {
      topic: '«Аналог» дешевле',
      bad: 'Ваш аналог не годится, он «левый».',
      good: 'Ваш вариант можно рассмотреть, но важно, чтобы он закрывал те же требования: по огнестойкости, звуку и ресурсу. Давайте сравним параметры.'
    },
    {
      topic: 'Ширина проёма',
      bad: 'Так по нормам нельзя, сделайте шире и всё.',
      good: 'С такой шириной будет сложно организовать проход пациентов и эвакуацию. Нормы рекомендуют ширину Х, чтобы избежать «бутылочного горлышка».'
    }
  ];

  const DIALOGUES = [
    {
      id: 1,
      title: 'Замена противопожарной двери',
      client: 'Давайте вместо этой противопожарной поставим обычную дверь. Она дешевле и выглядит симпатичнее.',
      bad: 'Нет, так нельзя, это противопожарная, по нормам так не делается.',
      good: 'Этот проём — часть пути эвакуации. Здесь по требованиям нужна дверь, сдерживающая огонь и дым. Если заменить её на обычную, участок перестанет защищать людей. Мы можем обсудить отделку, но класс безопасности лучше сохранить.'
    },
    {
      id: 2,
      title: '«Возьмём аналог»',
      client: 'Наш поставщик предлагает похожую дверь дешевле. Давайте просто заменим на него в спецификации.',
      bad: 'Нет, только Dorren, мы с чужими не работаем.',
      good: 'Давайте посмотрим. Для нас главное — закрытие требований. Здесь важны: EI60, звук 38dB и ресурс. Если аналог это подтверждает сертификатами — обсудим. Если нет — я покажу риски такой замены.'
    },
    {
      id: 3,
      title: 'Ширина и открывание',
      client: 'Можно сделать дверь поуже и чтобы она открывалась внутрь? Коридор узкий, не хочу потерять место.',
      bad: 'Нет, нельзя, так не по нормам, делайте как мы сказали.',
      good: 'Понимаю желание сэкономить место. Но если сузить проем и открыть дверь внутрь, мы нарушим логику эвакуации и затрудним проход. Это риск безопасности. Давайте поищем другое решение для экономии места, не жертвуя нормами.'
    }
  ];

  const TRAINER_SCENARIOS = [
    {
      id: 1,
      title: 'Сценарий 1: Замена на "красивее, но без сертификатов"',
      desc: 'Заказчик хочет поставить в палату дизайнерскую дверь без сертификата HPL и гигиены.',
      options: [
        { id: 'A', text: 'Ну ладно, если вам так нравится, ставим. Но мы не виноваты.', isCorrect: false, feedback: 'Слишком мягко. Вы снимаете с себя ответственность, но риск для объекта остается.' },
        { id: 'B', text: 'Нет, это запрещено СанПиНом. Вы что, хотите проблем?', isCorrect: false, feedback: 'Слишком жестко и агрессивно. Это вызывает сопротивление.' },
        { id: 'C', text: 'Для палаты есть требование по гигиене и обработке. Мы подобрали HPL-дверь, которая это выдерживает. Дизайнерская дверь может быстро потерять вид от дезсредств, и возникнут вопросы у СЭС.', isCorrect: true, feedback: 'Отлично! Требование (гигиена) → Решение (HPL) → Последствия (потеря вида, СЭС).' }
      ]
    },
    {
      id: 2,
      title: 'Сценарий 2: Уменьшение ширины в коридоре',
      desc: 'Заказчик просит сузить двери в коридоре до 700 мм ради экономии.',
      options: [
        { id: 'A', text: 'Коридор — это путь эвакуации и трафика. Нужна ширина 900+ для потока людей. Если сузить, получим затор при тревоге и неудобство каждый день.', isCorrect: true, feedback: 'Верно. Четкая связка: Эвакуация → Ширина → Риск затора.' },
        { id: 'B', text: '700 мм — это стандарт для санузла, а не для коридора. Не пойдет.', isCorrect: false, feedback: 'Верно по сути, но звучит как оценка, а не аргумент.' },
        { id: 'C', text: 'Можно и 700, если пожарный инспектор ваш друг.', isCorrect: false, feedback: 'Непрофессионально. Это намек на коррупцию, а не инженерный разговор.' }
      ]
    },
    {
      id: 3,
      title: 'Сценарий 3: "Уберите эти палки" (Антипаника)',
      desc: 'Заказчику не нравится вид ручек-штанг на эвакуационных дверях.',
      options: [
        { id: 'A', text: 'Без проблем, поставим обычные ручки, будет красивее.', isCorrect: false, feedback: 'Грубая ошибка. Нарушение безопасности на путях эвакуации.' },
        { id: 'B', text: 'Это требование безопасности для массовых зон. Штанга позволяет открыть дверь телом в панике. Без неё при давке люди не смогут выйти. Мы можем подобрать штангу в цвет двери.', isCorrect: true, feedback: 'Идеально. Объяснили функцию (открытие телом) и риск (давка), предложили компромисс по дизайну.' },
        { id: 'C', text: 'Это не палки, а пуш-бары. Так положено по ГОСТ 31471.', isCorrect: false, feedback: 'Сухо и формально. Заказчик не понял, зачем это нужно, только услышал номер ГОСТа.' }
      ]
    }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Базовый алгоритм объяснения заказчику:', 
      opts: [
        {id:'a', t:'Так нельзя, потому что нельзя'}, 
        {id:'b', t:'Требование → Техническое решение → Последствия'}, 
        {id:'c', t:'Сначала последствия, потом решение'}, 
        {id:'d', t:'Цена → Дизайн → Остальное'}
      ], 
      correct: 'b', 
      expl: 'Логическая цепочка: "Почему нужно" -> "Что предлагаем" -> "Что будет, если нет".' 
    },
    { 
      id: 2, 
      q: 'Как начать разговор, если просят "дешевле вместо предложенного"?', 
      opts: [
        {id:'a', t:'Сказать, что заказчик не прав'}, 
        {id:'b', t:'Угрожать штрафами'}, 
        {id:'c', t:'Вернуться к требованиям: что обязательно, а что нет'}, 
        {id:'d', t:'Молча согласиться'}
      ], 
      correct: 'c', 
      expl: 'Нужно понять, можно ли снижать требования, или они критичны для объекта.' 
    },
    { 
      id: 3, 
      q: 'Какой подход конструктивнее?', 
      opts: [
        {id:'a', t:'Использовать сложный юр. язык'}, 
        {id:'b', t:'Пугать проверками'}, 
        {id:'c', t:'Объяснять логику требований и решений'}, 
        {id:'d', t:'Не упоминать нормы'}
      ], 
      correct: 'c', 
      expl: 'Заказчик должен понимать смысл, а не просто бояться инспектора.' 
    },
    { 
      id: 4, 
      q: 'Зачем проговаривать последствия отклонений?', 
      opts: [
        {id:'a', t:'Чтобы запугать'}, 
        {id:'b', t:'Чтобы поднять цену'}, 
        {id:'c', t:'Чтобы заказчик осознанно принял решение и видел риски'}, 
        {id:'d', t:'Бессмысленно'}
      ], 
      correct: 'c', 
      expl: 'Это разделение ответственности. Заказчик должен знать, на что идет.' 
    }
  ];

  // Logic
  const handleDialogueToggle = (id: number, state: 'bad' | 'good') => {
    setDialogueState(prev => ({ ...prev, [id]: state }));
  };

  const handleTrainerSelect = (scenarioId: number, optionId: string) => {
    const scenario = TRAINER_SCENARIOS.find(s => s.id === scenarioId);
    const option = scenario?.options.find(o => o.id === optionId);
    
    setTrainerAnswers(prev => ({ ...prev, [scenarioId]: optionId }));
    if (option) {
      setTrainerFeedback(prev => ({ ...prev, [scenarioId]: option.feedback }));
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
        lessonId="6.3" 
        title="Коммуникация с заказчиком" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <MessageSquare className="absolute right-10 top-10 w-64 h-64 opacity-20 rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 6. Нормативные требования
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 6.3. Как говорить о нормах с заказчиком
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Алгоритм: «Есть требование → есть техническое решение → есть последствия отклонения». Учимся аргументировать без споров.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~15–20 минут</div>
                <div className="flex items-center gap-2"><Briefcase size={16}/> Переговоры</div>
                <div className="flex items-center gap-2"><ShieldAlert size={16}/> Работа с рисками</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к практике
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-6 mb-4 text-dorren-light opacity-80">
                      <User size={40} />
                      <MessageCircle size={40} />
                      <User size={40} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Два силуэта за столом переговоров, между ними дверь и чек-лист. Спокойная деловая атмосфера.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. SITUATION & POLL */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Типичная ситуация: «А можно подешевле?»</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               Заказчик часто видит дверь как товар: "цвет, цена, срок". Когда вы предлагаете сложное решение (EI60, HPL, Антипаника), он может спросить: 
               <em> "А можно заменить на обычную? Она дешевле и выглядит так же."</em>
            </p>
            <p className="font-medium text-dorren-dark">
               Ваша цель — не напугать проверками, а честно показать границу между экономией и рисками.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Первый шаг, когда просят "другую дверь"?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 'argue', t: 'Сразу спорить, что это невозможно.'},
                 {id: 'agree', t: 'Пообещать заменить, потом разобраться.'},
                 {id: 'reqs', t: 'Вернуться к требованиям: что для заказчика приоритетно?'},
                 {id: 'ignore', t: 'Игнорировать и делать по-своему.'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introPoll === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroPoll(opt.id)} checked={introPoll === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introPoll && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 {introPoll === 'reqs' ? 'Верно. Сначала поймите: какие требования обязательны (нормы), а где есть манёвр.' : 'Лучше сначала вернуться к требованиям. Иначе спор будет беспредметным.'}
              </div>
            )}
          </div>
        </section>

        {/* 3. ALGORITHM */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Алгоритм объяснения</h2>
           <p className="text-gray-600 mb-8">
              Используйте эту структуру, чтобы не уходить в эмоции и сухую юридику.
           </p>

           <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {ALGORITHM_STEPS.map((step, idx) => (
                 <div key={idx} className="flex-1 relative group">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-full transition-all hover:shadow-md hover:border-dorren-light">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-dorren-dark text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                             {step.step}
                          </div>
                          <h3 className="font-bold text-lg text-dorren-dark">{step.title}</h3>
                       </div>
                       <div className="mb-4 text-dorren-light">
                          <step.icon size={32} />
                       </div>
                       <p className="text-sm text-gray-600 leading-relaxed">
                          {step.desc}
                       </p>
                    </div>
                    {idx < ALGORITHM_STEPS.length - 1 && (
                       <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 text-gray-300">
                          <ChevronRight size={32} />
                       </div>
                    )}
                    {idx < ALGORITHM_STEPS.length - 1 && (
                       <div className="md:hidden flex justify-center py-2 text-gray-300">
                          <ArrowDown size={24} />
                       </div>
                    )}
                 </div>
              ))}
           </div>
        </section>

        {/* 4. PHRASING GUIDE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Говорим по-человечески</h2>
           <p className="text-gray-700 mb-8">
              Как перевести "так нельзя" на язык пользы и рисков.
           </p>

           <div className="grid gap-6">
              {PHRASING_EXAMPLES.map((ex, i) => (
                 <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wide mb-4 border-b border-gray-200 pb-2">{ex.topic}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                       <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                          <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-sm">
                             <ThumbsDown size={16} /> Не рекомендуется
                          </div>
                          <p className="text-sm text-red-900">"{ex.bad}"</p>
                       </div>
                       <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <div className="flex items-center gap-2 mb-2 text-green-700 font-bold text-sm">
                             <ThumbsUp size={16} /> Как лучше
                          </div>
                          <p className="text-sm text-green-900">"{ex.good}"</p>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 5. DIALOGUE SIMULATOR */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Тренажер диалогов</h2>
           <p className="text-gray-300 mb-8">Сравните жесткий отказ и профессиональное объяснение.</p>

           <div className="space-y-8">
              {DIALOGUES.map((d) => (
                 <div key={d.id} className="bg-white/10 rounded-xl p-6 border border-white/10">
                    <h3 className="font-bold text-dorren-light mb-4 text-lg">{d.title}</h3>
                    
                    <div className="bg-black/20 p-4 rounded-lg mb-6 border-l-4 border-dorren-light">
                       <p className="text-sm text-gray-400 mb-1">Заказчик:</p>
                       <p className="text-white italic">"{d.client}"</p>
                    </div>

                    <div className="flex gap-4 mb-4">
                       <button 
                         onClick={() => handleDialogueToggle(d.id, 'bad')}
                         className={`flex-1 py-2 rounded text-sm font-bold transition-all ${dialogueState[d.id] === 'bad' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                       >
                          Плохой ответ
                       </button>
                       <button 
                         onClick={() => handleDialogueToggle(d.id, 'good')}
                         className={`flex-1 py-2 rounded text-sm font-bold transition-all ${dialogueState[d.id] === 'good' ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
                       >
                          Хороший ответ
                       </button>
                    </div>

                    <div className="bg-white text-gray-900 p-4 rounded-lg min-h-[100px] transition-all animate-fade-in relative">
                       <div className={`absolute top-0 left-0 w-1 h-full rounded-l-lg ${dialogueState[d.id] === 'good' ? 'bg-green-600' : 'bg-red-500'}`}></div>
                       <p className="text-sm leading-relaxed pl-2">
                          "{dialogueState[d.id] === 'bad' ? d.bad : d.good}"
                       </p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 6. TRAINER */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Практика: Выберите лучший ответ</h2>
           
           <div className="space-y-12">
              {TRAINER_SCENARIOS.map((scen) => (
                 <div key={scen.id} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{scen.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm">{scen.desc}</p>
                    
                    <div className="space-y-3">
                       {scen.options.map((opt) => (
                          <div key={opt.id}>
                             <button 
                               onClick={() => handleTrainerSelect(scen.id, opt.id)}
                               className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                                  trainerAnswers[scen.id] === opt.id 
                                    ? (opt.isCorrect ? 'bg-green-50 border-green-500 ring-1 ring-green-500' : 'bg-red-50 border-red-500 ring-1 ring-red-500')
                                    : 'bg-white border-gray-200 hover:border-dorren-dark'
                               }`}
                             >
                                <span className="font-bold mr-2">{opt.id}.</span> {opt.text}
                             </button>
                             
                             {trainerAnswers[scen.id] === opt.id && trainerFeedback[scen.id] && (
                                <div className={`mt-2 ml-4 text-xs p-2 rounded ${opt.isCorrect ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                                   {trainerFeedback[scen.id]}
                                </div>
                             )}
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 7. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по коммуникации.</p>
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
                    ? 'Отлично! Вы готовы к сложным переговорам.' 
                    : 'Рекомендуем повторить алгоритм объяснения.'}
                </p>
                <div className="flex gap-4 justify-center">
                   <button 
                     onClick={() => { setShowQuizResult(false); setQuizAnswers({}); setTrainerAnswers({1:null,2:null,3:null}); }} 
                     className="text-gray-500 hover:text-dorren-dark px-4 py-2"
                   >
                     Пройти заново
                   </button>
                   <button 
                     className="bg-gray-300 text-gray-500 px-6 py-2 rounded-lg font-bold cursor-not-allowed flex items-center gap-2"
                     title="Курс завершен"
                   >
                     К списку модулей
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
               'Задача Dorren — обеспечить выполнение требований безопасности, а не просто продать дверь.',
               'Диалог строится на логике: Требование → Решение → Последствия.',
               'Переводите нормы на язык рисков для бизнеса: штрафы, переделки, травмы.',
               'Жёсткий отказ вызывает сопротивление. Объяснение повышает доверие.',
               'Вы — партнёр, который помогает заказчику не совершить ошибку.'
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
