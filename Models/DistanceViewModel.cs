namespace DistanceApp.Models
{
    public class DistanceViewModel
    {
        // Values for distance and duration :)
        public string DistanceText { get; set; }
        public int DistanceValue { get; set; }
        public string DurationText { get; set; }
        public int DurationValue { get; set; }
        
        // Just formats the addresses of the origin, destination and mode of transportation
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string TransportMode { get; set; }
        public string Units { get; set; }
    }
}