import * as React from "react";
import { RouteComponentProps } from "react-router";

class Home extends React.Component<RouteComponentProps<{}>, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>DistanceApp</h1>

        <p>A web application that gets the distance of two points using Google's Distance Matrix, ASP.NET Core and ReactJS</p>
      </div>
    );
  }
}

export { Home };
