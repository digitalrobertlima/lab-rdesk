import React from 'react';
import LoginScreen from './LoginScreen';
import confetti from 'canvas-confetti';

function App() {
  const handleLoginSuccess = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A4855D', '#ffffff', '#1C1C1C']
    });
    console.log("Login efetuado com sucesso!");
  };

  return (
    <LoginScreen 
      appName="M.E.S.A. Lab" 
      onLogin={handleLoginSuccess}
    />
  );
}

export default App;