import { lazy } from "react";

const Page404 = lazy(() => import("../pages/protected/404"));

const Customers = lazy(() => import("../pages/protected/Customers"));

const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);

const routes = [
  {
    path: "/dashboard",
    component: Customers,
  },

  {
    path: "/settings-profile",
    component: ProfileSettings,
  },

  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
