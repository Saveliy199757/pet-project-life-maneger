import { Directive, HostBinding, Input } from "@angular/core";

/**
 * Styles:
 * grid-template-columns: repeat(var(--don-grid-size, <donGridSize>), var(--don-grid-col-size, <donGridAuto>)
 * justify-content: var(--don-grid-justify, <donGridJustify>)
 * row-gap: var(--don-grid-gap, var(--don-grid-rowGap, <donGridRowGap>))
 * row-gap: var(--don-grid-gap, var(--don-grid-columnGap, <donGridColumnGap>))
 * border-left: var(--don-grid-border, <donGridBorder>) solid transparent
 * border-right: var(--don-grid-border, <donGridBorder>) solid transparent
 *
 * donGrid - shorthand
 * Example: 12 24px/32px/32px auto/between
 * 12 - donGridSize
 * 24px - donGridColumnGap
 * 32px - donGridRowGap
 * 32px - donGridBorder
 * auto - donGridAuto (auto === true)
 * between - donGridJustify
 *
 * Example: 12 24px
 * 12 - donGridSize
 * 24px - donGridColumnGap
 * 24px - donGridRowGap
 *
 * Default - 12 32px
 */
@Directive({
  selector: "[donGrid]",
})
export class GridDirective {
  @HostBinding("class.don-grid") get class() {
    return true;
  }
  @HostBinding("style.display") get _display() {
    return "grid";
  }
  @HostBinding("style.gridTemplateColumns") get _gridTemplateColumns() {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const size = this.size ?? +short[0] ?? 12;
    const [_auto, _justify] = short[2]?.split("/") ?? [];
    const auto = this.auto ?? _auto === "auto" ?? false;
    return `repeat(var(--don-grid-size, ${size}), var(--don-grid-col-size, ${
      auto ? "auto" : "1fr"
    }))`;
  }
  @HostBinding("style.justifyContent") get _justifyContent(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_auto, _justify] = short[2]?.split("/") ?? [];
    const justify = this.justify ?? _justify;
    if (justify) return `var(--don-grid-justify, ${justify})`;
  }
  @HostBinding("style.rowGap") get _rowGap() {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_columnGap, _rowGap] = short[1]?.split("/") ?? [];
    const rowGap = this.rowGap ?? _rowGap ?? _columnGap ?? "32px";
    return `var(--don-grid-gap, var(--don-grid-rowGap, ${rowGap}))`;
  }
  @HostBinding("style.columnGap") get _columnGap() {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_columnGap] = short[1]?.split("/") ?? [];
    const columnGap = this.columnGap ?? _columnGap ?? "32px";
    return `var(--don-grid-gap, var(--don-grid-columnGap, ${columnGap}))`;
  }
  @HostBinding("style.borderLeft") get _borderLeft(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [, , _border] = short[1]?.split("/") ?? [];
    const border = this.border ?? _border;
    if (border) return `var(--don-grid-border, ${border}) solid transparent`;
  }
  @HostBinding("style.borderRight") get _borderRight(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [, , _border] = short[1]?.split("/") ?? [];
    const border = this.border ?? _border;
    if (border) return `var(--don-grid-border, ${border}) solid transparent`;
  }

  /** shorthand
   * 12
   * 12 24px
   * 12 24px/32px
   * 12 24px/32px auto/between
   * 12 24px/32px/32px
   * 12 24px/32px/32px auto/between
   */
  @Input("donGrid") grid?: string = "12 32px";
  _parsedGrid?: string[];
  /**
   * columns width
   * if true auto else 1fr
   */
  @Input("donGridAuto") auto?: boolean;
  /** columns count */
  @Input("donGridSize") size?: number;
  /** flex justify content */
  @Input("donGridJustify") justify?: string;
  @Input("donGridColumnGap") columnGap?: string;
  @Input("donGridRowGap") rowGap?: string;
  /** the distance to the left and right of the grid */
  @Input("donGridBorder") border?: string;
}
