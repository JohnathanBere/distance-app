using DistanceApp.Models;

namespace DistanceApp.Services
{
    public interface IDistance
    {
        DistanceViewModel GetDistanceViewModel(DistanceResponseData rawDistData);
    }
}