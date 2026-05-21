import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
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
          Naranpurev M.
        </a>
        <nav>
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
            [title]="theme.isDark() ? 'Light mode' : 'Dark mode'"
          >
            @if (theme.isDark()) {
              <!-- Sun icon -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            } @else {
              <!-- Moon icon -->
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            }
          </button>
        </nav>
      </div>
    </header>
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

    header.scrolled {
      border-bottom-color: var(--clr-border);
    }

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
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--clr-text);
      text-decoration: none;
      letter-spacing: -0.01em;
    }

    nav {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    nav a {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--clr-text-secondary);
      text-decoration: none;
      position: relative;
      transition: color 0.15s ease;
    }

    nav a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--clr-text);
      transition: width 0.2s ease;
    }

    nav a:hover { color: var(--clr-text); }
    nav a:hover::after,
    nav a.active::after { width: 100%; }
    nav a.active { color: var(--clr-text); font-weight: 500; }

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
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      flex-shrink: 0;
    }

    .theme-toggle:hover {
      background: var(--clr-surface);
      color: var(--clr-text);
      border-color: var(--clr-text-muted);
    }

    @media (max-width: 640px) {
      nav { gap: 16px; }
      nav a { font-size: 0.8125rem; }
    }

    @media (max-width: 480px) {
      .brand { display: none; }
      .inner { justify-content: center; }
    }
  `],
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  isScrolled = signal(false);
  activeSection = signal('hero');

  readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  private readonly sectionIds = ['hero', 'about', 'experience', 'skills', 'education', 'contact'];

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
