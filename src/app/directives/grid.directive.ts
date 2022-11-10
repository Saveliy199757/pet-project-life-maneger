import { Directive, HostBinding, Input } from "@angular/core";

/**
 * Styles:
 * grid-template-columns: repeat(var(--app-grid-size, <appGridSize>), var(--app-grid-col-size, <appGridAuto>)
 * justify-content: var(--app-grid-justify, <appGridJustify>)
 * row-gap: var(--app-grid-gap, var(--app-grid-rowGap, <appGridRowGap>))
 * row-gap: var(--app-grid-gap, var(--app-grid-columnGap, <appGridColumnGap>))
 * border-left: var(--app-grid-border, <appGridBorder>) solid transparent
 * border-right: var(--app-grid-border, <appGridBorder>) solid transparent
 *
 * appGrid - shorthand
 * Example: 12 24px/32px/32px auto/between
 * 12 - appGridSize
 * 24px - appGridColumnGap
 * 32px - appGridRowGap
 * 32px - appGridBorder
 * auto - appGridAuto (auto === true)
 * between - appGridJustify
 *
 * Example: 12 24px
 * 12 - appGridSize
 * 24px - appGridColumnGap
 * 24px - appGridRowGap
 *
 * Default - 12 32px
 */
@Directive({
  selector: "[appGrid]",
})
export class GridDirective {
  @HostBinding("class.app-grid") get class() {
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
    return `repeat(var(--app-grid-size, ${size}), var(--app-grid-col-size, ${
      auto ? "auto" : "1fr"
    }))`;
  }
  @HostBinding("style.justifyContent") get _justifyContent(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_auto, _justify] = short[2]?.split("/") ?? [];
    const justify = this.justify ?? _justify;
    if (justify) return `var(--app-grid-justify, ${justify})`;
  }
  @HostBinding("style.rowGap") get _rowGap() {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_columnGap, _rowGap] = short[1]?.split("/") ?? [];
    const rowGap = this.rowGap ?? _rowGap ?? _columnGap ?? "32px";
    return `var(--app-grid-gap, var(--app-grid-rowGap, ${rowGap}))`;
  }
  @HostBinding("style.columnGap") get _columnGap() {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [_columnGap] = short[1]?.split("/") ?? [];
    const columnGap = this.columnGap ?? _columnGap ?? "32px";
    return `var(--app-grid-gap, var(--app-grid-columnGap, ${columnGap}))`;
  }
  @HostBinding("style.borderLeft") get _borderLeft(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [, , _border] = short[1]?.split("/") ?? [];
    const border = this.border ?? _border;
    if (border) return `var(--app-grid-border, ${border}) solid transparent`;
  }
  @HostBinding("style.borderRight") get _borderRight(): string | void {
    if (!this._parsedGrid) this._parsedGrid = this.grid?.split(" ");
    const short = this._parsedGrid || [];
    const [, , _border] = short[1]?.split("/") ?? [];
    const border = this.border ?? _border;
    if (border) return `var(--app-grid-border, ${border}) solid transparent`;
  }

  /** shorthand
   * 12
   * 12 24px
   * 12 24px/32px
   * 12 24px/32px auto/between
   * 12 24px/32px/32px
   * 12 24px/32px/32px auto/between
   */
  @Input("appGrid") grid?: string = "12 32px";
  _parsedGrid?: string[];
  /**
   * columns width
   * if true auto else 1fr
   */
  @Input("appGridAuto") auto?: boolean;
  /** columns count */
  @Input("appGridSize") size?: number;
  /** flex justify content */
  @Input("appGridJustify") justify?: string;
  @Input("appGridColumnGap") columnGap?: string;
  @Input("appGridRowGap") rowGap?: string;
  /** the distance to the left and right of the grid */
  @Input("appGridBorder") border?: string;
}
