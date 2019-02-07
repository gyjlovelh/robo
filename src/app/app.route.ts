import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    // { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
    // {
    //     path: '',
    //     redirectTo: '/login',
    //     pathMatch: 'full'
    // },
    // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoute { }
