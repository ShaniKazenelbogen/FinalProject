using Bl;
using Bl.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bl.API;
using Dal.API;
using Bl.API;
using Bl.Services;
using Dal.Services;




namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ClientController : Controller
    {
        public readonly IBlManager _blManager;
        public readonly IBlClientServices _blClientServices;

        public ClientController(IBlManager blManager, IBlClientServices blClientServices)
        {
            _blManager = blManager;
            _blClientServices = blClientServices;
        }

        [HttpGet("CheckingStatus")]
        public ActionResult<string> GetExample()
        {
            return "Hello, World!";
        }

        [HttpGet("appointments/available")]
        public IActionResult GetAllAvailableAppointments()
        {
            var result = _blManager.ClientServices.GetAllAppointments();
            return result == null || !result.Any() ? NotFound("No appointments available.") : Ok(result);
        }

        [HttpGet("appointments/{clientId}")]
        public IActionResult GetClientAppointments(string clientId)
        {
            var appointments = _blClientServices.GetAppointmentHistory(clientId);
            return appointments == null || !appointments.Any() ? NotFound("No appointments found for this client.") : Ok(appointments);
        }

        [HttpGet("appointments/upcoming/{clientId}")]
        public IActionResult GetUpcomingAppointments(string clientId)
        {
            var result = _blManager.GetUpcomingAppointments(clientId);
            return result == null || !(result is IEnumerable<object> enumerableResult) || !enumerableResult.Any()
                ? NotFound("No upcoming appointments found for this client.")
                : Ok(result);
        }

        [HttpGet("payment-history/{clientId}")]
        public IActionResult GetPaymentHistory(string clientId)
        {
            var result = _blClientServices.GetPaymentStatus(clientId);
            return result == null || !result.Any() ? NotFound("No payment history found for this client.") : Ok(result);
        }

        [HttpPost("book")]
        public IActionResult BookAppointment(string clientId, [FromBody] BlAppointment appointment)
        {
            var result = _blClientServices.BookAppointment(clientId, appointment);
            return string.IsNullOrEmpty(result) ? Ok("Appointment booked successfully.") : BadRequest("This time slot is unavailable.");
        }

        [HttpDelete("appointment/cancel/{appointmentId}")]
        public IActionResult CancelAppointment(string appointmentId)
        {
            var result = _blManager.ClientServices.CancelAppointment(appointmentId);
            return !result ? BadRequest("Failed to cancel the appointment. It may not exist or is already canceled.") : Ok("Appointment canceled successfully.");
        }

        [HttpGet("payment-status/{appointmentId}")]
        public IActionResult GetPaymentStatus(string appointmentId)
        {
            var result = _blManager.ClientServices.GetPaymentStatus(appointmentId);
            return string.IsNullOrEmpty(result) ? NotFound("Payment status not found for this appointment.") : Ok(result);
        }

        [HttpGet("user-type/{id}")]
        public IActionResult GetUserType(string id)
        {
            var result = _blManager.ClientServices.GetUserType(id);
            return string.IsNullOrEmpty(result) ? NotFound("User not found.") : Ok(result);
        }
    }

}

}