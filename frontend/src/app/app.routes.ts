import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { SignupComponent } from './features/auth/signup.component';
import { LayoutComponent } from './shared/components/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CasesComponent } from './features/cases/cases.component';
import { UsersComponent } from './features/users/users.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cases', component: CasesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'analytics', component: AnalyticsComponent },
      // Fallback for settings
      { path: 'settings', component: UsersComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
