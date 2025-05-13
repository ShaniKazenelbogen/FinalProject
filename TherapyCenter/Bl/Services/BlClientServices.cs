using Bl.API;
using Dal.API;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlClientServices : IBlClientServices
    {
        private readonly IDalClientServices _dalClientServices;

        public BlClientServices(IDalClientServices dalClientServices)
        {
            _dalClientServices = dalClientServices;
        }

        public List<Appointment> GetAppointmentByClient(string clientId)
        {
            if (!IsValidClientId(clientId))
            {
                throw new ArgumentException("Invalid client ID.");
            }

            var appointments = _dalClientServices.GetAppointmentByClient(clientId);

            return appointments.ToList();
        }

        private bool IsValidClientId(string clientId)
        {
            var clients = _dalClientServices.GetClients();

            return clients.Any(c => c.Id == clientId);
        }

        public string GetPaymentStatus(string clintId)
        {
            var payments = _dalClientServices.GetClientsPayment(clintId);
            if (payments.AmountOwed == 0)
            {
                return "You have paid up.";
            }
            return $"You owe {payments.AmountOwed:C}.";
        }

        public List<Appointment> GetUpcomingAppointment(string clientId)
        {
            // Add your implementation here
            throw new NotImplementedException();
        }
        public List<BlAppointment> GetAllAppointments()
        {
            return Mapper.ToListBlAppointment(_dalClientServices.GetAllAppointments());
        }


        public string BookAppointment(string clientId, BlAppointment blAppointment)
        {
            if (_dalClientServices.ClientExists(clientId))
            {
                var isAvailable = _dalClientServices.CheckAvailability(blAppointment.StartTime, blAppointment.EndTime);
                if (!isAvailable)
                {
                    return "Time slot is not available";
                }
                var dalAppointment = Mapper.ToDalAppointment(blAppointment);
                _dalClientServices.BookAppointment(dalAppointment);

                string meetingType = blAppointment.MeetingType.ToString();
                string date = blAppointment.StartTime.ToString("MMMM dd, yyyy");
                return $"You have successfully booked a {meetingType} meeting on {date}.";
            }
            else
            {
                throw new Exception("Invalid client ID");
            }
        }

        public List<BlAppointment> GetAppointmentHistory(string clientId)
        {
            var dalAppointments = _dalClientServices.GetAppointmentByClient(clientId);
            return Mapper.ToListBlAppointment(dalAppointments);
        }
        public string GetUserType(string id)
        {

            var therapist = _dalClientServices.GetTherapistById(id);
            if (therapist != null)
            {
                return "Therapist";
            }

            else
            {
                var client = _dalClientServices.GetClientById(id);
                if (client != null)
                {
                    return "Client";
                }
            }

            return "User not found";
        }
        bool CancelAppointment(string appointmentId)
        {

            var appointment = _dalClientServices.GetAppointmentByClient(appointmentId);
            if (appointment != null)
            {
                _dalClientServices.CancelAppointment(appointmentId);
                return true;
            }
            return false;
        }

    }
}

