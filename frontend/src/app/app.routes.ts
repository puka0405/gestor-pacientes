import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PacientesComponent } from './components/pacientes/pacientes';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'pacientes', 
    component: PacientesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'doctores',
    loadComponent: () => import('./components/doctores/doctores').then(m => m.DoctoresComponent),
    canActivate: [authGuard]
  },
  {
    path: 'citas',
    loadComponent: () => import('./components/citas/citas').then(m => m.CitasComponent),
    canActivate: [authGuard]
  },

  {
    path: 'doctores-backend',
    loadComponent: () => import('./components/doctores-backend/doctores-backend').then(m => m.DoctoresBackendComponent),
  },

  {
    path: 'pacientes-backend',
    loadComponent: () => import('./components/pacientes-backend/pacientes-backend').then(m => m.PacientesBackendComponent),
  }, {
    path: 'citas-backend',
    loadComponent: () => import('./components/citas-backend/citas-backend').then(m => m.CitasBackendComponent),
  },
  { path: '**', redirectTo: '/login' }
];