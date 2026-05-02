import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import PixScreen from './pix-payment/PixScreen'; // Certifique-se do caminho correto

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' ou 'pix'

  return (
    <div className="relative min-h-screen">
      {/* Seletor de Laboratório (Apenas para desenvolvimento) */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button 
          onClick={() => setCurrentView('login')}
          className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-all ${currentView === 'login' ? 'bg-[#A4855D] border-[#A4855D] text-black' : 'bg-black/50 border-white/10 text-white/40'}`}
        >
          Login Lab
        </button>
        <button 
          onClick={() => setCurrentView('pix')}
          className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border transition-all ${currentView === 'pix' ? 'bg-[#A4855D] border-[#A4855D] text-black' : 'bg-black/50 border-white/10 text-white/40'}`}
        >
          Pix Lab
        </button>
      </div>

      {/* Renderização Condicional */}
      {currentView === 'login' ? (
        <LoginScreen 
          appName="M.E.S.A. Access" 
          onLogin={() => console.log("Login Success!")} 
        />
      ) : (
        <PixScreen 
          value={150.00} 
          onPaymentComplete={() => console.log("Pix Pago!")} 
        />
      )}
    </div>
  );
}

export default App;