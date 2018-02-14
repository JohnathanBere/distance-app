# DistanceApp

An app created using ASP.NET Core 2, React 16 /w TypeScript and ReSub for state management.

- Measures the distance and duration between two points dependent on mode of travel.

# Files of interest:
## Server-Side
- Controllers/DistanceDataController.cs - Makes the call to the Google Distance Matrix api, returns a view model with distance and duration.
- Models/ - Houses models for response content deserialization and the population of essential data.
- Services/ - Populates distance view model with data from the deserialized response model.

## Client-Side
- ClientApp/actions - Responsible for making a service callback to the DistanceDataController endpoint
- ClientApp/components/Distance - UI Components for making a call to the back-end and retrieving information accordingly. InputFields stores the details a user needs to enter. DisplayData just displays information about duration and distance based on mode of transportation.
- ClientApp/models - once callback has completed, a promise from the server will be parsed as an object to be interpreted by the view.
- ClientApp/pages/Distance - Houses the view components
- ClientApp/stores - Responsible for overall application reactivity and state. Observes changes and updates if an appropriate call has been made to the server.
