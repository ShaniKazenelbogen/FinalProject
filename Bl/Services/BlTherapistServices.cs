using Bl.API;
using Dal.API;
using Dal.models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    //
    public class BlTherapistServices : IBlTherapistServices
    {
        private readonly IDalTherapistServices _dalTherapistServices;

        public BlTherapistServices(IDalTherapistServices dalTherapistServices)
        {
            _dalTherapistServices = dalTherapistServices;
        }

        public List<Appointment> GetAllAppointmentsForTheSpecificDate(DateTime date)
        {
            return _dalTherapistServices.GetAppointmentsForDate(date);
        }
        public List<object> GetClientsForTodayAndTomorrow()
        {
            return _dalTherapistServices.GetUpcomingClients();
        }


    }
    //
}
