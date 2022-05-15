# Backend-Challenge----2022---Covid-Daily-Cases
This is a challenge by Coodesh

COVID Daily Cases - API

Este é um REST Api que exibe o histórico de casos de COVID no mundo registrado pela Kaggle (https://www.kaggle.com/datasets/yamqwe/omicron-covid19-variant-daily-cases).

Línguagens e Frameworks utilizados durante este desafio:

-Node.js
-Express.js
-MongoDB
-Mongoose
-dotenv
-express-async-handler

Instruções de instalação:

1) Clone o repositório;
2) Instale as dependencias e módulos: "npm install"
3) Crie um banco de dados grátis no MongoDB usando Atlas: https://www.mongodb.com/cloud/atlas ou utilize um banco de dados já existente
4) Insira os dados disponibilizados:
"mongoimport --uri mongodb+srv://<USER>:<PASSWORD>@cluster1.m1su7.mongodb.net/<DATABASE> --collection <COLLECTION> --type <FILETYPE> --headerline --file <FILENAME>"
6) Inicie o servidor: "npm run server"

Instruções de uso:
  
  - [GET]"/": Nome do API;
  - [GET]"/dates": Lista de datas disponíveis para consulta;
  - [GET]"/cases/:date/cumulative": número cumulativo de casos, agrupados por país e separado por registro de variante;
  - [GET]"/cases/:date/count": Lista de registro de casos de variantes por dia, agrupado por país
  
 This is a challenge by Coodesh

