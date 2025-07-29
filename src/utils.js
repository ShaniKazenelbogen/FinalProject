export function createPageUrl(pageName) {
  // Map your logical page names to actual route paths here
  switch (pageName) {
    case 'SignIn': return '/signin';
    case 'About': return '/about';
    case 'TherapistDashboard': return '/therapist-dashboard';
    case 'ClientDashboard': return '/client-dashboard';
    case 'ManagerDashboard': return '/manager-dashboard';
    case 'ClientList': return '/clients';
    case 'AppointmentCalendar': return '/appointments';
    case 'TherapistSchedule': return '/schedule';
    case 'MySessions': return '/my-sessions';
    case 'BookSession': return '/book-session';
    case 'PaymentStatus': return '/payment-status';
    case 'ManageStaff': return '/manage-staff';
    case 'AllAppointments': return '/all-appointments';
    case 'Settings': return '/settings';
    default: return '/';
  }
}
