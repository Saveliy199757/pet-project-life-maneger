import {Component, Input, OnInit} from '@angular/core';
import {INavbarData} from "./helper";

@Component({
  selector: 'app-sublevel-menu',
  template: `
     <ul class="sublevel-nav" *ngIf="collapsed && data.items && data.items.length > 0">
       <li class="sublevel-nav-item" *ngFor="let item of data.items">
         <a href="" class="sublevel-nav-link"
            *ngIf="item.items && item.items.length > 0">
           <i class="sublevel-link-icon fa fa-circle"></i>
           <span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
           <i class="menu-collapse-icon"
              *ngIf="collapsed && item.items"
              [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"
           ></i>
         </a>
       </li>
     </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed = false
  @Input() animating: boolean | undefined
  @Input() expanded: boolean | undefined
  @Input() multiple: boolean = false



  constructor() { }

  ngOnInit(): void {
  }

}
