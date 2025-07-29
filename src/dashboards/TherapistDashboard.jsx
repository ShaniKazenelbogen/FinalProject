import React, { useState, useEffect } from "react";
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Calendar, Users, Clock, TrendingUp, ChevronRight, AlertCircle } from "lucide-react";
import { format } from "date-fns";

function getLoggedInUser() {
  return {
    therapistId: localStorage.getItem('userId'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    userType: localStorage.getItem('userType')
  };
}

export default function TherapistDashboard() {
  const [user, setUser] = useState({ last_name: "Therapist" });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [myClients, setMyClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientsDialogOpen, setClientsDialogOpen] = useState(false);

  useEffect(() => {
    const { therapistId, firstName, lastName } = getLoggedInUser();
    
    // Set user info from localStorage
    setUser({ 
      first_name: firstName || "Therapist", 
      last_name: lastName || "" 
    });

    // Fetch therapist's appointments for today
    if (therapistId) {
      fetchTherapistData(therapistId);
    }

    // Always show spinner for at least 500ms
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchTherapistData = async (therapistId) => {
    try {
      // Fetch today's appointments using the server endpoint
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const appointmentsRes = await fetch(`https://localhost:7152/api/Therapist/appointments/${today}`);
      if (appointmentsRes.ok) {
        const appointments = await appointmentsRes.json();
        setTodayAppointments(appointments);
      } else if (appointmentsRes.status === 404) {
        // No appointments found for today
        setTodayAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching therapist data:', err);
      setTodayAppointments([]);
    }
  };

  const fetchMyClients = async () => {
    const { therapistId } = getLoggedInUser();
    if (!therapistId) return;

    try {
      const res = await fetch(`https://localhost:7152/api/Therapist/${therapistId}/clients`);
      if (res.ok) {
        const clientsData = await res.json();
        setMyClients(clientsData);
      } else if (res.status === 404) {
        // No clients found
        setMyClients([]);
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
      setMyClients([]);
    }
  };

  const getClientAppointments = async (clientId) => {
    try {
      const res = await fetch(`https://localhost:7152/api/Therapist?clientId=${clientId}`);
      if (res.ok) {
        const appointments = await res.json();
        return appointments;
      }
      return [];
    } catch (err) {
      console.error('Error fetching client appointments:', err);
      return [];
    }
  };

  const addNoteToAppointment = async (appointmentId, note) => {
    try {
      const res = await fetch(`https://localhost:7152/api/Therapist/appointments/${appointmentId}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      });
      
      if (res.ok) {
        return await res.text();
      }
      throw new Error('Failed to add note');
    } catch (err) {
      console.error('Error adding note:', err);
      throw err;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'no-show': return 'warning';
      default: return 'default';
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <Layout currentPageName="TherapistDashboard">
      <Box sx={{ 
        minHeight: 'calc(100vh - 120px)',
        background: 'linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)',
        borderRadius: 2,
        p: 3
      }}>
        {/* Welcome Header */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
            borderRadius: 3
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4a148c', mb: 1 }}>
            Welcome back, Dr. {user?.last_name || 'Therapist'}
          </Typography>
          <Typography variant="h6" sx={{ color: '#6a1b9a', opacity: 0.8 }}>
            Here's what's happening with your practice today
          </Typography>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={3} 
              sx={{ 
                background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Calendar size={48} color="#1565c0" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565c0', mb: 1 }}>
                  Today's Sessions
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
                  {todayAppointments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={3} 
              sx={{ 
                background: 'linear-gradient(135deg, #c8e6c9 0%, #e8f5e8 100%)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
              onClick={() => {
                fetchMyClients();
                setClientsDialogOpen(true);
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Users size={48} color="#388e3c" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 1 }}>
                  My Clients
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                  {myClients.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#2e7d32', mt: 1 }}>
                  Click to view all
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Today's Schedule */}
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 3,
            background: 'rgba(255, 248, 253, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4a148c', mb: 3 }}>
              Today's Schedule
            </Typography>
            {todayAppointments.length > 0 ? (
              <Box>
                {todayAppointments.map((appointment, index) => (
                  <Paper 
                    key={appointment.AppointmentId || appointment.Id} 
                    elevation={2}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
                      border: '1px solid #e1bee7'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
                          {appointment.StartTime ? 
                            new Date(appointment.StartTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 
                            'Time TBD'
                          }
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
                          Client ID: {appointment.ClientId || 'Unknown'}
                        </Typography>
                      </Box>
                      <Chip 
                        label={appointment.Status || 'Scheduled'} 
                        color={getStatusColor(appointment.Status?.toLowerCase() || 'scheduled')}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper 
                elevation={1}
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                  borderRadius: 2
                }}
              >
                <AlertCircle size={48} color="#f57c00" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  No appointments scheduled for today
                </Typography>
                <Typography variant="body1" sx={{ color: '#f57c00', mt: 1 }}>
                  Enjoy your free time!
                </Typography>
              </Paper>
            )}
          </Box>
        </Paper>

        {/* My Clients Dialog */}
        <Dialog open={clientsDialogOpen} onClose={() => setClientsDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
            color: '#4a148c',
            fontWeight: 'bold'
          }}>
            My Clients
          </DialogTitle>
          <DialogContent sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
            {myClients.length > 0 ? (
              <List>
                {myClients.map((client) => (
                  <Paper 
                    key={client.UserId || client.ClientId || client.Id}
                    elevation={2}
                    sx={{ mb: 2, borderRadius: 2 }}
                  >
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
                            {`${client.FirstName || 'N/A'} ${client.LastName || 'N/A'}`}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                              📧 Email: {client.Email || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                              📱 Phone: {client.PhoneNumber || 'N/A'}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                              🆔 User ID: {client.UserId || client.ClientId || client.Id}
                            </Typography>
                            <Button 
                              size="small" 
                              variant="contained"
                              sx={{ 
                                mt: 1,
                                background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
                                color: '#4a148c',
                                fontWeight: 'bold',
                                '&:hover': {
                                  background: 'linear-gradient(135deg, #d1c4e9 0%, #f48fb1 100%)'
                                }
                              }}
                              onClick={() => getClientAppointments(client.UserId || client.ClientId || client.Id)}
                            >
                              View Appointments
                            </Button>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            ) : (
              <Paper 
                elevation={1}
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                  borderRadius: 2
                }}
              >
                <Users size={48} color="#f57c00" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  No clients found
                </Typography>
                <Typography variant="body1" sx={{ color: '#f57c00' }}>
                  New clients will appear here once assigned
                </Typography>
              </Paper>
            )}
          </DialogContent>
          <DialogActions sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
            <Button 
              onClick={() => setClientsDialogOpen(false)}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
                color: '#4a148c',
                fontWeight: 'bold'
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
}