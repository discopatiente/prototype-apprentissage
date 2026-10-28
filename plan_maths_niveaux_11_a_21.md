# Plan maths, niveaux 11 à 21

Planifié le 28 octobre 2026, après le niveau 10 (`lesson-maths-55`, révision des figures).

**Réalisé le 28 octobre 2026.** Le détail se trouve dans `suivi_pedagogique_sofia.md`.

## Point de départ

- **Monnaie (niveau 8, `31` à `34`)** : reconnaître les pièces et les billets, compter une somme, rendre la monnaie. Tous les montants sont des euros entiers. Le rendu de monnaie se fait seulement sur un billet de 5 €, 10 € ou 20 €, et la somme rendue ne dépasse jamais 10 €.
- **Nombres** : les leçons `01` à `05` ne comptent que 3 questions chacune et ne vont pas au-delà de 25. Or rendre la monnaie sur 50 € demande de manier les nombres jusqu'à 100.
- **Calcul** : additions et soustractions jusqu'à 20 (passage de la dizaine), tables, division simple.
- **Notions jamais abordées** (vérifié dans les fichiers) : nombres jusqu'à 100, calcul avec des nombres à deux chiffres, doubles et moitiés, masses, contenances, centimes en calcul (ils ne sont que présentés dans `31`).
- **Toujours reportée** : l'heure.

## Principes

- **La monnaie est le fil rouge**, comme le vocabulaire en français : quatre niveaux de monnaie, plus une révision finale. Chacun pousse un peu plus loin le rendu de monnaie.
- **Entre deux niveaux de monnaie, une autre notion** qui sert ensuite à la monnaie : les nombres jusqu'à 100 et le calcul à deux chiffres préparent le billet de 50 €, les doubles et moitiés préparent le partage d'une somme, les masses et contenances font écho aux courses.
- **Toujours du concret** : de vraies images de pièces et de billets (champ `images`) dès qu'il y a de l'argent, et des situations d'achat proches de la vie de Sofia.
- **Une notion nouvelle commence par un diaporama**, puis une ou deux leçons d'entraînement.
- **Uniquement les types d'exercices existants** (`diaporama`, `qcm-texte`, `trou-numerique`). Le niveau 19 calcule en centimes, sans virgule (« 50 c + 20 c = 70 c »). Le niveau 20 passe aux prix avec une virgule (« 2,50 € ») : `ExerciseTrouNumerique.vue` accepte maintenant une virgule quand `reponse` n'est pas un nombre entier (par exemple `"reponse": 1.5`). L'élève peut alors taper « 1,5 » ou « 1,50 », et la correction affiche « 1,50 ». Les exercices dont la réponse est entière ne changent pas.

## Vue d'ensemble

| Niveau | Contenu | Leçons | Fil |
|---|---|---|---|
| 11 | Rendre la monnaie comme le marchand | 56, 57, 58 | **Monnaie** |
| 12 | Les nombres jusqu'à 100 | 59, 60, 61 | Nombres |
| 13 | Additions et soustractions jusqu'à 100 | 62, 63, 64 | Calcul |
| 14 | Faire les courses | 65, 66, 67 | **Monnaie** |
| 15 | Doubles et moitiés | 68, 69, 70 | Calcul |
| 16 | Le billet de 50 € | 71, 72 | **Monnaie** |
| 17 | Les masses : kilo et gramme | 73, 74, 75 | Grandeurs |
| 18 | Les contenances : le litre | 76, 77 | Grandeurs |
| 19 | Les centimes | 78, 79, 80 | **Monnaie** |
| 20 | Des euros et des centimes | 81, 82, 83, 84 | **Monnaie** |
| 21 | Grande révision : monnaie et problèmes | 85, 86 | **Monnaie** |

Total : 31 leçons, dont 17 sur la monnaie.

## Détail par niveau

### Niveau 11 : Rendre la monnaie comme le marchand
Une deuxième façon de rendre la monnaie, plus naturelle que la soustraction : partir du prix et compléter jusqu'à la somme donnée, comme le fait un marchand. Elle prépare aussi les sommes plus grandes.
- `lesson-maths-56` diaporama : un livre à 7 €, un billet de 10 € ; on compte « 8, 9, 10 », donc on rend 3 €. Puis avec 20 € : de 13 € on passe à 15 €, puis à 20 €, soit 2 € + 5 € = 7 € rendus.
- `57` trou-numerique : 10 situations de rendu sur 10 € et sur 20 €, avec des prix « pas ronds » (13 €, 16 €, 17 €…) et des montants rendus différents de ceux de `34`.
- `58` qcm-texte : « Quelles pièces et quels billets la marchande peut-elle rendre ? » Choisir, parmi trois rangées d'images, celle qui fait la bonne somme.

### Niveau 12 : Les nombres jusqu'à 100
- `59` diaporama : compter de 10 en 10 jusqu'à 100 (avec des billets de 10 €), puis dizaines et unités (47 = 4 dizaines et 7 unités = 4 billets de 10 € et 7 pièces de 1 €).
- `60` trou-numerique : passer des dizaines et unités au nombre, et inversement.
- `61` qcm-texte : comparer, ranger, trouver le nombre suivant et le nombre précédent, compléter une suite de 10 en 10.

### Niveau 13 : Additions et soustractions jusqu'à 100
- `62` diaporama : calculer avec des dizaines entières (30 + 20, c'est 3 dizaines + 2 dizaines), puis ajouter des unités sans dépasser la dizaine (34 + 5).
- `63` trou-numerique : dizaines entières (40 + 30, 70 − 20, 50 + 50).
- `64` trou-numerique : nombres à deux chiffres sans retenue (23 + 14, 58 − 23).

### Niveau 14 : Faire les courses
Les achats de plusieurs articles, en deux étapes : le total, puis la monnaie.
- `65` trou-numerique : le total de 2 ou 3 articles, avec les prix illustrés.
- `66` trou-numerique : 5 situations en deux questions à la suite (« Combien ça coûte en tout ? », puis « Combien la marchande rend-elle ? »), payées avec un billet de 10 € ou de 20 €.
- `67` qcm-texte : « Ai-je assez d'argent ? » et « Avec 20 €, que puis-je acheter ? » (choisir un panier parmi trois).

### Niveau 15 : Doubles et moitiés
- `68` diaporama : le double (deux fois plus, 4 → 8) et la moitié (partager en deux parts égales, 8 → 4), illustrés avec des carrés de chocolat puis avec des pièces.
- `69` trou-numerique : doubles et moitiés des nombres jusqu'à 20, puis des dizaines entières (le double de 30, la moitié de 40).
- `70` qcm-texte : petits problèmes, dont le partage d'une somme entre deux enfants (« Léa et Inès se partagent 10 € »).

### Niveau 16 : Le billet de 50 €
- `71` trou-numerique : rendre la monnaie sur 50 €, d'abord avec des prix en dizaines entières (30 € → 20 € rendus), puis avec des prix comme 45 € ou 35 €, toujours en complétant comme le marchand.
- `72` qcm-texte : choisir le billet qu'il faut donner (le plus petit qui suffit), puis calculer la monnaie.

### Niveau 17 : Les masses, kilo et gramme
- `73` diaporama : la balance, lourd et léger, le kilogramme (un paquet de sucre), le gramme (un trombone), 1 kg = 1 000 g présenté sans calcul.
- `74` qcm-texte : choisir l'unité (kg ou g), l'objet le plus lourd, la masse la plus vraisemblable.
- `75` trou-numerique : additionner des masses simples (sac de 2 kg et sac de 3 kg ; 200 g + 300 g).

### Niveau 18 : Les contenances, le litre
- `76` diaporama : remplir et vider, le litre (une bouteille d'eau), comparer des récipients.
- `77` qcm-texte : contient plus ou moins, combien de verres pour remplir une bouteille, petits problèmes en litres.

### Niveau 19 : Les centimes
Une ouverture en douceur, sans virgule.
- `78` diaporama : les pièces de 10 c, 20 c et 50 c ; 100 centimes = 1 € ; 50 c + 50 c = 1 €.
- `79` trou-numerique : compter des pièces en centimes, avec un total de 100 c au plus.
- `80` qcm-texte : rendre la monnaie sur 1 € (un bonbon à 60 c → 40 c rendus), avec les images des pièces.

### Niveau 20 : Des euros et des centimes
Des prix et des résultats qui mélangent euros et centimes, avec seulement 50 c, 20 c et 10 c (pas de pièces de 1, 2 ou 5 c, pour garder des calculs simples).
- `81` diaporama : lire un prix. Dans « 2,50 € », le nombre avant la virgule compte les euros et celui après la virgule compte les centimes : 2 € et 50 c. Avec les images d'une pièce de 2 € et d'une pièce de 50 c. Puis 1 € + 50 c = 1,50 €, et 50 c + 50 c = 1 €.
- `82` trou-numerique : compter une somme faite de pièces en euros et en centimes (2 € + 50 c = 2,50 €, 1 € + 1 € + 20 c = 2,20 €).
- `83` trou-numerique : rendre la monnaie avec des centimes (un croissant à 1,50 € payé avec 2 € → 0,50 € rendus ; un cahier à 3,50 € payé avec 5 € → 1,50 € rendus), en complétant comme le marchand : de 3,50 € à 4 €, puis de 4 € à 5 €.
- `84` qcm-texte : faire les courses avec des centimes. Total de deux articles (1,50 € + 2 €), « Ai-je assez d'argent ? », et choisir les pièces à rendre (images).

### Niveau 21 : Grande révision
- `85` qcm-texte : problèmes mélangés de monnaie (total, monnaie, assez d'argent ou non, billet à donner), dont quelques-uns avec des centimes.
- `86` trou-numerique : rendre la monnaie sur 10 €, 20 € et 50 €, mélangés, dont trois résultats avec des centimes.

## Points de vigilance à la création

- **Vérifier chaque calcul par un script indépendant**, comme pour `31` à `34` : recalcul des sommes à partir des images et des prix, sans réutiliser les valeurs déjà écrites dans les fichiers.
- **Dans `trou-numerique`, le champ `question` n'est visible que dans le bilan** : il doit décrire la situation et être différent d'un exercice à l'autre (« un livre à 13 €, 20 € donnés → rend 7 € »).
- Répartir les bonnes réponses entre les positions dans les leçons `qcm-texte`.
- Ne pas réutiliser les mêmes couples prix et somme donnée que dans `34`.
- Pour les réponses avec centimes, écrire `reponse` en nombre décimal (`1.5`, `0.5`, `2.2`) et vérifier le calcul en centimes entiers dans le script, pour éviter les erreurs d'arrondi.
- Mettre à jour `suivi_pedagogique_sofia.md` : la monnaie reste en cours (EC), et il faut ajouter des lignes pour les nombres jusqu'à 100, le calcul à deux chiffres, les doubles et moitiés, les masses et les contenances.
