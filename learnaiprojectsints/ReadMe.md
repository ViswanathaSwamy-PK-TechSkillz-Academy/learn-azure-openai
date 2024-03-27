# Learning Azure Open AI by building Projects

This repository contains some sample projects which I am learning from different Video courses

> 1. `OPENAI_API_KEY`

## Basics

**Note:**

> 1. We do not need `dotenv`; as we are passing the .evn file as part of the script inside package.json file

```powershell
npm init -y
npm install @azure/openai
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
