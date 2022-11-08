import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { share } from "rxjs/operators";

/**
 * Ключевые точки при измении размеров страницы
 */
export enum ScreenSize {
  Unknown = 1,
  XSmall,
  Small,
  Medium,
  Large,
  XLarge,
}

/**
 * Сервис для управления контентов в зависимости от размера страницы
 */
@Injectable({
  providedIn: "root",
})
export class BreakpointService {
  private displayNameMap = new Map([
    [Breakpoints.XSmall, ScreenSize.XSmall],
    [Breakpoints.Small, ScreenSize.Small],
    [Breakpoints.Medium, ScreenSize.Medium],
    [Breakpoints.Large, ScreenSize.Large],
    [Breakpoints.XLarge, ScreenSize.XLarge],
  ]);

  screen$ = new BehaviorSubject<ScreenSize>(ScreenSize.Medium);
  screen: ScreenSize = ScreenSize.Medium;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([...this.displayNameMap.keys()])
      .pipe(share())
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.screen = this.displayNameMap.get(query) ?? ScreenSize.Unknown;
            this.screen$.next(this.screen);
          }
        }
      });
  }
}
