using Booking.Api.Dtos;
using Booking.Api.Services;
using Booking.Dal;
using Booking.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking.Api.Controllers
{

    //create
    //Read   -> get all, get by is
    //Update
    //detlete

    //  /hotel
    [ApiController]
    [Route("[controller]")]
    public class HotelController : Controller
    {

        private readonly ILogger<HotelController> _logger;
        private readonly DataContext _ctx;
        public HotelController(ILogger<HotelController> logger, DataContext ctx)
        {
            _logger = logger;
            _ctx = ctx;
        }

        // will execute on Get
        [HttpGet]
        public async Task<IActionResult> GetAllHotels()
        {
            var hotels = await _ctx.Hotels.ToListAsync();
            return Ok(hotels);
        }

        [HttpPost]
        public async Task<IActionResult> CreateHotel([FromBody] HotelCreateDto hotel)
        {
            Hotel domainHotel = new Hotel();
            domainHotel.Name = hotel.Name;
            domainHotel.Star = hotel.Star;
            domainHotel.Address = hotel.Address;
            domainHotel.City = hotel.City;
            domainHotel.Country = hotel.Country;
            domainHotel.Description = hotel.Description;

            _ctx.Hotels.Add(domainHotel);
            await _ctx.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHotlById), new { id = domainHotel.HotelId }, domainHotel);


        }

        [Route("{id}")]
        [HttpPut]
        public async Task<IActionResult> UpfateHotel([FromBody] Hotel update, int id)
        {
            var hotel = await _ctx.Hotels.FirstOrDefaultAsync(h => h.HotelId == id);
            hotel.Name = update.Name;
            hotel.Star = update.Star;
            hotel.Description = update.Description;

            _ctx.Hotels.Update(hotel);
            await _ctx.SaveChangesAsync();

            return NoContent();
        }

        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _ctx.Hotels.FirstOrDefaultAsync(h => h.HotelId == id);
            _ctx.Hotels.Remove(hotel);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetHotlById(int id)
        {
            var hotel = _ctx.Hotels.FirstOrDefault(h => h.HotelId == id);
            return Ok(hotel);
        }

        

    }
}
