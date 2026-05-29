import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerificationService } from '../../core/services/verification.service';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-display-lg text-text-primary font-display">Records</h1>
          <p class="mt-1 text-sm text-text-secondary">Manage all verification records and background checks.</p>
        </div>
        <button class="btn-primary shrink-0 bg-primary-900" id="new-record-btn" (click)="openDrawer()">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Record
        </button>
      </div>

      <!-- Filters Bar -->
      <div class="card px-5 py-3.5">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <!-- Search -->
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input type="text" [(ngModel)]="searchTerm" (ngModelChange)="filterCases()"
                   class="input pl-10 py-2 border-transparent bg-surface focus:bg-white focus:border-border"
                   placeholder="Search by name or ID..." id="records-search">
          </div>

          <!-- Status Filter -->
          <select [(ngModel)]="statusFilter" (ngModelChange)="filterCases()"
                  class="input w-auto py-2 appearance-none" id="status-filter">
            <option value="">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Escalated">Escalated</option>
            <option value="Rejected">Rejected</option>
          </select>

          <!-- Type Filter -->
          <select [(ngModel)]="typeFilter" (ngModelChange)="filterCases()"
                  class="input w-auto py-2 appearance-none" id="type-filter">
            <option value="">All Types</option>
            <option value="Employment Verification">Employment</option>
            <option value="Education Check">Education</option>
            <option value="Criminal Background Check">Background Check</option>
            <option value="Identity Validation">Identity</option>
            <option value="Address Verification">Address</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="card overflow-hidden animate-pulse">
        <div class="border-b border-border px-6 py-3.5 bg-surface">
          <div class="flex space-x-16">
            <div class="h-3 w-24 bg-gray-200 rounded" *ngFor="let i of [1,2,3,4,5,6]"></div>
          </div>
        </div>
        <div *ngFor="let i of [1,2,3,4,5,6]" class="px-6 py-4 border-b border-border last:border-0">
          <div class="flex items-center space-x-6">
            <div class="w-8 h-8 rounded-full bg-gray-100"></div>
            <div class="h-4 w-28 bg-gray-100 rounded"></div>
            <div class="h-4 w-36 bg-gray-50 rounded"></div>
            <div class="h-4 w-12 bg-gray-50 rounded"></div>
            <div class="h-5 w-16 bg-gray-100 rounded-full"></div>
            <div class="h-4 w-20 bg-gray-50 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Data Table -->
      <div *ngIf="!isLoading" class="card overflow-hidden" id="records-table">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="table-header">
                  <button class="flex items-center space-x-1 hover:text-text-primary transition-colors" (click)="sortBy('name')">
                    <span>Candidate</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </th>
                <th class="table-header">Type</th>
                <th class="table-header">
                  <button class="flex items-center space-x-1 hover:text-text-primary transition-colors" (click)="sortBy('risk')">
                    <span>Risk Score</span>
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </th>
                <th class="table-header">Status</th>
                <th class="table-header">Assigned To</th>
                <th class="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of paginatedCases" class="table-row">
                <td class="table-cell">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-text-secondary">
                      {{ c.name.charAt(0) }}
                    </div>
                    <div class="ml-3">
                      <p class="font-medium text-text-primary">{{ c.name }}</p>
                      <p class="text-xs text-text-secondary">{{ c.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="table-cell text-text-secondary">{{ c.type }}</td>
                <td class="table-cell">
                  <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium"
                          [ngClass]="{
                            'text-emerald-700': c.risk < 30,
                            'text-amber-700': c.risk >= 30 && c.risk < 70,
                            'text-red-700': c.risk >= 70
                          }">{{ c.risk }}</span>
                    <div class="w-16 bg-gray-100 rounded-full h-1.5">
                      <div class="h-1.5 rounded-full transition-all"
                           [ngClass]="{
                             'bg-emerald-500': c.risk < 30,
                             'bg-amber-500': c.risk >= 30 && c.risk < 70,
                             'bg-red-500': c.risk >= 70
                           }"
                           [style.width.%]="c.risk"></div>
                    </div>
                  </div>
                </td>
                <td class="table-cell">
                  <span [ngClass]="{
                    'badge-success': c.status === 'Verified',
                    'badge-warning': c.status === 'Pending',
                    'badge-error': c.status === 'Escalated',
                    'badge-neutral': c.status === 'Rejected'
                  }">{{ c.status }}</span>
                </td>
                <td class="table-cell text-text-secondary">{{ c.assignee }}</td>
                <td class="table-cell text-right">
                  <button (click)="viewCaseDetails(c)" class="btn-ghost p-1.5 rounded-md text-primary-600 hover:text-primary-800 hover:bg-primary-50 transition-colors" title="View details">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr *ngIf="paginatedCases.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-text-secondary">
                  No records found matching your criteria.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div *ngIf="filteredCases.length > 0" class="px-6 py-3.5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-sm text-text-secondary">
            Showing <span class="font-medium text-text-primary">{{ (currentPage - 1) * pageSize + 1 }}</span> to <span class="font-medium text-text-primary">{{ Math.min(currentPage * pageSize, filteredCases.length) }}</span> of <span class="font-medium text-text-primary">{{ filteredCases.length }}</span> results
          </p>
          <div class="flex items-center space-x-1">
            <button class="btn-ghost px-2.5 py-1.5 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                    id="pagination-prev" (click)="previousPage()" [disabled]="currentPage === 1">
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
            <button class="btn-ghost px-2.5 py-1.5 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                    id="pagination-next" (click)="nextPage()" [disabled]="currentPage === totalPages">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Overlays and Drawers -->
      <div *ngIf="showDrawer || showDetailsDrawer" class="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity" (click)="closeDrawers()"></div>

      <!-- New Record Drawer -->
      <div *ngIf="showDrawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div class="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 class="text-xl font-display font-semibold text-text-primary">New Verification Record</h2>
          <button (click)="closeDrawers()" class="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form class="space-y-6" (ngSubmit)="createRecord()">
            <div>
              <label for="candidateName" class="block text-sm font-medium text-text-primary mb-1">Candidate Full Name</label>
              <input type="text" id="candidateName" name="candidateName" [(ngModel)]="newRecordData.candidateName" required
                     class="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                     placeholder="e.g. Jane Doe">
            </div>

            <div>
              <label for="verificationType" class="block text-sm font-medium text-text-primary mb-1">Verification Type</label>
              <select id="verificationType" name="verificationType" [(ngModel)]="newRecordData.verificationType" required
                      class="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors bg-white">
                <option value="Employment Verification">Employment Verification</option>
                <option value="Education Check">Education Check</option>
                <option value="Criminal Background Check">Criminal Background Check</option>
                <option value="Identity Validation">Identity Validation</option>
                <option value="Address Verification">Address Verification</option>
              </select>
            </div>

            <div class="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start">
              <svg class="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="ml-3 text-sm text-blue-800">
                Creating this record will automatically assign it to your queue and initiate preliminary automated checks.
              </p>
            </div>

            <div class="pt-4 flex items-center justify-end space-x-3 border-t border-border">
              <button type="button" (click)="closeDrawers()" class="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" [disabled]="isSaving || !newRecordData.candidateName || !newRecordData.verificationType" 
                      class="px-4 py-2 bg-primary-900 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                <svg *ngIf="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Create Record
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Case Details Drawer -->
      <div *ngIf="showDetailsDrawer && selectedCase" class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div class="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 class="text-xl font-display font-semibold text-text-primary">Case Details</h2>
          <button (click)="closeDrawers()" class="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <!-- Header Info -->
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-lg font-bold text-primary-700">
                {{ selectedCase.name.charAt(0) }}
              </div>
              <div>
                <h3 class="text-lg font-medium text-text-primary">{{ selectedCase.name }}</h3>
                <p class="text-sm text-text-secondary">ID: {{ selectedCase.id }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4 bg-surface p-4 rounded-lg">
              <div>
                <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">Type</p>
                <p class="text-sm font-medium text-text-primary">{{ selectedCase.type }}</p>
              </div>
              <div>
                <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">Risk Score</p>
                <p class="text-sm font-medium"
                   [ngClass]="{
                     'text-emerald-700': selectedCase.risk < 30,
                     'text-amber-700': selectedCase.risk >= 30 && selectedCase.risk < 70,
                     'text-red-700': selectedCase.risk >= 70
                   }">{{ selectedCase.risk }} / 100</p>
              </div>
              <div>
                <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">Assigned To</p>
                <p class="text-sm font-medium text-text-primary">{{ selectedCase.assignee }}</p>
              </div>
              <div>
                <p class="text-xs text-text-secondary uppercase tracking-wider mb-1">Current Status</p>
                <span [ngClass]="{
                    'badge-success': selectedCase.status === 'Verified',
                    'badge-warning': selectedCase.status === 'Pending',
                    'badge-error': selectedCase.status === 'Escalated',
                    'badge-neutral': selectedCase.status === 'Rejected'
                  }">{{ selectedCase.status }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-border pt-6">
            <h4 class="text-sm font-medium text-text-primary mb-4">Update Case Status</h4>
            <div class="grid grid-cols-2 gap-3">
              <button (click)="updateCaseStatus('Verified')" [disabled]="isSaving" 
                      class="flex items-center justify-center px-4 py-2 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">
                Mark as Verified
              </button>
              <button (click)="updateCaseStatus('Escalated')" [disabled]="isSaving"
                      class="flex items-center justify-center px-4 py-2 border border-amber-200 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors">
                Escalate Case
              </button>
              <button (click)="updateCaseStatus('Rejected')" [disabled]="isSaving"
                      class="flex items-center justify-center px-4 py-2 border border-red-200 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                Reject Candidate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CasesComponent implements OnInit {
  isLoading = true;
  searchTerm = '';
  statusFilter = '';
  typeFilter = '';
  sortField = '';
  sortAsc = true;

  cases: any[] = [];
  filteredCases: any[] = [];

  // Pagination state
  currentPage = 1;
  pageSize = 7; // Show 7 records per page
  Math = Math; // Make Math available in template

  // Drawer state
  showDrawer = false;
  showDetailsDrawer = false;
  selectedCase: any = null;
  isSaving = false;
  newRecordData = {
    candidateName: '',
    verificationType: 'Employment Verification'
  };

  constructor(private verificationService: VerificationService) {}

  get paginatedCases() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredCases.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredCases.length / this.pageSize);
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
    this.fetchCases();
  }

  fetchCases() {
    this.isLoading = true;
    this.verificationService.getCases().subscribe({
      next: (cases) => {
        this.cases = cases.map(c => ({
          id: c._id.substring(c._id.length - 6).toUpperCase(),
          name: c.candidateName,
          type: c.verificationType,
          risk: c.riskScore,
          status: c.status,
          assignee: c.assignedOfficer ? c.assignedOfficer.name : 'Unassigned',
          _id: c._id
        }));
        this.filterCases();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  openDrawer() {
    this.newRecordData = { candidateName: '', verificationType: 'Employment Verification' };
    this.showDrawer = true;
    this.showDetailsDrawer = false;
  }

  viewCaseDetails(c: any) {
    this.selectedCase = c;
    this.showDetailsDrawer = true;
    this.showDrawer = false;
  }

  closeDrawers() {
    this.showDrawer = false;
    this.showDetailsDrawer = false;
    this.selectedCase = null;
  }

  createRecord() {
    if (!this.newRecordData.candidateName) return;
    
    this.isSaving = true;
    this.verificationService.createCase(this.newRecordData).subscribe({
      next: (newCase) => {
        this.isSaving = false;
        this.closeDrawers();
        this.fetchCases(); // Refresh list to get new case at top
      },
      error: (err) => {
        this.isSaving = false;
        alert(err.error?.message || 'Failed to create new record');
      }
    });
  }

  updateCaseStatus(status: string) {
    if (!this.selectedCase) return;

    this.isSaving = true;
    this.verificationService.updateCaseStatus(this.selectedCase._id, status).subscribe({
      next: () => {
        this.isSaving = false;
        this.closeDrawers();
        this.fetchCases(); // Refresh list to get updated status
      },
      error: (err) => {
        this.isSaving = false;
        alert(err.error?.message || 'Failed to update case status');
      }
    });
  }

  filterCases() {
    this.currentPage = 1; // Reset to first page when filtering
    this.filteredCases = this.cases.filter(c => {
      const matchesSearch = !this.searchTerm ||
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || c.status === this.statusFilter;
      const matchesType = !this.typeFilter || c.type === this.typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }

    this.filteredCases.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      const result = typeof valA === 'string' ? valA.localeCompare(valB) : valA - valB;
      return this.sortAsc ? result : -result;
    });
  }
}
