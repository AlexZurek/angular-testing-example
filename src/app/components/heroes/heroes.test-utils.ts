import { HeroesComponentDriver } from './heroes.driver';
import { HeroService } from 'src/app/services/hero/hero.service';
import { Spy } from 'jasmine-auto-spies';
import { Hero } from 'src/app/hero';

export class Tester {
  /**
   * This is where the 'given' comment goes
   */
  public given: Given;

  /**
   * This is where the 'when' comment goes
   */
  public when: When;

  /**
   * This is where the 'then' comment goes
   */
  public then: Then;

  constructor(
    componentDriver: HeroesComponentDriver,
    ...stubbedServices: any[]
  ) {
    // let heroServiceSpy: Spy<HeroService> = stubbedServices[0];
    let [heroServiceSpy] = stubbedServices;
    this.given = new Given(heroServiceSpy);
    this.when = new When(componentDriver);
    this.then = new Then(componentDriver, heroServiceSpy);
  }
}

/**
 * This is where the 'Given' class comment goes
 */
class Given {
  constructor(private heroServiceSpy: Spy<HeroService>) {}

  no_heroes_are_present() {
    this.heroServiceSpy.getHeroes.and.nextWith([]);
  }

  three_heroes_are_present() {
    const heroes: Hero[] = [
      { id: 10, name: 'Dr Evil' },
      { id: 13, name: 'Dr Doolittle' },
      { id: 14, name: 'Dr Nick' },
    ];

    this.heroServiceSpy.getHeroes.and.nextWith(heroes);
  }
}

/**
 * This is where the 'When' class comment goes
 */
class When {
  constructor(private componentDriver: HeroesComponentDriver) {}

  the_component_is_ready() {
    this.componentDriver.detectChanges();
  }
}

/**
 * This is where the 'Then' class comment goes
 */
class Then {
  constructor(
    private componentDriver: HeroesComponentDriver,
    private heroServiceSpy: Spy<HeroService>
  ) {}

  the_component_exists() {
    expect(this.componentDriver.componentInstance).toBeTruthy();
  }

  there_are_no_heroes_shown() {
    expect(this.componentDriver.heroElements().length).toBe(0);
  }

  there_are_three_heroes_shown() {
    expect(this.componentDriver.heroElements().length).toBe(3);
  }

  there_are_four_heroes_shown() {
    expect(this.componentDriver.heroElements().length).toBe(3);
  }
}
