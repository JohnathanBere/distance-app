using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DistanceApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DistanceApp.Controllers
{
    /**
     * An API controller that will interface with Google's Distance Matrix API
     *
     * Asynchronously fetches data from the endpoint based on things like:
     * - Locations
     * - Transport mode
     *
     * This in turn retrieves the total distance and duration based on those factors.
     */
    [Route("api/[controller]")]
    public class DistanceDataController : Controller
    {
        private static string ApiKey
        {
            get
            {
                return "AIzaSyAif8w9sA7ezwfCPW3mDBWed1HWWTKgWc8";
            }
        }

        // Imperative to ensure that the base url really is as basic as the url address.
        private static string BaseUrl
        {
            get
            {
                return "https://maps.googleapis.com";
            }
        }

        // This method will be making a call to an external api.
        [HttpGet("distance/{origin?}/{destination?}/{mode?}/{unit?}")]
        public async Task<IActionResult> GetDistanceData(string origin, string destination, string mode, string unit)
        {
            // Could store this in a service and just DI it into the api controller. Should keep this controller method slim-line in the future...
            // To ensure clean-up
            using (var client = new HttpClient())
            {
                try
                {
                    var suffix = $"/maps/api/distancematrix/json?units={unit}&origins={origin}&destinations={destination}&mode={mode}&key={ApiKey}";
                    client.BaseAddress = new Uri(BaseUrl);
                    
                    // Waits for a response from the suffixed address
                    var res = await client.GetAsync(suffix);
                    
                    // Ensures a response is yielded
                    res.EnsureSuccessStatusCode();

                    // Waits for the content to be parsed as a string.
                    var stringRes = await res.Content.ReadAsStringAsync();

                    // Deserializes the string response to be a model that maps the response 1:1.
                    var rawDistData = JsonConvert.DeserializeObject<DistanceResponseData>(stringRes);
                    
                    // For now, assume we are getting the first available value in each collection.
                    // use null coalesing to throw exceptions if we get null values at these key points
                    var row = rawDistData.Rows.FirstOrDefault() ?? throw new NullReferenceException();
                    var element = row.Elements.FirstOrDefault() ?? throw new NullReferenceException();

                    // Maps hydrated DistanceResponseData model to a ViewModel to be consumed by client
                    var dvm = new DistanceViewModel()
                    {
                        StartPoint = rawDistData.Origin_Addresses.FirstOrDefault(),
                        EndPoint = rawDistData.Destination_Addresses.FirstOrDefault(),
                        DurationText = element.Duration.Text,
                        DistanceText = element.Distance.Text,
                        DurationValue = element.Duration.Value,
                        DistanceValue = element.Distance.Value,
                        TransportMode = mode,
                        Units = unit
                    };
                    
                    // Returns a status code with the parsed info
                    return Ok(dvm);
                }

                catch (HttpRequestException ex)
                {
                    return BadRequest($"Getting the following error: {ex}");
                }
            }
        }
    }
}