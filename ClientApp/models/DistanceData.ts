// always ensure that the model matches an incoming JSON response
export interface IDistanceData {
  startPoint?: string;
  endPoint?: string;
  transportMode?: string;
  units?: string;

  durationText?: string;
  durationValue?: number;
  distanceText?: string;
  distanceValue?: number;
}
