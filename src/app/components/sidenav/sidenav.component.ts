import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarData} from "./nav-data";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {fadeInOut, INavbarData} from "./helper";
import {Router} from "@angular/router";

interface sidenavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
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

  constructor(public router: Router) { }

  collapsed = false
  navData = navbarData
  screenWidth = 0
  multiple: boolean = false

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
  handleClick(item: INavbarData): void {
    this.shrinkItems(item)
    item.expanded = !item.expanded
  }
  getActiveClass(data: INavbarData): string {
   return this.router.url.includes(data.routeLink) ? "active" : ""
  }
  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false
        }
      }
    }
  }
 }
