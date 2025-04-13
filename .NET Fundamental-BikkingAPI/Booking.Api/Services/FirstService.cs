using Booking.Domain.Models;

namespace Booking.Api.Services
{
    public class FirstService
    {
        private readonly DataSource _dataSource;

        public FirstService(DataSource dataSource)
        {
            _dataSource = dataSource;
        }

        public List<Hotel> GetHotels()
        {
            return _dataSource.Hotels;
        }
    }
}
