# Learning Azure Open AI by building Projects

This repository contains some sample projects which I am learning from different Video courses

> 1. `OPENAI_API_KEY`

## Basic Chat App

```powershell
npm init -y
tsc --init
npm i -D typescript ts-node @types/node
npm install @azure/openai tiktoken
```

## Basics

**Note:**

> 1. We do not need `dotenv`; as we are passing the .evn file as part of the script inside package.json file

```powershell
npm init -y
npm install @azure/openai tiktoken
npm install dotenv
npm i -D typescript ts-node @types/node

npm install -g typescript
tsc --init
```

## package.json

```json
"type": "module",
"scripts": {
    "s1": "node --env-file=.env ./src/index.js"
},
```

## Encoding

Byte Pair Encoding (BPE) and WordPiece encoding are both subword tokenization techniques commonly used in natural language processing tasks, particularly in neural language models like BERT and GPT.

1. **Byte Pair Encoding (BPE)**:

   - BPE is a data compression technique originally proposed by Sennrich et al. (2016) for machine translation. It has since been widely adopted in NLP tasks.

   - In BPE, the basic idea is to iteratively merge the most frequent pairs of characters or bytes in a corpus. This merging process gradually builds a vocabulary of subword units, where each unit represents a sequence of characters or bytes.

   - By breaking words into smaller subword units, BPE can handle unknown words and rare words more effectively, allowing models to generalize better and improve performance on various tasks.

2. **WordPiece Encoding**:

   - WordPiece encoding is a variant of BPE introduced by Google as part of the BERT model.

   - Similar to BPE, WordPiece also iteratively merges subword units based on frequency, but it differs in that it starts with a predefined vocabulary of whole words.

   - During training, WordPiece may split words into smaller subword units if doing so improves the model's performance. This flexibility allows WordPiece to handle rare and out-of-vocabulary words effectively while maintaining compatibility with a predefined vocabulary.

Both BPE and WordPiece encoding are widely used in state-of-the-art NLP models and have proven effective in tasks such as machine translation, text classification, and language modeling. The choice between them often depends on factors such as the specific task, dataset characteristics, and model architecture.
