import { HeroesComponent } from './heroes.component';
import { ComponentDriver } from 'angular-component-driver';

export class HeroesComponentDriver extends ComponentDriver<HeroesComponent> {
  heroElements() {
    return this.querySelectorAll('ul.heroes li');
  }
}
