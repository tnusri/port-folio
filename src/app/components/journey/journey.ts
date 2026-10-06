import {
  Component,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

interface Story {
  number: string;
  title: string;
  type: string;
  chapter: string;
  text: string[];
}

@Component({
  selector: 'app-journey',
  imports: [],
  templateUrl: './journey.html',
  styleUrl: './journey.scss'
})
export class Journey {

  progress = 0;

  showJourneyIdentity = false;

  activeStory: Story | null = null;


  /*
   * Prevents multiple navigation inputs from
   * skipping several chapters while a smooth
   * transition is still happening.
   */
  private isNavigating = false;


  /*
   * The five full-screen journey chapters.
   */
  private readonly sectionSelectors = [
    '.story--shore',
    '.story--first-wave',
    '.story--current',
    '.story--storm',
    '.story--horizon'
  ];


  readonly firstWaveStories: Story[] = [
    {
      number: '01',
      title: 'The First Question',
      type: 'A beginning',
      chapter: 'THE FIRST WAVE',
      text: [
        'Every journey begins with something small.',
        'A question. A curiosity. A moment that makes you look at the world a little differently.',
        'This is the beginning of Sahil’s story — the moments that first made him want to understand, explore and discover.'
      ]
    },
    {
      number: '02',
      title: 'The Unexpected Turn',
      type: 'A turning point',
      chapter: 'THE FIRST WAVE',
      text: [
        'Not every important moment arrives exactly as expected.',
        'Sometimes a change in direction becomes the beginning of something more meaningful.',
        'This is a story about one of those turns — and what it revealed along the way.'
      ]
    },
    {
      number: '03',
      title: 'Something Worth Following',
      type: 'A growing curiosity',
      chapter: 'THE FIRST WAVE',
      text: [
        'Some interests disappear. Others quietly stay with you.',
        'What begins as curiosity can slowly become a way of seeing the world.',
        'This is the story of something Sahil chose to keep following.'
      ]
    }
  ];


  readonly currentStories: Story[] = [
    {
      number: '01',
      title: 'The People Around Me',
      type: 'Influence',
      chapter: 'THE CURRENT',
      text: [
        'No one becomes who they are completely alone.',
        'The people around us leave impressions, challenge our thinking and shape the way we see ourselves.',
        'These are the people and relationships that have influenced Sahil’s journey.'
      ]
    },
    {
      number: '02',
      title: 'What Matters',
      type: 'Values',
      chapter: 'THE CURRENT',
      text: [
        'Over time, some things begin to matter more than others.',
        'Values are not always chosen in a single moment. They are built slowly through experience.',
        'This is about the principles that continue to guide Sahil.'
      ]
    },
    {
      number: '03',
      title: 'The Ideas I Carry',
      type: 'Perspective',
      chapter: 'THE CURRENT',
      text: [
        'Ideas change as we experience more of the world.',
        'Some disappear. Some become stronger. Others lead to entirely new questions.',
        'These are the ideas that continue to shape the way Sahil thinks and moves forward.'
      ]
    }
  ];


  readonly stormStories: Story[] = [
    {
      number: '01',
      title: 'When Things Did Not Work',
      type: 'A difficult moment',
      chapter: 'THE STORM',
      text: [
        'Every journey has moments when the path becomes unclear.',
        'Things do not always work the way we expect them to.',
        'This is a story about one of those moments and what Sahil learned from it.'
      ]
    },
    {
      number: '02',
      title: 'Learning From Failure',
      type: 'A lesson',
      chapter: 'THE STORM',
      text: [
        'Failure can feel like an ending when you are inside it.',
        'With distance, it can become something else — a lesson, a correction or a new direction.',
        'These are the lessons that changed the way Sahil approaches what comes next.'
      ]
    },
    {
      number: '03',
      title: 'Finding The Way Forward',
      type: 'Resilience',
      chapter: 'THE STORM',
      text: [
        'The important part is not avoiding every storm.',
        'It is learning how to keep moving when one arrives.',
        'This is about resilience, perspective and finding a way forward.'
      ]
    }
  ];


  readonly horizonStories: Story[] = [
    {
      number: '01',
      title: 'What Comes Next',
      type: 'The future',
      chapter: 'THE HORIZON',
      text: [
        'The horizon is not a destination.',
        'It is the direction you choose to keep moving toward.',
        'Sahil’s journey is still unfolding, with more things to learn, experience and discover.'
      ]
    },
    {
      number: '02',
      title: 'Still Becoming',
      type: 'Growth',
      chapter: 'THE HORIZON',
      text: [
        'There is no final version of a person.',
        'We keep changing through the people we meet, the things we experience and the choices we make.',
        'The journey continues with the willingness to keep becoming.'
      ]
    },
    {
      number: '03',
      title: 'The Next Shore',
      type: 'A direction',
      chapter: 'THE HORIZON',
      text: [
        'Every shore eventually becomes the beginning of another journey.',
        'There is always another question, another place to explore and another story waiting to happen.',
        'This is where Sahil is heading next.'
      ]
    }
  ];


  @Output() progressChange =
    new EventEmitter<number>();


  // ============================================================
  // MOUSE / TRACKPAD NAVIGATION
  // ============================================================

  /*
   * One intentional wheel gesture moves
   * one complete chapter.
   */
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {

    /*
     * Do not control chapter navigation while
     * a story overlay is open.
     */
    if (this.activeStory) {
      return;
    }

    /*
     * Ignore tiny trackpad movements.
     */
    if (Math.abs(event.deltaY) < 10) {
      return;
    }

    /*
     * Block additional wheel events while the
     * current chapter transition is happening.
     */
    if (this.isNavigating) {
      event.preventDefault();
      return;
    }

    const direction =
      event.deltaY > 0 ? 1 : -1;

    const moved =
      this.navigateByDirection(direction);

    if (moved) {
      event.preventDefault();
    }
  }


  // ============================================================
  // KEYBOARD NAVIGATION
  // ============================================================

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {

    /*
     * Escape keeps its existing job:
     * close the open story.
     */
    if (event.key === 'Escape') {

      if (this.activeStory) {
        event.preventDefault();
        this.closeStory();
      }

      return;
    }


    /*
     * Chapter keyboard controls should not operate
     * while the story reader is open.
     */
    if (this.activeStory) {
      return;
    }


    /*
     * Don't hijack keyboard controls while the user
     * is interacting with a form control.
     */
    const target =
      event.target as HTMLElement | null;

    if (
      target?.tagName === 'INPUT' ||
      target?.tagName === 'TEXTAREA' ||
      target?.tagName === 'SELECT' ||
      target?.isContentEditable
    ) {
      return;
    }


    /*
     * Ignore repeated keydown events caused by
     * holding a key down.
     */
    if (event.repeat) {
      event.preventDefault();
      return;
    }


    switch (event.key) {

      case 'ArrowDown':
      case 'PageDown':

        event.preventDefault();

        this.navigateByDirection(1);

        break;


      case 'ArrowUp':
      case 'PageUp':

        event.preventDefault();

        this.navigateByDirection(-1);

        break;


      case 'Home':

        event.preventDefault();

        this.navigateToIndex(0);

        break;


      case 'End':

        event.preventDefault();

        this.navigateToIndex(
          this.sectionSelectors.length - 1
        );

        break;
    }
  }


  // ============================================================
  // SCROLL STATE
  // ============================================================

  @HostListener('window:scroll')
  onScroll(): void {

    this.updateProgress();

    /*
     * Hidden on The Shore.
     * Visible from The First Wave onward.
     */
    this.showJourneyIdentity =
      window.scrollY >=
      window.innerHeight * 0.5;
  }


  // ============================================================
  // BUTTON NAVIGATION
  // ============================================================

  beginJourney(): void {

    this.showJourneyIdentity = true;

    this.goToSection(
      '.story--first-wave'
    );
  }


  goToNextSection(
    selector: string
  ): void {

    this.goToSection(selector);
  }


  // ============================================================
  // STORY READER
  // ============================================================

  openStory(story: Story): void {

    this.activeStory = story;

    document.body.classList.add(
      'story-open'
    );

    document.body.style.overflow =
      'hidden';
  }


  closeStory(): void {

    this.activeStory = null;

    document.body.classList.remove(
      'story-open'
    );

    document.body.style.overflow = '';
  }


  // ============================================================
  // CHAPTER NAVIGATION
  // ============================================================

  /*
   * Moves exactly one chapter forward or backward.
   */
  private navigateByDirection(
    direction: 1 | -1
  ): boolean {

    if (this.isNavigating) {
      return false;
    }

    const currentIndex =
      this.getCurrentSectionIndex();

    const nextIndex =
      currentIndex + direction;

    if (
      nextIndex < 0 ||
      nextIndex >=
        this.sectionSelectors.length
    ) {
      return false;
    }

    this.navigateToIndex(nextIndex);

    return true;
  }


  /*
   * Moves directly to a specific chapter.
   */
  private navigateToIndex(
    index: number
  ): void {

    if (
      index < 0 ||
      index >=
        this.sectionSelectors.length
    ) {
      return;
    }

    if (this.isNavigating) {
      return;
    }

    this.isNavigating = true;

    this.goToSection(
      this.sectionSelectors[index]
    );

    /*
     * Prevent another navigation command until
     * the smooth transition has completed.
     */
    window.setTimeout(() => {
      this.isNavigating = false;
    }, 850);
  }


  private goToSection(
    selector: string
  ): void {

    const section =
      document.querySelector(selector);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }


  /*
   * Determines which chapter currently occupies
   * the main part of the viewport.
   */
  private getCurrentSectionIndex(): number {

    const viewportMiddle =
      window.innerHeight / 2;

    let activeIndex = 0;

    this.sectionSelectors.forEach(
      (selector, index) => {

        const section =
          document.querySelector(selector);

        if (!section) {
          return;
        }

        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= viewportMiddle
        ) {
          activeIndex = index;
        }
      }
    );

    return activeIndex;
  }


  // ============================================================
  // JOURNEY PROGRESS
  // ============================================================

  private updateProgress(): void {

    const scrollTop =
      window.scrollY;

    const scrollableHeight =
      document.documentElement
        .scrollHeight -
      window.innerHeight;

    if (scrollableHeight <= 0) {

      this.progress = 0;

      this.progressChange.emit(0);

      return;
    }

    this.progress = Math.min(
      Math.max(
        scrollTop /
        scrollableHeight,
        0
      ),
      1
    );

    this.progressChange.emit(
      this.progress
    );
  }
}