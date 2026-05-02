# 📖 Documentação Técnica Detalhada - R-Desk Component Lab

## Índice
1. [Visão Arquitetural](#visão-arquitetural)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Componentes em Detalhe](#componentes-em-detalhe)
4. [API Reference](#api-reference)
5. [Customização Avançada](#customização-avançada)
6. [Deploy em Produção](#deploy-em-produção)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Visão Arquitetural

### Diagrama de Componentes
```
┌─────────────────────────────────────────────────┐
│                 Container App                   │
│                                                 │
│  ┌─────────────┐      ┌─────────────┐           │
│  │  AuthScreen │◄────►│  PixScreen  │           │
│  └─────────────┘      └─────────────┘           │
│          │               │                      │
│          ▼               ▼                      │
│  ┌─────────────┐  ┌─────────────┐               │
│  │   Login     │  │   QR Code   │               │
│  │   Methods   │  │   Generator │               │
│  └─────────────┘  └─────────────┘               │
└─────────────────────────────────────────────────┘
```

### Fluxo de Dados
1. **Auth Flow**: Usuário → Método selecionado → Input mascarado → Validação → Confetti
2. **Pix Flow**: Valor definido → QR Code gerado → Cópia/Pagamento → Confirmação

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos Mínimos
```bash
# Verifique suas versões
node --version    # >= 18.0.0
npm --version     # >= 8.0.0
docker --version  # >= 20.0.0
```

### Setup Completo
```bash
# 1. Clone e navegação
git clone <repository-url>
cd lab-rdesk

# 2. Instalação das dependências
cd components/auth-screen
npm install

# 3. Variáveis de ambiente (opcional)
cp .env.example .env
# Edite .env com suas configurações

# 4. Desenvolvimento
npm run dev

# 5. Build produção
npm run build

# 6. Preview
npm run preview
```

### Configuração Docker Avançada
```bash
# Build com cache otimizado
docker build --build-arg NODE_ENV=production -t auth-lab .

# Executar com volumes para desenvolvimento
docker run -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  auth-lab

# Docker Compose para múltiplos serviços
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 🔧 Componentes em Detalhe

### LoginScreen Component

#### Estrutura do Componente
```jsx
const LoginScreen = ({
  appName = "M.E.S.A. Lab",
  onLogin,
  primaryColor = "#A4855D",
  socialProviders = ['google', 'github'],
  customLogo = null
}) => {
  // Lógica do componente
}
```

#### Métodos de Autenticação
```javascript
// Método CPF - Máscara automática
const handleCPF = (value) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
}

// Método WhatsApp - Máscara BR
const handlePhone = (value) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value.substring(0, 15);
}
```

#### Event Handlers
```javascript
const handleSuccess = (event) => {
  event.preventDefault();
  
  // Disparar confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#A4855D', '#ffffff', '#1C1C1C']
  });
  
  // Callback personalizado
  if (onLogin) {
    onLogin({
      method: currentMethod,
      timestamp: new Date().toISOString(),
      value: inputValue
    });
  }
}
```

### PixScreen Component

#### Geração de QR Code
```jsx
<QRCodeSVG 
  value={`pix://${merchantId}?amount=${pixValue}`}
  size={200}
  level="H" // High error correction
  includeMargin={true}
  imageSettings={{
    src: "/logo.png",
    height: 40,
    width: 40,
    excavate: true
  }}
/>
```

#### Gestão de Estado
```javascript
const [pixState, setPixState] = useState({
  value: initialValue,
  generated: false,
  copied: false,
  paid: false,
  timer: 300 // 5 minutos
});

// Timer de expiração
useEffect(() => {
  if (pixState.generated && !pixState.paid) {
    const timer = setInterval(() => {
      setPixState(prev => ({
        ...prev,
        timer: prev.timer - 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }
}, [pixState.generated, pixState.paid]);
```

---

## 📋 API Reference

### LoginScreen Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appName` | string | "M.E.S.A. Lab" | Nome da aplicação |
| `onLogin` | function | () => {} | Callback no login bem-sucedido |
| `primaryColor` | string | "#A4855D" | Cor primária do tema |
| `socialProviders` | array | ['google', 'github'] | Redes sociais habilitadas |
| `customLogo` | ReactNode | null | Logo customizado |
| `theme` | object | {} | Objeto de customização do tema |
| `validationRules` | object | {} | Regras de validação customizadas |

### PixScreen Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | 0 | Valor da transação |
| `onPaymentComplete` | function | () => {} | Callback no pagamento |
| `merchantName` | string | "Merchant" | Nome do comerciante |
| `merchantId` | string | "mock-id" | ID do comerciante |
| `timeout` | number | 300 | Timeout em segundos |
| `showTimer` | boolean | true | Mostrar contador regressivo |
| `customSuccessMessage` | string | null | Mensagem customizada de sucesso |

### Event Payloads

#### Login Event
```javascript
{
  method: 'email' | 'cpf' | 'phone' | 'social',
  timestamp: '2026-05-02T10:30:00.000Z',
  value: 'user@email.com' | '000.000.000-00' | '(00) 00000-0000',
  provider: 'google' | 'github' | null // apenas para social
}
```

#### Payment Event
```javascript
{
  amount: 250.00,
  currency: 'BRL',
  timestamp: '2026-05-02T10:30:00.000Z',
  method: 'pix',
  status: 'completed',
  transactionId: 'txn_123456'
}
```

---

## 🎨 Customização Avançada

### Tema Customizado
```jsx
// themes/custom-theme.js
export const customTheme = {
  colors: {
    primary: '#2D5BFF',
    secondary: '#FF6B35',
    background: '#0F0F0F',
    surface: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#00FF88'
  },
  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px'
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  }
};

// Uso no componente
<LoginScreen theme={customTheme} />
```

### Componentes Customizados
```jsx
// components/CustomAuthScreen.jsx
import { LoginScreen } from './auth-screen/src/LoginScreen';

const CustomAuthScreen = (props) => {
  return (
    <div className="custom-container">
      <LoginScreen {...props} />
      {/* Elementos customizados adicionais */}
      <div className="custom-footer">
        Suporte: contato@empresa.com
      </div>
    </div>
  );
};
```

### Internacionalização (i18n)
```javascript
// locales/pt-BR.json
{
  "login": {
    "title": "Acesse Sua Conta",
    "emailPlaceholder": "SEU E-MAIL",
    "cpfPlaceholder": "000.000.000-00",
    "success": "Login realizado com sucesso!"
  }
}

// locales/en-US.json
{
  "login": {
    "title": "Access Your Account",
    "emailPlaceholder": "YOUR EMAIL",
    "cpfPlaceholder": "000.000.000-00",
    "success": "Login successful!"
  }
}
```

---

## 🚀 Deploy em Produção

### Configurações de Build
```bash
# Variáveis de ambiente para produção
VITE_APP_NAME="Sua App"
VITE_API_URL="https://api.seudominio.com"
VITE_PIX_MERCHANT_ID="seu-merchant-id"

# Build otimizado
npm run build

# Análise do bundle
npm run build -- --analyze
```

### Docker Production
```dockerfile
# Dockerfile.production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Nginx Configuration
```nginx
# nginx.conf
server {
    listen 80;
    server_name seudominio.com;
    
    location / {
        root /app/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # Compression
    gzip on;
    gzip_types text/css application/javascript;
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://seu-bucket --delete
```

---

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS
```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

#### 2. Fontes não carregando
```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

#### 3. Problemas de Build
```bash
# Limpar cache
npm run clean
rm -rf node_modules package-lock.json
npm install

# Verificar vulnerabilidades
npm audit fix
```

#### 4. Docker Port Already in Use
```bash
# Encontrar processo usando a porta
lsof -i :5173

# Matar processo específico
kill -9 <PID>

# Ou usar porta diferente
docker run -p 5174:5173 auth-lab
```

### Performance Optimization

#### Bundle Analysis
```bash
# Instalar analisador
npm install --save-dev @vitejs/plugin-bundle-analyzer

# Configurar Vite
import { bundleAnalyzer } from '@vitejs/plugin-bundle-analyzer'

export default defineConfig({
  plugins: [
    bundleAnalyzer({
      analyzerMode: 'static'
    })
  ]
})
```

#### Code Splitting
```javascript
// Lazy loading de componentes
const LoginScreen = lazy(() => import('./components/LoginScreen'));
const PixScreen = lazy(() => import('./components/PixScreen'));
```

---

## 📞 Suporte Técnico

### Canais de Suporte
- **GitHub Issues**: Para bugs e feature requests
- **Email**: tech-support@empresa.com
- **Discord**: Comunidade de desenvolvedores
- **Documentação**: docs.empresa.com

### SLA de Resposta
- **Crítico**: 2 horas (24/7)
- **Alta**: 4 horas horário comercial
- **Média**: 8 horas úteis
- **Baixa**: 24 horas úteis

---

## 🔄 Versionamento

### Semantic Versioning
- **MAJOR**: Mudanças incompatíveis com versões anteriores
- **MINOR**: Funcionalidades compatíveis com versões anteriores
- **PATCH**: Correções de bugs compatíveis

### Changelog Automation
```bash
# Conventional commits
npm install -g commitizen
cz init

# Auto changelog
npm install -g standard-version
standard-version
```

---

**📄 Documentação mantida e atualizada pela equipe técnica**
*Última atualização: 02/05/2026*
