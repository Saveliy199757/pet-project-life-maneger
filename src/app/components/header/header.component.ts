import {Component, HostListener, Input, OnInit} from '@angular/core';
import {languages, notifications, userItems} from "./header-dummy-data";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false
  @Input() screenWidth = 0

  canShowSearchAsOverlay = false
  selectedLanguage: any
  languages = languages
  notifications = notifications
  userItems = userItems

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth)
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth)
    this.selectedLanguage = languages[0]
  }

  getHeadClass(): string {
    let styleClass = ""
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = "head-trimmed"
    } else {
      styleClass = "head-md-screen"
    }
    return styleClass
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    this.canShowSearchAsOverlay = innerWidth < 845;
  }

}
