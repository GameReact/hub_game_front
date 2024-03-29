<h1 align="center">
  <br>
  <a href="src\assets\logo.png"><img src="src\assets\logo.png" alt="Markdownify" width="200"></a>
  <br>
  Frontend GameHub
  <br>
</h1>

<h4 align="center">Site de jeux vidéo <a href="http://gamehub.io" target="_blank">Lien</a>.</h4>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![MaterialUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![ESLINT](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![PRETTIER](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)

<p align="center">
    Sommaire
</p>
<p align="center">
  <a href="#présentation">Présentation</a> •
  <a href="#installation">Installation</a> •
  <a href="#libraires-utilisées">Libraires utilisées</a> •
  <a href="#assurance-de-la-qualité-du-code">Qualité du code</a> •
  <a href="#plugins-conseillés">Plugins conseillés</a> •
  <a href="#license">License</a>
</p>

## Présentation

Frontend GameHub, est un site web qui répertorie nos jeux vidéos.

Il est développé en ReactJS.

Il possède pour le moment de 2 jeux : Le jeux de morpion et le jeux du pays

![Presentation](./src/assets/presentation.png)

## Installation

- Télécharger NodeJs

- Cloner le projet

```shell
git clone https://github.com/GameReact/hub_game_front.git
cd hub_game_front
```

- Installer les packages

```shell
npm install
```

- Lancer le projet

```shell
npm start
```

## Libraires utilisées

- Three JS : Pour la 3D
- React Router : Pour la navigation
- Material UI : Pour les composants
- Mantine : Pour l'UI des composants
- ChartJS : Pour les graphiques
- Axios : Pour les requêtes HTTP

## Arborescence choisis

- Assets : ce dossier contient les fichiers statiques tels que les images, les polices et les fichiers de configuration.

- Components : ce dossier contient les composants React réutilisables, tels que les boutons, les menus et les formulaires.

- Hooks : ce dossier contient les hooks React réutilisables, tels que useState, useEffect et useContext.

- Interfaces : ce dossier contient les typescript interfaces pour définir les types de données dans l'application.

- Pages : ce dossier contient les pages principales de l'application, qui sont composées de composants et sont utilisées pour afficher différentes vues de l'application.

- Store : ce dossier contient les fichiers de gestion de l'état de l'application tels que Redux.

- Styles : ce dossier contient les fichiers de style globaux tels que les fichiers CSS ou SCSS.

- Theme : ce dossier contient les fichiers de configuration pour le thème de l'application tels que les couleurs, les polices et les styles.

## Assurance de la qualité du code

Des mesures ont été recommandées pour assurer la qualité optimale du code et faciliter son maintien. Celles-ci incluent :

- Ajout de commentaires clairs et concis au code, ce qui aidera les développeurs à comprendre son fonctionnement et à le maintenir en cas de besoin.

- Utilisation d'un Linter comme Eslint pour vérifier la qualité du code et l'adapter aux standards de codage, ce qui permettra de corriger les erreurs de syntaxe et de formatage et d'améliorer la qualité du code.

- Formatage du code avec Prettier pour le rendre plus lisible, ce qui aidera les développeurs à comprendre et à maintenir le code plus facilement.

## Plugins conseillés

Le Linter Eslint et le formateur Prettier sont des outils très utiles pour assurer la qualité du code et faciliter son maintien. Ils peuvent être installés dans votre éditeur de code préféré pour vous aider à détecter les erreurs de syntaxe et de formatage et à les corriger automatiquement.
