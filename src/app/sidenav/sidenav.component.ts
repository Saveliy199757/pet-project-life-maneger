import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

interface sidenavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
          )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
            ]
          )
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSidenav: EventEmitter<sidenavToggle> = new EventEmitter()

  constructor() { }

  collapsed = true
  navData = navbarData
  screenWidth = 0

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth
    if (this.screenWidth <= 768) {
      this.collapsed = false
      this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }

  toggleSidenav(): void {
    this.collapsed = !this.collapsed
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }

  closeSidenav(): void {
    this.collapsed = false
    this.onToggleSidenav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }


}
