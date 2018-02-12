import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/";
import { Home, Counter, FetchData } from "./pages/";

export const routes: JSX.Element = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/fetchdata" component={FetchData} />
    <Route path="/counter" component={Counter} />
  </Layout>
);
