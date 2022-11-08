import {Component, Input, OnInit} from '@angular/core';
import {fadeInOut, INavbarData} from "./helper";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sublevel-menu',
  template: `
     <ul class="sublevel-nav"
         *ngIf="collapsed && data.items && data.items.length > 0"
         [@submenu] = "expanded ?
         {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}} :
         {value: 'hidden', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}} "
     >
       <li class="sublevel-nav-item"
           *ngFor="let item of data.items"
       >
         <a class="sublevel-nav-link"
            [ngClass]="getActiveClass(item)"
            (click)="handleClick(item)"
            *ngIf="item.items && item.items.length > 0">
           <i class="sublevel-link-icon fa fa-circle"></i>
           <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
           <i class="menu-collapse-icon"
              *ngIf="collapsed && item.items"
              [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"
           ></i>
         </a>
         <a class="sublevel-nav-link"
            *ngIf="!item.items || (item.items && item.items.length === 0)"
            [routerLink]="item.routeLink"
            routerLinkActive="active-sublevel"
            [routerLinkActiveOptions]="{exact: true}"
         >
           <i class="sublevel-link-icon fa fa-circle"></i>
           <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
         </a>
         <div *ngIf="item.items && item.items.length > 0">
           <app-sublevel-menu
             [data]="item"
             [collapsed]="collapsed"
             [multiple]="multiple"
             [expanded]="item.expanded"
           >
           </app-sublevel-menu>
         </div>
       </li>
     </ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [
        style({overflow: 'hidden'}),
        animate('{{transitionParams}}'),
        transition('void => *', animate(0))
      ])
    ])
  ]
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

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false
          }
        }
      }
    }
    item.expanded = !item.expanded
  }
  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink) ? "active-sublevel" : ""
  }

}
