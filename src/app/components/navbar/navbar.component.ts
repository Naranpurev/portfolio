import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [class.scrolled]="isScrolled()">
      <div class="inner">
        <a href="#hero" class="brand" (click)="scrollTo('hero', $event)">
          <span class="monogram" aria-hidden="true">NM</span>
          <span class="brand-name">Naranpurev M.</span>
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">
          @for (link of navLinks; track link.id) {
            <a
              [href]="'#' + link.id"
              [class.active]="activeSection() === link.id"
              (click)="scrollTo(link.id, $event)"
            >{{ link.label }}</a>
          }
          <button
            class="theme-toggle"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (theme.isDark()) {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            } @else {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>
        </nav>

        <div class="mobile-controls">
          <button
            class="theme-toggle"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (theme.isDark()) {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            } @else {
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
            }
          </button>
          <button
            class="hamburger"
            [class.open]="isMenuOpen()"
            (click)="toggleMenu()"
            [attr.aria-expanded]="isMenuOpen()"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      @if (isMenuOpen()) {
        <nav class="mobile-menu" aria-label="Mobile navigation">
          @for (link of navLinks; track link.id) {
            <a
              [href]="'#' + link.id"
              [class.active]="activeSection() === link.id"
              (click)="mobileNavClick(link.id, $event)"
            >
              {{ link.label }}
            </a>
          }
        </nav>
      }
    </header>

    @if (isMenuOpen()) {
      <div class="menu-backdrop" (click)="isMenuOpen.set(false)" aria-hidden="true"></div>
    }
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: var(--clr-navbar-bg);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease, background 0.2s ease;
    }

    header.scrolled { border-bottom-color: var(--clr-border); }

    .inner {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }

    .monogram {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: var(--clr-text);
      color: var(--clr-bg);
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      border-radius: 6px;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }

    .brand:hover .monogram { background: var(--clr-accent); }

    .brand-name {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--clr-text);
      letter-spacing: -0.01em;
      transition: color 0.15s ease;
    }

    .brand:hover .brand-name { color: var(--clr-accent); }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .desktop-nav a {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--clr-text-secondary);
      text-decoration: none;
      position: relative;
      transition: color 0.15s ease;
      white-space: nowrap;
    }

    .desktop-nav a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--clr-text);
      transition: width 0.2s ease;
    }

    .desktop-nav a:hover { color: var(--clr-text); }
    .desktop-nav a:hover::after,
    .desktop-nav a.active::after { width: 100%; }
    .desktop-nav a.active { color: var(--clr-text); font-weight: 500; }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: none;
      border: 1px solid var(--clr-border);
      color: var(--clr-text-secondary);
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
      flex-shrink: 0;
    }

    .theme-toggle:hover {
      background: var(--clr-surface);
      color: var(--clr-text);
    }

    .mobile-controls {
      display: none;
      align-items: center;
      gap: 8px;
    }

    .hamburger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      background: none;
      border: 1px solid var(--clr-border);
      border-radius: 6px;
      padding: 0 7px;
      cursor: pointer;
    }

    .hamburger span {
      display: block;
      width: 100%;
      height: 1.5px;
      background: var(--clr-text);
      border-radius: 2px;
      transition: transform 0.22s ease, opacity 0.22s ease;
    }

    .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--clr-border);
      padding: 8px 0 12px;
      animation: menuDown 0.18s ease;
    }

    @keyframes menuDown {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .mobile-menu a {
      padding: 11px 24px;
      font-size: 0.9375rem;
      font-weight: 400;
      color: var(--clr-text-secondary);
      text-decoration: none;
      transition: color 0.15s ease, background 0.15s ease;
    }

    .mobile-menu a:hover,
    .mobile-menu a.active {
      color: var(--clr-text);
      background: var(--clr-surface);
    }

    .menu-backdrop {
      position: fixed;
      inset: 60px 0 0 0;
      z-index: 99;
      background: transparent;
    }

    @media (max-width: 860px) {
      .desktop-nav { gap: 20px; }
      .desktop-nav a { font-size: 0.8125rem; }
    }

    @media (max-width: 768px) {
      .desktop-nav { display: none; }
      .mobile-controls { display: flex; }
    }
  `],
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  isScrolled = signal(false);
  isMenuOpen = signal(false);
  activeSection = signal('hero');

  readonly navLinks = [
    { id: 'about',          label: 'About' },
    { id: 'experience',     label: 'Experience' },
    { id: 'skills',         label: 'Skills' },
    { id: 'education',      label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact',        label: 'Contact' },
  ];

  private readonly sectionIds = [
    'hero', 'about', 'experience', 'skills', 'education', 'certifications', 'contact',
  ];

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        this.isScrolled.set(window.scrollY > 20);
        this.updateActiveSection();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  scrollTo(id: string, event: Event) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleMenu() { this.isMenuOpen.update(v => !v); }

  mobileNavClick(id: string, event: Event) {
    this.scrollTo(id, event);
    this.isMenuOpen.set(false);
  }

  private updateActiveSection() {
    const scrollMid = window.scrollY + window.innerHeight * 0.35;
    for (let i = this.sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(this.sectionIds[i]);
      if (el && el.offsetTop <= scrollMid) {
        this.activeSection.set(this.sectionIds[i]);
        return;
      }
    }
  }
}
