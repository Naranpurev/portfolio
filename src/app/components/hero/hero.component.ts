import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContactInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hero">
      <div class="container">
        <div class="content">
          <div class="text">
            <p class="availability">Available for new opportunities</p>
            <h1>{{ name() }}</h1>
            <p class="title">{{ title() }}</p>
            <p class="tagline">{{ tagline() }}</p>
            <p class="summary">{{ summary() }}</p>
            <div class="actions">
              <a [href]="'mailto:' + contact().email" class="btn-primary">
                Get in touch
              </a>
              <a [href]="contact().linkedin" target="_blank" rel="noopener" class="btn-secondary">
                LinkedIn
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="avatar-wrap">
            <div class="avatar" role="img" [attr.aria-label]="name() + ' profile photo'">
              NM
              <!--
                To use your photo, replace the "NM" text with an empty string
                and add to .avatar CSS:
                  background-image: url('/assets/profile.jpg');
                  background-size: cover;
                  background-position: center top;
                  font-size: 0;
              -->
            </div>
          </div>
        </div>
        <div class="scroll-hint" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      padding-top: 60px;
    }

    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 80px 24px 48px;
      width: 100%;
      position: relative;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 220px;
      gap: 64px;
      align-items: center;
    }

    .availability {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8125rem;
      color: #16a34a;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .availability::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #16a34a;
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    h1 {
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: var(--clr-text);
      margin-bottom: 12px;
    }

    .title {
      font-size: clamp(1rem, 2.5vw, 1.25rem);
      font-weight: 500;
      color: var(--clr-accent);
      margin-bottom: 6px;
    }

    .tagline {
      font-size: 0.9375rem;
      color: var(--clr-text-secondary);
      margin-bottom: 24px;
    }

    .summary {
      font-size: 1rem;
      line-height: 1.75;
      color: var(--clr-text-secondary);
      max-width: 560px;
      margin-bottom: 36px;
    }

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      padding: 10px 22px;
      background: var(--clr-text);
      color: var(--clr-bg);
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      text-decoration: none;
      transition: opacity 0.15s ease;
    }

    .btn-primary:hover { opacity: 0.8; }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 22px;
      border: 1px solid var(--clr-border);
      border-radius: 6px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--clr-text);
      text-decoration: none;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .btn-secondary:hover {
      background: var(--clr-surface);
      border-color: var(--clr-text-muted);
    }

    .avatar-wrap {
      display: flex;
      justify-content: center;
    }

    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: var(--clr-text);
      color: var(--clr-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      flex-shrink: 0;
    }

    .scroll-hint {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--clr-text-muted);
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(6px); }
    }

    @media (max-width: 640px) {
      .content { grid-template-columns: 1fr; gap: 40px; }
      .avatar-wrap { order: -1; }
      .avatar { width: 120px; height: 120px; font-size: 1.75rem; }
    }
  `],
})
export class HeroComponent {
  name = input.required<string>();
  title = input.required<string>();
  tagline = input.required<string>();
  summary = input.required<string>();
  contact = input.required<ContactInfo>();
}
