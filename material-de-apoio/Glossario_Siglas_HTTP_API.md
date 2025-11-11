# 📚 Glossário de Siglas e Termos Técnicos - HTTP e API

## 🌐 **Protocolos e Comunicação Web**

### **HTTP - HyperText Transfer Protocol**
- **Português:** Protocolo de Transferência de Hipertexto
- **Definição:** Protocolo de comunicação usado para transferir dados na web entre cliente (navegador/aplicação) e servidor

### **HTTPS - HyperText Transfer Protocol Secure**
- **Português:** Protocolo de Transferência de Hipertexto Seguro
- **Definição:** Versão segura do HTTP com criptografia SSL/TLS

### **SSL - Secure Sockets Layer**
- **Português:** Camada de Sockets Segura
- **Definição:** Protocolo de segurança para criptografar dados na internet

### **TLS - Transport Layer Security**
- **Português:** Segurança da Camada de Transporte
- **Definição:** Sucessor do SSL, protocolo de segurança mais moderno

---

## 🔄 **Métodos HTTP (Verbos)**

### **GET**
- **Português:** Obter/Buscar
- **Definição:** Solicita dados do servidor (apenas leitura)
- **Exemplo:** Consultar informações de frete

### **POST**
- **Português:** Enviar/Postar
- **Definição:** Envia dados para o servidor criar um novo recurso
- **Exemplo:** Calcular frete enviando dados de CEP

### **PUT**
- **Português:** Colocar/Atualizar
- **Definição:** Atualiza completamente um recurso existente
- **Exemplo:** Atualizar dados completos de um produto

### **PATCH**
- **Português:** Corrigir/Atualizar Parcialmente
- **Definição:** Atualiza parcialmente um recurso existente
- **Exemplo:** Alterar apenas o preço de um produto

### **DELETE**
- **Português:** Deletar/Excluir
- **Definição:** Remove um recurso do servidor
- **Exemplo:** Excluir um produto do catálogo

### **HEAD**
- **Português:** Cabeçalho
- **Definição:** Igual ao GET, mas retorna apenas os cabeçalhos HTTP
- **Exemplo:** Verificar se um recurso existe sem baixar o conteúdo

### **OPTIONS**
- **Português:** Opções
- **Definição:** Consulta quais métodos são permitidos para um recurso
- **Exemplo:** Verificar se PUT e DELETE são permitidos

---

## 📊 **Códigos de Status HTTP**

### **Códigos 2xx - Sucesso**
- **200 OK** - Requisição processada com sucesso
- **201 Created** - Recurso criado com sucesso
- **202 Accepted** - Requisição aceita para processamento
- **204 No Content** - Sucesso, mas sem conteúdo na resposta

### **Códigos 4xx - Erro do Cliente**
- **400 Bad Request** - Requisição inválida
- **401 Unauthorized** - Não autenticado
- **403 Forbidden** - Não autorizado
- **404 Not Found** - Recurso não encontrado
- **405 Method Not Allowed** - Método não permitido
- **422 Unprocessable Entity** - Dados inválidos

### **Códigos 5xx - Erro do Servidor**
- **500 Internal Server Error** - Erro interno do servidor
- **502 Bad Gateway** - Gateway inválido
- **503 Service Unavailable** - Serviço indisponível
- **504 Gateway Timeout** - Timeout do gateway

---

## 🏗️ **Arquitetura e APIs**

### **API - Application Programming Interface**
- **Português:** Interface de Programação de Aplicações
- **Definição:** Conjunto de regras para comunicação entre sistemas

### **REST - Representational State Transfer**
- **Português:** Transferência de Estado Representacional
- **Definição:** Estilo arquitetural para APIs web usando HTTP

### **RESTful**
- **Português:** Que segue os princípios REST
- **Definição:** API que implementa corretamente os princípios REST

### **JSON - JavaScript Object Notation**
- **Português:** Notação de Objeto JavaScript
- **Definição:** Formato de dados leve para troca de informações

### **XML - eXtensible Markup Language**
- **Português:** Linguagem de Marcação Extensível
- **Definição:** Formato de dados estruturado (anterior ao JSON)

### **URL - Uniform Resource Locator**
- **Português:** Localizador Uniforme de Recursos
- **Definição:** Endereço completo de um recurso na web

### **URI - Uniform Resource Identifier**
- **Português:** Identificador Uniforme de Recursos
- **Definição:** Identificador único de um recurso (mais genérico que URL)

### **Endpoint**
- **Português:** Ponto de Acesso
- **Definição:** URL específica onde uma API pode ser acessada

---

## 🔐 **Autenticação e Segurança**

### **JWT - JSON Web Token**
- **Português:** Token Web JSON
- **Definição:** Padrão para tokens de autenticação seguros

### **OAuth - Open Authorization**
- **Português:** Autorização Aberta
- **Definição:** Protocolo de autorização para acesso a recursos

### **Bearer Token**
- **Português:** Token Portador
- **Definição:** Tipo de token de acesso enviado no cabeçalho Authorization

### **Basic Auth**
- **Português:** Autenticação Básica
- **Definição:** Método simples usando usuário e senha codificados em Base64

### **API Key**
- **Português:** Chave de API
- **Definição:** Identificador único para autenticar requisições à API

---

## 🌐 **Tecnologias Web e Redes**

### **DNS - Domain Name System**
- **Português:** Sistema de Nomes de Domínio
- **Definição:** Sistema que traduz nomes de domínio para endereços IP

### **IP - Internet Protocol**
- **Português:** Protocolo de Internet
- **Definição:** Protocolo para endereçamento e roteamento na internet

### **TCP - Transmission Control Protocol**
- **Português:** Protocolo de Controle de Transmissão
- **Definição:** Protocolo confiável para transmissão de dados

### **UDP - User Datagram Protocol**
- **Português:** Protocolo de Datagrama do Usuário
- **Definição:** Protocolo rápido mas não confiável para transmissão

### **CDN - Content Delivery Network**
- **Português:** Rede de Entrega de Conteúdo
- **Definição:** Rede distribuída para entregar conteúdo web rapidamente

---

## 🧪 **Termos de Testes e Automação**

### **E2E - End-to-End**
- **Português:** Ponta a Ponta
- **Definição:** Testes que validam fluxos completos do sistema

### **CI/CD - Continuous Integration/Continuous Deployment**
- **Português:** Integração Contínua/Entrega Contínua
- **Definição:** Práticas de automação para integrar e entregar código

### **Mock**
- **Português:** Simulação/Imitação
- **Definição:** Objeto falso que simula comportamento de componente real

### **Stub**
- **Português:** Esboço/Substituto
- **Definição:** Implementação simplificada de uma função ou método

### **Fixture**
- **Português:** Estrutura Fixa/Massa de Dados
- **Definição:** Dados de teste padronizados e reutilizáveis

---

## 💾 **Banco de Dados e Armazenamento**

### **SQL - Structured Query Language**
- **Português:** Linguagem de Consulta Estruturada
- **Definição:** Linguagem para gerenciar bancos de dados relacionais

### **NoSQL - Not Only SQL**
- **Português:** Não Apenas SQL
- **Definição:** Bancos de dados não relacionais

### **CRUD - Create, Read, Update, Delete**
- **Português:** Criar, Ler, Atualizar, Deletar
- **Definição:** Operações básicas de manipulação de dados

---

## 🏢 **Arquitetura de Sistemas**

### **SaaS - Software as a Service**
- **Português:** Software como Serviço
- **Definição:** Software distribuído via internet (nuvem)

### **PaaS - Platform as a Service**
- **Português:** Plataforma como Serviço
- **Definição:** Plataforma de desenvolvimento na nuvem

### **IaaS - Infrastructure as a Service**
- **Português:** Infraestrutura como Serviço
- **Definição:** Recursos de infraestrutura na nuvem

### **SOA - Service-Oriented Architecture**
- **Português:** Arquitetura Orientada a Serviços
- **Definição:** Arquitetura baseada em serviços independentes

### **Microservices**
- **Português:** Microsserviços
- **Definição:** Arquitetura com serviços pequenos e independentes

---

## 📊 **Formatos e Padrões**

### **CSV - Comma-Separated Values**
- **Português:** Valores Separados por Vírgula
- **Definição:** Formato simples para dados tabulares

### **YAML - YAML Ain't Markup Language**
- **Português:** YAML Não é Linguagem de Marcação
- **Definição:** Formato de serialização de dados legível por humanos

### **Base64**
- **Português:** Base 64
- **Definição:** Codificação para representar dados binários em texto

### **UTF-8 - Unicode Transformation Format 8-bit**
- **Português:** Formato de Transformação Unicode 8 bits
- **Definição:** Codificação de caracteres padrão para texto

---

## 🎯 **Métricas e Performance**

### **QPS - Queries Per Second**
- **Português:** Consultas Por Segundo
- **Definição:** Métrica de performance para requisições

### **TPS - Transactions Per Second**
- **Português:** Transações Por Segundo
- **Definição:** Métrica de throughput do sistema

### **RPM - Requests Per Minute**
- **Português:** Requisições Por Minuto
- **Definição:** Métrica de volume de requisições

### **SLA - Service Level Agreement**
- **Português:** Acordo de Nível de Serviço
- **Definição:** Contrato definindo níveis de qualidade esperados

### **SLO - Service Level Objective**
- **Português:** Objetivo de Nível de Serviço
- **Definição:** Meta específica de performance ou disponibilidade

---

## 🔧 **Ferramentas e Tecnologias do Projeto**

### **npm - Node Package Manager**
- **Português:** Gerenciador de Pacotes do Node
- **Definição:** Ferramenta para gerenciar dependências JavaScript

### **Node.js**
- **Português:** Node.js (nome próprio)
- **Definição:** Runtime JavaScript para execução server-side

### **GitHub Actions**
- **Português:** Ações do GitHub
- **Definição:** Plataforma de CI/CD integrada ao GitHub

### **Cypress**
- **Português:** Cypress (nome próprio)
- **Definição:** Framework de testes end-to-end para aplicações web

---

## 📝 **Dicas de Pronunciação**

### **Termos em Inglês Comuns:**
- **API** - Pronuncia-se "éi-pi-ái"
- **JSON** - Pronuncia-se "jeison"
- **HTTP** - Pronuncia-se "éich-ti-ti-pi"
- **URL** - Pronuncia-se "iú-ar-él"
- **REST** - Pronuncia-se "rést"
- **CRUD** - Pronuncia-se "crúd"
- **Mock** - Pronuncia-se "móc"
- **Endpoint** - Pronuncia-se "énd-point"
