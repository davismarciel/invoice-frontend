# Sistema de Nota Fiscal - Frontend Angular

Este é o frontend do sistema de nota fiscal, desenvolvido em Angular para interagir com os microserviços de Inventory e Invoice.

## 🚀 Funcionalidades

### 📦 Gerenciamento de Produtos
- ✅ Criar novos produtos
- ✅ Listar produtos cadastrados
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Visualizar saldo em tempo real

### 📄 Gerenciamento de Notas Fiscais
- ✅ Criar notas fiscais com múltiplos itens
- ✅ Listar todas as notas fiscais
- ✅ Processar notas fiscais (baixa de estoque)
- ✅ Visualizar status das notas (Aberta, Processando, Fechada, Falha)
- ✅ Cálculo automático de totais

## 🛠️ Tecnologias Utilizadas

- **Angular 18** - Framework frontend
- **TypeScript** - Linguagem de programação
- **Angular HttpClient** - Comunicação com APIs
- **CSS3** - Estilização responsiva
- **Docker** - Containerização
- **Nginx** - Servidor web

## 🏗️ Arquitetura

O frontend se comunica com dois microserviços:

```
Frontend Angular
├── Inventory Service (Golang) - Port 8081
│   ├── GET /api/v1/products
│   ├── POST /api/v1/products
│   ├── PUT /api/v1/products/:id
│   └── DELETE /api/v1/products/:id
└── Invoice Service (.NET) - Port 8080
    ├── GET /api/invoice
    ├── POST /api/invoice
    ├── GET /api/invoice/:id
    └── POST /api/invoice/:id/process
```

## 🚀 Como Executar

### Desenvolvimento Local

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo desenvolvimento:**
```bash
ng serve
```

3. **Acessar a aplicação:**
```
http://localhost:4200
```

### Docker

1. **Build e execução:**
```bash
docker-compose up --build
```

2. **Acessar a aplicação:**
```
http://localhost:4200
```

## 📱 Interface do Usuário

### Aba Produtos
- **Formulário de criação** com campos: Nome, Descrição, Saldo, Preço
- **Lista de produtos** com informações completas
- **Ações**: Editar, Deletar produtos
- **Feedback visual** para operações

### Aba Notas Fiscais
- **Formulário de criação** com seleção de produtos
- **Adição de itens** com quantidade e preço
- **Cálculo automático** de totais
- **Processamento** com feedback de status
- **Visualização** de histórico de notas

## 🎨 Design

- **Design responsivo** para desktop e mobile
- **Interface moderna** com gradientes e sombras
- **Feedback visual** para ações do usuário
- **Navegação por abas** intuitiva
- **Cores e status** para diferentes estados

## 🔧 Configuração

### URLs dos Serviços

Os serviços são configurados nos arquivos de serviço:

- **Inventory Service**: `http://localhost:8081`
- **Invoice Service**: `http://localhost:8080`

### CORS

O frontend está configurado para fazer requisições cross-origin para os microserviços.

## 📊 Fluxo de Trabalho

1. **Criar Produtos** → Cadastrar produtos no sistema
2. **Criar Nota Fiscal** → Adicionar itens à nota
3. **Processar Nota** → Baixar estoque e fechar nota
4. **Verificar Resultado** → Confirmar processamento

## 🧪 Testando o Sistema

1. **Acesse** `http://localhost:4200`
2. **Aba Produtos**: Crie alguns produtos
3. **Aba Notas Fiscais**: Crie uma nota com os produtos
4. **Processe** a nota para baixar o estoque
5. **Verifique** o saldo atualizado dos produtos

## 📝 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── product/
│   │   │   ├── product.component.ts
│   │   │   ├── product.component.html
│   │   │   └── product.component.css
│   │   └── invoice/
│   │       ├── invoice.component.ts
│   │       ├── invoice.component.html
│   │       └── invoice.component.css
│   ├── models/
│   │   ├── product.model.ts
│   │   └── invoice.model.ts
│   ├── services/
│   │   ├── product.service.ts
│   │   └── invoice.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.css
├── main.ts
└── index.html
```

## 🔍 Monitoramento

- **Logs de requisições** no console do navegador
- **Feedback visual** para todas as operações
- **Tratamento de erros** com mensagens claras
- **Validação** de formulários