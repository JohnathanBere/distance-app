import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

class Home extends React.Component<RouteComponentProps<{}>, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>DistanceApp</h1>

        <p>A web application that gets the distance between two addresses using Google's Distance Matrix, ASP.NET Core and ReactJS</p>
        <p><Link to={"/distance"}>Click here</Link> to check it out</p>
      </div>
    );
  }
}

export { Home };
