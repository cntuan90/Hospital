import { PrivateRouteType } from './type';

/**
 * Recursive func.
 * Flatten nested routes
 */
export function flattenRouteArr(routes: PrivateRouteType[], parentPath: string = '') {
    const arr: PrivateRouteType[] = [];

    routes.forEach((route) => {
        const combinePath = combinePaths(parentPath, route.path);
        arr.push({ ...route, path: combinePath });
        if (route.subRoutes) {
            const subArr = flattenRouteArr(route.subRoutes, combinePath);
            arr.push(...subArr);
        }
    });

    return arr;
}

/**
 * Ensure no double trailing slash
 */
export const combinePaths = (parent: string, child: string) => `${parent.replace(/\/$/, '')}/${child.replace(/^\//, '')}`;
