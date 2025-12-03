import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onStartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-dorren-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content */}
          <div className="lg:w-1/2 flex flex-col gap-6 relative z-10">
            <span className="text-dorren-dark/60 font-semibold tracking-wider text-sm uppercase">
              Внутренний курс DORREN для проектных команд
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dorren-black leading-[1.1]">
              Дверные решения DORREN: <span className="text-dorren-light">от проёма</span> до готового объекта
            </h1>

            <h2 className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Курс, который помогает менеджерам, инженерам и сметчикам уверенно работать с дверными блоками для сложных объектов — от медучреждений до бизнес-центров.
            </h2>

            <ul className="space-y-3">
              {[
                'Разбираем конструктив дверей на понятном языке.',
                'Связываем требования норм с решениями DORREN.',
                'Учимся объяснять ценность и безопасность заказчику.'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-dorren-light mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button onClick={onStartClick} className="bg-dorren-dark text-white px-8 py-3.5 rounded-md font-semibold text-center hover:bg-[#23455b] transition-colors flex items-center justify-center gap-2 group">
                Начать обучение
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#program" className="border border-dorren-dark/20 text-dorren-dark px-8 py-3.5 rounded-md font-semibold text-center hover:bg-white hover:border-dorren-dark transition-colors">
                Посмотреть программу
              </a>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Курс рекомендован всем, кто принимает технические и коммерческие решения по дверям на проектах DORREN.
            </p>
          </div>

          {/* Image / Visualization */}
          <div className="lg:w-1/2 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-gray-200 group">
              {/* Placeholder for 3D Render: Modern Hospital Corridor */}
              <img 
                src="https://picsum.photos/seed/dorren_hospital/800/600" 
                alt="Современный коридор больницы с дверями DORREN" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dorren-dark/60 to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg">
                  <p className="text-white text-xs font-mono mb-1">ОБЪЕКТ: МЕДИЦИНСКИЙ ЦЕНТР</p>
                  <p className="text-white text-sm font-semibold">Дверной блок EI60 / HPL / Нержавеющая сталь</p>
                </div>
              </div>
              
              {/* Interactive Tooltip Simulation */}
              <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-dorren-light rounded-full cursor-pointer animate-pulse ring-4 ring-white/30 hover:ring-white/50">
                <div className="absolute left-6 top-0 bg-white text-xs p-2 rounded shadow-lg w-32 hidden group-hover:block text-dorren-dark font-medium">
                  Герметичный притвор
                </div>
              </div>
              <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-dorren-light rounded-full cursor-pointer animate-pulse delay-700 ring-4 ring-white/30 hover:ring-white/50">
                <div className="absolute right-6 top-0 bg-white text-xs p-2 rounded shadow-lg w-32 hidden group-hover:block text-dorren-dark font-medium">
                  Отбойная пластина
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce cursor-pointer" onClick={() => document.getElementById('why')?.scrollIntoView()}>
          <span className="text-xs font-medium uppercase tracking-widest">Листайте вниз</span>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
};