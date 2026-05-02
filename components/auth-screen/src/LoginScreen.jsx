import React, { useState } from 'react';
import { Lock, Mail, Github, Facebook, Chrome, MessageCircle, Smartphone, Fingerprint, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const SocialButton = ({ icon: Icon, label, color }) => (
  <button className="flex items-center justify-center gap-2 w-full py-3 px-4 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
    <Icon size={20} className={color} />
    <span className="text-xs font-medium uppercase tracking-tighter text-white/60 group-hover:text-white">{label}</span>
  </button>
);

const LoginScreen = () => {
  const [method, setMethod] = useState('email'); // email, cpf, phone, social

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans text-white">
      {/* Background Decorativo - Industrial Luxury */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-[#A4855D]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-[#A4855D]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative w-full max-w-[440px] bg-[#161616]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-[#A4855D] to-[#634e32] mb-4 shadow-lg shadow-[#A4855D]/20">
            <Fingerprint size={32} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight uppercase">M.E.S.A. Access</h2>
          <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Selecione seu método de entrada</p>
        </div>

        {/* Seletores de Método */}
        <div className="flex gap-2 mb-8 p-1 bg-black/40 rounded-xl border border-white/5">
          <button onClick={() => setMethod('email')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${method === 'email' ? 'bg-[#A4855D] text-black' : 'text-white/40'}`}>E-mail</button>
          <button onClick={() => setMethod('cpf')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${method === 'cpf' ? 'bg-[#A4855D] text-black' : 'text-white/40'}`}>CPF</button>
          <button onClick={() => setMethod('phone')} className={`flex-1 py-2 text-[10px] uppercase font-bold rounded-lg transition-all ${method === 'phone' ? 'bg-[#A4855D] text-black' : 'text-white/40'}`}>WhatsApp</button>
        </div>

        <form onSubmit={handleSuccess} className="space-y-4">
          {method === 'email' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <input type="email" placeholder="ENDEREÇO DE E-MAIL" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#A4855D]/50 outline-none transition-all placeholder:text-white/20" />
              <input type="password" placeholder="SENHA" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#A4855D]/50 outline-none transition-all placeholder:text-white/20" />
            </div>
          )}

          {method === 'cpf' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <input type="text" placeholder="000.000.000-00" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#A4855D]/50 outline-none transition-all placeholder:text-white/20" />
            </div>
          )}

          {method === 'phone' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <input type="tel" placeholder="(00) 90000-0000" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#A4855D]/50 outline-none transition-all placeholder:text-white/20" />
              <p className="text-[10px] text-white/30 mt-2 text-center">Enviaremos um código via SMS ou WhatsApp</p>
            </div>
          )}

          <button className="w-full bg-[#A4855D] hover:bg-[#c4a47a] text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 group uppercase text-xs tracking-widest shadow-xl shadow-[#A4855D]/10">
            Continuar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="relative my-8 text-center">
          <span className="absolute inset-x-0 top-1/2 h-px bg-white/5"></span>
          <span className="relative bg-[#161616] px-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">Ou acesse com</span>
        </div>

        {/* Grid de Redes Sociais */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton icon={Chrome} label="Google" color="text-red-500" />
          <SocialButton icon={Github} label="GitHub" color="text-white" />
          <SocialButton icon={MessageCircle} label="WhatsApp" color="text-green-500" />
          <SocialButton icon={Facebook} label="Facebook" color="text-blue-500" />
        </div>

        <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-widest">
          Problemas com acesso? <a href="#" className="text-[#A4855D] hover:underline">Suporte R-Desk</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;