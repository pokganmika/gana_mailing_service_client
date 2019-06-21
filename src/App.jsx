import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Main from "./components/Main";
import Login from "./pages/Login";

const App = () => {
  const [auth, setAuth] = useState({
    authenticated: false,
    id: "admin",
    pw: "1q2w3e4r~!",
    inputId: "",
    inputPw: "",
  });

  return (
    <div className="App">
      <Router>
        <Main />
      </Router>
    </div>
  );
};

export default App;
