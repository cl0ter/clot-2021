# Clot

## Build

1. Install Node.js
2. Build project:

```bash
$ npm i
$ npm run build
```

3. Serve/deploy entire `./build` directory

## Develop

1. Install Node.js
2. Start WDS:

```bash
$ npm i
$ npm run start
```

3. Open http://localhost:3000

## Content

- Edit RU/EN texts here: `./public/texts.json`
- Edit RU/EN content here: `./public/content.json`. `description` field is optional.
- Badly formatted json will log an error to the console and will break site loading.
- Bad video links will break site loading. Always check if provided link is correct and video format is playable by the target browser.`
