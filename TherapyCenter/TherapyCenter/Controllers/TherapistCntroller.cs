using Bl;
using Dal.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace TherapyCenter.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Therapist")]
    public class TherapistController : ControllerBase
    {
        public IBlManager BlManager { get; set; }

        public TherapistController(IBlManager IblManager)
        {
            BlManager = IblManager;
        }

        [HttpGet("appointments/{therapistId}")]
        public IActionResult GetTherapistAppointments(string therapistId)
        {
            try
            {

                var result = BlManager.TherapistServices.GetAppointmentsByTherapistId(therapistId);

                var today = DateTime.Today;

                var filteredAppointments = result?.Where(appointment => appointment.Date.Date == today).ToList();

                if (filteredAppointments == null || !filteredAppointments.Any())
                {
                    return NotFound("No appointments found for this therapist today.");
                }

                return Ok(filteredAppointments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving today's appointments.");
            }
        }
        [HttpGet("{therapistId}/patients")]
        public IActionResult GetPatients(string therapistId)
        {
            try
            {

                if (string.IsNullOrWhiteSpace(therapistId))
                {
                    return BadRequest("Therapist ID cannot be null or empty.");
                }


                var patients = _therapistService.GetPatientsByTherapistId(therapistId);


                if (patients == null || !patients.Any())
                {
                    return NotFound($"No clients found for therapist with ID: {therapistId}.");
                }


                return Ok(patients);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "An error occurred while retrieving clients for therapist ID: {TherapistId}", therapistId);


                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }

        [HttpPost("{therapistId}/messages")]
        public IActionResult SendMessageToClient(string therapistId, [FromBody] MessageDto message)
        {

        }





    }
}
