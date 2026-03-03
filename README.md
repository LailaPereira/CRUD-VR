CRUD VR — A-Frame

Projeto web desenvolvido com A-Frame que implementa operações completas de CRUD (Create, Read, Update, Delete) em um ambiente de Realidade Virtual no navegador, com suporte a interação 3D e persistência de dados.

O sistema permite criar, selecionar, modificar e remover objetos 3D interativamente, tanto por botões HTML quanto por botões dentro do ambiente VR.

## Objetivo

Demonstrar, de forma prática e visual, o funcionamento das operações CRUD em um ambiente de Realidade Virtual utilizando tecnologias web modernas, incluindo persistência de dados com LocalStorage.

## Tecnologias Utilizadas

HTML5

JavaScript

A-Frame

Three.js (via A-Frame)

LocalStorage (armazenamento no navegador)

Git & GitHub

📁 Estrutura do Projeto
CRUD-VR/
├── index.html      # Estrutura da cena VR e interface
├── script.js       # Lógica CRUD, renderização e armazenamento
└── README.md       # Documentação do projeto
🧠 Conceito Aplicado (CRUD Simulando HTTP)

O projeto simula operações semelhantes a APIs REST:

POST → Create

GET → Read

PUT → Update

DELETE → Delete

## Funcionalidades Atuais
## Create — Criar Cubo

Adiciona um novo cubo na cena

Cor aleatória

Posição automática organizada horizontalmente

Salva no LocalStorage

## Read — Listar Cubos

Botão Listar Cubos (HTML)

Botão Histórico (VR)

Exibe:

Cor do cubo

Ordem de criação

Painel 3D dentro da cena VR mostra os últimos 8 cubos criados

## Update — Atualizar Cor

Se houver cubo selecionado → altera a cor dele

Se nenhum estiver selecionado → altera o último cubo criado

Cor escolhida aleatoriamente de um mapa de cores nomeadas

## Delete — Remover Cubo

Remove cubo selecionado (se houver)

Caso contrário, remove o último cubo criado

## Seleção de Cubos 

Clique em um cubo para selecioná-lo

Cubo selecionado:

Fica maior (scale 1.2)

Levemente transparente

Clique no chão para desmarcar

## Persistência de Dados

Os cubos são armazenados no LocalStorage

Ao atualizar a página:

Os cubos permanecem na cena

As posições são reorganizadas automaticamente

Cores antigas em hexadecimal são convertidas para nomes amigáveis

## Interface Dupla

O sistema possui dois tipos de controle:

## Botões HTML (modo desktop)

Criar Cubo

Mudar Cor

Deletar Último

Listar Cubos

## Botões 3D dentro do ambiente VR

Criar

Mudar Cor

Deletar

Histórico

Com efeito hover (mudança de cor ao passar o mouse).

## Como Executar o Projeto Localmente
Opção 1 — Servidor Python (Linux recomendado)

No terminal:

cd CRUD-VR
python3 -m http.server 8000

Depois abra no navegador:

http://localhost:8000

## Importante:
Não abra o index.html via file://, pois o A-Frame pode não funcionar corretamente.

Opção 2 — Live Server (VS Code)

Instale a extensão Live Server

Clique com botão direito em index.html

Selecione Open with Live Server

## Deploy Online (GitHub Pages)

Projeto disponível em:

https://lailapereira.github.io/CRUD-VR/

(Pode levar alguns segundos para carregar na primeira vez.)

## Conceitos Trabalhados

Manipulação do DOM

Renderização dinâmica 3D

Eventos em JavaScript

Programação orientada a eventos

Persistência com LocalStorage

Simulação de API REST (CRUD)

Organização automática de layout

Interação 3D com cursor

Versionamento com Git

Deploy com GitHub Pages

## Possíveis Melhorias Futuras

Integração com banco de dados real (API backend)

Animações nos cubos

Arrastar e soltar objetos

Filtro e busca no histórico

Painel VR com paginação

Suporte completo a controles VR (hand tracking)

Modo multiplayer

## Autora

Laila Pereira

GitHub: https://github.com/LailaPereira

Curso: Ciência da Computação
Projeto acadêmico de Realidade Virtual

## Licença

Este projeto é de uso educacional.
