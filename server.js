const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'database.json');

// Middlewares: Permite requisições externas (CORS) e leitura de JSON no corpo (body) da requisição
app.use(cors());
app.use(express.json());

// =========================================================================
// ROTA 1: POST - Salva o relacionamento da localização do usuário com o local
// =========================================================================
app.post('/api/historico', (themeReq, res) => {
  const { userLatitude, userLongitude, ecoestacaoNome, ecoestacaoBairro } = themeReq.body;

  // Validação básica dos dados obrigatórios
  if (!userLatitude || !userLongitude || !ecoestacaoNome) {
    return res.status(400).json({ error: 'Faltam dados obrigatórios (coordenadas do usuário ou nome da ecoestação).' });
  }

  // Cria o novo objeto de registro baseado nos campos que você tem na API
  const novoRegistro = {
    id: Date.now(), // Gera um ID único simples baseado no timestamp
    userLatitude,
    userLongitude,
    ecoestacaoNome,
    ecoestacaoBairro: ecoestacaoBairro || 'Não informado',
    timestamp: new Date().toISOString()
  };

  try {
    // Lê o arquivo JSON existente
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    const historico = JSON.parse(fileData);

    // Adiciona o novo registro na lista
    historico.push(novoRegistro);

    // Salva de volta no arquivo JSON
    fs.writeFileSync(FILE_PATH, JSON.stringify(historico, null, 2));

    // Retorna o registro criado com status 201 (Created)
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
    // Lê os dados salvos no arquivo
    const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
    const historico = JSON.parse(fileData);

    // Retorna a lista completa para o App
    return res.json(historico);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao ler os dados do servidor.' });
  }
});

// Inicializa o servidor na porta configurada
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});