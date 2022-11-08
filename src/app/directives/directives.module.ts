import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ColDirective } from "./col.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ColDirective],
  exports: [ColDirective],
})
export class DirectiveModule {}
