# 🎬 Movie App (React + Vite + TMDB)

Application React (Vite) qui affiche des films populaires via l’API TMDB, avec page détail, wishlist, pagination et films similaires.

## ✅ Prérequis

- Node.js (version récente recommandée)
- Une clé API TMDB : https://www.themoviedb.org/

## 🚀 Installation

### 1) Cloner le projet

```bash
git clone <URL_DU_REPO>
cd <NOM_DU_DOSSIER>
```

### 2) Installer les dépendances

```bash
npm install
```

### 3) Configurer l’environnement (.env)

Créer un fichier `.env` à partir du template :

```bash
cp .env.template .env
```

Puis dans `.env`, ajouter la clé TMDB (important : préfixe Vite) :

```env
VITE_API_KEY=YOUR_TMDB_API_KEY
```

➡️ Exemple de `.env.template` :

```env
VITE_API_KEY=
```

> ⚠️ Ne pas commit le `.env` (il doit être dans `.gitignore`).

### 4) Lancer l’application

```bash
npm run dev
```

L’app sera accessible à l’adresse affichée dans le terminal (souvent `http://localhost:5173`).

## 📦 Scripts utiles

```bash
npm run dev       # lancer en dev
npm run build     # build production
npm run preview   # preview du build
```

## ✨ Fonctionnalités

- Liste des films populaires (20 films par page) + pagination
- Détail d’un film (infos, acteurs)
- Films similaires
- Wishlist (ajout / retrait + persistance localStorage)
- Navigation via react-router-dom

## 🗂️ Stack

- React + Vite
- react-router
- API: The Movie Database (TMDB)
