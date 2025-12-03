import React, { useState } from 'react';
import { Award, Box, Clock, Layout, Plus, Minus, ArrowRight } from 'lucide-react';
import { FAQS } from '../data';

export const CompanyInfo: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
             <h2 className="text-3xl font-bold text-dorren-black mb-6">Почему именно DORREN</h2>
             <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
               <p>
                 DORREN более двух десятилетий занимается проектированием, производством и поставкой готовых дверных блоков. В портфеле — сотни реализованных проектов в медицине, девелопменте и бизнесе.
               </p>
               <p>
                 Собственная производственная база полного цикла позволяет контролировать качество на всех этапах: от подготовки древесины до финишной сборки.
               </p>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
               {[
                 { val: '23+', label: 'лет на рынке' },
                 { val: '3М+', label: 'произведённых дверей' },
                 { val: '300+', label: 'крупных проектов' },
                 { val: '100%', label: 'собственное производство' }
               ].map((stat, i) => (
                 <div key={i} className="border-l-4 border-dorren-light pl-4">
                   <div className="text-2xl font-bold text-dorren-dark">{stat.val}</div>
                   <div className="text-sm text-gray-500">{stat.label}</div>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-lg relative">
              <img 
                src="https://picsum.photos/seed/dorren_factory/800/450" 
                alt="Производство DORREN" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-dorren-dark/20">
                <span className="bg-white/90 px-4 py-2 rounded text-xs font-bold text-dorren-dark uppercase tracking-widest">Производственная линия</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Format: React.FC = () => {
  return (
    <section className="py-20 bg-dorren-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-dorren-black mb-12">Как проходит обучение</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Layout, title: 'Онлайн-LMS', text: 'Удобно с любого устройства' },
            { icon: Clock, title: 'Короткие уроки', text: '10–25 минут на тему' },
            { icon: Box, title: 'Интерактив', text: 'Кейсы и разборы конструкций' },
            { icon: Award, title: 'Сертификат', text: 'По итогам финального теста' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-gray-50 text-dorren-dark rounded-full flex items-center justify-center mb-4">
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pre-FAQ CTA */}
        <div className="bg-dorren-light/20 rounded-2xl p-8 mb-16 text-center border border-dorren-light/30">
          <h3 className="text-2xl font-bold text-dorren-dark mb-2">Начните с Модуля 1 уже сегодня</h3>
          <p className="text-gray-700 mb-6">Даже если вы эксперт, этот модуль поможет выстроить общую “карту” решений.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-dorren-dark text-white px-8 py-3 rounded-md font-semibold hover:bg-[#23455b] transition-colors">
            Перейти к обучению
            <ArrowRight size={18} />
          </a>
          <p className="text-xs text-gray-400 mt-3">Доступ зависит от вашего подразделения. Уточните у HR.</p>
        </div>

        <h2 className="text-3xl font-bold text-dorren-black mb-8 text-center">Частые вопросы</h2>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                {openIndex === index ? <Minus size={20} className="text-dorren-light" /> : <Plus size={20} className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
