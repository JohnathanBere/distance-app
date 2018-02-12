import * as React from "react";
import { RouteComponentProps as IRCProps } from "react-router";
import "isomorphic-fetch";

interface IFetchDataExampleState {
  forecasts: IWeatherForecastModel[];
  loading: boolean;
}

class FetchData extends React.Component<IRCProps<{}>, IFetchDataExampleState> {
  constructor(props: IRCProps<{}>, state: IFetchDataExampleState) {
    super(props, state);
    this.state = { forecasts: [], loading: true };

    fetch("api/SampleData/WeatherForecasts")
      .then(response => response.json() as Promise<IWeatherForecastModel[]>)
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  public render(): JSX.Element {
    let contents: JSX.Element = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderForecastsTable(this.state.forecasts)
    );

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>
          This component demonstrates fetching data from the server. It just
          works. God Bless HMR too
        </p>
        {contents}
      </div>
    );
  }

  private static renderForecastsTable(
    forecasts: IWeatherForecastModel[]
  ): JSX.Element {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast => (
            <tr key={forecast.dateFormatted}>
              <td>{forecast.dateFormatted}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

interface IWeatherForecastModel {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export { FetchData };
