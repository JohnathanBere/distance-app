export function distanceDataCallback(
  origin?: string,
  destination?: string,
  travelMode?: string,
  units?: string
): Promise<Response> {
  var formattedOrigin: string = `${origin}`.replace(/ /g, "+");
  var formattedDestination: string = `${destination}`.replace(/ /g, "+");

  return fetch(
    `api/DistanceData/Distance/${formattedOrigin}/${formattedDestination}/${travelMode}/${units}`
  );
}
