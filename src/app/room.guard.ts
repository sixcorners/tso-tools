import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import shortid from 'shortid';

@Injectable({
  providedIn: 'root'
})
export class RoomGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.router.createUrlTree(
      [getResolvedUrl(next) + '/' + shortid.generate()]
    );
  }
}

// https://stackoverflow.com/a/53429547/988346
function getResolvedUrl(route: ActivatedRouteSnapshot): string {
  return route.pathFromRoot
    .map(v => v.url.map(segment => segment.toString()).join('/'))
    .join('/');
}
