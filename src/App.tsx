import React from "react";
import { useAppDispatch } from "./state/hooks";
import { postTokenAsync } from "./state/slices/authSlice";
import Router from "./layout/Router";
import Appframe from "./layout/Appframe";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(postTokenAsync());
  }, []);

  return <Appframe />;
}

export default App;
