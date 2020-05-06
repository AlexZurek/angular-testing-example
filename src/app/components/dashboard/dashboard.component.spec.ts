import { DashboardComponent } from './dashboard.component';
import { componentTestingSetup } from 'angular-component-driver';
import { DashboardComponentDriver } from './dashboard.driver';
import { HeroService } from '../../services/hero/hero.service';
import { Spy } from 'jasmine-auto-spies';
import { Hero } from '../../hero';

function testSetup() {
  return componentTestingSetup({
    componentClass: DashboardComponent,
    driver: DashboardComponentDriver,
    servicesToStub: [HeroService],
  });
}

describe('DashboardComponent', () => {
  let myComponentDriver: DashboardComponentDriver;
  let heroServiceSpy: Spy<HeroService>;

  describe('no heroes', () => {
    beforeEach(() => {
      myComponentDriver = testSetup().createComponentDriver();
      heroServiceSpy = myComponentDriver.injector.get(HeroService);
      heroServiceSpy.getHeroes.and.nextWith([]);
    });

    beforeEach(() => {
      myComponentDriver.detectChanges();
    });

    it('should create', () => {
      expect(myComponentDriver.componentInstance).toBeTruthy();
    });
  });

  describe('three heroes', () => {
    const heroes: Hero[] = [
      { id: 10, name: 'Dr Evil' },
      { id: 13, name: 'Dr Doolittle' },
      { id: 14, name: 'Dr Nick' },
    ];

    beforeEach(() => {
      myComponentDriver = testSetup().createComponentDriver();
      heroServiceSpy = myComponentDriver.injector.get(HeroService);
      heroServiceSpy.getHeroes.and.nextWith(heroes);
    });

    beforeEach(() => {
      myComponentDriver.detectChanges();
    });

    it('should create', () => {
      expect(myComponentDriver.componentInstance).toBeTruthy();
      const heroes = myComponentDriver.heroElements;
      expect(heroes.length).toBe(3);
      expect(heroes[0].textContent).toBe('Dr Evil');
    });
  });
});
