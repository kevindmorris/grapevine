import React from "react";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { postTokenAsync } from "./state/slices/authSlice";
import Appframe from "./components/Appframe";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import router from "./components/scaffold/router";
import LoadingSpinner from "./components/shared/LoadingSpinner";

function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  React.useEffect(() => {
    dispatch(postTokenAsync());
  }, []);

  if (token.access_token === "") return <LoadingSpinner />;

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
