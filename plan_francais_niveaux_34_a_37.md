# Plan français, niveaux 34 à 37

**Réalisé le 11 novembre 2026.** Le détail se trouve dans `suivi_pedagogique_sofia.md`.

## Contexte

Le français compte 115 leçons (niveaux 1 à 33) ; `plan_francais_niveaux_20_a_29.md` et ses notions en réserve sont entièrement réalisés. L'utilisateur veut un grand plan pour les quatre notions suivantes, dans cet ordre : nature des mots, homophones série 3, accents et sons difficiles, lire une consigne / une fiche documentaire. Une fois le plan validé, il sera enregistré à la racine sous `plan_francais_niveaux_34_a_37.md` (comme les plans précédents), puis réalisé.

Vérifié dans `src/data/francais/` : aucune leçon ne porte sur la nature des mots, les homophones c'est/s'est, ça/sa, ce/se, les accents ou la lecture de consignes. Les notions sont donc réellement inédites (leçon tirée de 62/63).

## Principes (hérités des plans précédents)

- Aucun nouveau composant : seuls `qcm`, `qcm-texte`, `ordre-mots` et `diaporama` sont utilisés.
- Notion abstraite = diaporama d'introduction (concret → imagé → abstrait), puis exercices.
- Phrases et textes réemploient les mots des séries 1 à 9 (révision invisible pour Sofia).
- `question` toujours distincte d'un exercice à l'autre (le bilan n'affiche que `exercise.question`) : la phrase ou le mot est intégré dans `question`.
- Bonnes réponses réparties (2 choix : 6/6 ; 3 choix : 4/4/4 ; 4 choix : 3/3/3/3).
- Sujets reportés exclus : heure, alimentation, émotions (y compris dans les fiches documentaires).
- Ton motivant, vocabulaire simple, phrases courtes.

## Vue d'ensemble

| Niveau | Notion | Leçons | Nb |
|---|---|---|---|
| 34 | Nature des mots (nom, verbe, adjectif) | 116 à 119 | 4 |
| 35 | Homophones série 3 (c'est/s'est, ça/sa, ce/se) | 120 à 122 | 3 |
| 36 | Accents et sons difficiles | 123 à 127 | 5 |
| 37 | Lire une consigne, lire une fiche | 128 à 132 | 5 |

Total : 17 leçons, `lesson-francais-116` à `132`.

## Niveau 34 : Nature des mots

Raison de commencer ici : donne un vocabulaire commun (« le verbe », « l'adjectif ») que les accords (29, 30, 55) et la conjugaison (44 à 53) utilisaient sans le nommer, et sert aux notions suivantes.

- `116` diaporama : le nom = on peut mettre « un/une/le/la » devant (une griffe, le troupeau) ; le verbe = ce qu'on fait, change avec « hier / aujourd'hui / demain » ; l'adjectif = dit comment est le nom (une couette douce). Astuce visuelle : trois couleurs/encadrés via `visuel` avec `|`.
- `117` qcm (3 choix nom/verbe/adjectif, 12 exercices) : « Dans “La flaque est profonde”, que veut dire “profonde” ? » → mot intégré dans `question`. Mots tirés des séries 1 à 9.
- `118` qcm-texte (12) : phrase à trou, choisir le seul mot de la bonne nature (« Le chat ___ vite. » → verbe parmi un nom et un adjectif) ; 4 par nature.
- `119` qcm (10) : « Quel mot est le verbe ? » / « Quel mot est le nom ? » parmi 4 mots d'une phrase affichée ; évite les mots ambigus (pas de « sauter » nom/verbe, pas de « porte », « marche »).

Point d'attention : exclure les mots à double nature et les adjectifs-noms (« un grand », « le rouge »). Phrases simples sujet-verbe-complément, le verbe jamais à l'infinitif seul.

## Niveau 35 : Homophones série 3

Prolonge les niveaux 14 et 30 (mêmes astuces de substitution, même mise en page que `lesson-francais-107/108`).

- `120` diaporama : c'est (= « cela est », on peut dire « c'était ») / s'est (devant un verbe : « il s'est blessé » → « il s'était ») ; ça (= « cela ») / sa (= « son » : sa couette) ; ce (devant un nom : ce volet) / se (devant un verbe : il se cache). Un astuce par paire, un visuel avec emojis.
- `121` qcm-texte (12 phrases, 4 par paire, 2 choix, 6/6).
- `122` qcm-texte (12 nouvelles phrases, jamais réutilisées de 121), mélangées entre les trois paires ; sert d'entraînement supplémentaire, comme `66`.

Point d'attention : « s'est » est le plus difficile ; prévoir des phrases au passé composé uniquement (« Elle s'est échauffée »), pas de forme composée longue. La virgule des phrases (« ça, c'est… ») reste hors programme.

## Niveau 36 : Accents et sons difficiles

Orthographe d'usage, complémentaire aux mots fréquents (25, 54). Deux sous-blocs de deux leçons, plus une révision.

- Accents :
  - `123` diaporama : é (« e fermé », un pré), è (« e ouvert », une crème), ê (un arbre qui perd un « s » : forêt, fête) ; la règle « é à la fin d'un mot qui finit par le son [é] » est écartée (trop de cas).
  - `124` qcm-texte (12) : choisir le mot bien écrit (« une forêt / une foret » ; « le crépuscule » ; « un éclair »), 2 ou 3 choix, mots tirés des séries 1 à 9 ; mots entiers dans `choix`.
- Sons difficiles :
  - `125` diaporama : c / ç (« ça » : la cédille garde le son [s] devant a, o, u), g / ge / gu (gare, girafe, nageoire, guêpe), s entre deux voyelles (rose) / ss (poisson, un vacarme).
  - `126` qcm-texte (12) : compléter le mot ou choisir l'écriture correcte (« garçon », « nageoire », « poisson »).
- `127` ordre-mots (8) : phrases courtes contenant ces mots, pour fixer l'orthographe en contexte (comme `73`).

Point d'attention : les mots à choisir doivent exister en vraie orthographe ET en fausse ; éviter les fausses orthographes qui se prononcent différemment (ex. « garson » n'est utile que si l'enfant a déjà vu « garçon »). Vérification par script : tous les mots corrects sont présents dans un lexique des leçons existantes ou ajoutés dans le diaporama.

## Niveau 37 : Lire une consigne, lire une fiche

Compétence transversale (utile pour l'enseignement à distance) : comprendre ce qu'on demande, puis prélever une information dans une courte fiche.

- `128` diaporama : les verbes des consignes : entoure, souligne, coche, relie, recopie, complète, range, barre. Un exemple par verbe, avec `visuel` (✅, ➡️).
- `129` qcm (10) : « Que dois-tu faire ? » à partir d'une consigne affichée dans `question` (la consigne complète y figure, pour le bilan) ; 3 choix.
- `130` fiche documentaire n° 1 : texte court et illustré sur un sujet concret (le judo : le judogi, les ceintures, le tatami), même format de lecture que `lesson-francais-95` (8 questions de prélèvement d'information). Sujet vérifié pour ne pas toucher aux émotions.
- `131` fiche documentaire n° 2 : sur un animal déjà connu (le renard, voir `04` et `10`), mais avec des informations nouvelles ; 8 questions.
- `132` révision du niveau : 6 consignes à comprendre + 4 questions sur une mini-fiche (mélange de `129` et `130`) ; sert de contrôle de fin de niveau.

Point d'attention : choisir le type de leçon de lecture en relisant `lesson-francais-95` avant d'écrire (le CLAUDE.md décrit `qcm-texte` avec `texte` ; vérifier comment le texte long est affiché). Faits sur le judo et le renard relus et vérifiés (leçon des sciences : corriger toute inexactitude).

## Fichiers à créer ou modifier

- Créer : `src/data/francais/lesson-francais-116.json` à `132.json` (une leçon par fichier, schéma du CLAUDE.md, `theme: "francais"`).
- Modifier : `src/data/subjects.json` : ajouter `niveau-34` à `niveau-37` à la fin de la matière `francais`, sur le modèle des niveaux 32 et 33.
- Modifier : `suivi_pedagogique_sofia.md` : nouvelles lignes au tableau Français (nature des mots, homophones série 3, accents et sons, consignes et fiches documentaires, toutes en EC, cycle C2 vers C3, socle D1) et une section datée qui décrit les leçons.
- Créer : `plan_francais_niveaux_34_a_37.md` à la racine (ce plan, en version projet).
- Ne pas toucher : `CLAUDE.md`, les composants `Exercise*`, `LessonBilan.vue`, le store.

## Rythme de réalisation

Niveau par niveau, dans l'ordre. Une fois le plan validé, on enchaîne les quatre niveaux sans redemander la notion. Aucun commit ni push sans demande explicite.

## Vérification

1. Script de contrôle sur chaque nouvelle leçon : JSON valide, ids uniques, `id` du fichier = champ `id`, `bonne_reponse` dans les bornes, répartition des bonnes réponses, `question` distinctes d'un exercice à l'autre dans une même leçon (bilan lisible), pas de doublon de phrase avec les leçons existantes.
2. Script indépendant pour les contenus testables : ordre alphabétique non concerné ici ; contrôle automatique que chaque mot choisi à l'exercice « nature » est dans la liste de mots validée à la main.
3. Dérouler chaque leçon jusqu'au bilan avec Playwright (chemin d'import absolu, viewport 430×820), en répondant juste : score maximal attendu, aucune image manquante, pas d'erreur console.
4. `npm run build` pour vérifier que les imports dynamiques passent.
5. Relire à la main les questions de grammaire (nature des mots, homophones) : ce sont celles où une ambiguïté se glisse le plus facilement.
