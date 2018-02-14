import * as React from "react";
import { Navbar, NavItem, Collapse, NavbarToggler, Nav } from "reactstrap";
import { Link, NavLink } from "react-router-dom";

interface INavMenuState {
  isOpen: boolean;
}

class NavMenu extends React.Component<{}, INavMenuState> {
  state = { isOpen: false };

  private _toggle(): void {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(): JSX.Element {
    return (
      <Navbar color="warning" light expand="md" fixed="top">
        <Link className="navbar-brand" to={"/"}>
          DistanceApp
        </Link>
        <NavbarToggler onClick={this._toggle.bind(this)} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to={"/"}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={"/distance"}
              >
                Distance
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export { NavMenu };
