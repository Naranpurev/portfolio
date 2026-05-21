import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Degree } from '../../models/portfolio.model';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="education">
      <div class="container">
        <div class="section-header">
          <span class="label">Education</span>
          <h2>Academic background</h2>
        </div>
        <div class="degrees">
          @for (deg of education(); track deg.school) {
            <div class="degree">
              <div class="degree-level">{{ deg.level }}</div>
              <div class="degree-info">
                <h3>{{ deg.field }}</h3>
                <p class="school">{{ deg.school }}</p>
                <p class="period-loc">
                  <span>{{ deg.period }}</span>
                  <span class="dot" aria-hidden="true">·</span>
                  <span>{{ deg.location }}</span>
                </p>
              </div>
            </div>
          }
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

    .degrees {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .degree {
      display: flex;
      gap: 24px;
      padding: 24px 0;
      border-bottom: 1px solid var(--clr-border);
      align-items: flex-start;
    }

    .degree:first-child { padding-top: 0; }
    .degree:last-child { border-bottom: none; }

    .degree-level {
      flex-shrink: 0;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--clr-accent);
      background: color-mix(in srgb, var(--clr-accent) 10%, transparent);
      border-radius: 4px;
      padding: 4px 10px;
      margin-top: 2px;
      min-width: 48px;
      text-align: center;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--clr-text);
      margin-bottom: 2px;
    }

    .school {
      font-size: 0.9375rem;
      color: var(--clr-text-secondary);
      margin-bottom: 4px;
    }

    .period-loc {
      font-size: 0.8125rem;
      color: var(--clr-text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .dot { opacity: 0.5; }

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
  `],
})
export class EducationComponent {
  education = input.required<Degree[]>();
}
