import { observable, action, computed } from 'mobx';

class LayoutStore {
  @observable sideNavToggled;
  @observable headerHeight;

  @computed get sideNavWidth() {
    return this.sideNavToggled ? 220 : 56;
  }

  constructor() {
    this.sideNavToggled = true;
    this.headerHeight = 56;
  }

  @action
  toggleSideNav() {
    this.sideNavToggled = !this.sideNavToggled;
  }
}

export default new LayoutStore();