import React from 'react';
import { Result } from '../../types';
import { Trophy, Medal, Award } from 'lucide-react';

interface PosterProps {
  program: { event: string; category: string };
  winners: Result[];
}

const Poster2: React.FC<PosterProps> = ({ program, winners }) => {
  const getWinner = (position: number) => winners.find(w => w.position === position);

  return (
    <div className="w-full h-full bg-gray-900 text-white font-sans flex flex-col p-8 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-red-500/10 rounded-full blur-3xl"></div>
      
      <header className="text-center z-10">
        <h3 className="text-lg font-light text-gray-400">MUHIMMATH 2025</h3>
        <h1 className="text-4xl font-extrabold text-yellow-400 uppercase tracking-wider">{program.event}</h1>
        <p className="text-md text-gray-300">{program.category}</p>
      </header>
      
      <main className="flex-grow flex flex-col justify-center items-center space-y-6 mt-4 z-10">
        {[1, 2, 3].map(pos => {
          const winner = getWinner(pos);
          const icon = pos === 1 ? Trophy : pos === 2 ? Medal : Award;
          const color = pos === 1 ? 'text-yellow-400' : pos === 2 ? 'text-gray-300' : 'text-amber-500';
          
          return (
            <div key={pos} className="w-full bg-white/5 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 border border-white/10">
              {React.createElement(icon, { className: `w-8 h-8 ${color}` })}
              <div className="flex-grow">
                <p className="font-bold text-lg truncate">{winner ? winner.participant : 'N/A'}</p>
                <p className="text-sm text-gray-400 truncate">{winner ? winner.school : '---'}</p>
              </div>
              <div className={`font-black text-3xl ${color}`}>{pos}</div>
            </div>
          );
        })}
      </main>
      
      <footer className="text-center text-xs text-gray-500 mt-6 z-10">
        SSF DAAWA SECTOR
      </footer>
    </div>
  );
};

export default Poster2;
