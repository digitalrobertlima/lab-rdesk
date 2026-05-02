# Usa uma imagem leve do Node.js
FROM node:20-slim

# Define onde o código vai morar dentro do container
WORKDIR /app

# Copia os arquivos de dependências (vamos gerar eles em breve)
COPY package*.json ./

# Instala as dependências de forma otimizada
RUN npm install

# Copia o resto do código
COPY . .

# Expõe a porta que o Vite usa por padrão
EXPOSE 5173

# Comando para rodar o servidor em modo desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]