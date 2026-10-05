export const PUBLIC_ROUTES = ["/", "/gallery"] as const;

export function isPublicRoute(pathname: string) {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return PUBLIC_ROUTES.some((route) => route === clean);
}