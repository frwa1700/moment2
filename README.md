# Moment 2 i kursen DT173G - Webbutveckling III

## Installation

## Beskrivning

### Katalogstruktur
Katalogstrukturen som skapas är följande:
````
.
|____dev
|    |____css
|    |____images
|    |____js
|____build
|    |____css
|    |____images
|    |____jss
|____src
|    |____css
|    |____images
|    |____js
|    |____html
````

### Följande plugins används
1. gulp-newer - Används för att se om en fil har ändrats eller är ny.
2. gulp-inject - Injicerar css- och js-filer i HTML-filer.
3. gulp-imagemin - Komprimering av bilder.
4. gulp-concat - Slår ihop filer.
5. gulp-clean-css - Minifierar CSS-filer.
6. gulp-uglify - Minifierar JS
6. browser-sync - Webserver som körs för att kunna ladda om sidor vid ändringar.
7. run-sequence - Köra "tasks" i sekvenser.
8. del - Radera filer.


### Tasks
#### 

#### images:copy
Kopierar och komprimerar bilder från _källkods-filer_ (src) till _utvecklings-filer_ (dev).

#### image:build
Kopierar och komprimerar bilder från _källkods-filer_ (src) till _färdiga filer_ (build).

#### html:copy
Kopierar HTML-filer från _källkods-filer_ (src) till _utvecklings-filer_ (dev).

#### fonts:copy
Kopierar typsnitt från _källkods-filer_ (src) till _utvecklings-filer_ (dev).

#### fonts:build
Kopierar typsnitt från _källkods-filer_ (src) till _utvecklings-filer_ (dev).

#### css:copy
Funktion: `Flytta och bearbeta filer`
Infil(er): `folder.srcCSS + '*.css'`
Utfil: `folder.devCSS + 'style.css'`
Kopierar och slår ihop CSS-filer från _källkods-filer_ (src) till _utvecklings-filer_ (dev).

#### css:build

#### js:copy

#### js:build

#### pages:create

#### pages:build

#### del:dev

#### start-server

#### start-watchers