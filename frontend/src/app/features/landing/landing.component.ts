import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen font-sans overflow-hidden bg-white relative flex flex-col items-center">
      <!-- Complex Gradient Background mimicking the reference image -->
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <!-- Top orange/peach glow -->
        <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[60vh] bg-gradient-to-b from-[#ffedeb] via-[#f7b686] to-transparent opacity-80 blur-[80px]"></div>
        <!-- Middle periwinkle/blue glow -->
        <div class="absolute top-[30%] left-1/2 -translate-x-1/2 w-[100%] h-[50vh] bg-gradient-to-t from-[#c9dbfc] via-[#d6e3fc] to-transparent opacity-70 blur-[100px]"></div>
      </div>

      <!-- Floating Navbar -->
      <nav class="relative z-20 mt-6 w-[95%] max-w-6xl bg-white/90 backdrop-blur-md rounded-pill shadow-sm border border-gray-100 flex items-center justify-between px-6 py-3">
        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-2xl font-bold tracking-tight text-gray-900">veritrust</span>
        </div>

        <!-- Center Links -->
        <div class="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wider text-gray-700">
          <a href="#" class="hover:text-primary-900 transition-colors">PLATFORM</a>
          <a href="#" class="hover:text-primary-900 transition-colors">SOLUTIONS</a>
          <a href="#" class="hover:text-primary-900 transition-colors">RESOURCES</a>
          <a href="#" class="hover:text-primary-900 transition-colors">COMPANY</a>
        </div>

        <!-- Right Buttons -->
        <div class="flex items-center space-x-3">
          <a routerLink="/login" class="px-6 py-2.5 rounded-pill bg-primary-900 text-white text-sm font-medium hover:bg-primary-800 transition-colors shadow-sm">
            Sign in
          </a>
          <a href="#" class="px-6 py-2.5 rounded-pill bg-white text-gray-800 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm hidden sm:inline-flex">
            Contact Us
          </a>
        </div>
      </nav>

      <!-- Hero Content -->
      <main class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mt-[-5vh]">
        <!-- Decorative Swoosh -->
        <div class="mb-6 opacity-80">
          <svg width="180" height="24" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 18C60 18 45 12 30 12C15 12 0 18 0 18M105 18C120 18 135 12 150 12C165 12 180 18 180 18" stroke="#8a94b5" stroke-width="2" stroke-linecap="round"/>
            <path d="M90 6C85 6 80 10 80 14C80 18 85 22 90 22C95 22 100 18 100 14C100 10 95 6 90 6Z" fill="#8a94b5"/>
            <path d="M85 10C87 12 87 16 85 18M95 10C93 12 93 16 95 18" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Subheading -->
        <p class="text-[#5a6b9a] font-medium text-sm md:text-base mb-6 tracking-wide uppercase">
          Enterprise Employee Verification
        </p>

        <!-- Main Heading -->
        <h1 class="text-5xl md:text-7xl lg:text-[5.5rem] font-display text-[#111827] leading-[1.1] mb-8">
          Trust for every hire
        </h1>

        <!-- Body text -->
        <p class="text-[#4b5563] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Built on secure infrastructure. Powered by automated compliance.<br class="hidden sm:block"/> Delivering seamless onboarding at scale.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a routerLink="/login" class="w-full sm:w-auto px-8 py-3.5 rounded-pill bg-primary-900 text-white text-base font-medium hover:bg-primary-800 transition-colors shadow-md text-center">
            Get Started
          </a>
          <a href="#" class="w-full sm:w-auto px-8 py-3.5 rounded-pill bg-white text-gray-800 border border-gray-200 text-base font-medium hover:bg-gray-50 transition-colors shadow-sm text-center">
            Talk to Sales
          </a>
        </div>
      </main>
    </div>
  `
})
export class LandingComponent {}
