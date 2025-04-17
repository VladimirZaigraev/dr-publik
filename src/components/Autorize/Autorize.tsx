import React, { useState } from "react";
import { TextInput, Button } from "@gravity-ui/uikit";
import "./Autorize.css";

export const Autorize = ({ setAuthorized }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    name: "oleg",
    password: 1404,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === user.name && password == user.password) {
      setAuthorized(true);
    }
  };
  return (
    <form className="autorize" onSubmit={handleSubmit}>
      <TextInput
        placeholder="login"
        size="xl"
        id="login"
        className="autorize-input"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <TextInput
        placeholder="password"
        size="xl"
        id="password"
        type="password"
        className="autorize-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button view="outlined-action" size="l" className="autorize-button" type={"submit"}>
        Войти
      </Button>
    </form>
  );
};
