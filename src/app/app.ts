import { Component } from '@angular/core';

import { OceanEnvironment } from './components/ocean-environment/ocean-environment';
import { Journey } from './components/journey/journey';
import { JourneyNavigation } from './components/journey-navigation/journey-navigation';
import { JourneyFooter } from './components/journey-footer/journey-footer';

@Component({
  selector: 'app-root',

  imports: [
    OceanEnvironment,
    Journey,
    JourneyNavigation,
    JourneyFooter
  ],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  // ============================================================
  // JOURNEY PROGRESS
  // ============================================================

  journeyProgress = 0;


  // ============================================================
  // JOURNEY PROGRESS UPDATE
  // ============================================================

  onJourneyProgress(progress: number): void {
    this.journeyProgress = progress;
  }
}