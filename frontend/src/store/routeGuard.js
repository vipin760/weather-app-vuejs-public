export function guardMyroute(to, from, next) {
  const token = sessionStorage.getItem("token");
  if (token) {
    next();
  } else {
    next("/login");
  }
}
export function authGuard(to, from, next) {
  const token = sessionStorage.getItem("token");
  if (token) {
    next("/");
  } else {
    next();
  }
}
