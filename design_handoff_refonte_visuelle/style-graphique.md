# Style graphique du site — référence pour illustrations

Résumé du langage visuel actuel, à respecter pour toute nouvelle illustration ajoutée aux leçons.

## Palette de couleurs

**Fond & texte de base**
- Fond général : `#FAF5EF` (crème très clair), souvent en dégradé vers `#FBE9DD` (pêche pâle) en haut de page
- Cartes/surfaces : `#FFFDFB` (blanc cassé)
- Texte principal : `#4A352B` (brun chaud foncé)
- Texte secondaire/discret : `#A2937F`, `#B6A998` (brun-taupe clair)

**Couleurs sémantiques**
- Succès/bonne réponse : fond `#E9F0E2`, bordure `#A9C29A`, texte `#5E7A52` (vert doux)
- Erreur/mauvaise réponse : fond `#FBE3DC`, bordure `#E0A290`, texte `#B25B45` (terracotta doux)
- Neutre/désactivé : `#FAF5EF` / `#F0E8DC` / `#BCAF9E`

**Couleurs d'accent par matière** (icônes, badges, éléments graphiques)
- Français : `#DD8A78` (terracotta rosé), tint `#FBE4DC`
- Maths : `#D9A85F` (ocre/moutarde), tint `#F7EAD2`
- Musique : `#7BAA8B` (vert sauge), tint `#DFF0E7`

**Palette de récompense** (confettis, ballons) : `#DD8A78`, `#D9A85F`, `#A9C29A`, `#EFA88C`, `#AEB6D6` — gamme pastel chaude avec une touche froide (bleu-lavande) pour varier.

## Typographie
- Police unique : **Nunito** (arrondie, douce), appliquée partout y compris boutons et champs
- Titres/scores : `font-weight: 800`, assez grands (22-29px)
- Texte courant : `font-weight: 600-700`
- Pas d'italique, pas de police secondaire

## Formes et composants
- **Coins très arrondis** partout : 16-30px de border-radius, boutons principaux en pilule (30px, `height: 56-60px`)
- **Ombres douces et diffuses**, jamais dures : `box-shadow: 0 12px 26px -16px rgba(74,53,43,0.3-0.35)` — effet de flottement léger, pas de contour net
- Bordures fines (2px) seulement sur les états interactifs (choix QCM, feedback), jamais sur les cartes de base
- Pas d'angles droits, pas de skeuomorphisme complexe

## Style d'illustration (mascotte `MascottePig.vue`)
Référence la plus utile pour créer de nouvelles illustrations :
- **Construit entièrement en CSS/formes géométriques** (cercles, ellipses, `border-radius` asymétriques) — pas de SVG complexe ni d'images bitmap
- Formes simples empilées en `position: absolute` : oreilles (ellipses inclinées), tête (cercle), joues (ellipses semi-transparentes), yeux (petits ovales foncés), museau (cercle avec 2 narines)
- Couleurs peau : `#F0C2B0` (clair) / `#E3A48F` (moyen, oreilles/museau) / `#7A5443` (foncé, détails)
- Pas de contours noirs/outline — les formes se distinguent par blocs de couleur et légères variations de teinte
- Silhouette ronde, mignonne, expression neutre-douce (pas de bouche visible sur le cochon)

## Icônes et pictogrammes
- **Emojis natifs** utilisés comme icônes principales (📖 🔢 🎵) plutôt que des icônes vectorielles custom — simple, coloré, reconnaissable pour un jeune public
- Petits pictogrammes géométriques faits main pour les éléments récurrents : diamant (score, `transform: rotate(45deg)`), ballon (progression/récompense, ellipse + fil), barres de progression (rectangles arrondis de tailles croissantes)

## Ambiance générale
Chaleureux, doux, pastel-terreux (palette terracotta/ocre/crème plutôt que couleurs vives saturées), très arrondi, sans contours durs, ombres légères façon "flottant". Aucune illustration importée pour l'instant — tout est généré en CSS pur (formes + couleurs). Pour rester cohérent : **illustrations en aplats de couleurs pastel, formes rondes/organiques, sans contour noir, dans cette palette terracotta/ocre/sauge**.
