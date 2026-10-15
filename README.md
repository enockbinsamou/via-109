# Vía 109

A mobile-first progressive web app to learn Cuban road signs and prepare for the
theory part of the Cuban driving licence exam.

*Aplicación web progresiva para aprender las señales de tránsito y preparar el
examen teórico de conducción en Cuba.*

## What it does

- **Aprender**: road signs and rules by category (warning, prohibition, obligation,
  information, horizontal markings, traffic officer signals, pedestrians,
  priority at intersections, accidents).
- **Quiz**: multiple-choice questions, resumable, with detailed results.
- **Examen**: a simulation of the official theory exam.
- **Progreso** and **Guardados**: progress statistics and saved questions.
- Installable and usable offline (PWA). No account, no backend: progress stays
  on the device (`localStorage`).

## Content source

All signs, rules and situations come from the **Ley No. 109 (Código de Seguridad
Vial)** of the Republic of Cuba and the official study material the Cuban State
provides to licence candidates. This is public material; the app only reorganises
it for learning. It is not an official product.

## Stack

React 18 · TypeScript · Vite · React Router · Tailwind CSS · shadcn/ui ·
vite-plugin-pwa · Vitest.

## Run it locally

```sh
npm ci
npm run dev      # http://localhost:8080
npm run build    # production build in dist/
npm test
```

## Author

Built by **Enock Salomon Binsamou**.

## License

Code under the [MIT License](LICENSE). The regulatory content belongs to its
official source (Ley No. 109).
