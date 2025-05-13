using Dal.API;
using Dal.models;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class DalManager
    {
        public Appointment Appointment { get; set; }
        public AvailableSlot AvailableSlot { get; set; }
        public Client Client { get; set; }
        public Payment Payment { get; set; }
        public Therapist Therapist { get; set; }
        public TherapistsClient TherapistsClient { get; set; }
        public MeetingType MeetingType { get; set; }            
        public PaymentMethod PaymentMethod { get; set; }
        public IDalClientServices ClientServices { get; set; }
        public IDalPaymentServices PaymentServices { get; set; }
        public DalManager(IDalClientServices dalClientServices)
        {
            this.ClientServices = new DalClientServices((dbClass)dalClientServices);
        }


    }
}
