import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./providers/router";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { ThemeProvider } from "./providers/theme-provider";

export default function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <Suspense fallback="..loading">
          <RouterProvider router={createRouter()} />
        </Suspense>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
