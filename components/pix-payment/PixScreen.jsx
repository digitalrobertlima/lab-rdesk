import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, DollarSign, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const PixScreen = ({ value = 0, onPaymentComplete }) => {
  const [pixValue, setPixValue] = useState(value);
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => setIsGenerated(true);

  const handleCopy = () => {
    navigator.clipboard.writeText("CHAVE-PIX-COPIA-E-COLA-MOCK-RDESK");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#A4855D', '#ffffff', '#22c55e'] // Bronze, Branco e Verde Sucesso
    });
    if (onPaymentComplete) onPaymentComplete();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-[#161616] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#A4855D] to-[#634e32] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-[#A4855D]/20">
            <DollarSign size="{32}" className="text-black"/>
          </div>
          <h2 className="text-xl font-black uppercase tracking-widest">Pix Checkout</h2>
        </div>

        {!isGenerated ? (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <span className="absolute left-4 top-4 text-[#A4855D] font-bold">R$</span>
              <input 
                type="number" 
                value={pixValue}
                onChange={(e) => setPixValue(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-2xl font-mono focus:border-[#A4855D] outline-none transition-all"
                placeholder="0,00"
              />
            </div>
            <button 
              onClick={handleGenerate}
              className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-xs tracking-[0.2em] hover:bg-[#A4855D] transition-all"
            >
              Gerar QR Code
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* QR Code com tamanho controlado e borda elegante */}
            <div className="bg-white p-4 rounded-3xl mx-auto w-64 h-64 flex items-center justify-center shadow-inner">
              <QRCodeSVG value={`pix-payload-${pixValue}`} size={200} />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={handleCopy}
                className="flex items-center justify-center gap-3 w-full bg-black/50 border border-white/5 py-4 rounded-2xl hover:bg-white/5 transition-all group"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-white/40" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  {copied ? "Copiado!" : "Copiar Código"}
                </span>
              </button>

              <button 
                onClick={simulatePayment}
                className="w-full bg-[#A4855D] text-black font-black py-4 rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-lg flex items-center justify-center gap-2"
              >
                Confirmar Pagamento <Sparkles size={14} />
              </button>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-[9px] text-white/20 uppercase tracking-[0.3em]">
          Powered by M.E.S.A. Framework
        </p>
      </div>
    </div>
  );
};

export default PixScreen;