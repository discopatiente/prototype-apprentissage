# Handoff : refonte visuelle (identité douce)

## Vue d'ensemble
Refonte de l'identité visuelle de l'application d'apprentissage. Objectif : interface épurée, chaleureuse, peu de texte, gros
boutons, couleurs douces et apaisantes, mascotte cochon simple, sans surstimulation.

La maquette couvre tout le parcours, **dans l'arborescence exacte du projet** :
Accueil (matières) → Matière (niveaux) → Niveau (leçons) → Leçon (exercices) → Bilan,
plus l'écran « Mes progrès ».

## À propos des fichiers de cette archive
`Accueil.dc.html` est une **référence de design réalisée en HTML** — un prototype qui
montre l'apparence et le comportement voulus, **pas du code à copier-coller** dans le
projet. Le travail consiste à **recréer ces écrans dans l'environnement Vue existant**
(Vue 3 Composition API, Pinia, Vue Router, `<style scoped>`), en suivant les conventions
du dépôt (code en anglais, contenu pédagogique en français). Les styles ci-dessous sont
écrits en `style` inline dans la maquette : à transposer en CSS `scoped` dans chaque
composant.

## Fidélité
**Haute fidélité (hifi).** Couleurs, typographie, espacements et interactions sont
définitifs. Reproduire fidèlement, en réutilisant les composants et la logique déjà
présents dans le dépôt.

---

## Système visuel (design tokens)

### Police
- **Nunito** (Google Fonts), graisses **600 / 700 / 800**. Aucune autre police.
- Tailles : titres d'écran 23–28px/800 ; question d'exercice 22px/800 ; choix 18px/700 ;
  texte courant & sous-titres 15–16px/600 ; petits labels MAJUSCULES 11–12px/700 (letter-spacing ~0.05em).

### Couleurs
| Rôle | Hex |
|---|---|
| Fond de page (crème) | `#FAF5EF` |
| Dégradé accueil / bilan | `linear-gradient(180deg,#FBE9DD 0%,#FAF5EF 46%)` (bilan : 58%) |
| Surface / carte | `#FFFDFB` |
| Texte principal | `#4A352B` |
| Texte secondaire (muted) | `#A2937F` |
| Terracotta (accent, retours) | `#C2855F` / `#A56A45` |
| Bouton principal (pêche) | fond `#EFA88C`, texte `#4A352B` |
| Score — ambre | texte `#9A6E2E`, losange `#D9A85F`, tuile `#F6E7CE` |
| Ballons — corail | texte `#C25E47`, ballon `#DD8A78`, tuile `#F7D9CE` |
| Bonne réponse (sauge) | fond `#E9F0E2`, bordure `#A9C29A`, texte `#5E7A52` |
| Mauvaise réponse | fond `#FBE3DC`, bordure `#E0A290`, texte `#B25B45` |
| Bordure neutre (cartes/choix) | `#EFE3D2` (atténuée : `#F0E8DC`) |
| Matière Français | couleur `#DD8A78`, tuile `#FBE4DC` |
| Matière Maths | couleur `#D9A85F`, tuile `#F7EAD2` |
| Encadré « Texte à lire » | fond `#FBF1E2`, bord gauche 4px `#E0A48F`, label `#C2855F`, texte `#5C4A3D` |

### Rayons, ombres, cibles
- Rayons : cartes 20–24px ; pastilles/labels 14–18px ; boutons en pilule 28–35px ;
  encadré « Texte à lire » `0 14px 14px 0`.
- Ombre carte : `0 10–12px 24–26px -16px rgba(74,53,43,0.3–0.35)`.
- Ombre bouton principal : `0 14px 26px -12px rgba(216,138,108,0.75)`.
- **Cibles tactiles** : boutons principaux 60–70px de haut, cartes ≥ 64px. (Mobile d'abord, ~390px de large.)

---

## Écrans → composants

### 1. Accueil → `HomeView.vue`
- En-tête : **date du jour** (gauche, `#A2937F`, `Intl.DateTimeFormat('fr-FR', {weekday,day,month})`,
  1re lettre en majuscule) + **pastille score/ballons** (droite).
- **Bulle de dialogue** issue de la mascotte, contenant uniquement « Bonjour {prénom} ! ».
  Bulle blanche, rayon 20px, petite pointe = carré tourné 45° (`#FFFDFB`) collé au bord gauche.
- Ligne « Choisis une matière : » sous la bulle (16px/600, `#A2937F`).
- **Grille de matières** 2 colonnes, lue depuis `subjects.json` : carte blanche, icône emoji
  (📖 / 🔢) dans tuile arrondie teintée, titre 18px/800, pastille « N leçons » à la couleur de la matière.
- Bouton discret « Mes progrès » centré (fond `#F3E7D6`, petite icône barres).

### 2. Matière → `SubjectView.vue`
- Barre du haut : retour « ‹ Accueil » + pastille score/ballons.
- Grosse icône de la matière + titre + « Choisis ton niveau : ».
- Liste de **niveaux** (cartes) : titre 19px/800 + « N leçons » à droite.

### 3. Niveau → `LevelView.vue`
- Barre du haut : retour « ‹ Retour » (vers la matière) + pastille.
- Titre « {Matière} · {Niveau} ».
- Liste de **leçons** (chargées dynamiquement, comme `watchEffect` + `import`) : titre + description ;
  à droite, **meilleur score** « X / max » en pastille sauge si `bestScoresByLesson[id]` existe, sinon flèche « → ».

### 4. Leçon → `LessonView.vue` + composants d'exercice
- Barre du haut : retour « ‹ » (vers le niveau) + **barre de progression** (remplissage pêche) + « q / total ».
- Label matière (MAJUSCULES, couleur matière) + énoncé.
- **`ExerciseQCMTexte.vue`** : encadré « Texte à lire » (couleurs ci-dessus) + question + choix.
- **`ExerciseQCM.vue`** : question + choix (sans texte).
- **`ExerciseReponseCorte.vue`** : champ texte + bouton « Valider » (désactivé si vide) ;
  si faux, ligne « Bonne réponse : … » (normalisation identique : trim/lowercase/sans accents).
- **Choix** : pleine largeur, empilés (1 colonne, pour de grandes cibles), bordure 2px, rayon 18px.
  Après réponse : bonne réponse en sauge, choix erroné sélectionné en corail, autres atténués, tout désactivé.
- **`FeedbackMessage.vue`** : encadré « Bravo ! » (sauge) / « Essaie encore ! » (corail).
- Bouton « Question suivante » / « Voir mon bilan ».

### 5. Bilan → `LessonBilan.vue`
- Dégradé chaud + **mascotte** (anim `popIn`).
- Titre/Message selon % (Parfait! ≥100, Bien joué! ≥50, Continue comme ça! sinon).
- Carte récap : **+N ballons** (gagnés cette tentative) + **score de la leçon en pts**.
- Liste question par question : sauge « +pts » si réussie, corail « 0 pt » sinon.
- **Animation de récompense** : remplacer les confettis par un feu d'artifice + ballons qui montent
  (palette chaude `#DD8A78 #D9A85F #A9C29A #EFA88C #AEB6D6`). Voir `@keyframes burst` / `rise` dans la maquette.
- 3 actions, dans cet ordre : **Recommencer** (bouton pêche), **Retour aux leçons** (bouton blanc bordé),
  **Menu principal** (lien discret). Correspondent à `restart` / `go-to-level` / `go-to-menu`.

### 6. Mes progrès → `ProgressView.vue`
- Retour « ‹ Accueil ».
- Deux tuiles : **Score total** (ambre) + **Ballons** (corail).
- **Historique des leçons** depuis `attemptHistory` (titre, date `fr-FR`, « score / max », couleur selon ratio :
  ≥0.8 sauge, ≥0.5 terracotta, sinon corail).

---

## Mascotte (cochon)
Dessinée **uniquement en CSS** (cercles/ellipses, aucune image) : tête `#F0C2B0`, oreilles & museau
`#E3A48F` (deux naseaux `#7A5443`), yeux `#6B4A3A`, joues `rgba(221,138,120,0.38)`. Voir la maquette
(elle apparaît en 3 tailles : accueil ~88px, bilan ~120px). À encapsuler dans un composant
réutilisable (`MascottePig.vue`) ou à exporter en SVG/PNG si tu préfères un asset.

## Compteur de ballons (NOUVEAU)
N'existe pas encore dans le store. À ajouter dans `progressStore.js` :
- un état `balloons` (persisté avec le reste) ;
- à `finishLesson`, incrémenter `balloons` du **nombre d'exercices réussis dans la tentative**
  (longueur de `completedExercisesInAttempt`).
Afficher la valeur à côté du score (dans la pastille / `ScoreBadge.vue` ou un petit `BalloonBadge.vue`).
C'est une récompense visuelle motivante, distincte du score (qui, lui, ne baisse jamais — logique conservée).

## État / logique de score (inchangée)
La maquette respecte ta logique : score global qui ne redescend jamais, meilleur score par leçon,
gain = amélioration uniquement, `resetTentative` ne touche pas au global. **Garder le `progressStore.js`
existant** ; ne reprendre de la maquette que le visuel + l'ajout `balloons`.

## Fichiers
- `Accueil.dc.html` — prototype complet de tous les écrans (référence visuelle).
