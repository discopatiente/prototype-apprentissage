# Plateforme d'apprentissage — contexte du projet

## Objectif

Application web pour proposer des leçons et exercices interactifs à une enfant ayant des soucis de santé et un retard du développement cognitif, en complément d'enseignement à distance. Le ton, les interactions et le feedback doivent être motivants et adaptés à un jeune public avec des besoins spécifiques.

Le projet est aussi un terrain de formation : un développeur junior apprend Vue 3 en construisant ce projet, encadré par un senior.

## Stack technique

- Vue 3 avec la Composition API exclusivement (`<script setup>`, jamais l'Options API)
- Pinia pour l'état global
- Vue Router pour la navigation
- Vite comme outil de build
- Hébergement : Netlify (déploiement automatique sur push vers `main`)
- Pas de backend pour l'instant — données en fichiers JSON locaux dans `src/data/`

## Convention de nommage — IMPORTANT

Le projet a connu une incohérence française/anglaise en cours de route, corrigée mais à surveiller :

- **Code (variables, fonctions, noms de fichiers .vue, clés techniques) : toujours en anglais.**
  Exemples : `LessonView.vue`, `LessonBilan.vue`, `lesson-animaux-01.json`, la variable `lesson`.
- **Contenu pédagogique affiché à l'élève : en français.**
  Exemples : le texte des questions, les titres de leçon, les messages de feedback ("Bravo !").
- Ne jamais réintroduire de mélange comme `lecon` vs `lesson` dans le code. Si un doute existe sur le nom d'un fichier ou d'une variable existante, chercher dans le projet avant d'en créer un nouveau.

## Architecture des dossiers

```
src/
├── assets/
├── components/       → briques réutilisables, pas liées à une URL
├── views/            → pages, chacune correspond à une route
├── router/           → table des routes
├── stores/           → état global Pinia
└── data/             → contenu des leçons et thèmes, en JSON
```

## Schéma de données

### `src/data/themes.json`
Liste des thématiques disponibles. Chaque thème référence une liste d'ids de leçons.
```json
{
  "id": "animaux",
  "titre": "Les animaux",
  "description": "...",
  "icone": "🐄",
  "lecons": ["lesson-animaux-01"]
}
```

### `src/data/lesson-{theme}-{numero}.json`
Une leçon individuelle, un fichier par leçon (jamais regroupées dans un seul fichier — facilite l'édition et évite les conflits Git).
```json
{
  "id": "lesson-animaux-01",
  "theme": "animaux",
  "titre": "...",
  "description": "...",
  "exercices": [
    {
      "id": "ex-01",
      "type": "qcm",
      "question": "...",
      "image": null,
      "choix": ["...", "...", "...", "..."],
      "bonne_reponse": 1,
      "points": 10
    }
  ]
}
```
Le chargement d'une leçon se fait par import dynamique selon l'id présent dans l'URL (`route.params.id`), pas par import fixe — voir `LessonView.vue` et son usage de `watchEffect` + `import(\`../data/${id}.json\`)`.

### Images dans un exercice ou un écran (champ `images`)

N'importe quel exercice, et n'importe quel écran de diaporama, peut afficher une rangée d'images côte à côte grâce au champ optionnel `images` :
```json
"images": [
  { "src": "maths/monnaie/piece-2-euros.svg", "alt": "pièce de 2 euros" },
  { "src": "maths/monnaie/piece-1-euro.svg", "alt": "pièce de 1 euro" }
]
```
`src` est le chemin à partir de `public/images/`, `alt` la description lue par un lecteur d'écran. Le rendu est assuré par `ImageRow.vue`, branché dans `ExerciseQCM.vue`, `ExerciseQCMTexte.vue`, `ExerciseTrouNumerique.vue` et `EcranDiaporama.vue`. Une même image peut être répétée (trois pièces de 2 € = trois entrées).

À préférer aux emojis dès que l'objet doit être reconnu dans la vraie vie (la monnaie, par exemple). Les pièces et billets en euros sont dans `public/images/maths/monnaie/`.

### Leçon de type diaporama (explicative, sans QCM)

Certaines notions (ex. la division) démarrent par une leçon explicative avant les exercices, pour introduire le concept en douceur (démarche concret → imagé → abstrait, plutôt qu'une évaluation). Ces leçons ont `"type": "diaporama"` et une forme différente, sans `exercices` :
```json
{
  "id": "lesson-maths-16",
  "theme": "maths",
  "titre": "...",
  "description": "...",
  "type": "diaporama",
  "points": 10,
  "ecrans": [
    { "id": "ecran-01", "texte": "...", "visuel": "🍬🍬🍬 | 🍬🍬🍬" }
  ]
}
```
`visuel` est optionnel ; les groupes séparés par `|` s'affichent chacun dans leur propre encadré (utile pour illustrer un partage ou un groupement). `points` est le score fixe attribué quand l'élève clique sur "Terminer la leçon" (pas de bonnes/mauvaises réponses). `LessonView.vue` branche sur `lesson.type` pour afficher `EcranDiaporama.vue` (navigation Précédent/Suivant) au lieu des composants `Exercise*`, mais réutilise le store et `LessonBilan.vue` sans les modifier.

Attention (bilan) : `LessonBilan.vue` affiche toujours `exercise.question` tel quel pour chaque ligne, quel que soit le type d'exercice — jamais `mot`, `texte` ou `contexte`. Dans un exercice `trou-numerique`, le champ `question` n'est jamais affiché à l'élève pendant l'exercice — il sert uniquement d'intitulé dans `LessonBilan.vue`. Il doit donc rester lisible et distinct d'un exercice à l'autre (écrire `"2 € + 1 € = ..."` plutôt que `"Total : ... €"`, sinon le bilan affiche dix lignes identiques).

Même piège pour un exercice `qcm` qui utilise le champ `mot` (ex. `lesson-francais-41`, `42`) : si `question` est la même instruction générique sur tous les exercices ("Que veut dire cette expression ?"), le bilan affiche des lignes identiques, même si `mot` change à l'écran. Solution appliquée dans `lesson-francais-60` : intégrer le mot/l'expression dans `question` ("Que veut dire « ... » ?"), quitte à ce qu'il apparaisse aussi dans `mot` juste en dessous — redondance mineure jugée acceptable plutôt que de modifier `ExerciseQCM.vue` (qui est partagé par d'autres leçons).

### Exercice `ordre-mots` (phrase à reconstruire)

Des étiquettes de mots sont proposées dans le désordre ; l'élève les touche dans l'ordre pour construire la phrase (toucher un mot déjà placé le renvoie dans les étiquettes). Rendu par `ExerciseOrdreMots.vue`.
```json
{
  "id": "ex-01",
  "type": "ordre-mots",
  "question": "Tu viens jouer avec moi ?",
  "mots": ["Tu", "viens", "jouer", "avec", "moi"],
  "ponctuation": "?",
  "points": 10
}
```
- `mots` est écrit **dans le bon ordre** : c'est le composant qui mélange (et remélange si le hasard redonne l'ordre correct). Un mot en double (« le … le ») est accepté à l'une ou l'autre place.
- `ponctuation` (optionnel) est affichée d'office en fin de phrase, hors étiquettes, pour ne pas désigner le dernier mot.
- La consigne affichée est fixe ; `consigne` (optionnel) permet de la remplacer.
- `question` n'est pas affiché pendant l'exercice : il sert d'intitulé dans le bilan. Y mettre la phrase correcte complète (avec l'espace française avant `?` et `!`).
- `images` est accepté (voir plus haut).

## Store Pinia (`progressStore.js`)

Logique de score volontairement non triviale — à respecter strictement :

- `scoreGlobal` : score total, **ne redescend jamais**.
- `meilleurScoresParLecon` : objet `{ idLecon: meilleurScore }`.
- `scoresTentativeCourante` / `exercicesReussisTentative` : état de la tentative en cours, remis à zéro par `resetTentative()`.
- `validerReponse(idLecon, idExercice, estCorrect, points)` : enregistre la réponse de la tentative en cours. Empêche le double comptage du même exercice.
- `terminerLecon(idLecon)` : compare le score de la tentative courante au meilleur score historique de cette leçon. N'ajoute à `scoreGlobal` que la différence positive (le gain), jamais le score complet si ce n'est pas une amélioration.
- Recommencer une leçon (`resetTentative()`) ne touche jamais à `scoreGlobal` ni à `meilleurScoresParLecon`.

Ne pas réintroduire un score qui se remettrait à zéro globalement — c'est un choix produit explicite : l'élève ne doit jamais être pénalisée pour avoir recommencé.

## Composants existants

- `ScoreBadge.vue` — lit `store.scoreGlobal` directement, pas de props.
- `ExerciseQCM.vue` — reçoit `exercice` en prop, émet `reponse-validee` avec `{ id, estCorrect, points }`. Ne touche jamais au store lui-même (séparation des responsabilités : c'est la vue parente qui décide quoi faire de la réponse).
- `FeedbackMessage.vue` — reçoit `correct` (booléen) en prop, affiche "Bravo !" ou "Essaie encore !".
- `ImageRow.vue` — reçoit `images` en prop et affiche une rangée d'images centrée, qui passe à la ligne si besoin. Utilisé par les quatre composants d'exercice et de diaporama.
- `ExerciseOrdreMots.vue` — exercice `ordre-mots` : étiquettes à toucher dans l'ordre pour reconstruire une phrase. Même contrat que les autres `Exercise*` (prop `exercise`, émet `answer-submitted`).
- `LessonBilan.vue` — écran de fin de leçon : détail par question, score de la tentative, phrase et emoji selon le résultat, confettis si le score dépasse 50%. Émet `recommencer` et `menu`.

## Vues existantes

- `HomeView.vue` — page d'accueil. **En cours de refonte** : doit passer d'un bouton unique "Commencer" à une grille de thématiques lue depuis `themes.json`.
- `LessonView.vue` — orchestre une leçon : charge le bon fichier JSON selon l'id dans l'URL, affiche les exercices un par un, gère la transition vers `LessonBilan`.

## Style de travail attendu

- Composition API uniquement, un composant par fichier, `<style scoped>` systématique.
- Avant toute modification de fichier existant, vérifier son contenu réel (ne pas supposer).
- Le code doit rester compréhensible par un développeur junior en formation — éviter les abstractions ou patterns avancés non nécessaires à ce stade.

# Programme scolaire 
Le fichier `suivi_pedagogique_sofia.md` détaille le programme et permet de suivre quelles sont les notions à aborder dans les exercices à venir
