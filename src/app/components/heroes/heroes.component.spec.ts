import { HeroesComponent } from './heroes.component';
import { HeroesComponentDriver } from './heroes.driver';
import { componentTestingSetup } from 'angular-component-driver';
import { Spy } from 'jasmine-auto-spies';
import { HeroService } from '../../services/hero/hero.service';

function testSetup() {
  return componentTestingSetup({
    componentClass: HeroesComponent,
    driver: HeroesComponentDriver,
    servicesToStub: [HeroService],
  });
}

describe('HeroesComponent', () => {
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
