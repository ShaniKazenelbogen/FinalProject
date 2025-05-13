using Dal.models;
//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.API
{
    public interface IDalClientServices
    {
        //List<Client> GetClients();
        //void BookAppointment(object dalAppointment);
        // bool ClientExists(string clientId);
        bool CheckAvailability(DateTime startTime, DateTime endTime);
        List<Appointment> GetAllAppointments();
        public List<Appointment> GetAppointmentByClient(string clientId);
        //public List<Appointment> GetAppointmentByClient(string clientId)
        //{
        //    // Assuming _dbContext is your database context
        //    return _dbContext.Appointments
        //        .Where(appointment => appointment.ClientId == clientId) // Filter by clientId
        //        .ToList();
        //}
        public Payment GetClientsPayment(string clientId);
        Client GetClientById(string clientId);
        Therapist GetTherapistById(string therapistId);                 
        void BookAppointment(Appointment appointment);
        bool CancelAppointment(string appointmentId);



    }
}
