# CLAUDE — PROTOCOLE DE TEST PLAYWRIGHT (Legendary Cave Frontend)

> **Ce fichier est la loi.** Claude lit ce fichier en entier avant de commencer toute session de test. Aucune exception.

---

## VUE D'ENSEMBLE

Quand une **spec** (feature, page, composant, flux) est fournie a Claude, Claude doit :

1. **Tester exhaustivement** avec Playwright — chaque bouton, chaque page, chaque interaction
2. **Consigner tous les bugs** dans `BUGS.md`
3. **Corriger chaque bug** liste dans `BUGS.md`
4. **Mettre a jour `commit.txt`** et le changelog
5. **Ne jamais push** — jamais, sous aucun pretexte

---

## PHASE 1 — TESTS PLAYWRIGHT EXHAUSTIFS

### Regle fondamentale

**Rien ne passe.** Si Claude a un doute sur le comportement d'un element, il le teste. Si Claude pense que quelque chose fonctionne, il le teste quand meme.

### Ce que Claude doit tester pour chaque spec

#### Pages et navigation

- [ ] La page se charge sans erreur console (0 erreur, 0 warning critique)
- [ ] Le titre de la page est correct
- [ ] L'URL est correcte (y compris les parametres dynamiques comme `?section=souvenirs`)
- [ ] La page est responsive (mobile 375px, tablette 768px, desktop 1280px)
- [ ] Le bouton retour navigateur fonctionne correctement
- [ ] Le rechargement de page (`F5`) ne casse pas l'etat
- [ ] La page 404 s'affiche pour les routes inconnues

#### Routes de l'application

| Route | Page | Ce qui doit s'afficher |
|-------|------|----------------------|
| `/` | Home | Hero avec carousel photos, stats, section preview |
| `/galerie` | Galerie | Annuaire alumni avec recherche et filtres |
| `/galerie?section=souvenirs` | Galerie | Section photos avec carousel |
| `/about` | A Propos | Stats, tabs (Histoire/Valeurs/Domaines/Parcours) |
| `/contact` | Contact | Formulaire de contact avec sidebar |
| `/*` | 404 | Page "404 - Page introuvable" avec bouton retour |

#### Header et navigation

- [ ] Le header est fixe en haut de page (`position: fixed`)
- [ ] Le logo redirige vers `/`
- [ ] Chaque lien de navigation redirige vers la bonne page
- [ ] Le lien actif est mis en evidence visuellement (couleur amber)
- [ ] Le menu hamburger s'affiche sur mobile (< 768px)
- [ ] Le menu mobile s'ouvre et se ferme correctement
- [ ] Le menu mobile se ferme automatiquement au changement de route
- [ ] Le header change d'apparence au scroll (background plus opaque)

#### Footer

- [ ] Les liens du footer utilisent `<Link>` de React Router (pas de rechargement complet)
- [ ] Le lien "Galerie" pointe vers `/galerie`
- [ ] Le lien "A Propos" pointe vers `/about`
- [ ] Le lien "Contact" pointe vers `/contact`
- [ ] Le footer s'affiche sur toutes les pages

#### Boutons et actions

- [ ] **Chaque bouton** est teste individuellement (clic, resultat attendu)
- [ ] Les boutons de navigation declenchent bien le changement de route
- [ ] Le bouton "Explorer la Galerie" sur la home redirige vers `/galerie`
- [ ] Le bouton "Voir toute la galerie" redirige vers `/galerie?section=souvenirs`
- [ ] Le bouton "Retour a l'accueil" sur la 404 redirige vers `/`

#### Page Home (`/`)

- [ ] Le carousel de fond change d'image toutes les 6 secondes
- [ ] Les dots du carousel permettent de naviguer entre les images
- [ ] Les stats affichent les bonnes valeurs (65+ etudiants, 100+ photos, 2027)
- [ ] Les cartes preview affichent les images et descriptions
- [ ] L'animation de montage (fade-in) fonctionne au chargement

#### Page Galerie (`/galerie`)

- [ ] L'annuaire affiche les 65 alumni
- [ ] La recherche filtre par nom, entreprise, ville
- [ ] Les filtres par domaine fonctionnent (IA, Web, Cyber, Data, DevOps)
- [ ] Le compteur de resultats se met a jour en temps reel
- [ ] Le bouton X vide le champ de recherche
- [ ] Cliquer sur une carte alumni ouvre le modal
- [ ] Le toggle "Annuaire Alumni" / "Nos Souvenirs" fonctionne

#### Page Galerie - Section Souvenirs

- [ ] Les photos se chargent depuis l'API (`/api/photos/souvenirs`)
- [ ] L'etat de chargement "Chargement des photos..." s'affiche
- [ ] Si l'API echoue, "Aucune photo disponible" s'affiche (pas de crash)
- [ ] Le carousel affiche la premiere photo
- [ ] Les boutons < et > du carousel changent de photo
- [ ] Les indicateurs (dots) sous le carousel fonctionnent
- [ ] Le compteur "1 / N" se met a jour
- [ ] Les photos dans la grille s'affichent correctement
- [ ] `objectPosition: 'center top'` est applique sur les images

#### Modal Alumni

- [ ] Le modal s'ouvre au clic sur une carte
- [ ] Le modal se ferme via le bouton X
- [ ] Le modal se ferme via clic en dehors
- [ ] Les initiales s'affichent dans l'avatar
- [ ] Le nom, role, entreprise, localisation sont affiches
- [ ] Le badge de domaine s'affiche
- [ ] Le statut Disponible/Indisponible s'affiche
- [ ] Le bouton "Contacter" redirige vers `/contact`

#### Page A Propos (`/about`)

- [ ] Les 4 stats s'affichent (65 etudiants, 3 annees, 50+ projets, 8 domaines)
- [ ] Les 4 tabs de navigation fonctionnent (Histoire, Valeurs, Domaines, Parcours)
- [ ] Le contenu change au clic sur chaque tab
- [ ] La section Histoire affiche le texte et le badge "Promo 2027"
- [ ] La section Domaines affiche les barres de progression
- [ ] La timeline affiche les 4 etapes (2022, 2023, 2024, 2027)

#### Page Contact (`/contact`)

- [ ] Le selecteur de type de demande fonctionne (5 types)
- [ ] Soumission avec donnees valides affiche "Message envoye"
- [ ] Soumission avec champs vides est bloquee (validation HTML `required`)
- [ ] Le spinner s'affiche pendant l'envoi
- [ ] Le formulaire se reinitialise apres envoi reussi
- [ ] La sidebar affiche l'email et les infos

#### Responsive

- [ ] Les grilles passent en 1 colonne sur mobile (< 768px)
- [ ] Les grilles passent en 2 colonnes sur tablette (769px - 1024px)
- [ ] Le padding est reduit sur mobile
- [ ] Le footer s'empile en colonne sur mobile
- [ ] Le carousel est reduit en hauteur sur mobile (300px)

### Orthographe et typographie

- [ ] Aucun emoji ou caractere special (pas de ·, —, ✦, ●, ○, «, », ∞)
- [ ] Pas de texte en MAJUSCULES sauf les petits badges de categorie
- [ ] Pas de font `Syne Mono` — uniquement `DM Sans` et `Cormorant Garamond`
- [ ] Aucun gradient (linear-gradient, radial-gradient) dans le rendu visible

### Comment Claude doit ecrire les tests

```typescript
// Structure attendue pour chaque test Playwright
test.describe('Legendary Cave - NomDeLaPage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('bouton X declenche Y', async ({ page }) => {
    // Arrange
    // Act
    // Assert
    await expect(page.locator('...')).toBeVisible({ timeout: 5000 });
  });

});
```

### Ordre d'execution des tests

1. Tests de rendu initial (la page charge)
2. Tests du header et de la navigation
3. Tests du happy path (flux nominal)
4. Tests des cas limites (recherche vide, API down)
5. Tests responsive (mobile, tablette)

---

## PHASE 2 — CONSIGNATION DES BUGS DANS `BUGS.md`

### Format obligatoire pour chaque bug

```markdown
## BUG-[NUMERO] — [Titre court et descriptif]

- **Statut** : Ouvert | En cours | Corrige
- **Severite** : Critique | Haute | Moyenne | Basse
- **Page / Composant** : `NomDuFichier.js` ou `/url/de/la/page`
- **Test Playwright** : `e2e/specs/nom_du_test.spec.ts > nom du test`

### Reproduction

1. Aller sur `[url]`
2. Cliquer sur `[bouton]`
3. Observer `[comportement actuel]`

### Comportement attendu

[Description precise de ce qui devrait se passer]

### Comportement observe

[Description precise de ce qui se passe reellement]

### Logs / Erreurs

[Coller ici les erreurs console, stack traces]

### Correction appliquee

[Remplir uniquement apres correction]
```

### Regles de severite

| Severite | Critere |
|----------|---------|
| **Critique** | Crash, page blanche, erreur non geree (ex: Cannot read properties of undefined) |
| **Haute** | Fonctionnalite cassee (carousel ne slide pas, modal ne s'ouvre pas) |
| **Moyenne** | Comportement incorrect mais l'application reste utilisable |
| **Basse** | Cosmetique, micro-decalage visuel |

### Regle absolue

**Claude ne laisse pas un seul bug sans entree dans `BUGS.md`.** Meme un warning console, meme un decalage — il faut le noter.

---

## PHASE 3 — CORRECTION DES BUGS

Claude lit `BUGS.md` du premier au dernier bug, dans l'ordre de severite (Critique puis Basse).

### Pour chaque bug

1. **Lire** la reproduction et le comportement attendu
2. **Localiser** le fichier source concerne
3. **Corriger** le code
4. **Relancer** le test Playwright correspondant pour verifier la correction
5. **Mettre a jour** le statut dans `BUGS.md` : `Corrige`
6. **Renseigner** la section "Correction appliquee"

### Regles de correction

- Ne pas corriger plusieurs bugs dans le meme bloc de code sans verifier que les corrections ne s'annulent pas
- Si une correction en introduit une autre, creer un nouveau `BUG-[N+1]` immediatement
- Ne jamais marquer `Corrige` sans avoir relance le test

---

## PHASE 4 — MISE A JOUR DE `commit.txt` ET DU CHANGELOG

### Fichier `commit.txt`

`commit.txt` contient les commandes git pretes a l'emploi. Claude le met a jour a la fin de chaque session.

#### Format exact a respecter

```
== FRONTEND (Legendary-cave-front) ==
git add src/pages/galerie.js src/components/AlumniModal.js
git commit -m "fix(galerie): corriger le crash du carousel quand les photos sont vides"

git add src/tokens.js src/pages/home.js src/pages/about.js
git commit -m "refactor(tokens): centraliser les design tokens dans un module partage"

git add CHANGELOG.md
git commit -m "docs(changelog): ajouter les corrections de la session"
```

#### Regles de regroupement des commits

- Regrouper dans un meme commit les fichiers qui forment une unite logique coherente
- Si plusieurs corrections independantes touchent des fichiers differents, faire un commit par correction
- `CHANGELOG.md` peut apparaitre dans plusieurs commits distincts

#### Types de commit autorises

| Type | Usage |
|------|-------|
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement de comportement |
| `docs` | Mise a jour de la documentation |
| `chore` | Maintenance, dependances |
| `feat` | Nouvelle fonctionnalite |

#### Ce que Claude ne met JAMAIS dans `commit.txt`

- Les fichiers du dossier `e2e/` (tests Playwright)
- Les fichiers de configuration de test
- `BUGS.md`

> **Les fichiers de test ne sont jamais dans un commit de production. Jamais.**

### Changelog

Ajouter une entree dans `CHANGELOG.md` :

```markdown
## [Unreleased]

### Fixed
- [BUG-001] Description courte du bug corrige (#composant)

### Changed
- Description d'un changement de comportement si applicable
```

---

## GESTION DES BRANCHES

### Branche de travail

Claude travaille **toujours** sur la branche `dev`. Jamais directement sur `main`.

### Avant de commencer une session

```bash
git branch          # Verifier la branche courante
git checkout dev    # Si pas deja sur dev
```

### Si la branche `dev` n'existe pas

```bash
git checkout -b dev
```

### Regles

| Regle | Detail |
|-------|--------|
| Branche de travail | `dev` uniquement |
| Commits sur `main` | **Interdit** — main est la branche de production |
| Commits sur `dev` | **Interdit** — Claude ne commit jamais, il prepare `commit.txt` |
| Merge `dev` vers `main` | Uniquement par l'utilisateur, jamais par Claude |
| `commit.txt` | Les commandes sont preparees pour que l'utilisateur les execute |

---

## INTERDICTIONS ABSOLUES

| Interdit | Raison |
|----------|--------|
| `git commit` | Claude ne commit jamais — il prepare `commit.txt` pour l'utilisateur |
| `git push` | Claude ne push jamais |
| `git push --force` | Interdit sans exception |
| Ajouter `e2e/` dans `commit.txt` | Les tests ne partent jamais en production |
| Marquer un bug `Corrige` sans relancer le test | Une correction non verifiee n'est pas une correction |
| Ignorer un bug sans l'ecrire dans `BUGS.md` | Tout est trace |
| Ajouter des gradients, emojis, Syne Mono | Le design doit rester sobre |

---

## CHECKLIST DE FIN DE SESSION

Avant de declarer la session terminee, Claude verifie chaque point :

```
[ ] Tous les tests Playwright de la spec ont ete ecrits et lances
[ ] Tous les liens du header et du footer ont ete testes
[ ] Tous les bugs detectes sont dans BUGS.md avec statut a jour
[ ] Tous les bugs Critique et Haute sont corriges et retestes
[ ] commit.txt est mis a jour au bon format
[ ] commit.txt ne contient AUCUN fichier e2e/ ni BUGS.md
[ ] CHANGELOG.md est mis a jour
[ ] Aucun git push n'a ete execute
```

---

## STRUCTURE DE REFERENCE

```
Legendary-cave-front/
├── e2e/                        # JAMAIS dans commit.txt
│   └── specs/
│       └── *.spec.ts
├── public/
│   └── index.html              # Google Fonts charge ici
├── src/
│   ├── tokens.js               # Design tokens partages (C.amber, C.deep, etc.)
│   ├── App.js                  # Router principal
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── AlumniCard.js
│   │   └── AlumniModal.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── galerie.js
│   │   ├── about.js
│   │   ├── contact.js
│   │   └── NotFound.js
│   ├── data/
│   │   └── alumni.js           # 65 alumni statiques
│   ├── services/
│   │   └── apiService.js       # getSouvenirs(), getProfiles()
│   ├── routes/
│   │   └── routes.js
│   └── styles/
│       └── index.css           # Tailwind + responsive overrides
├── BUGS.md                     # Registre des bugs (jamais dans commit.txt)
├── CHANGELOG.md                # A mettre a jour a chaque session
├── commit.txt                  # Commandes git pretes a l'emploi
├── LISMOI.md                   # Ce fichier
└── package.json
```

---

*Ce protocole s'applique a chaque spec, chaque fois, sans exception.*
