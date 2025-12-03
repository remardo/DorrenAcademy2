
import React, { useState } from 'react';
import { Lock, PlayCircle, FileText, ChevronDown, ChevronUp, Map, Briefcase, FileCheck, ArrowRight, LayoutGrid, Sliders, Grip } from 'lucide-react';
import { MODULES } from '../data';

interface CurriculumProps {
  onLessonStart: (lessonId: string) => void;
}

export const Curriculum: React.FC<CurriculumProps> = ({ onLessonStart }) => {
  const [expandedLesson, setExpandedLesson] = useState<string | null>('1.1');
  const [expandedModule, setExpandedModule] = useState<string>('m1');

  return (
    <section id="program" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dorren-black mb-4">Как устроен курс</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Обучение построено по принципу «от общего к частному». Сначала вы понимаете роль DORREN, затем погружаетесь в детали конструктива.
          </p>
        </div>

        {/* Roadmap Visualization */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {MODULES.map((mod, idx) => (
            <button 
              key={mod.id} 
              onClick={() => !mod.isLocked && setExpandedModule(mod.id)}
              className={`relative p-4 rounded-lg border text-left flex flex-col justify-between h-32 md:h-40 transition-all ${
                mod.isLocked 
                  ? 'bg-white border-gray-200 opacity-60 cursor-not-allowed' 
                  : expandedModule === mod.id
                    ? 'bg-dorren-dark border-dorren-dark shadow-lg ring-2 ring-offset-2 ring-dorren-light scale-105 z-10'
                    : 'bg-dorren-dark/90 border-dorren-dark text-white hover:bg-dorren-dark cursor-pointer'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${mod.isLocked ? 'text-gray-400' : 'text-dorren-light'}`}>
                Модуль {idx + 1}
              </span>
              <p className={`text-xs md:text-sm font-semibold leading-tight ${mod.isLocked ? 'text-gray-600' : 'text-white'}`}>
                {mod.title.replace(/Модуль \d+\. /, '')}
              </p>
              {mod.isLocked ? (
                <Lock size={16} className="text-gray-300 self-end mt-2" />
              ) : (
                <PlayCircle size={16} className="text-dorren-light self-end mt-2" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Module Detail */}
        {expandedModule && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in">
            <div className="bg-dorren-dark p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {MODULES.find(m => m.id === expandedModule)?.title}
              </h3>
              <p className="text-dorren-light/80">
                {MODULES.find(m => m.id === expandedModule)?.description}
              </p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {MODULES.find(m => m.id === expandedModule)?.lessons?.map((lesson) => {
                const isOpen = expandedLesson === lesson.id;
                
                // Icon Selection
                const Icon = lesson.id === '1.1' ? Briefcase : 
                             lesson.id === '1.2' ? Map : 
                             lesson.id === '1.3' ? FileCheck : 
                             lesson.id === '2.1' ? LayoutGrid :
                             lesson.id === '2.2' ? Sliders :
                             lesson.id === '2.3' ? Grip :
                             FileText;

                return (
                  <div key={lesson.id} className="group">
                    <button 
                      onClick={() => setExpandedLesson(isOpen ? null : lesson.id)}
                      className={`w-full text-left p-6 md:p-8 flex items-center justify-between transition-colors ${isOpen ? 'bg-dorren-bg' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-dorren-dark text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                          <Icon size={20} />
                        </div>
                        <h4 className={`text-lg font-bold ${isOpen ? 'text-dorren-dark' : 'text-gray-700'}`}>{lesson.title}</h4>
                      </div>
                      {isOpen ? <ChevronUp className="text-dorren-dark" /> : <ChevronDown className="text-gray-400" />}
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 md:px-8 pb-8 pt-2 bg-dorren-bg flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                           <p className="text-gray-700 mb-6 leading-relaxed">
                             {lesson.description}
                           </p>
                           <ul className="space-y-3">
                             {lesson.bullets?.map((bullet, i) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                 <div className="w-1.5 h-1.5 rounded-full bg-dorren-dark mt-2 shrink-0" />
                                 {bullet}
                               </li>
                             ))}
                           </ul>
                           
                           {/* CTA */}
                           <button 
                             onClick={() => onLessonStart(`lesson${lesson.id}`)}
                             className="mt-6 inline-flex items-center gap-2 bg-dorren-dark text-white px-6 py-2.5 rounded font-medium hover:bg-opacity-90 transition-all"
                           >
                             Перейти к уроку
                             <ArrowRight size={16} />
                           </button>
                        </div>
                        
                        <div className="lg:w-1/3">
                           <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col items-center justify-center text-center min-h-[160px]">
                              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                                <FileText size={24} />
                              </div>
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">ИНФОГРАФИКА</span>
                              <p className="text-sm font-semibold text-dorren-dark">{lesson.interactiveLabel}</p>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};