namespace Dal.Models
{
    public class Appointment
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public MeetingType MeetingType { get; set; } // Add this property if it doesn't exist
        // Add other properties as necessary
    }

    public enum MeetingType
    {
        InPerson,
        Virtual
        // Add other meeting types as necessary
    }
}
