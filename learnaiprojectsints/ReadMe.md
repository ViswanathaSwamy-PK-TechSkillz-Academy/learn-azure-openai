# Learning Azure Open AI by building Projects

This repository contains some sample projects which I am learning from different Video courses

> 1. `OPENAI_API_KEY`

## Basics

```powershell
npm init -y
npm install @azure/openai
npm install dotenv
```

Note: We do not need `dotenv` we are passing the .evn file as part of the script inside package.json file

```json
"scripts": {
    "s1": "node --env-file=.env ./src/index.js"
}
```
