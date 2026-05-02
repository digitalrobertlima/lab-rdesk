/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          industrial: {
            dark: '#121212',      // Fundo profundo
            graphite: '#1C1C1C',  // Painéis e cards
            accent: '#A4855D',    // Detalhe em bronze/luxo (estilo Dekton Laurent)
            glass: 'rgba(28, 28, 28, 0.7)',
          }
        },
        backgroundImage: {
          'organic-gradient': 'radial-gradient(circle at top left, #1C1C1C, #121212)',
        }
      },
    },
    plugins: [],
  }