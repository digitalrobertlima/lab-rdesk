import React, { useState } from 'react';
import { Lock, Mail, Github, Facebook, Chrome, MessageCircle, Fingerprint, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const LoginScreen = () => {
  const [method, setMethod] = useState('email');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  // Máscara de CPF (000.000.000-00)
  const handleCPF = (v) => {
    v = v.replace(/\D/g, "");
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setCpf(v);
  };

  // Máscara de WhatsApp ((00) 00000-0000)
  const handlePhone = (v) => {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    setPhone(v.substring(0, 15));
  };

  const handleSuccess = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A4855D', '#ffffff', '#1C1C1C']
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 font-sans text-white transition-all duration-500">
      <div className="relative w-full max-w-[400px] bg-[#161616]/90 backdrop-blur-3xl border border-white/5 p-6 md:p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 ease-in-out">
        
        {/* Header - Industrial Luxury */}
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#A4855D] to-[#634e32] mb-5 shadow-lg shadow-[#A4855D]/10">
            <Fingerprint size={32} className="text-black" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">M.E.S.A. Lab</h2>
          <p className="text-white/30 text-[9px] mt-1 uppercase tracking-[0.4em]">Sistêmica Autônoma</p>
        </div>

        {/* Sliding Selector (Barra menos agressiva) */}
        <div className="relative flex p-1.5 bg-black/40 rounded-2xl border border-white/5 mb-8 overflow-hidden">
          <div 
            className="absolute top-1.5 bottom-1.5 transition-all duration-300 ease-out bg-[#A4855D] rounded-xl shadow-lg"
            style={{ 
              width: 'calc(33.33% - 4px)', 
              left: method === 'email' ? '6px' : method === 'cpf' ? '33.33%' : 'calc(66.66% - 4px)' 
            }}
          />
          <button onClick={() => setMethod('email')} className={`relative z-10 flex-1 py-2 text-[10px] font-black uppercase transition-colors duration-300 ${method === 'email' ? 'text-black' : 'text-white/30'}`}>E-mail</button>
          <button onClick={() => setMethod('cpf')} className={`relative z-10 flex-1 py-2 text-[10px] font-black uppercase transition-colors duration-300 ${method === 'cpf' ? 'text-black' : 'text-white/30'}`}>CPF</button>
          <button onClick={() => setMethod('phone')} className={`relative z-10 flex-1 py-2 text-[10px] font-black uppercase transition-colors duration-300 ${method === 'phone' ? 'text-black' : 'text-white/30'}`}>Whats</button>
        </div>

        <form onSubmit={handleSuccess} className="space-y-5 transition-all duration-500">
          <div className="min-h-[120px] flex flex-col justify-center gap-4">
            {method === 'email' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-3">
                <input type="email" placeholder="E-MAIL" className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold focus:border-[#A4855D]/40 outline-none transition-all placeholder:text-white/10 uppercase tracking-widest" />
                <input type="password" placeholder="SENHA" className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-4 text-xs font-bold focus:border-[#A4855D]/40 outline-none transition-all placeholder:text-white/10 uppercase tracking-widest" />
              </div>
            )}

            {method === 'cpf' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <input 
                  type="text" 
                  value={cpf}
                  onChange={(e) => handleCPF(e.target.value)}
                  placeholder="000.000.000-00" 
                  className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-5 text-lg font-mono text-center focus:border-[#A4855D]/40 outline-none transition-all placeholder:text-white/10 tracking-widest" 
                />
              </div>
            )}

            {method === 'phone' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => handlePhone(e.target.value)}
                  placeholder="(00) 00000-0000" 
                  className="w-full bg-black/60 border border-white/5 rounded-xl px-5 py-5 text-lg font-mono text-center focus:border-[#A4855D]/40 outline-none transition-all placeholder:text-white/10 tracking-widest" 
                />
              </div>
            )}
          </div>

          <button className="w-full bg-[#A4855D] hover:bg-[#c4a47a] text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 group uppercase text-xs tracking-[0.2em] shadow-xl shadow-[#A4855D]/5 active:scale-95">
            Acessar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-10 text-center">
          <span className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5"></span>
          <span className="relative bg-[#161616] px-4 text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold italic">Lab Connect</span>
        </div>

        {/* Redes Sociais com Hover Fluido */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
            <Chrome size={16} className="text-white/40 group-hover:text-red-500" />
            <span className="text-[10px] font-bold text-white/40 group-hover:text-white uppercase tracking-tighter">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
            <Github size={16} className="text-white/40 group-hover:text-white" />
            <span className="text-[10px] font-bold text-white/40 group-hover:text-white uppercase tracking-tighter">Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;