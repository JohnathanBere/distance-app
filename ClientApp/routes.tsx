import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/";
import { Home, Distance } from "./pages/";

export const routes: JSX.Element = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/distance" component={Distance} />
  </Layout>
);
