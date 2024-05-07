import { Component } from '@angular/core';
import { Breadcrumb } from '../../models/breadcrumb.model';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  public breadcrumbs: Breadcrumb[];

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: any) => event instanceof NavigationEnd,
          distinctUntilChanged()
        ),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      });
  }

  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    let label =
      route.routeConfig && route.routeConfig['data']
        ? route.routeConfig['data']['breadcrumb']
        : '';
    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    const lastRoutePart = path ? path.split('/').pop() : null;
    const isDynamicRoute = lastRoutePart ? lastRoutePart.startsWith(':') : null;
    if (isDynamicRoute && !!route.snapshot && path && lastRoutePart) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
