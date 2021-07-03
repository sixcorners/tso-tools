import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

// https://juristr.com/blog/2018/11/better-route-guard-redirects/
@Injectable({
  providedIn: 'root'
})
export class RoomGuard implements CanActivate {
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let room = 'offline';
    try {
      let response = await fetch('/api/room', { method: 'POST' });
      if (response.ok)
        room = await response.text();
      else {
        console.error('server returned an error:', response);
        this.snackBar.open(`server returned an error: ${await response.text()}`, 'OK');
      }
    } catch (error) {
      console.error('failed to connect to server:', error);
      this.snackBar.open(`failed to connect to server: ${error.message}`, 'OK');
    }
    return this.router.createUrlTree(
      [getResolvedUrl(next) + '/' + room]
    );
  }
}

// https://stackoverflow.com/a/53429547/988346
function getResolvedUrl(route: ActivatedRouteSnapshot): string {
  return route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join('/'))
    .join('/');
}
