using System.Collections.Generic;

namespace DistanceApp.Models
{
    public class DistanceResponseData
    {
        public IEnumerable<string> Destination_Addresses { get; set; }
        public IEnumerable<string> Origin_Addresses { get; set; }
        public IEnumerable<Row> Rows { get; set; }
    }
}