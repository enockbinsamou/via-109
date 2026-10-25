# JOURNAL : Vía 109

> Ce qui a été fait, dans l'ordre, le plus récent en haut. Une entrée par séance de travail.
> Ce fichier permet de reprendre le travail sans relire tout le dépôt. Il est versionné : il
> voyage avec le projet.

## 2026-10-25

**Fait.** PWA installable et entièrement utilisable hors ligne (`6fd686f`, fusionné dans `main`).
En ligne sur https://via109.enockbinsamou.com (Cloudflare Pages, projet `via-109`).
- Icônes 192, 512 et 512 maskable tirées du logo « V » de l'en-tête, à la place d'une photo de
  64 px.
- Manifeste complet : `id`, `scope`, `lang: es`, `theme_color` aligné sur `--primary` (`#1F5875`).
- Précache : 244 fichiers uniques au lieu de 436 entrées, la moitié en double.
- `_headers` : `no-cache` sur `sw.js` et le manifeste, `immutable` sur `/assets/*`.
- Vérifié sur le domaine : aucune erreur d'installabilité Chrome, écrans testés réseau coupé.
- Lighthouse : performance 97, accessibilité 100, SEO 100.
- `zod` et `@hookform/resolvers` retirés (jamais importés) : 24 → 8 vulnérabilités, aucune livrée
  dans le build.

**Décidé.** Lighthouse 12 n'a plus de catégorie PWA : l'installabilité se contrôle par
`Page.getInstallabilityErrors` (Chrome DevTools Protocol).

**Ensuite.** Production sur `main` dans Cloudflare (Settings > Builds > Branch control). Remplir
`questions_peligro.json`, vide : le quiz Peligro n'a aucune question. Test d'installation sur un
vrai téléphone.

**Attention.** Les 8 vulnérabilités restantes (Vite, esbuild, Tailwind, React Router) demandent
des montées de version majeure.
