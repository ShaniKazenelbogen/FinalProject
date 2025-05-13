using Bl;
using Bl.API;
using Bl.Services;
using Dal.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TherapyCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Client")]
    public class ClientController : ControllerBase
    {
        private readonly IBlManager BlManager;
        private readonly IBlClientServices BlClientServices;

        public ClientController(IBlManager blManager, IBlClientServices blClientServices)
        {
            BlManager = blManager;
            BlClientServices = blClientServices;
        }

        [HttpGet("appointments/available")]
        public IActionResult GetAllAvailableAppointments()
        {
            try
            {
                var result = BlManager.ClientServices.GetAllAppointments();

                if (result == null || !result.Any())
                {
                    return NotFound("No appointments available.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving appointments.");
            }
        }

        [HttpGet("appointments/{clientId}")]
        public IActionResult GetClientAppointments(string clientId)
        {
            try
            {
                var appointments = BlClientServices.GetAppointmentHistory(clientId);

                if (appointments == null || !appointments.Any())
                {
                    return NotFound("No appointments found for this client.");
                }

                return Ok(appointments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving appointments.");
            }
        }
      
        [HttpGet("appointments/upcoming/{clientId}")]
        public IActionResult GetUpcomingAppointments(string clientId)
        {
            try
            {
                var result = BlManager.GetUpcomingAppointments(clientId);

                if (result == null || !(result is IEnumerable<object> enumerableResult) || !enumerableResult.Any())
                {
                    return NotFound("No upcoming appointments found for this client.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving upcoming appointments.");
            }
        }

        
        [HttpGet("payment-history/{clientId}")]
        public IActionResult GetPaymentHistory(string clientId)
        {
            try
            {
                var result = BlClientServices.GetPaymentStatus(clientId);

                if (result == null || !result.Any())
                {
                    return NotFound("No payment history found for this client.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving payment history.");
            }
        }

        

            [HttpGet("recieve all appointments")]
            public ActionResult<List<BlAppointment>> GetAppointments()
            {
                return Ok(BlClientServices.GetAllAppointments());
            }

            [HttpPost("book")]
            public ActionResult<string> BookAppointment(string clientId, [FromBody] BlAppointment appointment)
            {
                var result = BlClientServices.BookAppointment(clientId, appointment);
            if (result != null && !result.Equals(""))
                {
                    return BadRequest("This time slot is unavailable.");
                }
                return Ok("Appointment booked successfully.");
            }

            [HttpDelete("appointment/cancel/{appointmentId}")]
            public IActionResult CancelAppointment(string appointmentId)
            {
                try
                {
                    var result = BlManager.ClientServices.CancelAppointment(appointmentId);

                    if (!result)
                    {
                        return BadRequest("Failed to cancel the appointment. It may not exist or is already canceled.");
                    }

                    return Ok("Appointment canceled successfully.");
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while canceling the appointment.");
                }
            }
        
        [HttpGet("payment-status/{appointmentId}")]
        public IActionResult GetPaymentStatus(string appointmentId)
        {
            try
            {
                var result = BlManager.ClientServices.GetPaymentStatus(appointmentId);

                if (string.IsNullOrEmpty(result))
                {
                    return NotFound("Payment status not found for this appointment.");
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving payment status.");
            }
        }
       
        [HttpGet("user-type/{id}")]
        public IActionResult GetUserType(string id)
        {
            try
            {
                var result = BlManager.ClientServices.GetUserType(id);

                if (string.IsNullOrEmpty(result))
                {
                    return NotFound("User not found.");
                }

                return Ok(result);
            }
            catch (Exception)

            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving user type.");
            }

        }




    }
}

