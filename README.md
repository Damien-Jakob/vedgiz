# Vedjiz

Ionic exercise. Application developed for the MOB1 module. Managing orders and stock of a small market.

## Serve

    ionic lab
    
Ouvrir l'application dans Chrome, et utiliser l'extension 
[Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 
Sinon, le browser bloque les requêtes envers un autre serveur.

## Génération automatique

    ionic generate page myPageName
    ionic generate service myServiceName
    ng generate class models/Student

## Provider
Permet de partager une seule instance d'un service entre toutes les pages.

Dans le provider : `@injectable()`.

Dans app.modules.ts : `providers: [myNewProvider]`

Dans les pages : `constructor(prov: MyNewProvider)`

## Navigation
1. Générer la page : `ionic generate page myPageName`
1. Si besoin, modifier la route dans `/src/app/app-routing.module.ts`
    * Pour utiliser des données dans l'url : `path: 'users/:id'`
1. Injection de dépendance de Router. Dans `myPageName.page.ts`
    * `import {Router} from "@angular/router";`
    *  `constructor(private router: Router)`
1. Navigation : `router.navigate(['/users'])`, `router.navigate(['/users', 63])`
1. Pour utiliser les données de l'url :
    * Injection de dépendance de ActivatedRoute : 
        * `import {ActivatedRoute} from "@angular/router";`
        * `constructor(protected route: ActivatedRoute)`
    * `this.route.snapshot.paramMap.get('id')`

## Utiliser l'API
Utiliser HttpClient. En effet, Http ne fonctionne pas avec le browser.

### Utilisation

Dans `src/app/app.module.ts` :
    
```typescript
import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
  imports: [
    HttpClientModule,
  ],
})
```
    
Exemple de page (`src/pages/films/films.ts`) :

```typescript
import { HttpClient } from '@angular/common/http'; 
 
export class FilmsPage {
  films: Observable<any>;
 
  constructor(public httpClient: HttpClient) { 
    this.films = this.httpClient.get('https://swapi.co/api/films');
    this.films.subscribe(answer => {
      console.log('my answer: ', answer);
      console.log('my data: ', answer.data);
    });
  }
}
```

## Variables d'environement
Dans /src/environments.

Utilisation :
```typescript
import {environment} from "../environments/environment";

if(environment.production)
```

### Utiliser les variables de production

    ionic build --prod

## Form
Importer ReactiveFormsModule dans myPage.module.ts

## Emulation
Cordova

### Nouvelle app

    ionic start myApp tabs --capacitor

### Ajouter à une app existante

    ionic integrations enable capacitor

### Initialisation

    npx cap init [appName] [appId]

* appName : nom de l'app
* appId : domaine idantifiant l'app, ex : ch.cpnv.vedjiz

### Build initial
Le projet doit avoir été build au moins une fois pour ajouter des plateformes natives.

    ionic build
    
### Ajout de plateformes

    npx cap add android
    npx cap add ios
    
### Lancer l'émulation

    npx cap open android

Utilise Android Studio.

    npx cap open ios
    
Xcode.

### Utilisation
Utiliser l'IDE (Android Studio) pour buil, run et deploy.

### Synchronisation
Quand on effectue un build qui modifie le répertoire web :

    npx cap copy

## Storage
https://capacitor.ionicframework.com/docs/getting-started/with-ionic/

### Install

    npm install --save @ionic/storage
    
### Utilisation
Dans `src/app/app.module.ts` :
    
```typescript
import {IonicStorageModule} from "@ionic/storage";
 
@NgModule({
  imports: [
      IonicStorageModule.forRoot(),
    ],
})
```

Dans la page / le service utilisant le storage :
    
```typescript
import {Storage} from "@ionic/storage";
 
constructor(private storage: Storage);
```

ATTENTION, parfois l'IDE oublie d'ajouter l'import. Redémarrer ionic lab peut aussi être nécessaire.

### Inspection sous Chrome
F12 -> Application -> Storage -> IndexedDB -> _ionicstorage



