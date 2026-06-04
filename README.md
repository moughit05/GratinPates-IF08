# Projet IF08 - Gratin de Pâtes

![Status](https://img.shields.io/badge/Status-En%20D%C3%A9veloppement-orange)
![Tech](https://img.shields.io/badge/Tech-HTML5%20%2F%20CSS3%20%2F%20JavaScript-blue)
![API](https://img.shields.io/badge/API-OpenFoodFacts-green)

## Description

Ce projet consiste à réaliser un site web statique autour d’une recette de gratin de pâtes.

Le site utilise HTML, CSS, JavaScript et l’API OpenFoodFacts afin d’afficher dynamiquement les ingrédients, les informations nutritionnelles et le Nutri-Score moyen de la recette.

---

## Recette officielle

https://www.marmiton.org/

---

## Accès au site

Le site est accessible à l’adresse suivante :

https://www.orkidees.com/IF08/gratinpates/

---

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- JSON
- OpenFoodFacts API

---

## Structure du projet

```txt
GratinPates-IF08/

index.html
README.md
ingredients.json
script.js
style.css

.vscode/
```

### Description des fichiers

- `index.html` : page principale du site
- `style.css` : mise en forme et responsive design
- `script.js` : récupération des données et affichage dynamique
- `ingredients.json` : liste des ingrédients et informations associées
- `README.md` : documentation du projet

---

## Installation et utilisation

### Cloner le projet

```bash
git clone https://github.com/moughit05/GratinPates-IF08.git
```

### Accéder au dossier

```bash
cd GratinPates-IF08
```

### Lancer le projet

Ouvrir le fichier :

```txt
index.html
```

dans un navigateur web.

Vous pouvez également utiliser l'extension **Live Server** sur Visual Studio Code.

---

## Fonctionnalités

- Affichage dynamique des ingrédients
- Affichage des images produits
- Affichage des Nutri-Scores
- Calcul du Nutri-Score moyen de la recette
- Responsive design (mobile et ordinateur)
- Intégration de l’API OpenFoodFacts

---

## Organisation du travail

- Chaque membre travaille sur sa partie du projet
- Tester les modifications avant chaque push
- Respecter la structure existante du projet
- Prévenir l'équipe avant toute modification importante

---

## Bonnes pratiques Git

### Avant de commencer

Toujours récupérer les dernières modifications :

```bash
git pull
```

### Ajouter les modifications

```bash
git add .
```

### Créer un commit

```bash
git commit -m "Description des modifications"
```

Exemples :

- `Ajout affichage ingrédients`
- `Correction responsive mobile`
- `Ajout calcul nutriscore moyen`
- `Amélioration du design CSS`

### Envoyer les modifications

```bash
git push
```

---

## Conseils de développement

- Vérifier régulièrement la console JavaScript
- Tester sur mobile et ordinateur
- Garder un code clair et commenté
- Respecter la séparation HTML / CSS / JavaScript
- Utiliser l’API OpenFoodFacts lorsque cela est possible

---

## Objectif du projet

Afficher dynamiquement une recette de gratin de pâtes ainsi que les informations nutritionnelles des ingrédients grâce à l’API OpenFoodFacts.