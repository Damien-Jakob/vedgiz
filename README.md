# Vedjiz

Application developed dor the MOB1 module.

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

### Initialisation
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

    npm install @ionic-enterprise/offline-storage
    npx cap sync
    
### Utilisation
Remarque : ne marche pas avec dans le browser.

Dans `src/app/app.module.ts` :
    
```typescript
import { SQLite } from '@ionic-enterprise/offline-storage/ngx';
 
@NgModule({
  providers: [
      SQLite
    ],
})
```




