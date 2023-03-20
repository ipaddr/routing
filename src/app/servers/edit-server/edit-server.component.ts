import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ServersService } from '../servers.service';
import { CanComponentDeactivate, CanDiactivateGuardService } from './can-diactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDiactivateGuardService {
  server: {id: number, name: string, status: string};
  private serverId: number = 1;
  serverName = '';
  serverStatus = '';
  isEditable: boolean = false;
  changesStatues: boolean = false;

  constructor(private serversService: ServersService
    , private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
    // this.server = this.serversService.getServer(this.serverId);
    this.serverId = +this.route.snapshot.params['id'];
    
    if(this.serverId !== undefined)
      this.server = this.serversService.getServer(this.serverId);

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.route.params.subscribe((params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );

    this.route.queryParams.subscribe((params) => {
        var editable = params['editable'];
        this.isEditable = editable == '1' ? true : false
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, 
      {name: this.serverName, status: this.serverStatus});
      this.changesStatues = true;
      this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(){
    if(!this.isEditable) return true;
    if(this.serverName !== this.server.name || this.serverStatus !== this.server.status 
        && !this.changesStatues
      ){
        return confirm('Do sure to navigate away?');
      } else return true;
  }

}

