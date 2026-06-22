const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'database.json');

// Garante que o arquivo database.json exista para evitar erros de leitura na primeira execução
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
}

// Middlewares: Permite requisições externas (CORS) e leitura de JSON no corpo (body) da requisição
app.use(cors());
app.use(express.json());

// =========================================================================
// ROTA 1: POST - Salva o relacionamento da localização do usuário com o local
// =========================================================================
app.post('/api/historico', (themeReq, res) => {
  const { usuario, userLatitude, userLongitude, ecoestacaoNome, ecoestacaoBairro } = themeReq.body;

  // Validação básica dos dados obrigatórios
  if (!userLatitude || !userLongitude || !ecoestacaoNome) {
    return res.status(400).json({ error: 'Faltam dados obrigatórios (coordenadas do usuário ou nome da ecoestação).' });
  }

  // Cria o novo objeto de registro baseado nos campos que você tem na API
  const novoRegistro = {
    id: Date.now(), 
    usuario: usuario || 'Anônimo', 
    userLatitude,
    userLongitude,
    ecoestacaoNome,
    ecoestacaoBairro: ecoestacaoBairro || 'Não informado',
    timestamp: new Date().toISOString()
  };

  try {
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    const historico = JSON.parse(fileData);

    historico.push(novoRegistro);

    fs.writeFileSync(FILE_PATH, JSON.stringify(historico, null, 2));

    return res.status(201).json(novoRegistro);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao salvar os dados no servidor.' });
  }
});

// =========================================================================
// ROTA 2: GET - Recupera todo o histórico para exibir em uma tela do App
// =========================================================================
app.get('/api/historico', (req, res) => {
  try {
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    const historico = JSON.parse(fileData);

    return res.json(historico);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao ler os dados do servidor.' });
  }
});

// =========================================================================
// ✨ ROTA 3: DELETE - Limpa o histórico do arquivo JSON
// =========================================================================
app.delete('/api/historico', (req, res) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2));
    return res.status(200).json({ message: 'Histórico esvaziado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao limpar os dados no servidor.' });
  }
});

// =========================================================================
// 🚀 INICIALIZAÇÃO ALTERADA PARA ACEITAR CONEXÕES EXTERNAS (0.0.0.0)
// =========================================================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend acessível na rede local!`);
  console.log(`💻 No PC: http://localhost:${PORT}`);
  console.log(`📱 No celular use: http://192.168.1.203:${PORT}`);
});