# P7_social_network
Base de données Mysql
mysql -u root -p # remplacer root par votre nom d'utilisateur, puis saisir le mot de passe
 Créer une nouvelle base
CREATE DATABASE social_network CHARACTER SET 'utf8'; -- Remplacer "social_network" par le nom souhaité
Créer un fichier .env
Renseigner votre database dans le .env ainsi que votre token secret
DATABASE_URL="**********"
MY_TOKEN = "***********"

Backend : 
cd backend # Aller dans le dossier "backend"
npm install # Installer les dépendances
nodemon ou node server # lancer le backend

cd frontend # Aller dans le dossier "frontend"
npm install # Installer les dépendances
npm run serve # lancer le frontend