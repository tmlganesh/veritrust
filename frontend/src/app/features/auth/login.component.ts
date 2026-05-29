import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex bg-white">
      <!-- Left Side: Branding -->
      <div class="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden">
        <div class="relative z-10 flex flex-col justify-between p-12 w-full">
          <!-- Logo -->
          <div class="flex items-center">
            <span class="ml-3 text-2xl font-bold tracking-tight text-white">veritrust</span>
          </div>

          <!-- Content -->
          <div class="max-w-md">
            <h1 class="text-4xl font-display font-bold text-white leading-tight mb-6">
              Employee Verification,<br>Simplified.
            </h1>
            <p class="text-lg text-primary-200 leading-relaxed mb-8">
              Streamline background checks, manage verification records, and maintain compliance — all from one platform.
            </p>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-white text-sm font-medium">Real-time verification tracking</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-white text-sm font-medium">Role-based access control</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-white text-sm font-medium">Enterprise-grade compliance</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <p class="text-sm text-primary-300">© 2026 VeriTrust. All rights reserved.</p>
        </div>

        <!-- Subtle background pattern -->
        <div class="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
      </div>

      <!-- Right Side: Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div class="w-full max-w-[400px]">
          <!-- Mobile logo -->
          <div class="flex items-center mb-8 lg:hidden">
            <span class="text-2xl font-bold tracking-tight text-text-primary">veritrust</span>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-display font-bold text-text-primary">
              Welcome back
            </h2>
            <p class="mt-2 text-sm text-text-secondary">
              Don't have an account? <a routerLink="/signup" class="text-primary-600 font-medium hover:text-primary-700">Sign up</a>
            </p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <!-- User ID / Email -->
            <div>
              <label for="email" class="input-label">User ID / Email</label>
              <input id="email" formControlName="email" type="email" autocomplete="email"
                     class="input" placeholder="Enter your email">
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="input-label">Password</label>
              <input id="password" formControlName="password" type="password" autocomplete="current-password"
                     class="input" placeholder="Enter your password">
            </div>

            <!-- Role Selector -->
            <div>
              <label for="role" class="input-label">Role</label>
              <select id="role" formControlName="role" class="input appearance-none">
                <option value="admin">Administrator</option>
                <option value="user">Verification Officer</option>
              </select>
            </div>

            <!-- Remember + Forgot -->
            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input type="checkbox" class="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500">
                <span class="ml-2 text-sm text-text-secondary">Remember me</span>
              </label>
              <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">Forgot password?</a>
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="loginForm.invalid || isLoading"
                    class="btn-primary w-full py-2.5" id="login-submit-btn">
              <ng-container *ngIf="!isLoading">Sign In</ng-container>
              <ng-container *ngIf="isLoading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </ng-container>
            </button>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['admin']
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
      });
    }
  }
}
