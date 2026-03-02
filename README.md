# CRUD VR — A-Frame

Projeto web desenvolvido com **A-Frame** que implementa operações básicas de **CRUD (Create, Read, Update, Delete)** em um ambiente de Realidade Virtual no navegador.

Este projeto permite criar, modificar e remover objetos 3D interativamente através de botões na interface.

## Objetivo

Demonstrar, de forma prática e visual, o funcionamento das operações CRUD em um ambiente de Realidade Virtual utilizando tecnologias web.

## Tecnologias utilizadas

* HTML5
* JavaScript
* A-Frame
* Three.js (via A-Frame)
* Git & GitHub

## Estrutura do projeto

```
CRUD-VR/
├── index.html      # Estrutura da cena VR
├── script.js       # Lógica dos botões e manipulação dos objetos
└── README.md       # Documentação do projeto
```

## Funcionalidades

O sistema possui três ações principais:

### Criar Cubo (Create)

* Adiciona um novo cubo na cena VR.

### Mudar Cor (Update)

* Altera a cor do último cubo criado.

### Deletar Último (Delete)

* Remove o último cubo adicionado à cena.

## Como executar o projeto localmente

### Opção 1 — Servidor Python (Linux recomendado)

No terminal:

```bash
cd CRUD-VR
python3 -m http.server 8000
```

Depois abra no navegador:

```
http://localhost:8000
```

**Importante:** Não abra o `index.html` via `file://`, pois o A-Frame pode não funcionar corretamente.

### Opção 2 — Live Server (VS Code)

1. Instale a extensão **Live Server**
2. Clique com o botão direito em `index.html`
3. Selecione **Open with Live Server**

## Deploy online (GitHub Pages)

O projeto está disponível em:

```
https://lailapereira.github.io/CRUD-VR/
```

*(Pode levar alguns segundos para carregar na primeira vez.)*

## Conceitos aplicados

* Manipulação do DOM
* Eventos em JavaScript
* Programação orientada a eventos
* Fundamentos de Realidade Virtual Web
* Operações CRUD
* Versionamento com Git

## Possíveis melhorias futuras

* Adicionar interface VR interativa (raycaster)
* Permitir selecionar cubos específicos
* Adicionar animações
* Implementar banco de dados ou LocalStorage
* Melhorar a interface visual
* Suporte a controles VR

## Autora

**Laila Pereira**

* GitHub: https://github.com/LailaPereira
* Curso: Ciência da Computação
* Projeto acadêmico de Realidade Virtual

## Licença

Este projeto é de uso educacional.
