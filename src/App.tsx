import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "monospace",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
