import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoupensComponent } from "./coupens.component";
import {CoupenListComponent} from "./coupen-list/coupen-list.component";

const routes: Routes = [
  {
    path: 'create',
    component: CoupensComponent
  },
  {
    path: 'list',
    component: CoupenListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoupensRoutingModule { }
