import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';

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
            <div
              class="avatar-container"
              (mousemove)="onMouseMove($event)"
              (mouseleave)="onMouseLeave()"
              aria-hidden="true"
            >
              <div class="avatar-blob">
                @if (!imgError()) {
                  <img
                    src="assets/profile.png"
                    alt="Naranpurev Munkhbayar"
                    [style.transform]="imgTransform()"
                    (error)="imgError.set(true)"
                  />
                }
                @if (imgError()) {
                  <span class="initials" [style.transform]="imgTransform()">NM</span>
                }
              </div>
            </div>
            <p class="hover-hint">hover me</p>
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
      grid-template-columns: 1fr 300px;
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
      margin-bottom: 24px;
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
      50% { opacity: 0.3; }
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
      font-size: clamp(0.9375rem, 2.2vw, 1.125rem);
      font-weight: 500;
      color: var(--clr-accent);
      margin-bottom: 6px;
    }

    .tagline {
      font-size: 0.9rem;
      color: var(--clr-text-secondary);
      margin-bottom: 22px;
    }

    .summary {
      font-size: 1rem;
      line-height: 1.78;
      color: var(--clr-text-secondary);
      max-width: 560px;
      margin-bottom: 36px;
    }

    .actions { display: flex; gap: 12px; flex-wrap: wrap; }

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
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .avatar-container {
      width: 290px;
      height: 290px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: crosshair;
    }

    .avatar-blob {
      width: 270px;
      height: 270px;
      overflow: hidden;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      animation: blobMorph 9s ease-in-out infinite;
      position: relative;
      background: var(--clr-surface);
    }

    .avatar-container:hover .avatar-blob {
      animation-play-state: paused;
    }

    @keyframes blobMorph {
      0%   { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
      25%  { border-radius: 58% 42% 40% 60% / 57% 32% 68% 43%; }
      50%  { border-radius: 70% 30% 46% 54% / 30% 68% 32% 70%; }
      75%  { border-radius: 40% 60% 65% 35% / 65% 35% 65% 35%; }
      100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 18%;
      display: block;
      transition: transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .initials {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--clr-bg);
      background: var(--clr-text);
      transition: transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .hover-hint {
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--clr-text-muted);
      animation: hintFade 3s ease-in-out 2s forwards;
      opacity: 0;
    }

    @keyframes hintFade {
      0%   { opacity: 0; }
      20%  { opacity: 1; }
      80%  { opacity: 1; }
      100% { opacity: 0; }
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
      50%       { transform: translateX(-50%) translateY(6px); }
    }

    @media (max-width: 640px) {
      .content { grid-template-columns: 1fr; gap: 40px; }
      .avatar-wrap { order: -1; }
      .avatar-container { width: 210px; height: 210px; }
      .avatar-blob { width: 190px; height: 190px; }
    }
  `],
})
export class HeroComponent {
  name    = input.required<string>();
  title   = input.required<string>();
  tagline = input.required<string>();
  summary = input.required<string>();
  contact = input.required<ContactInfo>();

  imgError = signal(false);

  private readonly fleeX = signal(0);
  private readonly fleeY = signal(0);

  imgTransform = computed(() =>
    `scale(1.14) translate(${this.fleeX()}px, ${this.fleeY()}px)`
  );

  onMouseMove(event: MouseEvent) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const maxFlee = 18;
    this.fleeX.set(-(dx / dist) * maxFlee);
    this.fleeY.set(-(dy / dist) * maxFlee);
  }

  onMouseLeave() {
    this.fleeX.set(0);
    this.fleeY.set(0);
  }
}
