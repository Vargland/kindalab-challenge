import { Routes } from '@angular/router';
import { ROUTES } from './constants';
import { ErrorComponent, HomeComponent } from '@pages';


export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTES.HOME,
        pathMatch: 'full'
    },
    {
        component: HomeComponent,
        path: ROUTES.HOME
    },
    {
        path: ROUTES.NOT_FOUND,
        component: ErrorComponent
    },
    {
        path: '**',
        redirectTo: ROUTES.NOT_FOUND
    },
];
