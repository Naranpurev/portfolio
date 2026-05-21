import { effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  isDark = signal(this.resolveInitialTheme());

  constructor() {
    effect(() => {
      const dark = this.isDark();
      this.doc.documentElement.classList.toggle('dark', dark);
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }

  toggle() {
    this.isDark.update(v => !v);
  }

  private resolveInitialTheme(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;

    // System preference takes priority over time-of-day
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return true;

    // Fall back to time-of-day in user's local timezone
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  }
}
