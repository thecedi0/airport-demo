import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifyService, WebApiService } from './services';
import { DataGridComponent } from './shared/data-grid/data-grid.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { LoadPaginationComponent } from './shared/load-pagination/load-pagination.component';
import { NotifyComponent } from './shared/notify/notify.component';
import { UiHeaderComponent } from './shared/ui-header/ui-header.component';
import { WorkspaceComponent } from './shared/workspace/workspace.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftDefaultComponent } from './aircraft/aircraft-default/aircraft-default.component';
import { AircraftNewComponent } from './aircraft/aircraft-new/aircraft-new.component';
import { AircraftLogComponent } from './aircraft/aircraft-log/aircraft-log.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  declarations: [	
    AppComponent,
    DataGridComponent,
    SideMenuComponent,
    LoadPaginationComponent,
    NotifyComponent,
    UiHeaderComponent,
    WorkspaceComponent,
    DataGridComponent,
    AircraftComponent,
    AircraftDefaultComponent,
    AircraftNewComponent,
    AircraftLogComponent,
      WeatherComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [
    // AuthService,
    // AuthGuardService,
    WebApiService,
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
