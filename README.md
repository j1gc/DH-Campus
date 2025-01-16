# DH-Campus.com

Gebaut von Thanakit, Maya, Niklas und Jonas <br>
Mithilfe von [`Sveltekit`](https://svelte.dev/docs/kit/introduction), [`Tailwindcss`](https://tailwindcss.com/) und [`shadcn-svelte`](https://next.shadcn-svelte.com/) sowie Form logik durch [`Superforms`](https://superforms.rocks/) und form validation durch [`zod`](https://zod.dev/). <br>
<br>
Das Projekt wird über Cloudflare Pages mithilfe von Cloudflare Workers auf die Domäne [`DH-Campus.com`](https://DH-Campus.com) deployed.
## Running Project

Um das Projekt auszuführen  

```bash
# Installiere Dependencies
npm i

# Starte Projekt in Development mode
npm run dev 
```
Für SQL Logik muss der Befehl `npm run preview` anstelle von `npm run dev` ausgeführt werden um lokal richtig zu funktionieren 
## Building

Um das Projekt zu bauen und zu cloudflare pages zu pushen 

```bash
npm run deploy
```