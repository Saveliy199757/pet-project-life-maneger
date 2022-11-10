import {NgModule} from "@angular/core";
import {SearchPipe} from "./search.pipe";
import {DatesIntervalPipe} from "./dates-interval.pipe";
import { DeadlinePipe } from './deadline.pipe';

@NgModule(
  {
    declarations: [SearchPipe, DatesIntervalPipe, DeadlinePipe],
    exports: [SearchPipe, DatesIntervalPipe, DeadlinePipe]
  }
)
export class PipesModule {}
