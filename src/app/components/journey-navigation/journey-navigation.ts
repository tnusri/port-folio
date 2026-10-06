import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-journey-navigation',
  imports: [CommonModule],
  templateUrl: './journey-navigation.html',
  styleUrl: './journey-navigation.scss'
})
export class JourneyNavigation {

  // ============================================================
  // JOURNEY PROGRESS
  // ============================================================

  /**
   * Overall journey progress.
   *
   * 0.00 = Shore
   * 0.25 = First Wave
   * 0.50 = Current
   * 0.75 = Storm
   * 1.00 = Horizon
   */
  @Input() progress = 0;


  // ============================================================
  // NAVIGATION ITEMS
  // ============================================================

  readonly sections = [
    {
      number: '01',
      label: 'The Shore'
    },
    {
      number: '02',
      label: 'The First Wave'
    },
    {
      number: '03',
      label: 'The Current'
    },
    {
      number: '04',
      label: 'The Storm'
    },
    {
      number: '05',
      label: 'The Horizon'
    }
  ];


  // ============================================================
  // ACTIVE SECTION
  // ============================================================

  /**
   * Determines the active chapter from the actual
   * story position inside the viewport.
   *
   * This keeps the navigation synchronized with
   * what the visitor is actually looking at.
   */
  getActiveSection(): number {

    const storySections =
      document.querySelectorAll('.story');

    if (!storySections.length) {
      return 0;
    }

    const viewportMiddle =
      window.innerHeight / 2;

    let activeSection = 0;

    storySections.forEach((section, index) => {

      const rect =
        section.getBoundingClientRect();

      if (rect.top <= viewportMiddle) {
        activeSection = index;
      }

    });

    return Math.min(
      activeSection,
      this.sections.length - 1
    );
  }


  // ============================================================
  // NAVIGATION
  // ============================================================

  /**
   * Scrolls to a specific story section.
   */
  goToSection(index: number): void {

    const storySections =
      document.querySelectorAll('.story');

    const section =
      storySections[index];

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}