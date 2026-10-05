import { Component } from '@angular/core';

import { OceanEnvironment } from './components/ocean-environment/ocean-environment';
import { Journey } from './components/journey/journey';

@Component({
  selector: 'app-root',
  imports: [
    OceanEnvironment,
    Journey
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  journeyProgress = 0;

  onJourneyProgress(progress: number): void {
    this.journeyProgress = progress;
  }
}