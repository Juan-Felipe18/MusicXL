import React from "react";
import { Switch, Route } from "react-router-dom";

//page
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Artista from "../pages/Artista";
import Artistas from "../pages/Artistas";

export default function Routes(props) {
  const { user, setReloadApp } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artistas" exact>
        <Artistas />
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} setReloadApp={setReloadApp} />
      </Route>
      <Route path="/artista/:id" exact>
        <Artista />
      </Route>
    </Switch>
  );
}
