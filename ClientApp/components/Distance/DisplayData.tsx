import * as React from "react";
import { Container, Col } from "reactstrap";
import { DistanceStore } from "../../stores/DistanceStore";
import { IDistanceData } from "../../models/DistanceData";
import { ComponentBase } from "resub";

interface IDisplayDataState {
  data: IDistanceData;
}

/**
 * This container displays data by observing the overall application state
 * and retrieving data if a call has been made in ./InputFields.tsx
 */
class DisplayData extends ComponentBase<{}, IDisplayDataState> {
  // this component will have a state populated by the application state.
  protected _buildState(props: {}, initialBuild: boolean): IDisplayDataState {
    return {
      data: DistanceStore.getDistanceData()
    };
  }

  private _renderData(data: IDistanceData): JSX.Element {
    return (
      <Container>
        <h2>
          {data.distanceText ? `Total distance: ${data.distanceText}` : ""}
        </h2>
        <h2>
          {data.durationText ? `Total duration: ${data.durationText}` : ""}
        </h2>
        <h2>{data.startPoint ? `From: ${data.startPoint}` : ""}</h2>
        <h2>{data.endPoint ? `To: ${data.endPoint}` : ""}</h2>
      </Container>
    );
  }

  render(): JSX.Element {
    return <div>{this._renderData(this.state.data)}</div>;
  }
}

export { DisplayData };
