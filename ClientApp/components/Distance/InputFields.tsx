import * as React from "react";
import {
  Input,
  Container,
  Col,
  Form,
  FormGroup,
  Button,
  Label,
  Alert
} from "reactstrap";
import { ComponentBase } from "resub";
import { DistanceStore } from "../../stores/DistanceStore";

interface InputFieldsState {
  origin: string;
  destination: string;
  transportMode: string;
  units: string;
  callbackRejected: boolean;
}

/**
 * This container gets a series of inputs to make a call to the back-end
 * There is basic validation that returns a rejected promise if origin and
 * destination are not valid.
 */
class InputFields extends ComponentBase<{}, InputFieldsState> {
  protected _buildState(props: {}, initialBuild: boolean): InputFieldsState {
    return {
      origin: "",
      destination: "",
      transportMode: "car",
      units: "imperial",
      callbackRejected: DistanceStore.getCallbackRejection()
    };
  }

  private _fetchDistanceData(): void {
    const { origin, destination, transportMode, units } = this.state;

    DistanceStore.retrieveDistance(origin, destination, transportMode, units);
  }

  render(): JSX.Element {
    return (
      <Col>
        <Form>
          <Alert color="danger" isOpen={this.state.callbackRejected}>
            Use appropriate travel points:
            <ul>
              <li>
                You must ensure both fields for travelling from and to addresses
                are completed.
              </li>
              <li>
                There must only be single addresses when travelling from and
                travelling to.
              </li>
              <li>
                The addresses should within reachable distance (no travelling
                accross great Oceans).
              </li>
            </ul>
          </Alert>
          <FormGroup>
            <Label for="origin">From: </Label>
            <Input
              type="text"
              id="origin"
              placeholder="Enter where you are travelling from..."
              value={this.state.origin}
              onChange={e =>
                this.setState({
                  origin: e.currentTarget.value
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="destination">To: </Label>
            <Input
              type="text"
              id="destination"
              placeholder="Enter where you are travelling to..."
              value={this.state.destination}
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
              <option value="bicycling">Bicycle</option>
              <option value="walking">Foot</option>
              <option value="transit&transitMode=bus">Bus</option>
              <option value="transit&transitMode=train">Train</option>
            </Input>
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Distance to be measured in:</legend>
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
