using Bl;
using Bl.API;
using Dal.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace TherapyCenter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Therapist")]
    public class TherapistController : ControllerBase
    {
        private readonly IBlTherapistServices _blTherapistServices;

        public TherapistController(IBlTherapistServices blTherapistServices)
        {
            _blTherapistServices = blTherapistServices;
        }

        [HttpGet("appointments/{date}")]
        public IActionResult GetAppointmentsByDate(DateTime date)
        {
            var appointments = _blTherapistServices.GetAllAppointmentsForTheSpecificDate(date);
            if (appointments == null || !appointments.Any())
            {
                return NotFound();
            }
            return Ok(appointments);
        }
        [HttpGet("upcoming")]
        public IActionResult GetUpcomingClients()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);
            var upcomingClients = _blTherapistServices.GetClientsForTodayAndTomorrow();

            if (upcomingClients == null || !upcomingClients.Any())
            {
                return NotFound();
            }
            return Ok(upcomingClients);
        }
    }
}

   
