import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Certificate } from '../../models/portfolio.model';

@Component({
  selector: 'app-certifications',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certifications">
      <div class="container">
        <div class="section-header">
          <span class="label">Certifications</span>
          <h2>Credentials &amp; courses</h2>
          <p class="count">{{ certs().length }} certificates</p>
        </div>
        <div class="grid">
          @for (cert of certs(); track cert.image; let i = $index) {
            <button class="card" (click)="open(i)" [attr.aria-label]="'View certificate: ' + cert.title">
              <div class="card-thumb">
                <img
                  [src]="cert.image"
                  [alt]="cert.title"
                  loading="lazy"
                />
                <div class="card-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                  <span>View</span>
                </div>
              </div>
              <div class="card-body">
                <p class="card-title">{{ cert.title }}</p>
                <div class="card-meta">
                  <span class="issuer-badge" [class]="cert.issuerType">{{ cert.issuer }}</span>
                  @if (cert.date) {
                    <span class="cert-date">{{ cert.date }}</span>
                  }
                </div>
              </div>
            </button>
          }
        </div>
      </div>
    </section>

    @if (activeIndex() !== null) {
      <div
        class="lightbox"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="activeCert()?.title"
        (click)="close()"
      >
        <div class="lb-content" (click)="$event.stopPropagation()">

          <button class="lb-close" (click)="close()" aria-label="Close certificate viewer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <button
            class="lb-nav lb-prev"
            (click)="prev()"
            [disabled]="activeIndex() === 0"
            aria-label="Previous certificate"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div class="lb-img-wrap">
            <img
              [src]="activeCert()!.image"
              [alt]="activeCert()!.title"
            />
          </div>

          <button
            class="lb-nav lb-next"
            (click)="next()"
            [disabled]="activeIndex() === certs().length - 1"
            aria-label="Next certificate"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <div class="lb-footer">
            <p class="lb-title">{{ activeCert()!.title }}</p>
            <div class="lb-meta">
              <span class="issuer-badge" [class]="activeCert()!.issuerType">{{ activeCert()!.issuer }}</span>
              @if (activeCert()!.date) {
                <span class="cert-date">{{ activeCert()!.date }}</span>
              }
              <span class="lb-counter">{{ (activeIndex() ?? 0) + 1 }} / {{ certs().length }}</span>
            </div>
          </div>

        </div>
      </div>
    }
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
      margin-bottom: 6px;
    }

    .count {
      font-size: 0.8125rem;
      color: var(--clr-text-muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .card {
      background: none;
      border: 1px solid var(--clr-border);
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      padding: 0;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }

    .card:hover {
      border-color: var(--clr-accent);
      box-shadow: 0 4px 20px color-mix(in srgb, var(--clr-accent) 15%, transparent);
      transform: translateY(-2px);
    }

    .card-thumb {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: var(--clr-surface);
    }

    .card-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      transition: transform 0.3s ease;
    }

    .card:hover .card-thumb img { transform: scale(1.04); }

    .card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      opacity: 0;
      transition: opacity 0.2s ease;
      color: white;
      font-size: 0.8125rem;
      font-weight: 500;
      letter-spacing: 0.05em;
    }

    .card:hover .card-overlay { opacity: 1; }

    .card-body {
      padding: 12px 14px;
      background: var(--clr-bg);
    }

    .card-title {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--clr-text);
      line-height: 1.4;
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .issuer-badge {
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      border-radius: 4px;
      padding: 2px 8px;
    }

    .issuer-badge.google {
      background: color-mix(in srgb, #4285f4 12%, transparent);
      color: #1a56db;
      border: 1px solid color-mix(in srgb, #4285f4 25%, transparent);
    }

    .issuer-badge.udemy {
      background: color-mix(in srgb, #a435f0 10%, transparent);
      color: #7e22ce;
      border: 1px solid color-mix(in srgb, #a435f0 22%, transparent);
    }

    .issuer-badge.mitpu {
      background: color-mix(in srgb, #1a3a6e 10%, transparent);
      color: #1a3a6e;
      border: 1px solid color-mix(in srgb, #1a3a6e 22%, transparent);
    }

    :root.dark .issuer-badge.google { color: #93c5fd; background: rgba(66, 133, 244, 0.15); border-color: rgba(66, 133, 244, 0.3); }
    :root.dark .issuer-badge.udemy  { color: #d8b4fe; background: rgba(164, 53, 240, 0.15); border-color: rgba(164, 53, 240, 0.3); }
    :root.dark .issuer-badge.mitpu  { color: #93c5fd; background: rgba(26, 58, 110, 0.35);  border-color: rgba(26, 58, 110, 0.5);  }

    .cert-date {
      font-size: 0.75rem;
      color: var(--clr-text-muted);
    }

    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: lbFadeIn 0.2s ease;
      padding: 20px;
    }

    @keyframes lbFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .lb-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      max-width: min(90vw, 960px);
      width: 100%;
      animation: lbSlideUp 0.22s ease;
    }

    @keyframes lbSlideUp {
      from { transform: translateY(16px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    .lb-img-wrap {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
      max-height: 75vh;
      display: flex;
    }

    .lb-img-wrap img {
      max-width: 100%;
      max-height: 75vh;
      object-fit: contain;
      display: block;
    }

    .lb-close {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s ease;
      z-index: 10;
    }

    .lb-close:hover { background: rgba(255, 255, 255, 0.28); }

    .lb-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateY(-40px);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s ease, opacity 0.15s ease;
      z-index: 10;
    }

    .lb-nav:hover { background: rgba(255, 255, 255, 0.25); }
    .lb-nav:disabled { opacity: 0.25; cursor: default; }

    .lb-prev { left: -56px; }
    .lb-next { right: -56px; }

    .lb-footer {
      text-align: center;
      color: white;
    }

    .lb-title {
      font-size: 0.9375rem;
      font-weight: 500;
      margin-bottom: 6px;
    }

    .lb-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .lb-counter {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 900px) {
      .lb-prev { left: 8px; }
      .lb-next { right: 8px; }
      .lb-close { top: -48px; right: 0; }
    }

    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 24px; }
      .grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    }

    @media (max-width: 480px) {
      .grid { grid-template-columns: 1fr; }
    }
  `],
})
export class CertificationsComponent {
  certs = input.required<Certificate[]>();

  activeIndex = signal<number | null>(null);
  activeCert = computed(() => {
    const i = this.activeIndex();
    return i !== null ? this.certs()[i] : null;
  });

  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.doc.body.style.overflow = this.activeIndex() !== null ? 'hidden' : '';
    });

    afterNextRender(() => {
      const onKey = (e: KeyboardEvent) => {
        if (this.activeIndex() === null) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'ArrowLeft') this.prev();
      };
      window.addEventListener('keydown', onKey);
      this.destroyRef.onDestroy(() => window.removeEventListener('keydown', onKey));
    });
  }

  open(index: number) { this.activeIndex.set(index); }

  close() { this.activeIndex.set(null); }

  next() {
    this.activeIndex.update(i => (i !== null && i < this.certs().length - 1 ? i + 1 : i));
  }

  prev() {
    this.activeIndex.update(i => (i !== null && i > 0 ? i - 1 : i));
  }
}
