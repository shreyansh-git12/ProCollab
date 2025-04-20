import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "../src/context/user.context.jsx";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
