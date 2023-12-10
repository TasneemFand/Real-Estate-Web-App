import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorPage from "../components/error-page";
import { getDefaultLayout } from "../components/layout";
import HomePage from "../pages/home";
import SignIn from "@/pages/auth/signIn";
import { useAuth } from "@/hooks/useAuth";
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
];

export function createRouter(): ReturnType<typeof createBrowserRouter> {
  const authenticated = useAuth();
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router?.getLayout || getDefaultLayout;
    const Component = router.Component!;
    const page = getLayout(<Component />);
    return {
      ...router,
      element: authenticated ? page : <SignIn />,
      Component: null,
      errorElement: <ErrorPage />,
    };
  });
  routeWrappers.push({
    path: "/login",
    element: <SignIn />,
    Component: null,
    errorElement: <ErrorPage />,
  });
  routeWrappers.push({
    path: "/register",
    element: <SignUp />,
    Component: null,
    errorElement: <ErrorPage />,
  });
  return createBrowserRouter(routeWrappers);
}
