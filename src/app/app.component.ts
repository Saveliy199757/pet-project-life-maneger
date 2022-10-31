import { Component } from '@angular/core';

interface sidenavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidenavCollapsed = false
  screenWidth = 0
  onToggleSidenav(data: sidenavToggle): void {
    this.isSidenavCollapsed = data.collapsed
    this.screenWidth = data.screenWidth
  }
}
