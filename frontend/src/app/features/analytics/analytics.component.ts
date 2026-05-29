import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-display-lg text-text-primary font-display">Activity Logs</h1>
          <p class="mt-1 text-sm text-text-secondary">Track all system activities and audit trail.</p>
        </div>
        <div class="flex space-x-3">
          <select class="input w-auto py-2 appearance-none text-sm" id="log-time-filter">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button (click)="exportLogs()" class="btn-secondary text-sm">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Logs
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div class="card p-5">
          <p class="text-sm text-text-secondary">Total Events</p>
          <p class="text-2xl font-bold text-text-primary font-display mt-1">2,847</p>
          <p class="text-xs text-text-secondary mt-2">This week</p>
        </div>
        <div class="card p-5">
          <p class="text-sm text-text-secondary">Active Users</p>
          <p class="text-2xl font-bold text-text-primary font-display mt-1">18</p>
          <p class="text-xs text-text-secondary mt-2">Across departments</p>
        </div>
        <div class="card p-5">
          <p class="text-sm text-text-secondary">Flagged Events</p>
          <p class="text-2xl font-bold text-text-primary font-display mt-1">5</p>
          <p class="text-xs text-red-600 mt-2">Requires review</p>
        </div>
      </div>

      <!-- Activity Log Table -->
      <div class="card overflow-hidden" id="activity-logs-table">
        <div class="px-6 py-3.5 border-b border-border flex items-center justify-between">
          <h2 class="text-title text-text-primary">Event Log</h2>
          <div class="relative max-w-xs">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input type="text" class="input pl-10 py-1.5 text-sm border-transparent bg-surface focus:bg-white focus:border-border"
                   placeholder="Filter logs..." id="logs-search">
          </div>
        </div>

        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="table-header">Timestamp</th>
              <th class="table-header">User</th>
              <th class="table-header">Action</th>
              <th class="table-header">Details</th>
              <th class="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of paginatedLogs" class="table-row">
              <td class="table-cell">
                <div>
                  <p class="text-sm text-text-primary font-medium">{{ log.date }}</p>
                  <p class="text-xs text-text-secondary">{{ log.time }}</p>
                </div>
              </td>
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-semibold text-text-secondary">
                    {{ log.user.charAt(0) }}
                  </div>
                  <span class="ml-2 text-sm text-text-primary">{{ log.user }}</span>
                </div>
              </td>
              <td class="table-cell">
                <span [ngClass]="{
                  'badge-info': log.action === 'LOGIN' || log.action === 'VIEW',
                  'badge-success': log.action === 'CREATE' || log.action === 'APPROVE',
                  'badge-warning': log.action === 'UPDATE',
                  'badge-error': log.action === 'DELETE' || log.action === 'REJECT',
                  'badge-neutral': log.action === 'LOGOUT' || log.action === 'EXPORT'
                }">{{ log.action }}</span>
              </td>
              <td class="table-cell text-text-secondary text-sm">{{ log.details }}</td>
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="w-1.5 h-1.5 rounded-full mr-2" [ngClass]="log.success ? 'bg-emerald-500' : 'bg-red-500'"></div>
                  <span class="text-sm" [ngClass]="log.success ? 'text-emerald-700' : 'text-red-700'">{{ log.success ? 'Success' : 'Failed' }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="px-6 py-3.5 border-t border-border flex items-center justify-between">
          <p class="text-sm text-text-secondary">Showing {{ paginatedLogs.length }} of {{ activityLogs.length }} events</p>
          <div class="flex items-center space-x-1">
            <button class="btn-ghost px-2.5 py-1.5 rounded-md text-sm disabled:opacity-50" (click)="previousPage()" [disabled]="currentPage === 1">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <ng-container *ngFor="let page of getPagesArray()">
              <button class="btn px-3 py-1.5 rounded-md text-sm"
                      [ngClass]="page === currentPage ? 'bg-primary-900 text-white' : 'btn-ghost'"
                      (click)="goToPage(page)">
                {{ page }}
              </button>
            </ng-container>
            <button class="btn-ghost px-2.5 py-1.5 rounded-md text-sm disabled:opacity-50" (click)="nextPage()" [disabled]="currentPage === totalPages">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit {
  activityLogs: any[] = [];
  currentPage = 1;
  pageSize = 5;

  exportLogs() {
    alert('Exporting activity logs...');
  }

  get paginatedLogs() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.activityLogs.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.activityLogs.length / this.pageSize);
  }

  getPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  ngOnInit() {
    this.activityLogs = [
      { date: 'May 29, 2026', time: '11:42 AM', user: 'Admin User', action: 'LOGIN', details: 'Logged in from 192.168.1.45', success: true },
      { date: 'May 29, 2026', time: '11:38 AM', user: 'Sarah Johnson', action: 'APPROVE', details: 'Approved verification VR-8942', success: true },
      { date: 'May 29, 2026', time: '11:15 AM', user: 'Michael Smith', action: 'CREATE', details: 'Created new record VR-8950', success: true },
      { date: 'May 29, 2026', time: '10:55 AM', user: 'Admin User', action: 'UPDATE', details: 'Updated user role for Emily Davis', success: true },
      { date: 'May 29, 2026', time: '10:30 AM', user: 'Robert Jones', action: 'REJECT', details: 'Rejected verification VR-8947', success: true },
      { date: 'May 28, 2026', time: '05:12 PM', user: 'Emily Davis', action: 'LOGIN', details: 'Login attempt from unknown device', success: false },
      { date: 'May 28, 2026', time: '04:45 PM', user: 'Admin User', action: 'EXPORT', details: 'Exported monthly compliance report', success: true },
      { date: 'May 28, 2026', time: '03:20 PM', user: 'Sarah Johnson', action: 'VIEW', details: 'Viewed record details VR-8943', success: true },
      { date: 'May 28, 2026', time: '02:10 PM', user: 'Admin User', action: 'DELETE', details: 'Removed inactive user account', success: true },
      { date: 'May 28, 2026', time: '01:00 PM', user: 'Michael Smith', action: 'LOGOUT', details: 'Session ended', success: true },
    ];
  }
}
