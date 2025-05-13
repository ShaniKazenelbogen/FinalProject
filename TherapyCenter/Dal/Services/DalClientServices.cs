using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.API;
using Dal.models;
//using Dal.Models;
namespace Dal.Services

{
    public class DalClientServices : IDalClientServices
    {
        private readonly dbClass _context;

        public DalClientServices(dbClass context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        private List<Client> GetClients()
        {
            
            if (IsTherapistLoggedIn())
            {
                return _context.Clients.ToList();
            }
            else
            {
                throw new UnauthorizedAccessException("Access denied. Only therapists can retrieve the list of clients.");
            }
        }

        public void BookAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
        }
        //What are the next two functions?
        public bool GetStatusFromDatabase(int statusValue)
    {
        return statusValue == 1; // Assuming 1 represents true
    }

    public int ConvertStatusToDatabase(bool status)
    {
        return status ? 1 : 0; // Convert bool to integer
    }

    Payment IDalClientServices.GetPaymentByClient(string clientId)
        {
            throw new NotImplementedException();
        }

        public Payment GetClientsPayment(string clientId)
        {
            if (IsTherapistLoggedIn())
            {
                return _context.Payment.FirstOrDefault(payment => payment.ClientId == clientId)
                    ?? new Payment { ClientId = clientId, AmountOwed = 0, AmountPaid = 0 };
            }
            else
            {
                throw new UnauthorizedAccessException("Access denied. Only therapists can retrieve client payments.");
            }
        }

        public Client? GetClientById(int id)
        {
            return _context.Clients.FirstOrDefault(c => c.ClientId == id);
        }

        public Therapist? GetTherapistById(int id)
        {
            return _context.Therapists.FirstOrDefault(t => t.TherapistId == id);
        }
        public void AddClient(Client client)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client), "Client cannot be null.");
            }

            _context.Clients.Add(client);
            _context.SaveChanges();
        }
        public string AppointmentCancelation(string appointmentId)
        {
            if (CancelAppointment(appointmentId))
            {
                return "Appointment canceled successfully.";
            }
            else
            {
                return "Failed to cancel appointment. Please check the appointment ID.";
            }
        }
        public bool CancelAppointment(string appointmentId)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.AppointmentId.ToString() == appointmentId);

            if (appointment != null)
            {
                appointment.Status = "Canceled";
                _context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
