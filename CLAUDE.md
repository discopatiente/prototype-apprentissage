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
- `LessonBilan.vue` — écran de fin de leçon : détail par question, score de la tentative, phrase et emoji selon le résultat, confettis si le score dépasse 50%. Émet `recommencer` et `menu`.

## Vues existantes

- `HomeView.vue` — page d'accueil. **En cours de refonte** : doit passer d'un bouton unique "Commencer" à une grille de thématiques lue depuis `themes.json`.
- `LessonView.vue` — orchestre une leçon : charge le bon fichier JSON selon l'id dans l'URL, affiche les exercices un par un, gère la transition vers `LessonBilan`.

## Roadmap en cours — branche `feature/thematiques`

Travail en cours sur cette branche, isolée de `main` qui reste stable et déployée :

1. ✅ Restructuration des données en thèmes/leçons séparées
2. ✅ Chargement dynamique de leçon par id d'URL
3. ⬜ `HomeView` : afficher la grille de thèmes depuis `themes.json`
4. ⬜ Nouvelle vue `ThemeView` : liste des leçons d'un thème, route `/theme/:id`
5. ⬜ Historique des tentatives (date, leçon, score obtenu/max) à ajouter au store
6. ⬜ Vue "Mes progrès" côté élève + vue équivalente côté admin
7. ⬜ Interface admin pour ajouter du contenu sans toucher au code
8. ⬜ Réflexion sur l'authentification admin (pertinente dès l'étape 6, la vue de progrès ne doit pas être publique sur l'URL)

## Style de travail attendu

- Composition API uniquement, un composant par fichier, `<style scoped>` systématique.
- Avant toute modification de fichier existant, vérifier son contenu réel (ne pas supposer).
- Travailler sur la branche `feature/thematiques`, jamais directement sur `main`.
- Faire des commits fréquents et descriptifs (`feat:`, `fix:`, `refactor:`, `init:`).
- Le code doit rester compréhensible par un développeur junior en formation — éviter les abstractions ou patterns avancés non nécessaires à ce stade.
