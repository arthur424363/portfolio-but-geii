# Portfolio BUT GEII — Arthur Delais

Portfolio personnel de fin de 1ère année du BUT Génie Électrique et Informatique Industrielle, IUT Jean Monnet, Saint-Étienne (2025-2026).

## ✨ Nouveautés v2

- **Page CV** imprimable en PDF (depuis le navigateur : Ctrl+P → Enregistrer en PDF)
- **Page Stage** prête pour accueillir les infos du stage de BUT2
- **Page Glossaire technique** (PWM, pont en H, AOP, FPGA, SAÉ, AC…)
- **Bilan en chiffres** animé sur la page d'accueil
- **Graphique radar** des compétences en SVG
- **Particules animées** en fond, connectées à la souris
- **Effet typewriter** sur le nom à l'arrivée
- **Lueur qui suit la souris** sur les cartes de compétences
- **Animations au scroll** (sections qui glissent)
- **Favicon** personnalisé (logo "AD")
- **Meta tags SEO** + OpenGraph (aperçu joli sur les réseaux sociaux)

## Structure

```
portfolio-but-geii/
├── index.html                  # Page d'accueil avec stats + radar
├── pages/
│   ├── AC11-01.html            # Analyse fonctionnelle
│   ├── AC11-02.html            # Prototype
│   ├── AC11-03.html            # Dossier de fabrication
│   ├── AC12-01.html            # Procédure d'essais
│   ├── AC12-02.html            # Identifier un dysfonctionnement
│   ├── AC12-03.html            # Effets d'un dysfonctionnement
│   ├── projets.html            # SAÉ Robot, SAÉ Info, TPs
│   ├── cv.html                 # CV imprimable (NOUVEAU)
│   ├── stage.html              # Espace stage BUT2 (NOUVEAU)
│   ├── glossaire.html          # Glossaire technique (NOUVEAU)
│   └── apropos.html
├── assets/
│   ├── style.css
│   ├── script.js               # Particules, animations (NOUVEAU)
│   ├── favicon.svg             # Logo "AD" (NOUVEAU)
│   ├── schemas/                # Schémas Proteus, Arduino
│   └── code/                   # Captures de code
└── README.md
```

## 📷 Ajouter des photos

Pour rendre le site encore plus personnel, ajoute des photos :

1. **Ta photo de profil** : place une image carrée (idéal 400×400 px) dans `assets/`, par exemple `assets/photo.jpg`. Puis dans `pages/apropos.html`, remplace `<div class="profile-photo">AD</div>` par `<div class="profile-photo"><img src="../assets/photo.jpg" alt="Arthur Delais"></div>`.

2. **Photos du robot, manips, IUT** : place-les dans `assets/images/`, puis ajoute-les dans les pages avec :
   ```html
   <div class="proof-image">
       <img src="../assets/images/robot.jpg" alt="Description">
       <div class="proof-caption">Légende de la photo</div>
   </div>
   ```

3. **Logo IUT** : place-le dans `assets/`, puis ajoute-le dans la navigation si tu veux.

## 🚀 Publier sur GitHub Pages — étapes (5 minutes)

### 1. Créer le dépôt sur GitHub

1. Connecte-toi sur https://github.com (compte `arthur424363`)
2. Clique sur **"New"** en haut à gauche
3. Nom du dépôt : `portfolio-but-geii`
4. Coche **Public**
5. **Ne coche pas** "Add a README file"
6. **Create repository**

### 2. Uploader les fichiers

1. Clique sur **"uploading an existing file"**
2. Glisse tout le contenu du dossier `portfolio` (`index.html`, dossiers `pages` et `assets`, et `README.md`)
3. **Commit changes**

### 3. Activer GitHub Pages

1. Onglet **"Settings"** → menu de gauche **"Pages"**
2. **Source** : *Deploy from a branch*
3. **Branch** : *main*, dossier `/ (root)`
4. **Save**

### 4. C'est en ligne ! 🎉

Après 1 à 2 minutes :
```
https://arthur424363.github.io/portfolio-but-geii/
```

## Mettre à jour le contenu plus tard

- Modifie les fichiers HTML directement sur GitHub (icône crayon ✏️)
- Ou installe **GitHub Desktop** pour synchroniser le dossier local avec le dépôt

## Crédits

Site personnel, contenu original (analyses, schémas, codes, comptes-rendus de TP).

