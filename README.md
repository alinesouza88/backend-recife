# 🌐 EcoRecife - Servidor Backend (Node.js & Express)

Este é o servidor backend do ecossistema **EcoRecife**, construído em **Node.js** com a biblioteca **Express**. A principal função deste servidor é expor uma API RESTful para gerenciar e persistir fisicamente os dados de check-in enviados pelo aplicativo mobile, amarrando a identidade do usuário às coordenadas coletadas pelo GPS.

---

## 📋 Critérios de Avaliação Atendidos

* **Criação de API RESTful:** Disponibilização de rotas padronizadas usando os métodos HTTP corretos para cada operação.
* **Mapeamento e Relacionamento de Dados:** Ingestão de dados contendo o Usuário, o Local vindo da API governamental e a Geolocalização do dispositivo.
* **Persistência de Dados em Disco:** Armazenamento durável das informações em um arquivo físico JSON utilizando o módulo nativo `fs` (File System) do Node.js, garantindo que os dados não sumam se o servidor reiniciar.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução JavaScript no servidor)
* **Express** (Framework para criação de rotas e APIs)
* **Cors** (Middleware para permitir que o aplicativo mobile acesse a API sem bloqueios de segurança)
* **Fs (File System)** (Módulo nativo para ler e escrever arquivos no disco)

---

## 🔍 Estrutura do Código e Mapeamento de Linhas (`index.js`)

Para facilitar a correção da prova, os blocos principais exigidos na grade de avaliação estão localizados nas seguintes linhas do arquivo:

### 1. Rota 1: POST - Ingestão e Relacionamento de Dados
* **Linhas 21 a 35:** O endpoint `app.post('/api/historico')` recebe o sinal de check-in vindo do celular. A linha 23 usa a desestruturação para ler o `themeReq.body` e capturar o pacote enviado. É aqui que o backend amarra e cria o relacionamento entre o nome de quem logou (`usuario`), as coordenadas coletadas pelo hardware do GPS e o nome da ecoestação.

### 2. Mecanismo de Persistência em Disco (Escrita Física)
* **Linhas 44 a 50:** Localizado dentro do bloco `try` da rota POST. As linhas 44 e 45 abrem o arquivo físico local `database.json`, convertem o texto salvo para uma lista legível usando `JSON.parse` e adicionam o novo check-in. Na linha 50, o comando `fs.writeFileSync` grava a lista atualizada de volta no disco rígido, garantindo que os dados fiquem salvos permanentemente.

### 3. Rota 2: GET - Recuperação do Histórico para o App
* **Linhas 61 a 68:** O endpoint `app.get('/api/historico')` cumpre a exigência de buscar os dados salvos para exibi-los no aplicativo. A linha 64 faz a leitura síncrona do arquivo físico em disco e a linha 68 devolve a coleção completa de check-ins formatada de volta para o celular através do `return res.json(historico)`.

### 4. Rota Extra: DELETE - Limpeza de Histórico ao Sair
* **Linhas 78 a 81:** Endpoint criado para suportar a função de privacidade do aplicativo. Quando o usuário clica em "Sair" no celular, esta rota intercepta o comando e a linha 81 usa o `fs.writeFileSync` para gravar uma lista completamente vazia `[]` por cima do arquivo, limpando todo o banco de dados instantaneamente.

---

## 🚀 Como Executar o Servidor Backend

1. Instale as dependências na pasta do backend:
   ```bash
   npm install
Inicie o servidor localmente:

Bash
node index.js
(Ou node server.js, dependendo do nome do seu arquivo principal).

O servidor estará rodando e pronto para receber requisições em: http://localhost:3000