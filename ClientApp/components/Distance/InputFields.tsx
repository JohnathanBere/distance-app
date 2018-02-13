import * as React from "react";
import {
  Input,
  Container,
  Col,
  Form,
  FormGroup,
  Button,
  Label
} from "reactstrap";
import { DistanceStore } from "../../stores/DistanceStore";

interface InputFieldsState {
  origin: string;
  destination: string;
  transportMode: string;
  units: string;
}

class InputFields extends React.Component<{}, InputFieldsState> {
  constructor(props: {}, state: InputFieldsState) {
    super(props, state);

    this._fetchDistanceData = this._fetchDistanceData.bind(this);

    this.state = {
      origin: "",
      destination: "",
      transportMode: "car",
      units: "imperial"
    };
  }

  private _fetchDistanceData(): void {
    const { origin, destination, transportMode, units } = this.state;

    DistanceStore.retrieveDistance(
      decodeURI(origin),
      decodeURI(destination),
      transportMode,
      units
    );
  }

  render(): JSX.Element {
    return (
      <Col>
        <Form>
          <br />
          <FormGroup>
            <Input
              type="text"
              id="origin"
              placeholder="From"
              onChange={e =>
                this.setState({
                  origin: e.currentTarget.value
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              id="destination"
              placeholder="To"
              onChange={e =>
                this.setState({
                  destination: e.currentTarget.value
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="transport">Travelling by:</Label>
            <Input
              type="select"
              id="transport"
              onChange={e =>
                this.setState({
                  transportMode: e.currentTarget.value.toLowerCase()
                })
              }
            >
              <option value="driving">Car</option>
              <option value="transit&transitMode=bus">Bus</option>
              <option value="transit&transitMode=train">Train</option>
              <option value="bicycling">Bicycle</option>
              <option value="walking">Foot</option>
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Distance in:</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="units"
                  id="unit-imperial"
                  value="imperial"
                  defaultChecked
                  onClick={e =>
                    this.setState({
                      units: e.currentTarget.value
                    })
                  }
                />{" "}
                Imperial (Mi)
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="units"
                  id="unit-metric"
                  value="metric"
                  onClick={e =>
                    this.setState({
                      units: e.currentTarget.value
                    })
                  }
                />{" "}
                Metric (KM)
              </Label>
            </FormGroup>
          </FormGroup>

          <Button color="success" onClick={() => this._fetchDistanceData()}>
            Go
          </Button>
        </Form>
      </Col>
    );
  }
}

export { InputFields };
