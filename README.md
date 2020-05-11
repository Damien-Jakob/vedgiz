# Vedgiz

Application developed dor the MOB1 module.

## Serve

    ionic lab
    
Ouvrir l'application dans Chrome, et utiliser l'extension 
[Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf). 
Sinon, le browser bloque les requêtes envers un autre serveur.

## Requêtes
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
 
  constructor(public navCtrl: NavController, public httpClient: HttpClient) { 
    this.films = this.httpClient.get('https://swapi.co/api/films');
    this.films.subscribe(data => {
      console.log('my data: ', data);
    })
     
      openDetails(film) {
        this.navCtrl.push('FilmDetailsPage', {film: film});
      }
  }
}
```