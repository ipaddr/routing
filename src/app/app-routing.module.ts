import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDiactivateGuardService } from "./servers/edit-server/can-diactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolverService } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]},
    
    {path: 'servers', component: ServersComponent, 
    // canActivate: [AuthGuardService], 
    canActivateChild: [AuthGuardService],
    children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolverService}},
      {path: ':id/edit', component: EditServerComponent, 
      canDeactivate: [CanDiactivateGuardService]},
    ]},
  
    // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'} },
    {path: '**', redirectTo: '/not-found', pathMatch: "full"},
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),    
    ], 
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule{}
