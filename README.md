# Vía 109

Application pour apprendre le code de la route cubain et préparer l'examen théorique du permis.

PWA installable, en espagnol, qui fonctionne hors ligne. Aucun compte ni serveur : la
progression reste sur l'appareil. En ligne sur https://via109.enockbinsamou.com.

## Fonctionnalités

- **Aprender** : panneaux par catégorie (peligro, prioridad, prohibición, obligación,
  información, orientación…) et règles illustrées (peatones, intersecciones, agente, accidente)
- **Quiz** : questions par catégorie ou aléatoires, reprise d'un quiz interrompu, correction
- **Examen** : simulation de 30 questions en 30 minutes, corrigée à la fin
- **Progreso** et **Guardados** : statistiques et questions ratées à retravailler
- **Hors ligne** : toute l'application est mise en cache à la première visite

## Démarrage

Node.js 22 est requis (voir `.node-version`).

```bash
npm ci
npm run dev       # http://localhost:8080
npm run build     # version de production dans dist/
npm run preview   # le service worker n'est actif qu'ici
npm test
```

## Structure

```
src/
├── screens/      un écran par route
├── components/   navigation, cartes, questions, scores
├── data/static/  panneaux, questions et règles (JSON et TS)
├── utils/        progression dans localStorage (clés pc_v1_*)
└── App.tsx       routes
public/
├── signals/      images des panneaux
├── illustrations/
└── icons/        icônes de l'application
```

Le manifeste et le service worker sont configurés dans `vite.config.ts` (vite-plugin-pwa).

## Déploiement

Cloudflare Pages publie la branche `main` à chaque push (préréglage React (Vite),
`npm run build`, dossier `dist`, `NODE_VERSION=22`). `public/_headers` empêche le navigateur de
garder en cache une ancienne version du service worker.

## Contenu

Panneaux et règles viennent de la Ley No. 109 (Código de Seguridad Vial) de la République de
Cuba et du matériel d'étude officiel remis aux candidats. L'application n'est pas un produit
officiel.

Le quiz « Peligro » n'a pas encore de questions (`src/data/static/questions_peligro.json`).

## Licence

[MIT](LICENSE) © Enock Salomon Binsamou. Le contenu réglementaire appartient à sa source
officielle.
