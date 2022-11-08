import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ColDirective } from "./col.directive";
import { GridDirective } from "./grid.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ColDirective, GridDirective],
  exports: [ColDirective, GridDirective],
})
export class DirectiveModule {}
