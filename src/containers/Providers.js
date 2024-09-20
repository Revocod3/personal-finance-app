import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import router from "../config/routes.config";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config/reactQuery.config";
import { AuthProvider } from "../config/authprovider";

const Providers = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

Providers.defaultProps = {};

export default Providers;
