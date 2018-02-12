import * as React from "react";
import { NavMenu } from "./";
import { Container, Col, Row } from "reactstrap";

export interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.SFC<ILayoutProps> = ({ children }: ILayoutProps) => (
  <Container fluid>
    <Row>
      <Col sm="3">
        <NavMenu />
      </Col>
      <Col sm="9">{children}</Col>
    </Row>
  </Container>
);

export { Layout };
