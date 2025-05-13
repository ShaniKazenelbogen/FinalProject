using Bl.API;
using Bl.models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public interface IBlManager
    {
        public BlAppointment Appointment { get; set; }
        public BlAvailableSlot AvailableSlot { get; set; }
        public BlClient Client { get; set; }
        public BlPayment Payment { get; set; }
        public BlTherapist Therapist { get; set; }
        public BlTherapistsClient TherapistsClient { get; set; }
        public models.MeetingType MeetingType { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public  IBlClientServices ClientServices { get; set; }
        public IBlPaymentServices PaymentServices { get; set; }
        public IBlTherapistServices TherapistServices { get; set; }

        object GetUpcomingAppointments(string clientId);
    }
}
