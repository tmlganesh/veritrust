import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VerificationService } from '../../core/services/verification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-display-lg text-text-primary font-display">Dashboard</h1>
          <p class="mt-1 text-sm text-text-secondary">Overview of your verification operations.</p>
        </div>
        <div class="flex space-x-3">
          <button class="btn-secondary" (click)="export()">
            <svg class="w-4 h-4 mr-2 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
          <button class="btn-primary" routerLink="/cases">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Record
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div *ngIf="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Total Records -->
        <div class="card p-5" id="stat-total-records">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="inline-flex items-center text-xs font-medium text-success">
              <svg class="w-3.5 h-3.5 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12%
            </span>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-text-primary font-display">{{ stats.total | number }}</p>
            <p class="text-sm text-text-secondary mt-0.5">Total Records</p>
          </div>
        </div>

        <!-- Pending -->
        <div class="card p-5" id="stat-pending-records">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="badge-warning">Needs attention</span>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-text-primary font-display">{{ stats.pending }}</p>
            <p class="text-sm text-text-secondary mt-0.5">Pending Records</p>
          </div>
        </div>

        <!-- Approved -->
        <div class="card p-5" id="stat-approved-records">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-text-primary font-display">{{ stats.approved }}</p>
            <p class="text-sm text-text-secondary mt-0.5">Approved Records</p>
          </div>
        </div>

        <!-- Users -->
        <div class="card p-5" id="stat-users">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <p class="text-2xl font-bold text-text-primary font-display">{{ stats.users }}</p>
            <p class="text-sm text-text-secondary mt-0.5">Active Users</p>
          </div>
        </div>
      </div>

      <!-- Loading skeleton for stats -->
      <div *ngIf="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div *ngFor="let i of [1,2,3,4]" class="card p-5 animate-pulse">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-lg bg-gray-100"></div>
          </div>
          <div class="mt-4">
            <div class="h-7 w-20 bg-gray-100 rounded"></div>
            <div class="h-4 w-28 bg-gray-50 rounded mt-2"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Records Table -->
        <div class="lg:col-span-2 card overflow-hidden" id="recent-records-table">
          <div class="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 class="text-title text-text-primary">Recent Records</h2>
            <a routerLink="/cases" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">View all</a>
          </div>

          <!-- Loading state -->
          <div *ngIf="isLoading" class="animate-pulse">
            <div *ngFor="let i of [1,2,3,4,5]" class="px-6 py-4 border-b border-border last:border-0">
              <div class="flex items-center space-x-4">
                <div class="w-8 h-8 rounded-full bg-gray-100"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 w-32 bg-gray-100 rounded"></div>
                  <div class="h-3 w-48 bg-gray-50 rounded"></div>
                </div>
                <div class="h-5 w-16 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Data -->
          <table *ngIf="!isLoading" class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="table-header">Name</th>
                <th class="table-header">Type</th>
                <th class="table-header">Status</th>
                <th class="table-header">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of recentRecords" class="table-row">
                <td class="table-cell">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-text-secondary">
                      {{ record.name.charAt(0) }}{{ record.name.split(' ')[1]?.charAt(0) || '' }}
                    </div>
                    <div class="ml-3">
                      <p class="font-medium text-text-primary">{{ record.name }}</p>
                      <p class="text-xs text-text-secondary">{{ record.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="table-cell text-text-secondary">{{ record.type }}</td>
                <td class="table-cell">
                  <span [ngClass]="{
                    'badge-success': record.status === 'Verified',
                    'badge-warning': record.status === 'Pending',
                    'badge-error': record.status === 'Escalated',
                    'badge-neutral': record.status === 'Rejected'
                  }">{{ record.status }}</span>
                </td>
                <td class="table-cell text-text-secondary">{{ record.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Recent Activity -->
          <div class="card" id="recent-activity">
            <div class="px-5 py-4 border-b border-border">
              <h2 class="text-title text-text-primary">Recent Activity</h2>
            </div>
            <div *ngIf="isLoading" class="p-5 space-y-4 animate-pulse">
              <div *ngFor="let i of [1,2,3,4]" class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-full bg-gray-100 shrink-0"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-3 w-full bg-gray-100 rounded"></div>
                  <div class="h-3 w-20 bg-gray-50 rounded"></div>
                </div>
              </div>
            </div>
            <div *ngIf="!isLoading" class="p-5 space-y-4">
              <div *ngFor="let activity of recentActivities" class="flex items-start space-x-3">
                <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                     [ngClass]="{
                       'bg-emerald-50': activity.type === 'success',
                       'bg-amber-50': activity.type === 'warning',
                       'bg-red-50': activity.type === 'error',
                       'bg-blue-50': activity.type === 'info'
                     }">
                  <svg class="w-3.5 h-3.5"
                       [ngClass]="{
                         'text-emerald-600': activity.type === 'success',
                         'text-amber-600': activity.type === 'warning',
                         'text-red-600': activity.type === 'error',
                         'text-blue-600': activity.type === 'info'
                       }"
                       fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path *ngIf="activity.type === 'success'" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    <path *ngIf="activity.type === 'warning'" stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path *ngIf="activity.type === 'error'" stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    <path *ngIf="activity.type === 'info'" stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-text-primary leading-snug">{{ activity.message }}</p>
                  <p class="text-xs text-text-secondary mt-1">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card" id="quick-actions">
            <div class="px-5 py-4 border-b border-border">
              <h2 class="text-title text-text-primary">Quick Actions</h2>
            </div>
            <div class="p-4 space-y-2">
              <button routerLink="/cases" class="w-full flex items-center px-4 py-3 rounded-lg hover:bg-surface transition-colors text-left group cursor-pointer">
                <div class="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center mr-3 group-hover:bg-primary-100 transition-colors">
                  <svg class="w-4.5 h-4.5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-text-primary">Create New Record</p>
                  <p class="text-xs text-text-secondary">Start a new verification</p>
                </div>
              </button>
              <button routerLink="/cases" class="w-full flex items-center px-4 py-3 rounded-lg hover:bg-surface transition-colors text-left group cursor-pointer">
                <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mr-3 group-hover:bg-amber-100 transition-colors">
                  <svg class="w-4.5 h-4.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-text-primary">Review Pending</p>
                  <p class="text-xs text-text-secondary">{{ stats.pending }} items awaiting review</p>
                </div>
              </button>
              <button (click)="export()" class="w-full flex items-center px-4 py-3 rounded-lg hover:bg-surface transition-colors text-left group">
                <div class="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mr-3 group-hover:bg-emerald-100 transition-colors">
                  <svg class="w-4.5 h-4.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-text-primary">Export Report</p>
                  <p class="text-xs text-text-secondary">Download monthly summary</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  stats = { total: 0, pending: 0, approved: 0, users: 0 };

  recentRecords: any[] = [];
  recentActivities: any[] = [];

  constructor(private verificationService: VerificationService) {}

  export() {
    alert('Export functionality is coming soon!');
  }

  ngOnInit() {
    this.verificationService.getAnalytics().subscribe({
      next: (data) => {
        this.stats = {
          total: data.totalCases,
          pending: data.pendingCases,
          approved: data.verifiedCases,
          users: 2 // Hardcoded users stat as it's not in the analytics endpoint currently
        };
        
        // Fetch records after analytics
        this.verificationService.getCases().subscribe(cases => {
          // Take the 5 most recent
          this.recentRecords = cases.slice(0, 5).map(c => ({
            id: c._id.substring(c._id.length - 6).toUpperCase(),
            name: c.candidateName,
            type: c.verificationType,
            status: c.status,
            date: new Date(c.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          }));
          this.isLoading = false;
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });

    // Keeping mocked activities for now as the backend activity logs endpoint wasn't fully fleshed out in the seed
    this.recentActivities = [
      { type: 'success', message: 'System connected to backend.', time: 'Just now' },
      { type: 'info', message: 'Loaded real analytics data from database.', time: '1 minute ago' }
    ];
  }
}
