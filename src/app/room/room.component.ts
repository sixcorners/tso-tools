import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RoomService } from './room.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, readonly route: ActivatedRoute, readonly room: RoomService, snackBar: MatSnackBar) {
    room.addEventListener('message', ({ data }) => {
      data = JSON.parse(data);
      if (data.error) {
        console.error('Server sent error:', data.error);
        snackBar.open(`Server sent error: ${data.error}`, 'OK');
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.room.changeRoom(params.get('room') ?? undefined, '{}'));
  }
}
