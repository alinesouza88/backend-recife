# ♻️ Backend - Ecoestações e Econúcleos do Recife

Este repositório contém o backend (API REST) desenvolvido para o aplicativo mobile de gerenciamento e histórico de visitas às Ecoestações e Econúcleos da Cidade do Recife. O projeto faz parte da avaliação final da disciplina de Desenvolvimento de App Mobile Individual.

---

## 🧑‍💻 Autor
- **Nome Completo:** ALINE SOUZA SILVA
- **Status do Projeto:** Concluído / Pronto para Avaliação

---

## 🎯 Objetivo do Backend

O objetivo principal deste servidor é servir como uma camada de persistência para o aplicativo móvel. Ele recebe as coordenadas geográficas do usuário (latitude e longitude) capturadas via GPS e as associa à Ecoestação do Recife selecionada na interface do aplicativo, gravando esses dados em um banco de dados local em formato JSON.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (Ambiente de execução JavaScript)
- **Express** (Framework web para criação das rotas)
- **CORS** (Mecanismo para permitir que o app mobile consuma a API com segurança)
- **Nodemon** (Ferramenta de desenvolvimento para reiniciar o servidor automaticamente)
- **FS (File System)** (Módulo nativo para persistência de dados em arquivo local JSON)

---

## 🛣️ Rotas da API

Conforme exigido nos requisitos do projeto, a API disponibiliza duas rotas principais para manipulação dos dados:

### 1. Registrar Visita / Check-in
- **Rota:** `/api/historico`
- **Método:** `POST`
- **Descrição:** Recebe os dados de geolocalização do usuário e as informações da Ecoestação visitada e armazena no arquivo `database.json`.
- **Formato do Corpo da Requisição (JSON):**
```json
{
  "userLatitude": -8.05428,
  "userLongitude": -34.8813,
  "ecoestacaoNome": "Ecoestação Graças",
  "ecoestacaoBairro": "Graças"
}