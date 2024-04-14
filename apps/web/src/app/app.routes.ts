import { Route } from '@angular/router';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('@notes/web/app/features/notes/notes.component').then(c => c.NotesComponent)
    },
    { 
        path: '', 
        redirectTo: '', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        pathMatch: 'full',  
        component: NotFoundComponent
    }
];
