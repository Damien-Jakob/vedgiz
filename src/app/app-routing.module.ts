import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'error/:errorCategory',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
    },
    {
        path: 'users/me',
        loadChildren: () => import('./users/me/me.module').then(m => m.MePageModule)
    },
    {
        path: 'vegetables',
        loadChildren: () => import('./vegetables/vegetables-index/vegetables-index.module').then(m => m.VegetablesIndexPageModule)
    },
    {
        path: 'vegetables/:id',
        loadChildren: () => import('./vegetables/vegetables-show/vegetables-show.module').then(m => m.VegetablesShowPageModule)
    },
    {
        path: 'subscribe',
        loadChildren: () => import('./subscribe/subscribe.module').then(m => m.SubscribePageModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
    },
    {
        path: 'basket/:id',
        loadChildren: () => import('./basket/basket-show/basket-show.module').then(m => m.BasketShowPageModule)
    },
    {
        path: 'payment/create',
        loadChildren: () => import('./payment/payment-create/payment-create.module').then(m => m.PaymentCreatePageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
