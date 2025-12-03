
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  BookOpen, CheckCircle, Scale, Flame, Stethoscope, FileText
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson6_1: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [activeNorm, setActiveNorm] = useState<'sp' | 'sanpin' | 'gost'>('sp');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  // Unused state removed or implemented if practice part is added.
  // For now we keep it simple as per file list provided previously which implied simple quiz.
  // Actually the previous file list had 'setPracticeFeedback' in error log.
  // I will add a simple practice section.
  const [practiceFeedback, setPracticeFeedback] = useState<string | null>(null);

  const CONTENT = {
    sp: {
      title: 'Своды Правил (СП)',
      desc: 'Главный закон для проектировщика. Обязательны к исполнению.',
      focus: 'Безопасность (пожарная, конструктивная).',
      examples: ['СП 1.13130 (Эвакуационные пути)', 'СП 59.13330 (Доступность для МГН)']
    },
    sanpin: {
      title: 'СанПиН',
      desc: 'Санитарные правила и нормы. Критичны для медицины, школ, общепита.',
      focus: 'Гигиена, здоровье, микроклимат.',
      examples: ['Гладкость поверхностей', 'Устойчивость к дезинфекции', 'Площадь остекления']
    },
    gost: {
      title: 'ГОСТ',
      desc: 'Стандарты качества продукции. Технические условия.',
      focus: 'Характеристики изделия и методы испытаний.',
      examples: ['ГОСТ 475 (Двери деревянные)', 'ГОСТ 31173 (Блоки дверные стальные)']
    }
  };

  const QUIZ = [
    { 
      id: 1, 
      q: 'Какой документ регулирует ширину эвакуационного выхода?', 
      opts: [{id:'a', t:'ГОСТ'}, {id:'b', t:'СП (Свод правил)'}, {id:'c', t:'СанПиН'}, {id:'d', t:'Каталог'}], 
      correct: 'b', 
      expl: 'СП 1.13130 "Системы противопожарной защиты. Эвакуационные пути".' 
    },
    { 
      id: 2, 
      q: 'Где искать требования к мытью дверей в операционной?', 
      opts: [{id:'a', t:'СанПиН'}, {id:'b', t:'СП'}, {id:'c', t:'Уголовный кодекс'}, {id:'d', t:'Словарь'}], 
      correct: 'a', 
      expl: 'Санитарные правила описывают требования к гигиене.' 
    },
    { 
      id: 3, 
      q: 'Документ, подтверждающий, что дверь соответствует стандарту?', 
      opts: [{id:'a', t:'Чек'}, {id:'b', t:'Сертификат соответствия / Паспорт'}, {id:'c', t:'Фотография'}, {id:'d', t:'Визитка'}], 
      correct: 'b', 
      expl: 'Сертификат и паспорт изделия подтверждают его характеристики.' 
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

  const handlePractice = (type: string) => {
      if(type === 'fire') setPracticeFeedback('Верно! СП 1.13130 — это библия пожарной безопасности.');
      else setPracticeFeedback('Не совсем. Пожарная безопасность — это прерогатива СП (МЧС).');
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <LessonHeader 
        lessonId="6.1" 
        title="Нормативная база" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 6. Нормы
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 6.1. СП, СанПиН, ГОСТ</h1>
             <p className="text-xl text-gray-300 mb-8">
               Три кита, на которых держится проект. Разбираемся, кто за что отвечает.
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
                <Scale size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Зачем менеджеру знать нормы?</h2>
           <p className="text-gray-700">
             Чтобы говорить с проектировщиком на одном языке и защищать свои решения перед заказчиком. Фраза "Так положено по СП 1.13130" закрывает многие споры о дизайне.
           </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Иерархия норм</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
             {[
               {id: 'sp', t: 'СП (Своды правил)', i: Flame},
               {id: 'sanpin', t: 'СанПиН', i: Stethoscope},
               {id: 'gost', t: 'ГОСТ', i: BookOpen}
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveNorm(tab.id as any)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeNorm === tab.id ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
               >
                 <tab.i size={16} /> {tab.t}
               </button>
             ))}
           </div>

           <div className="animate-fade-in">
             <h3 className="text-xl font-bold text-dorren-dark mb-2">{CONTENT[activeNorm].title}</h3>
             <p className="text-gray-600 mb-6">{CONTENT[activeNorm].desc}</p>
             
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-800 mb-2">Фокус:</p>
                <p className="text-sm text-gray-700 mb-4">{CONTENT[activeNorm].focus}</p>
                <p className="font-bold text-gray-800 mb-2">Примеры:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {CONTENT[activeNorm].examples.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600">{ex}</li>
                  ))}
                </ul>
             </div>
           </div>
        </section>

        {/* PRACTICE */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-4">Мини-тренировка</h2>
           <p className="text-gray-300 mb-6">Какой документ регламентирует ширину прохода при пожаре?</p>
           <div className="flex gap-4">
              <button onClick={() => handlePractice('fire')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold border border-white/20">СП 1.13130</button>
              <button onClick={() => handlePractice('san')} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold border border-white/20">СанПиН 2.1.3</button>
           </div>
           {practiceFeedback && (
              <div className="mt-4 p-4 bg-white/10 rounded animate-fade-in">
                 {practiceFeedback}
              </div>
           )}
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
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); setPracticeFeedback(null); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">Заново</button>
                   <button onClick={() => onNavigate('lesson6.2')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
                      Следующий урок <ChevronRight size={16} />
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
               'СП — это безопасность. Нарушать нельзя.',
               'СанПиН — это гигиена. Важно для медицины.',
               'ГОСТ — это качество изделия.'
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
