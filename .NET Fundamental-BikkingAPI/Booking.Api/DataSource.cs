using Booking.Domain.Models;

namespace Booking.Api
{
    public class DataSource
    {
        public DataSource()
        {
            Hotels = GetHotels();
        }

        public List<Hotel> Hotels { get; set; }

        private List<Hotel> GetHotels()
        {
            return new List<Hotel>
            {
                new Hotel
                {
                    HotelId = 1,
                    Name = "hotel 1",
                    Star = 5,
                    Country = "USA",
                    City = "New York",
                    Description = "This is a hotel in New York"
                },

                new Hotel
                {
                    HotelId = 2,
                    Name = "hotel 2",
                    Star = 5,
                    Country = "UK",
                    City = "London",
                    Description = "This is a hotel in London"
                }
            };
        }
    }
}
