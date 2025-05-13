using Dal.models;
//using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public static class Mapper
    {
        //Dal=> Bl

        public static List<BlAppointment> ToListBlAppointment(List<Appointment> appointments)
        {
            // Map each Appointment to a BlAppointment
            return appointments.Select(a => new BlAppointment
            {
                MeetingType = (MeetingType)(Bl.models.MeetingType)a.MeetingType,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                TherapistId = a.TherapistId,
                ClientId = a.ClientId,
                Status = a.Status,
                Date = a.Date,
                // Map other properties as necessary
            }).ToList();
        }
        // Bl => Dal
        public static Appointment ToDalAppointment(BlAppointment blAppointment)
        {
            if (blAppointment == null)
            {
                return null;
            }
            return new Appointment
            {
                Date = blAppointment.Date,
                TherapistId = blAppointment.TherapistId,
                ClientId = blAppointment.ClientId,
                AppointmentId = blAppointment.AppointmentId,
                Status = blAppointment.Status,
                // MeetingType = blAppointment.MeetingType,
            };
        }
        //
        public static Appointment MapToDalAppointment(BlAppointment blAppointment)
        {
            return new Appointment
            {
                MeetingType = (Dal.models.MeetingType)blAppointment.MeetingType,
                StartTime = blAppointment.StartTime,
                EndTime = blAppointment.EndTime,
                // Map other properties as necessary
            };
        }
    }
}
