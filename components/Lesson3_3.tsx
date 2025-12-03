
import React, { useState } from 'react';
import { 
  ArrowRight, Clock, HelpCircle, ChevronRight, 
  Wind, Volume2, Flame, Shield, CheckCircle, 
  AlertTriangle, MousePointer, Layers, MoveVertical, Droplets, Mic
} from 'lucide-react';
import { LessonHeader } from './Navigation';

interface LessonProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const Lesson3_3: React.FC<LessonProps> = ({ onBack, onNavigate }) => {
  const [introSurvey, setIntroSurvey] = useState<number | null>(null);
  const [activeSeal, setActiveSeal] = useState<string | null>(null);
  const [thresholdRoom, setThresholdRoom] = useState<string | null>(null);
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // --- DATA ---

  const SEALS = [
    { id: 'rubber', label: 'Резиновый контур', desc: 'Базовая защита от шума и запахов. Вставляется в паз коробки.', icon: Wind },
    { id: 'intumescent', label: 'Термолента (вспенивающаяся)', desc: 'Обязательна для EI. При нагреве расширяется и герметизирует зазор от дыма.', icon: Flame },
    { id: 'drop', label: 'Выпадающий порог', desc: '«Умный» порог. Опускается при закрытии двери. Нет препятствий на полу.', icon: MoveVertical }
  ];

  const THRESHOLD_MATRIX = [
    { id: 'op', label: 'Операционная', rec: 'Выпадающий порог', reason: 'Герметичность + проезд каталок.' },
    { id: 'corridor', label: 'Коридор стационара', rec: 'Выпадающий порог', reason: 'Ровный пол для МГН и каталок.' },
    { id: 'tech', label: 'Тех. помещение', rec: 'Стационарный порог', reason: 'Защита от воды и перелива.' }
  ];

  const QUIZ = [
    { id: 1, q: 'Какая функция у выпадающего порога?', opts: [{id:'a', t:'Декор'}, {id:'b', t:'Герметизация без выступа на полу'}, {id:'c', t:'Удержание двери открытой'}, {id:'d', t:'Вентиляция'}], correct: 'b', expl: 'Он закрывает щель под дверью только в закрытом положении.' },
    { id: 2, q: 'Что делает термолента при пожаре?', opts: [{id:'a', t:'Плавится'}, {id:'b', t:'Вспенивается и блокирует дым'}, {id:'c', t:'Включает сирену'}, {id:'d', t:'Охлаждает замок'}], correct: 'b', expl: 'Она увеличивается в объеме, заполняя зазоры.' },
    { id: 3, q: 'Где стационарный порог — плохая идея?', opts: [{id:'a', t:'В душевой'}, {id:'b', t:'В электрощитовой'}, {id:'c', t:'На пути эвакуации'}, {id:'d', t:'В подвале'}], correct: 'c', expl: 'На путях эвакуации пороги создают риск спотыкания.' }
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
        lessonId="3.3" 
        title="Притворы и пороги" 
        onBack={onBack}
        onNavigate={onNavigate}
      />

      {/* HERO */}
      <div className="bg-dorren-dark text-white pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
             <div className="inline-block px-3 py-1 bg-dorren-light/20 rounded text-dorren-light text-xs font-bold uppercase tracking-wider mb-4">
                Модуль 3. Технический конструктив
             </div>
             <h1 className="text-3xl md:text-5xl font-bold mb-6">Урок 3.3. Притворы, уплотнители и пороги</h1>
             <p className="text-xl text-gray-300 mb-8">Маленькие детали с большой ответственностью: звук, дым, тепло.</p>
             <button 
                onClick={() => document.getElementById('start')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-dorren-light text-dorren-dark px-8 py-3.5 rounded-md font-bold hover:bg-white transition-colors flex items-center gap-2"
             >
                Начать урок <ArrowRight size={18} />
             </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <div className="bg-white/10 border border-white/20 p-8 rounded-full">
                <Wind size={64} className="text-dorren-light opacity-80" />
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 -mt-8 relative z-10 space-y-16" id="start">
        
        {/* INTRO */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-2xl font-bold text-dorren-dark mb-4">Герметичность = Комфорт + Безопасность</h2>
           <p className="text-gray-700">Щель под дверью сводит на нет звукоизоляцию в 40dB. Отсутствие уплотнителя делает дверь "громкой" при закрытии. В этом уроке — о том, как закрыть щели.</p>
        </section>

        {/* SEALS */}
        <section className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-bold text-dorren-dark mb-6">Виды уплотнения</h2>
           <div className="grid md:grid-cols-3 gap-4">
              {SEALS.map((seal) => (
                 <button 
                   key={seal.id}
                   onClick={() => setActiveSeal(seal.id)}
                   className={`p-4 rounded-xl border text-left transition-all ${activeSeal === seal.id ? 'bg-dorren-dark text-white border-dorren-dark shadow-lg' : 'bg-gray-50 border-gray-200 hover:border-dorren-light'}`}
                 >
                    <seal.icon size={24} className={`mb-3 ${activeSeal === seal.id ? 'text-dorren-light' : 'text-gray-500'}`} />
                    <h3 className="font-bold text-sm mb-1">{seal.label}</h3>
                 </button>
              ))}
           </div>
           {activeSeal && (
              <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 animate-fade-in">
                 <h4 className="font-bold text-dorren-dark mb-2">{SEALS.find(s => s.id === activeSeal)?.label}</h4>
                 <p className="text-gray-700">{SEALS.find(s => s.id === activeSeal)?.desc}</p>
              </div>
           )}
        </section>

        {/* THRESHOLDS INTERACTIVE */}
        <section className="bg-dorren-dark text-white p-8 rounded-2xl">
           <h2 className="text-2xl font-bold mb-6">Порог: быть или не быть?</h2>
           <p className="text-gray-300 mb-6">Выберите помещение, чтобы узнать рекомендацию.</p>
           <div className="flex flex-wrap gap-2 mb-6">
              {THRESHOLD_MATRIX.map((tm) => (
                 <button 
                   key={tm.id}
                   onClick={() => setThresholdRoom(tm.id)}
                   className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${thresholdRoom === tm.id ? 'bg-dorren-light text-dorren-dark' : 'bg-white/10 hover:bg-white/20'}`}
                 >
                    {tm.label}
                 </button>
              ))}
           </div>
           <div className="bg-white/10 p-6 rounded-xl border border-white/10 min-h-[100px]">
              {thresholdRoom ? (
                 <div className="animate-fade-in">
                    <p className="text-xl font-bold text-dorren-light mb-2">{THRESHOLD_MATRIX.find(t => t.id === thresholdRoom)?.rec}</p>
                    <p className="text-gray-300">{THRESHOLD_MATRIX.find(t => t.id === thresholdRoom)?.reason}</p>
                 </div>
              ) : (
                 <p className="text-gray-400 italic">Нажмите кнопку выше</p>
              )}
           </div>
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
                   <button onClick={() => { setShowQuizResult(false); setQuizAnswers({}); }} className="text-gray-500 hover:text-dorren-dark px-4 py-2">Заново</button>
                   <button onClick={() => onNavigate('lesson3.4')} className="bg-dorren-dark text-white px-6 py-2 rounded-lg font-bold hover:bg-opacity-90 flex items-center gap-2">
                      Следующий урок <ChevronRight size={16} />
                   </button>
                </div>
             </div>
           )}
        </section>

        {/* SUMMARY */}
        <section className="bg-dorren-bg p-8 rounded-2xl text-center">
           <h2 className="text-xl font-bold text-dorren-dark mb-4">Готовы идти дальше?</h2>
           <button 
             onClick={() => onNavigate('lesson3.4')}
             className="bg-dorren-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
           >
              Перейти к спецконструкциям (3.4)
              <ArrowRight size={18} />
           </button>
        </section>

      </main>
    </div>
  );
};
