import { Component } from '@angular/core';

@Component({
  selector: 'app-journey-footer',
  imports: [],
  templateUrl: './journey-footer.html',
  styleUrl: './journey-footer.scss'
})
export class JourneyFooter {

  backToShore(): void {
    const shore = document.querySelector('.story--shore');

    if (!shore) {
      return;
    }

    shore.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}