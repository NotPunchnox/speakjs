# speak.js ( client )
## le côté client de speak.js

Speak.js est une petite application de chat chiffré qui fonctionne avec votre terminale 
_Il y aura des mises à jours dans le future pour éditer les messages..._

Les données stockées sont les messages :

```ts
return {
   username: String,
   content: String,
   expire: Number,
   CreatedAt: Date
}
```

Les messages sont donc chiffrés et expirent au bout de 5 heures, pour garantir l'anonymat.

Le côté serveur se trouve ici: https://github.com/NotPunchnox/speakjs-server


> **Installer les dependances:**
> ```
> npm install -g
> ```

> start:
> ```
> npm run start
> ```

![ScreenShot](https://cdn.discordapp.com/attachments/846110234346127361/846351623390625832/Capture.PNG)

![ScreenShot](https://cdn.discordapp.com/attachments/846110234346127361/846351625710075974/Capture1.PNG)

![ScreenShot](https://cdn.discordapp.com/attachments/846110234346127361/846351625710075974/Capture1.PNG)

![ScreenShot](https://cdn.discordapp.com/attachments/841109687432904704/846382710306111548/Capture.PNG)
