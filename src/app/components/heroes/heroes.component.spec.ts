import { HeroesComponent } from './heroes.component';
import { HeroesComponentDriver } from './heroes.driver';
import { componentTestingSetup } from 'angular-component-driver';
import { Spy } from 'jasmine-auto-spies';
import { HeroService } from '../../services/hero/hero.service';
import { Tester } from './heroes.test-utils';

/**
 * setup the component driver for testing
 */
function testSetup() {
  return componentTestingSetup({
    componentClass: HeroesComponent,
    driver: HeroesComponentDriver,
    servicesToStub: [HeroService],
  });
}

describe('HeroesComponent', () => {
  let componentDriver: HeroesComponentDriver;
  let tester: Tester;
  let heroServiceSpy: Spy<HeroService>;

  beforeEach(() => {
    // Initialize component driver and any injected services
    componentDriver = testSetup().createComponentDriver();
    heroServiceSpy = componentDriver.injector.get(HeroService);

    tester = new Tester(componentDriver, heroServiceSpy);
  });

  it('should create with no heroes', () => {
    tester.given.no_heroes_are_present();
    tester.when.the_component_is_ready();
    tester.then.there_are_no_heroes_shown();
  });

  it('should create with three heroes', () => {
    tester.given.three_heroes_are_present();
    tester.when.the_component_is_ready();
    tester.then.there_are_three_heroes_shown();
  });
});
