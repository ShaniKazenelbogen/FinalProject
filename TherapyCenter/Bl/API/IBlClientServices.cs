using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBlClientServices
    {
        
        public List<BlAppointment> GetAllAppointments();
        public List<BlAppointment> GetAppointmentHistory(string clientId);
        public string BookAppointment(string IdClient, BlAppointment appointment);

        public List<Appointment> GetAppointmentByClient(string clientId);
        IEnumerable<Appointment> GetUpcomingAppointment(string clientId);
        //IEnumerable<Appointment> GetAppointmentDetails(string clientId);
         public string GetPaymentStatus(string clientId);
        public Payment GetClientsPayment(string clientId);
        string GetUserType(string id);
        string GetClientId(string appointmentId);
        string GetTherapistId(string appointmentId);
        bool CancelAppointment(string appointmentId);
    }
}
