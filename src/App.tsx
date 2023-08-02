import React from "react";
import { useAppDispatch } from "./state/hooks";
import { postTokenAsync } from "./state/slices/authSlice";
import Router from "./layout/Router";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(postTokenAsync());
  }, []);

  return <Router />;
}

export default App;
