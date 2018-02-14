import * as React from "react";
import { NavMenu } from "./";
import { Container, Col, Row } from "reactstrap";

export interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.SFC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <div>
    <NavMenu />
    <div className="navbar-margin"></div>
    <Container>
      <Row>
        <Col sm="12">{children}</Col>
      </Row>
    </Container>
  </div>
);

export { Layout };
