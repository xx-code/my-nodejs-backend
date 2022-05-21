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