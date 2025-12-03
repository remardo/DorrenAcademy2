
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, Shield, Flame, Stethoscope, Zap, 
  HelpCircle, ChevronRight, AlertTriangle, Layers, 
  CheckCircle, XCircle, Info, ScanLine, Minimize, Move, X
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_4: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  // State for interactive elements
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [fireLayer, setFireLayer] = useState<string | null>(null);
  const [medicalDoorView, setMedicalDoorView] = useState<'bad' | 'good'>('bad');
  const [xrayContour, setXrayContour] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  // Practice Case State
  const [assignedFeatures, setAssignedFeatures] = useState<Record<string, 'op' | 'ward' | null>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  // Data
  const FIRE_LAYERS = [
    { id: 'sheet', label: 'Внешний лист', desc: 'Стальной лист или специальная плита, формирующая жесткость конструкции.' },
    { id: 'core', label: 'Огнезащита', desc: 'Минераловатная или специальная плита. Сдерживает жар и не горит.' },
    { id: 'tape', label: 'Термолента', desc: 'Интумесцентная лента. При нагреве вспенивается и герметизирует зазоры от дыма.' },
    { id: 'reinforce', label: 'Закладные', desc: 'Усиления внутри полотна под доводчик и ручки "антипаника".' }
  ];

  const PRACTICE_ITEMS = [
    { id: '1', text: 'Максимально гладкая HPL-поверхность, остекление заподлицо', correct: 'op', hint: 'Критично для операционной' },
    { id: '2', text: 'Опция герметизирующей автоматической двери', correct: 'op', hint: 'Для контроля среды и бесконтактного доступа' },
    { id: '3', text: 'Автоматический опускающийся порог', correct: 'op', hint: 'Герметичность + ровный пол для каталок' },
    { id: '4', text: 'Усиленные панели ударозащиты внизу', correct: 'op', hint: 'Защита от каталок (актуально везде, но критично в оперблоке)' },
    { id: '5', text: 'Базовый конструктив, остекление со штапиками', correct: 'ward', hint: 'Допустимо для обычной палаты, но не для чистых зон' },
    { id: '6', text: 'Комбинированная функция (Мед + EI)', correct: 'op', hint: 'Часто требуется для операционных блоков' }
  ];

  const QUIZ = [
    { 
      id: 1, 
      q: 'Что является ключевым элементом рентгенозащитной двери?', 
      opts: [
        {id:'a', t:'Толстое деревянное полотно'}, 
        {id:'b', t:'Свинцовый лист в полотне и контур в коробе'}, 
        {id:'c', t:'Любое ударопрочное стекло'}, 
        {id:'d', t:'Только автоматический привод'}
      ], 
      correct: 'b', 
      expl: 'Непрерывный свинцовый контур исключает "просветы" для излучения.' 
    },
    { 
      id: 2, 
      q: 'Почему в медицинских дверях важна гладкость?', 
      opts: [
        {id:'a', t:'Минимализм в дизайне'}, 
        {id:'b', t:'Снижение себестоимости'}, 
        {id:'c', t:'Облегчение уборки и гигиена'}, 
        {id:'d', t:'Легкость открывания'}
      ], 
      correct: 'c', 
      expl: 'Отсутствие выступов и щелей предотвращает накопление грязи и бактерий.' 
    },
    { 
      id: 3, 
      q: 'Что обязательно для противопожарной двери?', 
      opts: [
        {id:'a', t:'Любое стекло'}, 
        {id:'b', t:'Сертифицированные слои и элементы'}, 
        {id:'c', t:'Только толстое полотно'}, 
        {id:'d', t:'Только пластиковая облицовка'}
      ], 
      correct: 'b', 
      expl: 'Вся конструкция (стекло, пена, фурнитура) должна быть испытана в сборе.' 
    },
    { 
      id: 4, 
      q: 'Чем конструктив двери в операционную отличается от палаты?', 
      opts: [
        {id:'a', t:'Допустимы любые щели'}, 
        {id:'b', t:'В палате требования выше'}, 
        {id:'c', t:'В операционной выше герметичность и гладкость'}, 
        {id:'d', t:'Ничем'}
      ], 
      correct: 'c', 
      expl: 'Операционная — это зона с жестким контролем среды и инфекционной безопасности.' 
    },
  ];

  const handleQuizSelect = (qId: number, optionId: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ.forEach(q => { if (quizAnswers[q.id] === q.correct) score++; });
    return score;
  };

  const assignFeature = (id: string, target: 'op' | 'ward') => {
    setAssignedFeatures(prev => ({ ...prev, [id]: target }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="3.4" 
        title="Специальные конструктивы" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* 1. HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dorren-dark via-dorren-dark/95 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Урок 3.4. Специальные конструктивы: огнестойкие, медицинские и рентгенозащитные
             </h1>
             <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Разбираем «анатомию» спецдверей: какие слои и материалы обеспечивают защиту от огня, радиации и инфекций.
             </p>

             <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2"><Clock size={16}/> ~20 минут</div>
                <div className="flex items-center gap-2"><Flame size={16}/> Огнестойкость</div>
                <div className="flex items-center gap-2"><Stethoscope size={16}/> Гигиена</div>
                <div className="flex items-center gap-2"><Zap size={16}/> Рентген</div>
             </div>
             
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Перейти к типам дверей
                <ArrowRight size={18} />
             </button>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
             <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-lg aspect-video relative flex items-center justify-center text-center">
                <div>
                   <div className="flex justify-center gap-4 mb-4 text-dorren-light opacity-80">
                      <Flame size={40} strokeWidth={1.5} />
                      <Stethoscope size={40} strokeWidth={1.5} />
                      <Zap size={40} strokeWidth={1.5} />
                   </div>
                   <p className="text-[10px] text-gray-400 max-w-[280px] mx-auto border border-gray-600 p-2 rounded bg-black/40">
                      [ПРОМТ: Три двери в коридоре: стальная противопожарная, гладкая медицинская, рентгенозащитная с окном. Техническая визуализация.]
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">

        {/* 2. WHY IT MATTERS */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-dorren-dark mb-4">Почему «дверь как дверь» здесь не работает</h2>
          <div className="prose prose-slate text-gray-700 leading-relaxed mb-8">
            <p>
               В медицине, на путях эвакуации и в рентген-кабинетах двери становятся инженерными системами безопасности, а не просто отделкой.
               Противопожарные сдерживают огонь (EI), медицинские обеспечивают гигиену, а рентгенозащитные блокируют излучение.
               Это сертифицированные узлы со строгой конструкцией.
            </p>
          </div>
          
          <div className="bg-dorren-bg p-6 rounded-xl border border-dorren-light/20">
            <h3 className="font-bold text-dorren-dark mb-3 flex items-center gap-2">
               <HelpCircle size={18} /> Как клиенты часто видят двери?
            </h3>
            <div className="space-y-3">
               {[
                 {id: 1, t: 'Как декоративный элемент интерьера.'},
                 {id: 2, t: 'Как часть пожарной безопасности.'},
                 {id: 3, t: 'Как барьер для инфекций.'},
                 {id: 4, t: 'Не разделяют роли, "дверь есть дверь".'}
               ].map((opt) => (
                 <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${introSurvey === opt.id ? 'bg-white border-dorren-dark shadow-sm' : 'border-transparent hover:bg-white/50'}`}>
                    <input type="radio" name="intro" className="text-dorren-dark focus:ring-dorren-light" onChange={() => setIntroSurvey(opt.id)} checked={introSurvey === opt.id} />
                    <span className="text-sm font-medium text-gray-800">{opt.t}</span>
                 </label>
               ))}
            </div>
            {introSurvey && (
              <div className="mt-4 text-sm text-dorren-dark italic animate-fade-in border-l-2 border-dorren-light pl-3">
                 Задача специалиста Dorren — перевести разговор с декора на инженерию: огнестойкость, гигиена, защита.
              </div>
            )}
          </div>
        </section>

        {/* 3. FIRE DOORS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-2 rounded text-red-600"><Flame size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Противопожарные двери Dorren</h2>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div>
                 <p className="text-gray-700 mb-6">
                    Это не просто "толстая дверь", а проверенный на испытаниях "пирог". Любая замена элемента может нарушить сертификат.
                 </p>
                 <div className="space-y-6">
                    <div>
                       <h3 className="font-bold text-sm text-gray-900 uppercase mb-2">Ограничения</h3>
                       <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          <li>Только <strong>огнестойкое стекло</strong> (прошедшее испытания).</li>
                          <li>Ограниченная площадь остекления.</li>
                          <li>Только сертифицированная фурнитура (замки, петли).</li>
                          <li>Обязателен доводчик.</li>
                       </ul>
                    </div>
                    <div>
                       <h3 className="font-bold text-sm text-gray-900 uppercase mb-2">Ключевые элементы</h3>
                       <div className="flex flex-wrap gap-2">
                          <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded border border-red-100">Термолента</span>
                          <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded border border-red-100">Антипаника</span>
                          <span className="bg-red-50 text-red-800 text-xs px-2 py-1 rounded border border-red-100">Дымовой уплотнитель</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Interactive Layers */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                 <h3 className="text-center text-sm font-bold text-gray-500 mb-4 uppercase">Интерактивный разрез (нажмите на слой)</h3>
                 
                 <div className="relative w-48 mx-auto perspective-1000">
                    <div className="flex flex-col gap-1 items-center cursor-pointer">
                       {/* Reinforcement */}
                       <div 
                         onClick={() => setFireLayer('reinforce')}
                         className={`w-32 h-6 border-2 border-gray-400 bg-gray-300 rounded transition-all hover:scale-105 ${fireLayer === 'reinforce' ? 'scale-110 ring-2 ring-dorren-light bg-gray-400' : ''}`}
                       ></div>
                       {/* Core */}
                       <div 
                         onClick={() => setFireLayer('core')}
                         className={`w-40 h-24 border-2 border-yellow-200 bg-yellow-50 pattern-diagonal-lines transition-all hover:scale-105 flex items-center justify-center ${fireLayer === 'core' ? 'scale-110 ring-2 ring-dorren-light bg-yellow-100' : ''}`}
                       >
                          <span className="text-[10px] text-yellow-800/50">Минвата</span>
                       </div>
                       {/* Tape (Perimeter - simulated as top/bottom strip) */}
                       <div 
                         onClick={() => setFireLayer('tape')}
                         className={`w-44 h-2 bg-red-500 rounded transition-all hover:scale-105 ${fireLayer === 'tape' ? 'scale-110 ring-2 ring-red-300 shadow-lg shadow-red-500/50' : ''}`}
                       ></div>
                       {/* Sheet */}
                       <div 
                         onClick={() => setFireLayer('sheet')}
                         className={`w-44 h-4 bg-gray-700 rounded transition-all hover:scale-105 ${fireLayer === 'sheet' ? 'scale-110 ring-2 ring-dorren-light bg-gray-600' : ''}`}
                       ></div>
                    </div>
                 </div>

                 <div className="mt-6 min-h-[80px] bg-white p-4 rounded border border-gray-100 text-center">
                    {fireLayer ? (
                       <div className="animate-fade-in">
                          <p className="font-bold text-dorren-dark text-sm mb-1">{FIRE_LAYERS.find(l => l.id === fireLayer)?.label}</p>
                          <p className="text-xs text-gray-600">{FIRE_LAYERS.find(l => l.id === fireLayer)?.desc}</p>
                       </div>
                    ) : (
                       <p className="text-xs text-gray-400 italic">Нажмите на любой элемент схемы выше</p>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* 4. MEDICAL DOORS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded text-blue-600"><Stethoscope size={24} /></div>
              <h2 className="text-2xl font-bold text-dorren-dark">Медицинские двери: Гигиена</h2>
           </div>

           <p className="text-gray-700 mb-8 max-w-3xl">
              Ключевое требование — отсутствие "пылесборников". Дверь должна мыться одним движением, не иметь выступов, щелей и острых углов.
           </p>

           <div className="bg-dorren-bg/30 rounded-xl p-8 border border-dorren-light/20">
              <div className="flex justify-center mb-6">
                 <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
                    <button 
                      onClick={() => setMedicalDoorView('bad')}
                      className={`px-6 py-2 rounded text-sm font-bold transition-all ${medicalDoorView === 'bad' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                       ❌ Обычная ("Плохая")
                    </button>
                    <button 
                      onClick={() => setMedicalDoorView('good')}
                      className={`px-6 py-2 rounded text-sm font-bold transition-all ${medicalDoorView === 'good' ? 'bg-green-50 text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                       ✅ Медицинская ("Хорошая")
                    </button>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                 {/* Visual Representation */}
                 <div className="w-64 h-80 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden shadow-sm transition-all duration-500">
                    {medicalDoorView === 'bad' ? (
                       <>
                          <div className="absolute top-10 left-10 w-24 h-32 border-4 border-gray-300 bg-blue-50"></div> {/* Raised window frame */}
                          <div className="absolute top-10 left-10 w-26 h-1 bg-black/10 shadow-lg transform -translate-y-1"></div> {/* Dust ledge */}
                          <div className="absolute bottom-0 w-full h-12 bg-gray-100 border-t border-gray-300"></div> {/* Rough kickplate */}
                          <div className="absolute right-2 top-1/2 w-4 h-12 bg-gray-400 rounded-sm shadow-md"></div> {/* Projecting handle */}
                       </>
                    ) : (
                       <>
                          <div className="absolute top-10 left-10 w-24 h-32 border border-gray-200 bg-blue-50/50"></div> {/* Flush window */}
                          <div className="absolute bottom-0 w-full h-12 bg-gray-200/50"></div> {/* Integrated kickplate */}
                          <div className="absolute right-4 top-1/2 w-2 h-16 bg-gray-300 rounded-full"></div> {/* Ergonomic handle */}
                          <div className="absolute inset-0 border-[6px] border-dorren-light/10 pointer-events-none"></div> {/* Smooth surface indication */}
                       </>
                    )}
                 </div>

                 <div className="flex-1 max-w-md animate-fade-in">
                    {medicalDoorView === 'bad' ? (
                       <div className="space-y-4">
                          <h4 className="font-bold text-red-700 flex items-center gap-2"><XCircle size={20}/> Проблемы</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                             <li className="flex gap-2"><span className="text-red-400">•</span> Выступающие штапики (копят грязь).</li>
                             <li className="flex gap-2"><span className="text-red-400">•</span> Острые кромки (травмоопасно).</li>
                             <li className="flex gap-2"><span className="text-red-400">•</span> Пористая поверхность (не отмыть кровь/йод).</li>
                          </ul>
                       </div>
                    ) : (
                       <div className="space-y-4">
                          <h4 className="font-bold text-green-700 flex items-center gap-2"><CheckCircle size={20}/> Решение Dorren</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                             <li className="flex gap-2"><span className="text-green-500">•</span> Остекление заподлицо (Flush).</li>
                             <li className="flex gap-2"><span className="text-green-500">•</span> HPL поверхность (стойкость к химии).</li>
                             <li className="flex gap-2"><span className="text-green-500">•</span> Радиусные кромки и скрытый крепеж.</li>
                          </ul>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* 5. X-RAY DOORS */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <div className="flex items-center gap-3 mb-6">
              <Zap size={24} className="text-dorren-light" />
              <h2 className="text-2xl font-bold">Рентгенозащитные двери</h2>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <p className="text-gray-300 mb-6 leading-relaxed">
                    Главный принцип — непрерывный <strong>свинцовый контур</strong>. Свинец (Pb) в полотне должен перекрываться со свинцом в коробке и стене. Малейшая щель — утечка радиации.
                 </p>
                 <div className="bg-white/10 p-4 rounded-lg border border-white/10 mb-6">
                    <h4 className="font-bold text-sm text-dorren-light mb-2 uppercase">Особенности</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                       <li>• Свинцовый лист (0.5–2.5 мм Pb) внутри.</li>
                       <li>• Свинцовое стекло (очень тяжелое).</li>
                       <li>• Усиленные петли (полотно весит &gt;100 кг).</li>
                    </ul>
                 </div>
              </div>

              {/* Visual Contour Toggle */}
              <div className="flex flex-col items-center">
                 <div className="relative w-64 h-80 bg-gray-200 rounded-lg border-4 border-gray-400 overflow-hidden mb-6 group">
                    {/* Door Shape */}
                    <div className="absolute inset-2 bg-gray-300 border border-gray-400">
                       <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-800 rounded border-2 border-gray-500"></div> {/* Window */}
                    </div>
                    
                    {/* Lead Contour Visual */}
                    <div className={`absolute inset-0 border-[8px] border-yellow-400 pointer-events-none transition-opacity duration-500 ${xrayContour ? 'opacity-80' : 'opacity-0'}`}></div>
                    <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-24 h-24 border-[8px] border-yellow-400 pointer-events-none transition-opacity duration-500 ${xrayContour ? 'opacity-80' : 'opacity-0'}`}></div>
                    
                    {/* Radiation Icon */}
                    <Zap className={`absolute bottom-4 right-4 text-yellow-500 transition-opacity ${xrayContour ? 'opacity-100' : 'opacity-20'}`} size={32} />
                 </div>

                 <button 
                   onClick={() => setXrayContour(!xrayContour)}
                   className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${xrayContour ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                 >
                    {xrayContour ? <ScanLine size={18}/> : <Minimize size={18}/>}
                    {xrayContour ? 'Контур активен' : 'Показать защиту'}
                 </button>
                 <p className="text-xs text-gray-500 mt-2 italic">Нажмите, чтобы увидеть скрытый слой свинца</p>
              </div>
           </div>
        </section>

        {/* 6. COMPARISON TABLE */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Сводная таблица отличий</h2>
           
           <table className="w-full min-w-[700px] text-sm text-left">
              <thead>
                 <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                    <th className="p-4 rounded-tl-lg">Характеристика</th>
                    <th className="p-4 font-bold text-red-600 bg-red-50">Противопожарные</th>
                    <th className="p-4 font-bold text-blue-600 bg-blue-50">Медицинские</th>
                    <th className="p-4 font-bold text-gray-700 bg-gray-100 rounded-tr-lg">Рентгенозащитные</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                 <tr>
                    <td className="p-4 font-medium text-gray-900">Главная цель</td>
                    <td className="p-4 text-gray-600">Сдержать огонь и дым</td>
                    <td className="p-4 text-gray-600">Гигиена и легкость уборки</td>
                    <td className="p-4 text-gray-600">Удержать излучение</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-medium text-gray-900">Заполнение</td>
                    <td className="p-4 text-gray-600">Огнестойкие плиты / Минвата</td>
                    <td className="p-4 text-gray-600">Плотное (ударопрочное)</td>
                    <td className="p-4 text-gray-600">Свинцовый лист (Pb)</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-medium text-gray-900">Остекление</td>
                    <td className="p-4 text-gray-600">Огнестойкое (многослойное)</td>
                    <td className="p-4 text-gray-600">Заподлицо, закаленное</td>
                    <td className="p-4 text-gray-600">Свинцовое стекло</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-medium text-gray-900">Фурнитура</td>
                    <td className="p-4 text-gray-600">Сертиф., доводчик, антипаника</td>
                    <td className="p-4 text-gray-600">Легко моющаяся, автоматика</td>
                    <td className="p-4 text-gray-600">Усиленная (под вес)</td>
                 </tr>
              </tbody>
           </table>
        </section>

        {/* 7. PRACTICE CASE */}
        <section className="bg-dorren-bg p-8 rounded-2xl border border-dorren-light/20">
           <div className="flex items-center gap-3 mb-4">
              <Layers size={24} className="text-dorren-dark"/>
              <h2 className="text-2xl font-bold text-dorren-dark">Практика: Операционная vs Палата</h2>
           </div>
           
           <p className="text-gray-700 mb-6">
              Распределите характеристики. Что критично для операционной, а что допустимо для обычной палаты?
              <br/><span className="text-sm text-gray-500 italic">Нажмите на кнопку выбора для каждой характеристики.</span>
           </p>

           <div className="grid gap-3 mb-8">
              {PRACTICE_ITEMS.map((item) => (
                 <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-medium text-sm text-gray-800 flex-1">{item.text}</span>
                    
                    <div className="flex gap-2 shrink-0">
                       <button 
                         onClick={() => assignFeature(item.id, 'op')}
                         className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${assignedFeatures[item.id] === 'op' ? 'bg-dorren-light text-dorren-dark border-dorren-dark' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                       >
                          Операционная
                       </button>
                       <button 
                         onClick={() => assignFeature(item.id, 'ward')}
                         className={`px-3 py-1.5 rounded text-xs font-bold border transition-colors ${assignedFeatures[item.id] === 'ward' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                       >
                          Палата
                       </button>
                    </div>
                    
                    {practiceSubmitted && (
                       <div className="w-6 shrink-0 text-center">
                          {assignedFeatures[item.id] === item.correct ? (
                             <CheckCircle size={20} className="text-green-500 inline" />
                          ) : (
                             <div className="group relative inline-block">
                                <AlertTriangle size={20} className="text-amber-500 inline cursor-help" />
                                <span className="absolute bottom-full right-0 bg-gray-800 text-white text-xs p-2 rounded w-48 mb-2 hidden group-hover:block z-20">
                                   {item.hint}
                                </span>
                             </div>
                          )}
                       </div>
                    )}
                 </div>
              ))}
           </div>

           {!practiceSubmitted ? (
              <button 
                onClick={() => setPracticeSubmitted(true)}
                disabled={Object.keys(assignedFeatures).length < PRACTICE_ITEMS.length}
                className="w-full bg-dorren-dark text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-opacity-90 transition-all"
              >
                 Проверить решение
              </button>
           ) : (
              <div className="bg-white p-6 rounded-lg border-l-4 border-dorren-light animate-fade-in">
                 <h4 className="font-bold text-dorren-dark mb-2">Итог</h4>
                 <p className="text-sm text-gray-700">
                    Для операционной мы стремимся к максимальной гладкости, герметичности и автоматике. 
                    Для палаты требования к гигиене высокие, но допускается более простой конструктив (если это не палата интенсивной терапии).
                 </p>
                 <button onClick={() => { setPracticeSubmitted(false); setAssignedFeatures({}); }} className="text-xs text-dorren-dark underline mt-2">
                    Сбросить
                 </button>
              </div>
           )}
        </section>

        {/* 8. QUIZ */}
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
           <div className="bg-gray-100 p-6 border-b border-gray-200">
             <h2 className="text-xl font-bold text-dorren-dark">Проверка знаний</h2>
             <p className="text-gray-600 text-sm">4 вопроса по спецдверям.</p>
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
                    ? 'Отлично! Вы разбираетесь в спецконструкциях.' 
                    : 'Рекомендуем повторить разделы про рентген и гигиену.'}
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
                     title="Модуль завершен"
                   >
                     Модуль 3 завершен
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
               'Спецдвери — это инженерные решения под риски: огонь, инфекции, радиация.',
               'Противопожарные: многослойный пирог с термолентой. Замена стекла запрещена.',
               'Медицинские: гладкость превыше всего. HPL, заподлицо, без выступов.',
               'Рентгенозащитные: непрерывный свинцовый контур (включая короб и стекло).',
               'Операционная требует большей герметичности и автоматизации, чем палата.'
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
