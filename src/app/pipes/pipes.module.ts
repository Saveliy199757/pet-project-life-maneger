import {NgModule} from "@angular/core";
import {SearchPipe} from "./search.pipe";
import {DatesIntervalPipe} from "./dates-interval.pipe";

@NgModule(
  {
    declarations: [SearchPipe, DatesIntervalPipe],
    exports: [SearchPipe, DatesIntervalPipe]
  }
)
export class PipesModule {}
