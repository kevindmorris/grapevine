import React from "react";
import { useAppDispatch } from "./state/hooks";
import { postTokenAsync } from "./state/slices/authSlice";
import Appframe from "./components/Appframe";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import router from "./components/scaffold/router";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(postTokenAsync());
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
