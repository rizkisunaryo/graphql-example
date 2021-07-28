import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Members from "./pages/Members";
import Member from "./pages/Member";

const apolloClient = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div style={{ padding: 12 }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/client/members" />
            </Route>
            <Route exact path="/client">
              <Redirect to="/client/members" />
            </Route>
            <Route exact path="/client/members">
              <Members />
            </Route>
            <Route path={"/client/member/:id"}>
              <Member />
            </Route>
            <Route path="*">
              <div>Not found!</div>
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
