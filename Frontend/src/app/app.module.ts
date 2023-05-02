import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService, AuthService, NotifyService, WebApiService } from './services';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { DataGridComponent } from './shared/data-grid/data-grid.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { LoadPaginationComponent } from './shared/load-pagination/load-pagination.component';
import { NotifyComponent } from './shared/notify/notify.component';
import { UiHeaderComponent } from './shared/ui-header/ui-header.component';
import { WorkspaceComponent } from './shared/workspace/workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    DataGridComponent,
    SideMenuComponent,
    LoadPaginationComponent,
    NotifyComponent,
    UiHeaderComponent,
    WorkspaceComponent,
    DataGridComponent,
    // LoadPaginationComponent,
    // NotifyComponent,
    // SideMenuComponent,
    // UiHeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    WebApiService,
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
