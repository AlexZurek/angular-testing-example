import { HeroSearchComponent } from './hero-search.component';
import { HeroSearchComponentDriver } from './hero-search.driver';
import { componentTestingSetup } from 'angular-component-driver';
import { Spy } from 'jasmine-auto-spies';
import { HeroService } from '../../services/hero/hero.service';

function testSetup() {
  return componentTestingSetup({
    componentClass: HeroSearchComponent,
    driver: HeroSearchComponentDriver,
    servicesToStub: [HeroService],
  });
}

describe('HeroSearchComponent', () => {
  let componentDriver: HeroSearchComponentDriver;
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
