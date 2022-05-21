# step 1
## initialisation
-yarn init ou npm init pour initialiser nodejs
-yarn add express pour ajouter notre module serveur express
-yarn add --dev typescript pour ajouter typscripte si l'on veut
-Creation du fichier tsconfig.json (les donnee du fichier aux premier push)
-Ajouter tslint pour analyser mon code 
-Creation du fichier tslint.json (les donnee du fichier aux premier push)
-Modifier le fichier package.json dans script avec
    "prebuild": "tslint -c tslint.json -p tsconfig.json --fix",
    "build": "tsc",
    "prestart": "npm run build",
    "start": "node .",
-Ajouter src/index.ts et remplire le fichier (less donnee du fichier premier push)
-yarn add --dev @types/node @types/express
-yarn add --dev ts-node nodemon
-Modifier le fichier package.json dans script avec
    "lint": "tslint -c tslint.json -p tsconfig.json --fix",
    "tsc": "tsc",
    "ts": "ts-node src/index.ts",
    "build": "npm-run-all lint tsc ts",
    "dev:start": "npm-run-all build start",
    "dev": "nodemon --watch src -e ts,ejs --exec npm run dev:start",
    "start": "node .",
    "test": "echo \"Error: no test specified\" && exit 1
-Ajouter test suivre instruction sur site web jest
- Installation des modules utiles
    - yarn add dotenv, nous permettra d'ajouter des variable enviroment
    - yarn add passport @types/passport, nous permet d'utiliser passport est un middleware pour les authentication
    - yarn add body-parser @types/body-parser, nous permet d'utiliser le middleware body-parser pour parse les req.body en json 
    - yarn add mongoose @types/mongooses, nous permet d'utiliser la base de donnee mongoose
    - yarn add passport-jwt @types/passport-jwt
    - yarn add bscrypt @types/bscrypt, nous permet de creer des hashcode pour nos mot de passes
    - yarn add jsnowebtoken @types/jsnowebtoken, nous permet de creer des token d'itentification
