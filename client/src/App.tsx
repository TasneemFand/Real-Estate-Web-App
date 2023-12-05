import React, { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), []);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createRouter()} />
    </QueryClientProvider>
  );
}
