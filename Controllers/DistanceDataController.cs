using System;
using System.Net.Http;
using System.Threading.Tasks;
using DistanceApp.Models;
using DistanceApp.Services;
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
        private readonly IDistance _distance;

        public DistanceDataController(IDistance distance)
        {
            _distance = distance;
        }
        
        private static string ApiKey => "AIzaSyAif8w9sA7ezwfCPW3mDBWed1HWWTKgWc8";

        // Imperative to ensure that the base url really is as basic as the url address.
        private static string BaseUrl => "https://maps.googleapis.com";

        // This method will be making a call to an external api.
        [HttpGet("distance/{origin?}/{destination?}/{mode?}/{unit?}")]
        public async Task<IActionResult> GetDistanceData(string origin, string destination, string mode, string unit)
        {
            // To ensure clean-up
            using (var client = new HttpClient())
            {
                try
                {
                    // Shorthand string.format to place parameters in the url
                    var suffix = $"/maps/api/distancematrix/json?units={unit}&origins={origin}&destinations={destination}&mode={mode}&key={ApiKey}";
                    
                    // sets the base address of the client, in this instance, Google's Distance Matrix
                    client.BaseAddress = new Uri(BaseUrl);
                    
                    // Waits for a response from the suffixed address
                    var res = await client.GetAsync(suffix);
                    
                    // Ensures a response is yielded
                    res.EnsureSuccessStatusCode();

                    // Waits for the content to be parsed as a string.
                    var stringRes = await res.Content.ReadAsStringAsync();

                    // Deserializes the string response to be a model that maps the response 1:1.
                    var rawDistData = JsonConvert.DeserializeObject<DistanceResponseData>(stringRes);
                    
                    // Calls a service to further format the deserialized data.
                    var dvm = _distance.GetDistanceViewModel(rawDistData);
                    
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