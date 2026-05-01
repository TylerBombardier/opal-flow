import { Routes } from '@angular/router';
import { Lab } from './components/lab/lab';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
    { path: 'lab', component: Lab },
    { path: 'settings', component: Settings },
    { path: '', redirectTo: 'lab', pathMatch: "full" }
];
