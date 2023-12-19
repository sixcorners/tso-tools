import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { nanoid } from 'nanoid';

// https://juristr.com/blog/2018/11/better-route-guard-redirects/
export const roomGuard: CanActivateFn = (route) => {
  return inject(Router).createUrlTree(
    [...getResolvedUrl(route), nanoid()]
  );
};

// https://stackoverflow.com/a/53429547/988346
function getResolvedUrl(route: ActivatedRouteSnapshot): string[] {
  return route.pathFromRoot
    .flatMap(v => v.url)
    .map(String);
}
