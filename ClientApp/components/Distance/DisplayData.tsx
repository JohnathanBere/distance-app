import "isomorphic-fetch";
import * as React from "react";
import { Container, Col } from "reactstrap";
import { DistanceStore } from "../../stores/DistanceStore";
import { IDistanceData } from "../../models/DistanceData";
import { ComponentBase } from "resub";

interface IDisplayDataState {
  data: IDistanceData;
}

class DisplayData extends ComponentBase<{}, IDisplayDataState> {
  protected _buildState(props: {}, initialBuild: boolean): IDisplayDataState {
    return {
      data: DistanceStore.getDistanceData()
    };
  }

  private _renderData(data: IDistanceData): JSX.Element {
    return (
      <div>
        <h2>{data.distanceText ? `Total distance: ${data.distanceText}` : ""}</h2>
        <h2>{data.durationText ? `Total duration: ${data.durationText}` : ""}</h2>
        <h2>{data.startPoint ? `From: ${data.startPoint}` : ""}</h2>
        <h2>{data.endPoint ? `To: ${data.endPoint}` : ""}</h2>
      </div>
    );
  }

  render(): JSX.Element {
    return <div>{this._renderData(this.state.data)}</div>;
  }
}

export { DisplayData };
