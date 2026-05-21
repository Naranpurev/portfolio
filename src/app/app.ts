import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PORTFOLIO } from './data/portfolio.data';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EducationComponent } from './components/education/education.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    CertificationsComponent,
    ContactComponent,
  ],
  template: `
    <app-navbar />

    <main>
      <app-hero
        [name]="data.name"
        [title]="data.title"
        [tagline]="data.tagline"
        [summary]="data.summary"
        [contact]="data.contact"
      />

      <app-about
        [summary]="data.summary"
        [contact]="data.contact"
      />

      @defer (on viewport) {
        <app-experience [jobs]="data.experience" />
      } @placeholder {
        <div class="section-placeholder" style="padding: 80px 0; border-top: 1px solid #e9ecef;"></div>
      }

      @defer (on viewport) {
        <app-skills [skills]="data.skills" />
      } @placeholder {
        <div class="section-placeholder" style="padding: 80px 0; border-top: 1px solid #e9ecef; background: #f8f9fa;"></div>
      }

      @defer (on viewport) {
        <app-education [education]="data.education" />
      } @placeholder {
        <div class="section-placeholder" style="padding: 80px 0; border-top: 1px solid #e9ecef;"></div>
      }

      @defer (on viewport) {
        <app-certifications [certs]="data.certifications" />
      } @placeholder {
        <div class="section-placeholder" style="padding: 80px 0; border-top: 1px solid #e9ecef; background: #f8f9fa;"></div>
      }

      @defer (on viewport) {
        <app-contact [contact]="data.contact" />
      } @placeholder {
        <div class="section-placeholder" style="padding: 80px 0; border-top: 1px solid #e9ecef;"></div>
      }
    </main>

    <footer class="site-footer">
      © {{ year }} Naranpurev Munkhbayar · Built with Angular {{ ngVersion }}
    </footer>
  `,
  styles: [`
    main { padding-top: 0; }
    .section-placeholder { min-height: 200px; }
  `],
})
export class App {
  readonly data = PORTFOLIO;
  readonly year = new Date().getFullYear();
  readonly ngVersion = '20';
}
