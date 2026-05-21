import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Job } from '../../models/portfolio.model';

const BULLETS_PREVIEW = 4;

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience">
      <div class="container">
        <div class="section-header">
          <span class="label">Experience</span>
          <h2>Where I've worked</h2>
        </div>
        <div class="jobs">
          @for (job of jobs(); track job.company; let i = $index) {
            <article class="job">
              <div class="job-header">
                <h3>
                  {{ job.company }}
                  @if (job.via) {
                    <span class="via">{{ job.via }}</span>
                  }
                </h3>
                <p class="role">{{ job.role }}</p>
                <p class="period-loc">
                  <span>{{ job.period }}</span>
                  <span class="dot" aria-hidden="true">·</span>
                  <span>{{ job.location }}</span>
                </p>
                @if (job.partTimePeriod) {
                  <div class="employment-badges">
                    <span class="emp-badge">Part Time</span>
                    <span class="emp-badge">Full Time</span>
                  </div>
                }
              </div>

              <p class="project-desc">{{ job.project }}</p>

              <ul class="bullets">
                @for (bullet of visibleBullets(job, i); track bullet.label) {
                  <li>
                    <strong>{{ bullet.label }}:</strong>
                    {{ bullet.text }}
                  </li>
                }
              </ul>

              @if (job.bullets.length > BULLETS_PREVIEW) {
                <button
                  class="toggle-btn"
                  (click)="toggleJob(i)"
                  [attr.aria-expanded]="expandedJobs().has(i)"
                >
                  @if (expandedJobs().has(i)) {
                    Show less
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
                  } @else {
                    Show {{ job.bullets.length - BULLETS_PREVIEW }} more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  }
                </button>
              }

              <div class="tech-row" aria-label="Technologies used">
                @for (tag of job.tech; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            </article>
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

    .jobs { display: flex; flex-direction: column; }

    .job {
      padding: 32px 0;
      border-bottom: 1px solid var(--clr-border);
    }

    .job:first-child { padding-top: 0; }
    .job:last-child { border-bottom: none; }

    .job-header { margin-bottom: 12px; }

    h3 {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--clr-text);
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 2px;
    }

    .via {
      font-size: 0.8125rem;
      font-weight: 400;
      color: var(--clr-text-muted);
    }

    .role {
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--clr-accent);
      margin-bottom: 4px;
    }

    .period-loc {
      font-size: 0.8125rem;
      color: var(--clr-text-muted);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .employment-badges {
      display: flex;
      gap: 6px;
      margin-top: 5px;
    }

    .emp-badge {
      font-size: 0.6875rem;
      font-weight: 500;
      color: var(--clr-text-muted);
      background: var(--clr-surface);
      border: 1px solid var(--clr-border);
      border-radius: 3px;
      padding: 2px 8px;
    }

    .dot { opacity: 0.5; }

    .project-desc {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--clr-text-secondary);
      font-style: italic;
      margin-bottom: 16px;
    }

    .bullets {
      list-style: none;
      padding: 0;
      margin: 0 0 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .bullets li {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: var(--clr-text-secondary);
      padding-left: 16px;
      position: relative;
    }

    .bullets li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--clr-accent);
      font-size: 0.75rem;
      top: 4px;
    }

    .bullets li strong {
      color: var(--clr-text);
      font-weight: 600;
    }

    .toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--clr-accent);
      background: none;
      border: none;
      padding: 4px 0;
      cursor: pointer;
      margin-bottom: 16px;
      transition: opacity 0.15s ease;
    }

    .toggle-btn:hover { opacity: 0.75; }

    .tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }

    .tag {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--clr-text-secondary);
      background: var(--clr-surface);
      border: 1px solid var(--clr-border);
      border-radius: 4px;
      padding: 2px 10px;
    }

    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 24px; }
    }
  `],
})
export class ExperienceComponent {
  jobs = input.required<Job[]>();
  readonly BULLETS_PREVIEW = BULLETS_PREVIEW;

  expandedJobs = signal(new Set<number>());

  visibleBullets(job: Job, index: number) {
    return this.expandedJobs().has(index)
      ? job.bullets
      : job.bullets.slice(0, BULLETS_PREVIEW);
  }

  toggleJob(index: number) {
    this.expandedJobs.update(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

}
