import {
  Component,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Component({
  selector: 'app-journey',
  imports: [],
  templateUrl: './journey.html',
  styleUrl: './journey.scss'
})
export class Journey {

  progress = 0;

  @Output() progressChange = new EventEmitter<number>();


  // ============================================================
  // SCROLL
  // ============================================================

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateProgress();
  }


  private updateProgress(): void {

    const scrollTop = window.scrollY;

    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (scrollableHeight <= 0) {
      this.progress = 0;
      this.progressChange.emit(0);
      return;
    }

    this.progress = Math.min(
      Math.max(scrollTop / scrollableHeight, 0),
      1
    );

    this.progressChange.emit(this.progress);
  }
}