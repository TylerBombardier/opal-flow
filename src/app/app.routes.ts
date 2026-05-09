import { Routes } from '@angular/router';
import { Lab } from './pages/lab/lab';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    { path: 'lab', component: Lab },
    { path: 'settings', component: Settings },
    { path: '', redirectTo: 'lab', pathMatch: "full" }
];
