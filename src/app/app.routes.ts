import { Routes } from '@angular/router';
import { RegistroFormComponent } from './features/registro/components/registro-form/registro-form.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'register', component: RegistroFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
