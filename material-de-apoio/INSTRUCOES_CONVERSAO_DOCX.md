# 📄 INSTRUÇÕES PARA FORMATAÇÃO ABNT NO WORD

## 🎯 **Como copiar e colar do Markdown para Word com formatação ABNT**

### **Método Simples: Copiar e Colar + Formatação Manual**

#### **Passo 1: Preparar o Documento no Word**
1. **Abrir Microsoft Word** → Documento em branco
2. **Configurar Página:**
   - Layout → Margens → Margens Personalizadas
   - Superior: 3cm | Inferior: 2cm | Esquerda: 3cm | Direita: 2cm
3. **Configurar Fonte Padrão:**
   - Selecionar tudo (Ctrl+A) → Times New Roman 12pt
   - Parágrafo → Espaçamento entre linhas: 1,5

#### **Passo 2: Copiar e Colar o Conteúdo**
1. **Abrir o arquivo .md** no VS Code ou Bloco de Notas
2. **Copiar todo o conteúdo** (Ctrl+A + Ctrl+C)
3. **Colar no Word** (Ctrl+V)
4. **Escolher**: "Manter apenas texto" (remove formatação markdown)

#### **Passo 3: Aplicar Formatação ABNT Manual**

**🔸 Títulos Principais (# no markdown):**
- Selecionar o texto
- MAIÚSCULO, negrito, centralizado
- Espaçamento: 18pt antes, 12pt depois

**🔸 Títulos Secundários (## no markdown):**
- Selecionar o texto  
- MAIÚSCULO, sem negrito, alinhado à esquerda
- Espaçamento: 12pt antes, 6pt depois

**🔸 Títulos Terciários (### no markdown):**
- Primeira letra maiúscula, negrito
- Espaçamento: 6pt antes, 6pt depois

**🔸 Remover símbolos markdown:**
- Buscar e substituir (Ctrl+H):
  - `#` → (remover)
  - `**` → (remover)
  - `*` → (remover)
  - `---` → (remover ou quebra de linha)

---

## 🎨 **Atalhos Úteis no Word para Formatação ABNT**

### **Buscar e Substituir Rápido (Ctrl+H):**
| Procurar | Substituir por | Para que serve |
|----------|---------------|----------------|
| `# ` | *(vazio)* | Remove `#` dos títulos |
| `## ` | *(vazio)* | Remove `##` dos subtítulos |
| `### ` | *(vazio)* | Remove `###` dos sub-subtítulos |
| `**` | *(vazio)* | Remove markdown de negrito |
| `---` | *(quebra de página)* | Transforma `---` em quebra |

### **Formatação Rápida:**
- **Selecionar título** → F4 (repetir última ação)
- **Ctrl+Shift+>** → Aumentar fonte
- **Ctrl+B** → Negrito
- **Ctrl+E** → Centralizar
- **Ctrl+L** → Alinhar à esquerda

### **Estilos Personalizados:**
1. **Criar Estilo "ABNT Título 1":**
   - Formatação → Estilos → Novo Estilo
   - Times New Roman 12pt, MAIÚSCULO, negrito, centralizado
   - Espaçamento: 18pt antes, 12pt depois

2. **Criar Estilo "ABNT Título 2":**
   - Times New Roman 12pt, MAIÚSCULO, alinhado à esquerda
   - Espaçamento: 12pt antes, 6pt depois

3. **Criar Estilo "ABNT Título 3":**
   - Times New Roman 12pt, primeira maiúscula, negrito
   - Espaçamento: 6pt antes, 6pt depois

---

## 📄 **Estrutura ABNT Completa**

### **Elementos Pré-Textuais:**
1. **Capa** (obrigatório)
2. **Folha de Rosto** (obrigatório)
3. **Resumo** (obrigatório)
4. **Sumário** (obrigatório)

### **Elementos Textuais:**
5. **Introdução** (obrigatório)
6. **Desenvolvimento** (obrigatório)
7. **Considerações Finais** (obrigatório)

### **Elementos Pós-Textuais:**
8. **Referências** (obrigatório)
9. **Anexos** (opcional)

---

## ✅ **Checklist Final ABNT**

### **📋 Verificar após formatação:**
- [ ] **Margens**: 3cm (superior/esquerda) | 2cm (inferior/direita)
- [ ] **Fonte**: Times New Roman 12pt em todo o documento
- [ ] **Espaçamento**: 1,5 linhas no texto corrido
- [ ] **Títulos Principais**: MAIÚSCULO, negrito, centralizado
- [ ] **Subtítulos**: MAIÚSCULO, sem negrito, à esquerda
- [ ] **Sub-subtítulos**: Primeira maiúscula, negrito
- [ ] **Numeração**: Páginas no canto superior direito
- [ ] **Quebras**: Página antes de cada seção principal
- [ ] **Sumário**: Links funcionais (Referências → Sumário)
- [ ] **Referências**: Formatação ABNT NBR 6023

### **🔧 Ajustes Finais:**
- **Inserir quebras de página**: Layout → Quebras → Página
- **Criar sumário automático**: Referências → Sumário
- **Numerar páginas**: Inserir → Número da Página → Início da Página → Simples 3
- **Justificar texto**: Selecionar tudo → Ctrl+J
- **Recuar primeira linha**: Parágrafo → Recuo Especial → Primeira linha (1,25cm)

---

## 🎯 **Exemplo Prático de Aplicação**

### **Para o arquivo "Ordem_Apresentacao_Projeto_ABNT.md":**

1. **Copiar conteúdo do .md**
2. **Colar no Word como texto simples**
3. **Aplicar formatação dos títulos:**
   - `# ORDEM DE APRESENTAÇÃO` → **ORDEM DE APRESENTAÇÃO DO PROJETO CYPRESS API** (centralizado, maiúsculo, negrito)
   - `## 1 INTRODUÇÃO` → **1 INTRODUÇÃO** (maiúsculo, negrito, à esquerda)
   - `### 2.1 Princípios` → **2.1 Princípios Norteadores** (primeira maiúscula, negrito)

4. **Inserir elementos obrigatórios:**
   - Capa com título, autor, instituição, data
   - Resumo com palavras-chave
   - Sumário automático

---

## 💡 **Dicas para Economizar Tempo**

### **Ordem de Formatação Recomendada:**
1. **Primeiro**: Configurar margens e fonte do documento todo
2. **Segundo**: Remover símbolos markdown com buscar/substituir
3. **Terceiro**: Formatar títulos (do maior para o menor)
4. **Quarto**: Inserir quebras de página
5. **Quinto**: Criar sumário automático
6. **Sexto**: Inserir numeração de páginas

### **Macros Úteis (se souber usar):**
- Macro para aplicar estilo ABNT automaticamente
- Macro para remover formatação markdown
- Macro para inserir quebras de página em títulos principais

---

**📄 Este arquivo fornece todas as opções para converter arquivos Markdown em documentos DOCX formatados segundo normas ABNT!**