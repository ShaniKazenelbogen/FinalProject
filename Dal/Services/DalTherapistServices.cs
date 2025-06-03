using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalTherapistServices
    {
        //public List<Appointment> GetAppointmentsForDate(DateTime date)
        //{
        //    using (var context = new dbClass())
        //    {
        //        return context.Appointments
        //            .Where(a => a.Date.Date == date.Date)
        //            .ToList();
        //    }
        //}

        public List<Appointment> GetAppointmentsForDate(DateTime date)
        {
            using (var context = new dbClass())
            {
                return context.Appointments
                    .Where(a => a.Date.Date == date.Date)
                    .Select(a => new Appointment
                    {
                        ClientId = a.ClientId,
                        StartTime = a.StartTime,
                        EndTime = a.EndTime
                    })
                    .ToList();
            }
        }
        // // // // // // //
        public List<object> GetUpcomingClients()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);

            using (var context = new dbClass())
            {
                var appointments = context.Appointments
                    .Where(a => (a.Date == today || a.Date == tomorrow) && a.Status)
                     .Join(context.Clients,
                appointment => appointment.ClientId,
                client => client.ClientId,
                (appointment, client) => new
                {
                    ClientName = $"{client.FirstName} {client.LastName}",
                            appointment.StartTime,
                            appointment.EndTime
                        })
                    .ToList();
                //return appointments
                return appointments.Cast<object>().ToList(); // Ensure the result is cast to List<object>
            }
        }

    }
}
