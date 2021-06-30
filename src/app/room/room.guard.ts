import { Injectable } from '@angular/core';
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
  constructor(private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let response = await fetch("https://edge-chat-demo.cloudflareworkers.com/api/room", { method: "POST" });
    let room = 'offline';
    if (response.ok) {
      room = await response.text();
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
