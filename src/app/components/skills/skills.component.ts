import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillGroup } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills">
      <div class="container">
        <div class="section-header">
          <span class="label">Skills</span>
          <h2>Technical toolkit</h2>
        </div>
        <div class="grid">
          @for (group of skills(); track group.category) {
            <div class="group">
              <h3>{{ group.category }}</h3>
              <ul>
                @for (item of group.items; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
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
      background: var(--clr-surface);
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

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 32px 40px;
    }

    .group h3 {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--clr-text-muted);
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    li {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--clr-text);
      background: var(--clr-bg);
      border: 1px solid var(--clr-border);
      border-radius: 4px;
      padding: 4px 12px;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 24px; }
      .grid { grid-template-columns: 1fr 1fr; gap: 24px; }
    }

    @media (max-width: 480px) {
      .grid { grid-template-columns: 1fr; }
    }
  `],
})
export class SkillsComponent {
  skills = input.required<SkillGroup[]>();
}
