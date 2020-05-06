import { DashboardComponent } from './dashboard.component';
import { ComponentDriver } from 'angular-component-driver';

export class DashboardComponentDriver extends ComponentDriver<
  DashboardComponent
> {
  get heroElements() {
    return this.querySelectorAll('a.hero');
  }
}
