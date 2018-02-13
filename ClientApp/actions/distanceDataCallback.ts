import "isomorphic-fetch";

export function distanceDataCallback(
  origin?: string,
  destination?: string,
  travelMode?: string,
  units?: string
): Promise<Response> {
  return fetch(
    `api/DistanceData/Distance/${origin}/${destination}/${travelMode}/${units}`
  );
}
