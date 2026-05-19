# Portfolio BUT GEII — Arthur Delais

Portfolio personnel de fin de 1ère année du BUT Génie Électrique et Informatique Industrielle, IUT Jean Monnet, Saint-Étienne (2025-2026).

## 📎 Activer les preuves cliquables

Sur chaque page de compétence (AC11-01 à AC12-03), la section **"Preuves associées"** affiche des liens vers tes vrais documents. Tant que tu n'as pas déposé les fichiers, ils apparaissent en pointillés avec l'icône ⏳ (à déposer).

Pour les activer, dépose tes vrais fichiers dans `assets/preuves/` avec **exactement les noms suivants** :

| Fichier à déposer | Source dans tes archives |
|---|---|
| `CR_TP5_ELEN_transistor_LED.docx` | Ton CR du TP5 ELEN |
| `CR_TP1_ELEN2_TL081.docx` | Ton CR du TP1 ELEN2 |
| `CR_TP3-TP7_ELEN2_Bode.pdf` | Tes CR des TP3 à TP7 ELEN2 (fusionnés en PDF) |
| `CR_TP_physique_TP1_TP3.docx` | Tes CR de physique TP1 et TP3 |
| `bode.xlsx` | Ton tableur Bode |
| `balistique_main.cpp`, `balistique_balistique.cpp`, etc. | Code C++ du simulateur (1 fichier par module) |
| `balistique_test.cpp` | Fichier de tests du simulateur |
| `balistique_README.txt` | README du simulateur |
| `Modelisation_Physique_Balistique.docx` | Document de modélisation en binôme |
| `SEA_Robot_schema_proteus.pdsprj` | Le fichier projet Proteus de la carte commande moteur |
| `Quartus_decodeur_7_segments.zip` | Le projet Quartus 7-segments zippé |

Une fois déposés, les liens passent automatiquement en bleu cyan avec l'icône ↗ et deviennent ouvrables.

Voir aussi `assets/preuves/README.txt` pour la liste complète.

## ✨ Nouveautés v6

- **Preuves cliquables** sur toutes les pages de compétences (18 liens)
- **Page Partager** dédiée avec QR code stylé (cyan + logo "AD")
- **QR code** versions sombre et N&B téléchargeables
- **Bouton de copie d'URL** en un clic

## Structure

```
portfolio-but-geii/
├── index.html
├── pages/
│   ├── AC11-01.html ... AC12-03.html   # 6 pages compétences
│   ├── projets.html                    # SAÉ + TP + Galerie TP énergie
│   ├── cv.html                         # CV PDF intégré
│   ├── stage.html                      # Espace stage BUT2
│   ├── partager.html                   # QR code à partager
│   └── apropos.html
└── assets/
    ├── style.css
    ├── script.js                       # Étoiles 3D + interactions
    ├── favicon.svg
    ├── CV_Arthur_Delais.pdf
    ├── qr-portfolio-dark.png           # QR cyan
    ├── qr-portfolio-light.png          # QR N&B impression
    ├── schemas/                        # Schémas Proteus, Arduino
    ├── code/                           # Captures code
    ├── photos/                         # Photos TP énergie
    └── preuves/                        # ← À REMPLIR avec tes fichiers
        └── README.txt
```

## ✨ Nouveautés v2

- **Page CV** imprimable en PDF (depuis le navigateur : Ctrl+P → Enregistrer en PDF)
- **Page Stage** prête pour accueillir les infos du stage de BUT2
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

