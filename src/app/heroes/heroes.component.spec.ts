import { HeroesComponent } from './heroes.component';
import { HeroesComponentDriver } from './heroes.driver';
import { componentTestingSetup } from 'angular-component-driver';
import { Spy } from 'jasmine-auto-spies';
import { HeroService } from '../hero.service';

function testSetup() {
  return componentTestingSetup({
    componentClass: HeroesComponent,
    driver: HeroesComponentDriver,
    servicesToStub: [HeroService],
  });
}

describe('HeroDetailComponent', () => {
  let componentDriver: HeroesComponentDriver;
  let heroServiceSpy: Spy<HeroService>;

  beforeEach(() => {
    componentDriver = testSetup().createComponentDriver();
    heroServiceSpy = componentDriver.injector.get(HeroService);
    heroServiceSpy.getHeroes.and.nextWith([]);
  });

  beforeEach(() => {
    componentDriver.detectChanges();
  });

  it('should create', () => {
    expect(componentDriver.componentInstance).toBeTruthy();
  });
});
