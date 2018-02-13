import * as React from "react";
import { Container } from "reactstrap";
import { DisplayData, InputFields } from "../components/Distance";
import { RouteComponentProps as IRCProps } from "react-router-dom";

class Distance extends React.Component<IRCProps<{}>, {}> {
  render(): JSX.Element {
    return (
      <div>
        <InputFields />
        <DisplayData />
      </div>
    );
  }
}

export { Distance };
