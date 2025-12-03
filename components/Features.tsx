import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Target, Shield, Users, Layers, FileText } from 'lucide-react';
import { RISKS, ROLES } from '../data';

export const WhyCourse: React.FC = () => {
  return (
    <section id="why" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dorren-black mb-12">Почему знания о дверных решениях критичны</h2>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Text Content */}
          <div className="lg:w-7/12 space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <strong className="text-dorren-dark">DORREN</strong> — это не просто производитель дверей, а подрядчик и поставщик комплексных решений по заполнению и управлению дверными проёмами на статусных объектах.
            </p>
            <p>
              Для таких объектов «дверь» — это не просто полотно. Это дверной блок с заданной огнестойкостью, звукоизоляцией, санитарными и эксплуатационными требованиями. Ошибка в выборе решения может означать срыв сроков и финансовые потери.
            </p>
            <p className="pl-4 border-l-4 border-dorren-light italic text-gray-600">
              Этот курс формирует общее инженерное поле: вся команда одинаково понимает, что стоит за маркировкой EI30/EI60 и почему важен каждый узел.
            </p>
          </div>

          {/* Interactive Risks */}
          <div className="lg:w-5/12 bg-gray-50 p-8 rounded-xl border border-gray-100">
            <h3 className="text-dorren-dark font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={24} />
              Риски незнания
            </h3>
            <div className="space-y-4">
              {RISKS.map((risk, idx) => (
                <div key={idx} className="group relative bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-help border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-dorren-dark">{risk.title}</span>
                    <AlertTriangle size={16} className="text-gray-300 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div className="absolute left-0 bottom-full mb-2 w-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-dorren-dark text-white text-sm p-3 rounded shadow-xl mx-2">
                      {risk.tooltip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Audience: React.FC = () => {
  const [activeRole, setActiveRole] = useState(ROLES[0].id);
  const currentRole = ROLES.find(r => r.id === activeRole) || ROLES[0];

  return (
    <section id="audience" className="py-20 bg-dorren-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-dorren-black mb-4">Для кого создан этот курс</h2>
          <p className="text-gray-600 max-w-2xl">Курс ориентирован на всех, кто принимает решения по дверям на проекте — от первой схемы до сдачи объекта.</p>
        </div>

        {/* Role Switcher */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeRole === role.id 
                  ? 'bg-dorren-dark text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-dorren-dark/50'
              }`}
            >
              {role.title.split(' ')[0]} {/* Shorten name for tab */}
            </button>
          ))}
        </div>

        {/* Dynamic Card */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-dorren-dark mb-4">{currentRole.title}</h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                {currentRole.description}
              </p>
              <div className="bg-dorren-light/10 border border-dorren-light/30 p-6 rounded-lg">
                <h4 className="text-sm uppercase tracking-wider font-bold text-dorren-dark mb-2 flex items-center gap-2">
                  <Target size={16} />
                  Результат для вас
                </h4>
                <p className="text-dorren-dark/80 italic">
                  "{currentRole.microCase}"
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center text-center border border-gray-100 h-full min-h-[200px]">
               <Users size={48} className="text-dorren-light mb-4" />
               <p className="text-sm text-gray-500">
                 Курс адаптирован под специфику вашей роли в компании
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Results: React.FC = () => {
  const [confidence, setConfidence] = useState(3);

  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dorren-black mb-12">Что вы будете уметь после курса</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Layers, title: 'Понимать конструктив', text: 'Разберёте, из чего состоит дверной блок: полотно, короб, притвор, узлы примыкания.' },
            { icon: Target, title: 'Связывать с нормами', text: 'Научитесь сопоставлять требования объекта с конкретными сериями дверей.' },
            { icon: Shield, title: 'Аргументировать', text: 'Сможете объяснить отличия проектных дверей от бытовых по ресурсу и безопасности.' },
            { icon: FileText, title: 'Работать с АТР', text: 'Поймёте, где искать информацию в каталогах, паспортах и чертежах.' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-start p-6 rounded-xl border border-gray-100 hover:border-dorren-light/50 transition-colors hover:shadow-lg bg-gray-50 hover:bg-white group">
              <div className="w-12 h-12 bg-dorren-dark rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-dorren-dark mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Self Assessment */}
        <div className="mt-16 bg-dorren-dark rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Насколько уверенно вы сейчас разбираетесь в дверных решениях?</h3>
            <p className="text-dorren-light/80 text-sm mb-6">Оцените себя от 1 до 10</p>
            
            <div className="flex items-center gap-4">
              <span className="font-mono text-2xl font-bold w-8 text-center">{confidence}</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={confidence} 
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-dorren-light"
              />
              <span className="font-mono text-2xl font-bold w-8 text-center">10</span>
            </div>
          </div>
          <div className="md:w-1/3 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
             <div className="flex items-start gap-3">
               <CheckCircle className="text-dorren-light shrink-0 mt-1" />
               <p className="text-sm">
                 После курса ваша оценка гарантированно вырастет на <strong className="text-white">2–3 пункта</strong>. Мы заполним пробелы в инженерии и нормативах.
               </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
