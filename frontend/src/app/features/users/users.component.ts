import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-display-lg text-text-primary font-display">User Management</h1>
          <p class="mt-1 text-sm text-text-secondary">Manage team members, roles, and permissions.</p>
        </div>
        <button class="btn-primary shrink-0" (click)="openAddModal()" id="add-user-btn">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Add User
        </button>
      </div>

      <!-- Users Table -->
      <div class="card overflow-hidden" id="users-table">
        <div class="px-6 py-3.5 border-b border-border flex items-center justify-between">
          <div class="relative flex-1 max-w-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input type="text" class="input pl-10 py-2 border-transparent bg-surface focus:bg-white focus:border-border"
                   placeholder="Search users..." id="users-search">
          </div>
          <p class="text-sm text-text-secondary ml-4">{{ users.length }} users</p>
        </div>

        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="table-header">User</th>
              <th class="table-header">Role</th>
              <th class="table-header">Department</th>
              <th class="table-header">Status</th>
              <th class="table-header text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users" class="table-row">
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold"
                       [ngClass]="{
                         'bg-primary-100 text-primary-700': user.role === 'Admin',
                         'bg-gray-100 text-text-secondary': user.role !== 'Admin'
                       }">
                    {{ user.name.charAt(0) }}{{ user.name.split(' ')[1]?.charAt(0) || '' }}
                  </div>
                  <div class="ml-3">
                    <p class="font-medium text-text-primary">{{ user.name }}</p>
                    <p class="text-xs text-text-secondary">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span [ngClass]="{
                  'badge-info': user.role === 'Admin',
                  'badge-neutral': user.role !== 'Admin'
                }">{{ user.role }}</span>
              </td>
              <td class="table-cell text-text-secondary">{{ user.department }}</td>
              <td class="table-cell">
                <span [ngClass]="{
                  'badge-success': user.isActive,
                  'badge-neutral': !user.isActive
                }">{{ user.isActive ? 'Active' : 'Inactive' }}</span>
              </td>
              <td class="table-cell text-right">
                <div class="flex items-center justify-end space-x-1">
                  <button class="btn-ghost p-1.5 rounded-md" title="Edit user" (click)="openEditModal(user)">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn-ghost p-1.5 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50" title="Delete user" (click)="confirmDelete(user)">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add/Edit User Modal (Drawer) -->
      <div *ngIf="showModal" class="fixed inset-0 z-50 flex justify-end" id="user-modal">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/30" (click)="closeModal()"></div>
        <!-- Drawer -->
        <div class="relative w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 class="text-title text-text-primary">{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>
            <button class="btn-ghost p-1.5 rounded-md" (click)="closeModal()">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <label class="input-label">Full Name</label>
              <input type="text" [(ngModel)]="modalUser.name" class="input" placeholder="Enter full name">
            </div>
            <div>
              <label class="input-label">Email Address</label>
              <input type="email" [(ngModel)]="modalUser.email" class="input" placeholder="Enter email address">
            </div>
            <div>
              <label class="input-label">Role</label>
              <select [(ngModel)]="modalUser.role" class="input appearance-none">
                <option value="Admin">Administrator</option>
                <option value="Officer">Verification Officer</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label class="input-label">Department</label>
              <input type="text" [(ngModel)]="modalUser.department" class="input" placeholder="Enter department">
            </div>
            <div class="flex items-center justify-between p-4 bg-surface rounded-lg">
              <div>
                <p class="text-sm font-medium text-text-primary">Active Status</p>
                <p class="text-xs text-text-secondary mt-0.5">User can access the system</p>
              </div>
              <button (click)="modalUser.isActive = !modalUser.isActive"
                      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                      [ngClass]="modalUser.isActive ? 'bg-primary-600' : 'bg-gray-300'">
                <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm"
                      [ngClass]="modalUser.isActive ? 'translate-x-6' : 'translate-x-1'"></span>
              </button>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-border flex items-center justify-end space-x-3">
            <button class="btn-secondary" (click)="closeModal()">Cancel</button>
            <button class="btn-primary" (click)="saveUser()">{{ editingUser ? 'Save Changes' : 'Add User' }}</button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div *ngIf="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center" id="delete-modal">
        <div class="absolute inset-0 bg-black/30" (click)="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 p-6">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text-primary text-center mb-2">Delete User</h3>
          <p class="text-sm text-text-secondary text-center mb-6">Are you sure you want to delete <strong>{{ deletingUser?.name }}</strong>? This action cannot be undone.</p>
          <div class="flex items-center space-x-3">
            <button class="btn-secondary flex-1" (click)="showDeleteModal = false">Cancel</button>
            <button class="btn flex-1 px-4 py-2.5 bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-lg text-sm font-medium" (click)="deleteUser()">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.2s ease-out;
    }
  `]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  showModal = false;
  showDeleteModal = false;
  editingUser: any = null;
  deletingUser: any = null;
  modalUser = { name: '', email: '', role: 'Officer', department: 'General', isActive: true };

  ngOnInit() {
    this.users = [
      { id: 1, name: 'Admin User', email: 'admin@veritrust.com', role: 'Admin', department: 'Operations', isActive: true },
      { id: 2, name: 'Sarah Johnson', email: 'sarah.j@veritrust.com', role: 'Officer', department: 'HR', isActive: true },
      { id: 3, name: 'Michael Smith', email: 'm.smith@veritrust.com', role: 'Officer', department: 'Compliance', isActive: true },
      { id: 4, name: 'Emily Davis', email: 'e.davis@veritrust.com', role: 'Viewer', department: 'Finance', isActive: false },
      { id: 5, name: 'Robert Jones', email: 'r.jones@veritrust.com', role: 'Officer', department: 'HR', isActive: true },
    ];
  }

  openAddModal() {
    this.editingUser = null;
    this.modalUser = { name: '', email: '', role: 'Officer', department: 'General', isActive: true };
    this.showModal = true;
  }

  openEditModal(user: any) {
    this.editingUser = user;
    this.modalUser = { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser.id);
      if (index > -1) {
        this.users[index] = { ...this.users[index], ...this.modalUser };
      }
    } else {
      this.users.push({
        id: Date.now(),
        ...this.modalUser
      });
    }
    this.closeModal();
  }

  confirmDelete(user: any) {
    this.deletingUser = user;
    this.showDeleteModal = true;
  }

  deleteUser() {
    this.users = this.users.filter(u => u.id !== this.deletingUser.id);
    this.showDeleteModal = false;
    this.deletingUser = null;
  }
}
