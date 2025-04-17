import { useState } from "react";
import "./App.css";
import { CardsList } from "./components/CardsList/CardsList";
import { ToastContainer } from "react-toastify";
import { Autorize } from "./components/Autorize/Autorize";

function App() {
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="app">
      {!authorized && <Autorize setAuthorized={setAuthorized} />}

      {authorized && <CardsList />}
      <ToastContainer position={"top-center"} />
    </div>
  );
}

export default App;
