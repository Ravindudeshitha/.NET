using Booking.Domain.Models;

namespace Booking.Api.Dtos
{
    public class HotelCreateDto
    {
        public string Name { get; set; }
        public int Star { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
    }
}
