# Les gadgets indispensables — avec ClaudIA

*Premier bloc de la série ClaudIA sur les enchères gadget.*

Six leçons de bridge consacrées aux enchères gadget indispensables : Roudi (check-back Stayman),
Puppet Stayman, Drury, contre Spoutnik, Landy, Texas. Chaque leçon comporte un cours
imprimable sur deux pages, une base de 25 donnes et des quiz de cinq donnes tirées au
hasard. Les notes sont conservées sur l'appareil seul (préfixe `gadget:`).

## Contenu du dépôt

Tous les fichiers sont **à plat, à la racine** — aucun sous-dossier.

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page d'accueil, liste des leçons et rappel des notes |
| `lecon-01-roudi.html` … `lecon-06-texas.html` | Une leçon par page, autonome (styles et moteur inclus) |
| `memo.html` | Mémo de la série : les six conventions en un document imprimable |
| `manifest.webmanifest` | Déclaration de l'application installable |
| `sw.js` | Fonctionnement hors ligne |
| `icon-180/192/512.png`, `icon-512-maskable.png` | Icônes |
| `.nojekyll` | Désactive le traitement Jekyll de GitHub Pages |

## Mise en ligne sur GitHub Pages

1. Créer un dépôt **public** et vide (sans README généré automatiquement).
2. « Add file » → « Upload files », puis déposer **le contenu** de ce dossier — pas le
   dossier lui-même. Les quatorze fichiers doivent apparaître à la racine du dépôt, et
   `index.html` doit se trouver au premier niveau.
3. Le fichier `.nojekyll` étant caché, il n'est pas repris par un glisser-déposer depuis
   le Finder ou l'Explorateur. En cas d'oubli : « Add file » → « Create new file », nommer
   le fichier `.nojekyll`, le laisser vide et valider.
4. Settings → Pages → Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
5. Attendre la fin du déploiement (onglet Actions), puis ouvrir
   `https://<compte>.github.io/<dépôt>/`.

## Installation sur Android

Ouvrir l'adresse dans Chrome, puis le menu ⋮ → « Installer l'application » (ou
« Ajouter à l'écran d'accueil »). Le bouton d'installation de la page d'accueil
déclenche la même invite lorsque le navigateur la propose.

Un fichier HTML simplement téléchargé ne fonctionne pas sur mobile : l'installation exige
une adresse `https://`, ce que fournit GitHub Pages.

## Installation sur iOS

Ouvrir l'adresse dans Safari, puis Partager → « Sur l'écran d'accueil ».

## En cas d'écran blanc ou de page non mise à jour

Un ancien service worker peut resservir une version périmée. Sur Chrome Android :
Paramètres → Paramètres des sites → Données stockées → sélectionner le site → Supprimer.
Puis recharger. Changer de dépôt suffit également, l'adresse étant différente.
