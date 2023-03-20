import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  private serverId: number = 1;
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, 
    private route: ActivatedRoute, 
    private router: Router)  { }

  ngOnInit() {

    this.route.data.subscribe(
      (data) => {
        this.server = data['server'];
      }
    );

    // this.server = this.serversService.getServer(this.serverId);
    // this.serverId = +this.route.snapshot.params['id'];
    // if(this.serverId !== undefined)
    //   this.server = this.serversService.getServer(this.serverId);
    // this.route.params.subscribe(
    //   (params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );

  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route
      , queryParamsHandling:'preserve'});
  }

}
