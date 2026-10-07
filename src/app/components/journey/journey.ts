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


  // ============================================================
  // THE SHORE
  // ============================================================

 readonly shoreStories: Story[] = [
  {
    number: '00',
    title: 'The Shore',
    type: 'Where it begins',
    chapter: 'THE SHORE',
    text: [
      'I’m Sahil. I’m currently pursuing my MBA at IIM Bodh Gaya, after completing my B.Tech in Metallurgy and Materials Engineering from NIT Srinagar.',

      'If I had to describe myself simply, I’d say I’m a pretty happy and easygoing person. I like meeting new people, hearing their stories and getting to know how they see the world. I’ve always been curious about people in general. History is another thing that has stayed with me for a long time. I like going back and understanding why things happened the way they did, and how people and their decisions shaped what came next.',

      'A lot of who I am also comes from the way I grew up. My family has always been important to me. So are consistency, ambition and love. I don’t think I have everything figured out, and honestly, I don’t think I need to. I just know that when something really matters to me, I want to give it my best and see where it takes me.',

      'For me, the idea of the shore is closely connected to home. It’s the place where you can be completely yourself. The place where people know you, where you can come back after being away for a while and still feel like nothing has really changed.',

      'That feeling of home matters to me because life keeps moving. New places, new people, new decisions, new versions of yourself. I want to experience all of that, but I also want to have something that keeps me grounded through it.',

      'I want to build a successful life and career for myself. I don’t have a perfect plan for how I’ll get there, and I’m okay with that. There are still a lot of things I want to learn, try and figure out along the way.',

      'This is the shore for me. It’s where I come from, the people and things that keep me grounded, and everything that has shaped the person I am today.',

      'The rest of the journey is still ahead.'
    ]
  }
];


  // ============================================================
  // THE FIRST WAVE
  // ============================================================

  readonly firstWaveStories: Story[] = [
    {
     number: '01',
title: 'The First Wave',
type: 'A beginning',
chapter: 'THE FIRST WAVE',
text: [
  'I was a mischievous kid. Curious about a lot of things, but not particularly interested in studying.',

  'For a long time, studies just weren’t my thing. I had ambitions, but I didn’t really know what I was supposed to do with them. I didn’t even know what JEE was or what engineering really meant.',

  'Things changed around 11th standard. I became serious about JEE and started putting in the work. I was naturally strong in Physics, Chemistry and Mathematics, so once I found the direction, things started falling into place. Eventually, I made it to NIT Srinagar.',

  'Looking back, I think a lot of my personality was shaped by moving around. My father was in the Army, so every few years we’d move to a new place and I’d have to start again in a new school, with new people and a completely new environment.',

  'Every move gave me a chance to change something about myself. I tried different versions of who I could be. Sports taught me competition. Leadership taught me responsibility. Failures taught me that things don’t always go the way you want them to.',

  'At NIT Srinagar, I chose Metallurgy and Materials Engineering because I liked the idea of studying something that actually exists all around us. Materials are part of almost everything we see and use, and I found that connection with real life interesting.',

  'Around the same time, another unexpected chapter began. I started a YouTube channel where I talked about JEE and tried to help students who were going through the same preparation that I had just gone through. I eventually became an educator with Unacademy for a year.',

  'The channel grew to around 13,000 subscribers. One of my live streams crossed 2 lakh views.',

  'But the most unexpected thing that came out of YouTube had nothing to do with numbers.',

  'Somewhere along the way, a subscriber became someone I fell in love with.',

  'Six years later, we’re still together.',

  'I think that’s what I remember most about that phase of my life. I started it trying to figure out what I could become, and along the way I found people, experiences and parts of myself that I never knew I would.',

  'I didn’t really know where the first wave would take me. I just decided to ride it.'
]
    }
  ];


  // ============================================================
  // THE CURRENT
  // ============================================================

 readonly currentStories: Story[] = [
  {
    number: '02',
    title: 'The People Who Shaped Me',
    type: 'What stays with you',
    chapter: 'THE CURRENT',
    text: [
      'A lot of who I am today comes from the people I have had around me. More than anything, I think I have learned by watching people and spending time with them.',

      'My father is probably the biggest example of that. I have learned a lot from the way he lives and behaves. He is positive, kind and funny, but at the same time, he is disciplined and responsible. That balance has always stood out to me. I look up to him a lot, and honestly, I think I will feel truly successful the day I can look at myself and say that I have become like my father.',

      'My partner has shaped me in a very different way. She taught me a lot about love, but also about people and relationships. Being with her has changed me in ways that go beyond just our relationship. I can proudly say that I have grown in love, academically, professionally and emotionally.',

      'She also helped me understand things that I probably would not have learned on my own. Gratitude, kindness, faith and some of the positive values that I was missing slowly became a part of me. Some things in life are taught to you directly, and some things you simply pick up from the person you spend your life with. For me, a lot of it happened naturally.',

      'What matters to me now is actually quite simple. Stability, family and health. As I have grown older, I have started valuing these things much more. Ambition is still important to me, but I have realised that success does not mean much if the people you love and your own well-being are not a part of it.',

      'I have always been a social person. I have never really had trouble talking to people or making friends. But growing up has changed the way I look at things. I have become calmer, more confident and more ambitious. I am also much more comfortable with uncertainty now. I do not need to know exactly how everything is going to turn out before taking the next step.',

      'One thing I have slowly come to believe is that people remember how you made them feel more than what you actually said. Maybe that is why kindness and the way you treat people matter so much to me now.',

      'I am still figuring things out. But when I look at the people around me and the things they have taught me, I can see where a lot of my current is coming from.'
    ]
  }
];


  // ============================================================
  // THE STORM
  // ============================================================

readonly stormStories: Story[] = [
  {
    number: '03',
    title: 'The Turn',
    type: 'A change in direction',
    chapter: 'THE STORM',
    text: [
      'For a long time, I thought I knew what my path was supposed to look like. I had studied engineering, completed my degree from NIT Srinagar and eventually got placed in a company. On paper, things were moving in the right direction.',

      'But after spending some time working, I started asking myself a different question. Was this really the direction I wanted to spend the next part of my life in? I realised that there was a lot more that interested me outside the technical side of engineering. I had started becoming curious about how businesses work, how decisions are made and how people and organisations grow.',

      'It took me some time to accept that changing direction did not mean that the years I had already spent were wasted. Engineering had given me a way of thinking, problem solving and looking at things logically. I wanted to take those things with me and build something different on top of them.',

      'That became a turning point for me. I decided to leave my job and prepare for CAT. It was probably one of the more uncertain decisions I had made until then, but it also felt like the first decision I was making because I genuinely wanted to explore where I could go next.',

      'The difficult part was what came after. I was at home preparing for CAT every day while not working. From the outside, it probably looked simple. Study, prepare, give the exam and move on. In reality, every day came with its own pressure. People around you have expectations, and when you are not working, you sometimes start questioning yourself too.',

      'What made that phase easier was my parents. They never made me feel like I had made the wrong decision. They supported me through the uncertainty and gave me the space to keep going when things were not always easy.',

      'There is also one thing from that time that I still carry with me. My grandfather was very ill while I was preparing for CAT. We knew that we did not have much time with him. I was very close to him, and he had always been one of the people who believed in me.',

      'He was not educated himself, but he always wanted me to go further. He would tell me that I had to reach a certain level, that I had made our family proud by going to college and that he was proud of me for going on to higher studies. He did not really know what NIT or IIM meant. He just knew that I was doing something good with my life, and that was enough for him to be proud.',

      'He passed away before I could tell him that I had got into IIM. That is probably the one regret from that phase that I will always have. I wish I could have sat with him and told him that all those days of preparation had finally led somewhere. I wish he could have known what I was preparing for and that I had made it.',

      'But I also know that he would have been proud either way. He never needed to understand the names or the institutions. He was proud of the person he thought I could become.',

      'Looking back, that period taught me that not every difficult phase needs to have a perfect explanation. Sometimes you just have to keep moving, even when you are unsure of where the road is going. Changing direction was not the end of what I had started. It was simply the point where I chose to find out what else I could become.'
    ]
  }
];

  // ============================================================
  // THE HORIZON
  // ============================================================

readonly horizonStories: Story[] = [
  {
    number: '04',
    title: 'What Lies Ahead',
    type: 'The road forward',
    chapter: 'THE HORIZON',
    text: [
      'I don’t have every part of my future planned out, and I think I am finally comfortable with that. There was a time when I thought I needed to know exactly what came next. Now I’m more interested in knowing what kind of life I want to build and letting the details take shape along the way.',

      'Professionally, I want to keep growing. I want to build a career that challenges me, gives me room to learn and eventually allows me to create something that I can genuinely be proud of. I have moved from engineering to management, and that change has taught me that the path does not always have to be straight to be meaningful.',

      'I want to keep meeting people, learning from them and putting myself in situations where I have something new to figure out. I want to travel, experience different places, understand different ways of living and keep that curiosity that has been a part of me since I was young.',

      'At the same time, I want to build a stable life. A life where my family is happy and healthy, where I can take care of the people who have taken care of me, and where there is enough room for the people I love. For me, that matters just as much as anything I achieve professionally.',

      'I also want to stay the same person in the ways that matter. I want to remain kind, positive and easy to be around. I want to keep laughing, keep meeting people, keep learning and not take myself too seriously.',

      'There is still a lot I want to do. Some of it I already know, and some of it I will probably discover along the way. I’m not worried about having the whole map anymore.',

      'I just want to keep moving forward, take the opportunities that come my way, make the people I love proud and see how far this journey can take me.',

      'The horizon is still far away. That is what makes it exciting.'
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