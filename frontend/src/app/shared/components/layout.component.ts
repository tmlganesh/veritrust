import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-surface overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="flex flex-col bg-white border-r border-border transition-all duration-200 z-20"
        [ngClass]="sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'"
      >
        <!-- Logo -->
        <div class="h-16 flex items-center px-5 border-b border-border shrink-0">
          <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span *ngIf="!sidebarCollapsed" class="ml-3 font-display font-bold text-lg text-text-primary tracking-tight">VeriTrust</span>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3">
          <div *ngIf="!sidebarCollapsed" class="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-3 px-3">Main</div>
          <div class="space-y-0.5">
            <a routerLink="/dashboard" routerLinkActive="bg-primary-50 text-primary-700 font-semibold"
               class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
               [ngClass]="sidebarCollapsed ? 'justify-center' : ''"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span *ngIf="!sidebarCollapsed" class="ml-3">Dashboard</span>
            </a>
            <a routerLink="/cases" routerLinkActive="bg-primary-50 text-primary-700 font-semibold"
               class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
               [ngClass]="sidebarCollapsed ? 'justify-center' : ''"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span *ngIf="!sidebarCollapsed" class="ml-3">Records</span>
            </a>
            <a routerLink="/users" routerLinkActive="bg-primary-50 text-primary-700 font-semibold"
               class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
               [ngClass]="sidebarCollapsed ? 'justify-center' : ''"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span *ngIf="!sidebarCollapsed" class="ml-3">User Management</span>
            </a>
            <a routerLink="/analytics" routerLinkActive="bg-primary-50 text-primary-700 font-semibold"
               class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
               [ngClass]="sidebarCollapsed ? 'justify-center' : ''"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span *ngIf="!sidebarCollapsed" class="ml-3">Activity Logs</span>
            </a>
          </div>

          <div *ngIf="!sidebarCollapsed" class="text-[11px] font-semibold text-text-secondary uppercase tracking-widest mb-3 mt-8 px-3">System</div>
          <div class="mt-2 space-y-0.5" [ngClass]="sidebarCollapsed ? 'mt-6' : ''">
            <a routerLink="/settings" routerLinkActive="bg-primary-50 text-primary-700 font-semibold"
               class="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
               [ngClass]="sidebarCollapsed ? 'justify-center' : ''"
            >
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span *ngIf="!sidebarCollapsed" class="ml-3">Settings</span>
            </a>
          </div>
        </nav>

        <!-- Collapse Toggle -->
        <div class="px-3 py-3 border-t border-border">
          <button (click)="toggleSidebar()"
                  class="w-full flex items-center justify-center px-3 py-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors">
            <svg class="w-5 h-5 transition-transform" [ngClass]="sidebarCollapsed ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col w-0 overflow-hidden">
        <!-- Top Navigation Bar -->
        <header class="h-16 bg-white border-b border-border flex items-center justify-between px-6 shrink-0 z-10">
          <div class="flex items-center flex-1 max-w-lg">
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="text"
                     class="input pl-10 py-2 bg-surface border-transparent focus:bg-white focus:border-border"
                     placeholder="Search records, users...">
            </div>
          </div>

          <div class="flex items-center space-x-3 ml-4">
            <!-- Notifications -->
            <button (click)="showNotifications()" class="relative p-2 rounded-lg text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors" id="notifications-btn">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-error ring-2 ring-white"></span>
            </button>

            <!-- Divider -->
            <div class="h-8 w-px bg-border"></div>

            <!-- User Avatar -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span class="text-sm font-semibold text-primary-700">AD</span>
              </div>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-text-primary leading-tight">Admin User</p>
                <p class="text-xs text-text-secondary leading-tight">Administrator</p>
              </div>
            </div>

            <!-- Logout -->
            <button (click)="logout()"
                    class="btn-ghost text-text-secondary hover:text-error px-2.5 py-2" id="logout-btn">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto">
          <div class="py-8 px-6 md:px-8 max-w-7xl mx-auto">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent {
  sidebarCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  showNotifications() {
    alert('You have 2 pending verification escalations.');
  }

  logout() {
    localStorage.removeItem('vip_token');
    this.router.navigate(['/login']);
  }
}
