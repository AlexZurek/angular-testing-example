import { HeroDetailComponent } from './hero-detail.component';
import { HeroDetailComponentDriver } from './hero-detail.driver';
import { componentTestingSetup } from 'angular-component-driver';
import { Spy } from 'jasmine-auto-spies';
import { HeroService } from '../../services/hero/hero.service';
import { RouterTestingModule } from '@angular/router/testing';

function testSetup() {
  return componentTestingSetup({
    componentClass: HeroDetailComponent,
    driver: HeroDetailComponentDriver,
    servicesToStub: [HeroService],
    imports: [RouterTestingModule],
  });
}

describe('HeroDetailComponent', () => {
  let componentDriver: HeroDetailComponentDriver;
  let heroServiceSpy: Spy<HeroService>;

  beforeEach(() => {
    componentDriver = testSetup().createComponentDriver();
    heroServiceSpy = componentDriver.injector.get(HeroService);
    heroServiceSpy.getHero.and.nextWith({ id: 2, name: 'Hello World' });
  });

  beforeEach(() => {
    componentDriver.detectChanges();
  });

  it('should create', () => {
    expect(componentDriver.componentInstance).toBeTruthy();
  });
});
