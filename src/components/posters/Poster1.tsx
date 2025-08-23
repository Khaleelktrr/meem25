import React from 'react';
import { Result } from '../../types';

interface PosterProps {
  program: { event: string; category: string };
  winners: Result[];
}

const Poster1: React.FC<PosterProps> = ({ program, winners }) => {
  const getWinner = (position: number) => winners.find(w => w.position === position);
  const winner1 = getWinner(1);
  const winner2 = getWinner(2);
  const winner3 = getWinner(3);

  return (
    <div className="w-full h-full bg-white font-sans text-black relative overflow-hidden">
      {/* Background doodles */}
      <img src="https://www.muhimmath.org/images/sargalayam/doodle.png" alt="doodle" className="absolute inset-0 w-full h-full object-cover opacity-20" />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <img src="https://www.muhimmath.org/images/logo/logo.png" alt="Logo 1" className="h-10" />
            <img src="https://www.muhimmath.org/images/sargalayam/logo-white.png" alt="Logo 2" className="h-10" />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold" style={{ color: '#E55B13' }}>സർഗലയം</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-red-600 text-white px-2 py-0.5 rounded-sm text-xs font-bold">29 30</div>
              <div className="text-xs font-semibold">
                <div>2024 NOVEMBER</div>
                <div className="text-gray-600">MIC കൈപ്പമംഗലം</div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-grow flex mt-4">
          {/* Left Column */}
          <div className="w-1/2 pr-4">
            <div className="flex items-start">
              <div className="writing-mode-vertical-rl transform rotate-180 bg-red-600 text-white font-bold text-xs px-1 py-2 rounded-sm mr-2">
                RESULT
              </div>
              <div className="text-7xl font-bold -mt-2">108</div>
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-bold uppercase">{program.event}</h2>
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mt-2">
                {program.category.toUpperCase()}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {winner1 && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">01</div>
                  <div>
                    <div className="font-bold text-sm">{winner1.participant}</div>
                    <div className="text-xs text-gray-500">{winner1.school}</div>
                  </div>
                </div>
              )}
              {winner2 && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">02</div>
                  <div>
                    <div className="font-bold text-sm">{winner2.participant}</div>
                    <div className="text-xs text-gray-500">{winner2.school}</div>
                  </div>
                </div>
              )}
              {winner3 && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">03</div>
                  <div>
                    <div className="font-bold text-sm">{winner3.participant}</div>
                    <div className="text-xs text-gray-500">{winner3.school}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="w-1/2 relative">
            <img src="https://user-images.githubusercontent.com/128635466/300062486-d3c2a07c-986a-464a-a1b7-e24c78572186.jpeg" alt="Lantern" className="absolute -right-10 -top-10 h-[120%] object-contain" />
          </div>
        </main>
        
        {/* Footer */}
        <footer className="text-center text-xs font-semibold text-gray-700">
          SKSSF THRISSUR DISTRICT COMMITTEE
        </footer>
      </div>
      <style jsx>{`
        .writing-mode-vertical-rl {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default Poster1;
