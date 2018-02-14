using System;
using System.Linq;
using DistanceApp.Models;

namespace DistanceApp.Services
{
    public class Distance : IDistance
    {
        public DistanceViewModel GetDistanceViewModel(DistanceResponseData rawDistData)
        {
                    
            // For now, assume we are getting the first available value in each collection.
            // use null coalesing to throw exceptions if we get null values at these key points
            var row = rawDistData.Rows.FirstOrDefault() ?? throw new NullReferenceException();
            var element = row.Elements.FirstOrDefault() ?? throw new NullReferenceException();
    
            // Maps hydrated DistanceResponseData model to a ViewModel to be consumed by client
            return new DistanceViewModel()
            {
                StartPoint = rawDistData.Origin_Addresses.FirstOrDefault(),
                EndPoint = rawDistData.Destination_Addresses.FirstOrDefault(),
                DurationText = element.Duration.Text,
                DistanceText = element.Distance.Text,
                DurationValue = element.Duration.Value,
                DistanceValue = element.Distance.Value,
            };
        }
    }
}