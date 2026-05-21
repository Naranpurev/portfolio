import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ContactInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact">
      <div class="container">
        <div class="inner">
          <span class="label">Contact</span>
          <h2>Let's work together</h2>
          <p class="sub">
            I'm currently available for new opportunities — full-time roles, contract work, or consulting.
            Reach out and I'll get back to you promptly.
          </p>
          <div class="links">

            <div class="link-card">
              <div class="link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                </svg>
              </div>
              <div class="link-text">
                <p class="link-label">Email</p>
                <p class="link-value email-user">{{ emailUser() }}</p>
                <div class="email-providers">
                  <a [href]="'mailto:' + contact().email" class="provider-link gmail">
                    Gmail
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                  <a [href]="'mailto:' + contact().emailOutlook" class="provider-link outlook">
                    Outlook
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <a [href]="contact().linkedin" target="_blank" rel="noopener" class="link-card clickable">
              <div class="link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div class="link-text">
                <p class="link-label">LinkedIn</p>
                <p class="link-value">linkedin.com/in/naranpurev</p>
              </div>
            </a>

            <div class="link-card">
              <div class="link-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                </svg>
              </div>
              <div class="link-text">
                <p class="link-label">Phone</p>
                <p class="link-value">{{ contact().phone }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: var(--section-padding) 0;
      border-top: 1px solid var(--clr-border);
      background: var(--clr-surface);
    }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 24px;
    }

    .inner { max-width: 640px; }

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
      font-size: clamp(1.5rem, 4vw, 2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--clr-text);
      margin-bottom: 12px;
    }

    .sub {
      font-size: 1rem;
      line-height: 1.75;
      color: var(--clr-text-secondary);
      margin-bottom: 36px;
    }

    .links { display: flex; flex-direction: column; gap: 10px; }

    .link-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: var(--clr-bg);
      border: 1px solid var(--clr-border);
      border-radius: 8px;
      text-decoration: none;
    }

    .link-card.clickable {
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }

    .link-card.clickable:hover {
      border-color: var(--clr-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--clr-accent) 12%, transparent);
    }

    .link-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: var(--clr-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--clr-text-secondary);
      flex-shrink: 0;
    }

    .link-text { flex: 1; min-width: 0; }

    .link-label {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--clr-text-muted);
      margin-bottom: 3px;
    }

    .link-value {
      font-size: 0.9375rem;
      color: var(--clr-text);
      font-weight: 500;
    }

    .email-user {
      margin-bottom: 8px;
    }

    .email-providers {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .provider-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      border-radius: 4px;
      padding: 3px 10px;
      text-decoration: none;
      transition: opacity 0.15s ease, box-shadow 0.15s ease;
    }

    .provider-link:hover { opacity: 0.8; }

    .provider-link.gmail {
      background: color-mix(in srgb, #4285f4 12%, transparent);
      color: #1a56db;
      border: 1px solid color-mix(in srgb, #4285f4 25%, transparent);
    }

    .provider-link.outlook {
      background: color-mix(in srgb, #0078d4 12%, transparent);
      color: #0369a1;
      border: 1px solid color-mix(in srgb, #0078d4 25%, transparent);
    }

    :root.dark .provider-link.gmail   { color: #93c5fd; background: rgba(66,133,244,.15); border-color: rgba(66,133,244,.3); }
    :root.dark .provider-link.outlook { color: #7dd3fc; background: rgba(0,120,212,.15);  border-color: rgba(0,120,212,.3);  }
  `],
})
export class ContactComponent {
  contact = input.required<ContactInfo>();
  emailUser = computed(() => this.contact().email.split('@')[0]);
}
