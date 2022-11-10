import { Directive, HostBinding, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { BreakpointService, ScreenSize } from "../services/breakpoint.service";

/**
 * Styles
 * grid-column: span var(--app-col-size, <donCol>)
 *
 * Default - 12
 */
@Directive({
  selector: "[appCol]",
})
export class ColDirective implements OnDestroy {
  @HostBinding("class.app-col") get class() {
    return true;
  }

  getColSize(size: number) {
    return `span var(--app-col-size, ${size})`;
  }
  @HostBinding("style.gridColumn") get _gridColumn() {
    if (this._xs) return this.getColSize(<number>this.xs);
    else if (this._s) return this.getColSize(<number>this.s);
    else if (this._m) return this.getColSize(<number>this.m);
    else if (this._l) return this.getColSize(<number>this.l);
    else if (this._xl) return this.getColSize(<number>this.xl);
    else return this.getColSize(this.col ?? 12);
  }

  /** size of columns */
  @Input("appCol") col?: number;
  @Input("xs") xs?: number;
  private get _xs() {
    return this.xs && this.screenSize === ScreenSize.XSmall;
  }
  @Input("s") s?: number;
  private get _s() {
    return (
      (this.s && this.screenSize === ScreenSize.Small) ||
      (this.s && !this.xs && this.screenSize === ScreenSize.XSmall)
    );
  }
  @Input("m") m?: number;
  private get _m() {
    return (
      (this.m && this.screenSize === ScreenSize.Medium) ||
      (this.m && !this.s && this.screenSize === ScreenSize.Small) ||
      (!this.xs && this.screenSize === ScreenSize.XSmall)
    );
  }
  @Input("l") l?: number;
  private get _l() {
    return (
      (this.l && this.screenSize === ScreenSize.Large) ||
      (this.l && !this.m && this.screenSize === ScreenSize.Medium) ||
      (this.l && !this.s && this.screenSize === ScreenSize.Small) ||
      (this.l && !this.xs && this.screenSize === ScreenSize.XSmall)
    );
  }
  @Input("xl") xl?: number;
  private get _xl() {
    return (
      (this.xl && this.screenSize === ScreenSize.XLarge) ||
      (this.xl && !this.l && this.screenSize === ScreenSize.Large) ||
      (this.xl && !this.m && this.screenSize === ScreenSize.Medium) ||
      (this.xl && !this.s && this.screenSize === ScreenSize.Small) ||
      (this.xl && !this.xs && this.screenSize === ScreenSize.XSmall)
    );
  }

  private subscription = new Subscription();
  private screenSize?: ScreenSize = ScreenSize.Medium;

  constructor(private breakpoint: BreakpointService) {
    this.subscription.add(
      this.breakpoint.screen$.subscribe((screenSize) => {
        this.screenSize = screenSize;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
