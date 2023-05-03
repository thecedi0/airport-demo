import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftDefaultComponent } from './aircraft/aircraft-default/aircraft-default.component';
import { AircraftLogComponent } from './aircraft/aircraft-log/aircraft-log.component';
import { AircraftNewComponent } from './aircraft/aircraft-new/aircraft-new.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AircraftComponent,
    children: [
      {
        path: '',
        redirectTo: 'default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        component: AircraftDefaultComponent
      },
      {
        path: 'new',
        component: AircraftNewComponent
      },
      {
        path: 'edit',
        component: AircraftNewComponent
      },
      {
        path: 'log/id',
        component: AircraftLogComponent
      },
    ]
  },
  // {
  //   path: 'unauthorized',
  //   component: UnauthorizedComponent
  // },
  // {
  //   path: 'login',

  //   component: UnauthorizedComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
