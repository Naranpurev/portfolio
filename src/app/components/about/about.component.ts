import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ContactInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about">
      <div class="container">
        <div class="section-header">
          <span class="label">About</span>
          <h2>10 years building for the web</h2>
        </div>
        <div class="body">
          <p>{{ summary() }}</p>
          <p>
            Experienced across the full front-end development lifecycle — translating Figma wireframes into
            production-ready Angular components, managing CI/CD pipelines in Jenkins, enforcing code quality
            through SonarQube, and collaborating closely with Java/Spring Boot back-end teams. Skilled in building
            accessible (WCAG 2.1 / ADA-compliant), high-performance interfaces using RxJS, NgRx, Angular
            Material, and PrimeNG. Comfortable using AI-assisted development tools daily to accelerate
            delivery without compromising code quality.
          </p>
          <div class="meta">
            <div class="meta-item email-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
              </svg>
              <span class="email-user">{{ emailUser() }}</span>
              <a [href]="'mailto:' + contact().email" class="provider-badge gmail">Gmail</a>
              <a [href]="'mailto:' + contact().emailOutlook" class="provider-badge outlook">Outlook</a>
            </div>

            <a [href]="contact().linkedin" target="_blank" rel="noopener" class="meta-item link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              linkedin.com/in/naranpurev
            </a>

            <span class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
              </svg>
              {{ contact().phone }}
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: var(--section-padding) 0;
      border-top: 1px solid var(--clr-border);
    }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 64px;
    }

    .section-header { padding-top: 4px; }

    .label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--clr-accent);
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--clr-text);
      line-height: 1.4;
    }

    .body p {
      font-size: 1rem;
      line-height: 1.8;
      color: var(--clr-text-secondary);
      margin-bottom: 20px;
    }

    .body p:last-of-type { margin-bottom: 28px; }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 20px;
      align-items: center;
    }

    .meta-item {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 0.875rem;
      color: var(--clr-text-secondary);
      text-decoration: none;
    }

    .meta-item.link { transition: color 0.15s ease; }
    .meta-item.link:hover { color: var(--clr-accent); }

    .email-row {
      display: inline-flex;
      align-items: center;
      gap: 7px;
    }

    .email-user {
      font-size: 0.875rem;
      color: var(--clr-text-secondary);
      font-weight: 500;
    }

    .provider-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      border-radius: 4px;
      padding: 2px 8px;
      text-decoration: none;
      transition: opacity 0.15s ease;
    }

    .provider-badge:hover { opacity: 0.75; }

    .provider-badge.gmail {
      background: color-mix(in srgb, #4285f4 12%, transparent);
      color: #1a56db;
      border: 1px solid color-mix(in srgb, #4285f4 25%, transparent);
    }

    .provider-badge.outlook {
      background: color-mix(in srgb, #0078d4 12%, transparent);
      color: #0369a1;
      border: 1px solid color-mix(in srgb, #0078d4 25%, transparent);
    }

    :root.dark .provider-badge.gmail   { color: #93c5fd; background: rgba(66,133,244,.15); border-color: rgba(66,133,244,.3); }
    :root.dark .provider-badge.outlook { color: #7dd3fc; background: rgba(0,120,212,.15);  border-color: rgba(0,120,212,.3);  }

    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 24px; }
    }
  `],
})
export class AboutComponent {
  summary = input.required<string>();
  contact = input.required<ContactInfo>();

  emailUser = computed(() => this.contact().email.split('@')[0]);
}
