import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import PixScreen from './components/PixScreen';
import confetti from 'canvas-confetti';

function App() {
  const [view, setView] = useState('login');

  const triggerSuccess = (msg) => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A4855D', '#ffffff', '#1C1C1C'] // Cores: Bronze, Branco, Grafite
    });
    console.log(msg);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Menu do Laboratório - Estilo Minimalista */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
        <button 
          onClick={() => setView('login')}
          className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${view === 'login' ? 'bg-[#A4855D] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
          Auth Lab
        </button>
        <button 
          onClick={() => setView('pix')}
          className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${view === 'pix' ? 'bg-[#A4855D] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
        >
          Pix Lab
        </button>
      </div>

      {/* Renderização das Peças */}
      <div className="animate-in fade-in duration-700">
        {view === 'login' ? (
          <LoginScreen onLogin={() => triggerSuccess("Login Autorizado!")} />
        ) : (
          <PixScreen value={250.00} onPaymentComplete={() => triggerSuccess("Pagamento Pix Confirmado!")} />
        )}
      </div>
    </div>
  );
}

export default App;