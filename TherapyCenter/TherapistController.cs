using Bl;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TherapyCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TherapistController : ControllerBase
    {
        public IBlManager BlManager { get; set; }

        public TherapistController(IBlManager IblManager)
        {
            BlManager = IblManager;
        }

        // 1. Get all appointments for a therapist
        [HttpGet("appointments/{therapistId}")]
        public IActionResult GetTherapistAppointments(string therapistId)
        {
            try
            {
                var result = BlManager.TherapistServices.GetAppointmentsByTherapistId(therapistId);

                if (result == null || !result.Any())
                {
                    return NotFound("No appointments found for this therapist.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving appointments.");
            }
        }

        // 2. Update therapist availability
        [HttpPut("availability/update/{therapistId}")]
        public IActionResult UpdateTherapistAvailability(string therapistId, [FromBody] TherapistAvailability availability)
        {
            try
            {
                var result = BlManager.TherapistServices.UpdateAvailability(therapistId, availability);

                if (!result)
                {
                    return BadRequest("Failed to update therapist availability.");
                }

                return Ok("Therapist availability updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while updating availability.");
            }
        }

        // 3. Get therapist profile
        [HttpGet("profile/{therapistId}")]
        public IActionResult GetTherapistProfile(string therapistId)
        {
            try
            {
                var result = BlManager.TherapistServices.GetTherapistDetails(therapistId);

                if (result == null)
                {
                    return NotFound("Therapist profile not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while retrieving the therapist profile.");
            }
        }
    }
}
