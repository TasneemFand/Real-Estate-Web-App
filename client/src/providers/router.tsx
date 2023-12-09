import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../components/error-page";
import { getDefaultLayout, getNoneLayout } from "../components/layout";
import HomePage from "../pages/home";
import SignIn from "@/pages/auth/signIn";
import SignUp from "@/pages/auth/signUp/indes";

type TRoute = RouteObject & {
  getLayout?: (
    page: React.ReactElement
  ) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};
export const routerObjects: TRoute[] = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: SignIn,
    getLayout: getNoneLayout,
  },
  {
    path: "/register",
    Component: SignUp,
    getLayout: getNoneLayout,
  },
];

export function createRouter(): ReturnType<typeof createBrowserRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router?.getLayout || getDefaultLayout;
    const Component = router.Component!;
    const page = getLayout(<Component />);
    return {
      ...router,
      element: page,
      Component: null,
      errorElement: <ErrorPage />,
    };
  });
  return createBrowserRouter(routeWrappers);
}
