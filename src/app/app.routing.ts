import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SiteComponent } from "./site/site.component";

const APP_ROUTES: Routes = [
  { path: '', component: SiteComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRouterModule {}