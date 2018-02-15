import { StoreBase, AutoSubscribeStore, autoSubscribeWithKey } from "resub";
import { IDistanceData } from "../models/DistanceData";
import { distanceDataCallback as call } from "../actions/distanceDataCallback";
import * as _ from "es6-promise";

/**
 * This is a class that observes changes for the client models, populating them with data
 * coming from a server.
 */
@AutoSubscribeStore
class DistanceStore extends StoreBase {
  // initializes an empty model
  private _distanceData: IDistanceData = {};
  private _callbackRejected: boolean = false;
  // methods to get store and populate common app state
  static TriggerKeys = {
    Get: "get"
  };

  async retrieveDistance(
    origin?: string,
    destination?: string,
    travelMode?: string,
    units?: string
  ): _.Promise<void> {
    // waits for call to be made to endpoint, returns a perfectly mapped client model
    // from the back-end.
    await call(origin, destination, travelMode, units)
      .then(response => response.json() as _.Promise<IDistanceData>)
      .then(
        data => ((this._distanceData = data), (this._callbackRejected = false))
      )
      .catch(err => (this._callbackRejected = true));

    this.trigger(DistanceStore.TriggerKeys.Get);
  }

  @autoSubscribeWithKey(DistanceStore.TriggerKeys.Get)
  getDistanceData(): IDistanceData {
    return this._distanceData;
  }

  @autoSubscribeWithKey(DistanceStore.TriggerKeys.Get)
  getCallbackRejection(): boolean {
    return this._callbackRejected;
  }
}

var distanceStore: DistanceStore = new DistanceStore();

export { distanceStore as DistanceStore };
