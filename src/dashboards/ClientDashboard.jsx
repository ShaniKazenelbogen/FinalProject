
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
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Notification from '../components/Notification';
import {
  Calendar,
  Clock,
  CreditCard,
  Plus,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Heart
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function getLoggedInUser() {
  return {
    clientId: localStorage.getItem('userId'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    userType: localStorage.getItem('userType')
  };
}

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState({ balance: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Booking dialog states
  const [bookingOpen, setBookingOpen] = useState(false);
  const [therapists, setTherapists] = useState([]);
  const [newBooking, setNewBooking] = useState({
    therapistId: '',
    date: '',
    time: '',
    notes: ''
  });

  // Notification states
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  // Helper function to show notifications
  const showNotification = (message, severity = 'success') => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  useEffect(() => {
    const { clientId, firstName, lastName } = getLoggedInUser();

    if (!clientId) {
      setIsLoading(false);
      return;
    }

    async function fetchClientData() {
      setIsLoading(true);
      try {
        const res = await fetch(`https://localhost:7152/api/Client/${clientId}`);
        if (!res.ok) throw new Error('Failed to fetch client');
        const client = await res.json();
        setUser(client);

        const now = new Date();
        const upcoming = [];
        const recent = [];
        (client.Apointments || []).forEach(app => {
          const appDate = new Date(app.StartTime || app.Date);
          if (appDate >= now) {
            upcoming.push(app);
          } else {
            recent.push(app);
          }
        });
        setUpcomingSessions(upcoming);
        setRecentSessions(recent);

        setPaymentStatus({ balance: 0 });
      } catch (err) {
        setUser({ FirstName: firstName || "Client", LastName: lastName || "" });
        setUpcomingSessions([]);
        setRecentSessions([]);
        setPaymentStatus({ balance: 0 });
      }
      setIsLoading(false);
    }

    fetchClientData();
  }, []);

  // Fetch therapists for booking
  const fetchTherapists = async () => {
    try {
      const res = await fetch('https://localhost:7152/api/Manager/GetTherapists');
      if (res.ok) {
        const therapistsData = await res.json();
        setTherapists(therapistsData);
      }
    } catch (err) {
      console.error('Error fetching therapists:', err);
    }
  };

  // Handle booking submission
  const handleBookSession = async () => {
    try {
      const { clientId } = getLoggedInUser();
      
      // Combine date and time
      const dateTime = `${newBooking.date}T${newBooking.time}:00`;
      
      const bookingData = {
        ClientId: parseInt(clientId),
        TherapistId: parseInt(newBooking.therapistId),
        StartTime: dateTime,
        Notes: newBooking.notes
      };

      const response = await fetch('https://localhost:7152/api/Client/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        showNotification('Session booked successfully!', 'success');
        setBookingOpen(false);
        setNewBooking({
          therapistId: '',
          date: '',
          time: '',
          notes: ''
        });
        // Refresh the dashboard data
        window.location.reload();
      } else {
        const error = await response.text();
        showNotification(`Error: ${error}`, 'error');
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    }
  };

  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
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

  if (!user) {
    return (
      <Box p={8}>
        <Typography variant="h6">Unable to load your account.</Typography>
      </Box>
    );
  }

  return (
    <Layout currentPageName="ClientDashboard">
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
            background: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',
            borderRadius: 3
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1b5e20', mb: 1 }}>
            Welcome, {user.FirstName} {user.LastName}
          </Typography>
          <Typography variant="h6" sx={{ color: '#2e7d32', opacity: 0.8 }}>
            Your journey to wellness continues here
          </Typography>
        </Paper>

        {/* Quick Stats */}
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
                  Upcoming Sessions
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
                  {upcomingSessions.length}
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
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <CheckCircle size={48} color="#388e3c" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 1 }}>
                  Sessions Completed
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                  {recentSessions.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={3} 
              sx={{ 
                background: 'linear-gradient(135deg, #f8bbd9 0%, #fce4ec 100%)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
                border: '2px solid #e91e63'
              }}
              onClick={() => setBookingOpen(true)}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Plus size={48} color="#c2185b" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#c2185b', mb: 1 }}>
                  Book New Session
                </Typography>
                <Typography variant="body1" sx={{ color: '#ad1457', fontWeight: 'bold' }}>
                  Click to schedule
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Upcoming Sessions */}
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 3,
            background: 'rgba(255, 248, 253, 0.8)',
            backdropFilter: 'blur(10px)',
            mb: 3
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4a148c', mb: 3 }}>
              Upcoming Sessions
            </Typography>
            {upcomingSessions.length > 0 ? (
              <Box>
                {upcomingSessions.map((session, index) => (
                  <Paper 
                    key={session.ApointmentId || session.Id || index} 
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
                          {session.TherapistName ||
                            (session.Therapist
                              ? `${session.Therapist.FirstName} ${session.Therapist.LastName}`
                              : "Therapist TBD")}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                          <Clock style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          {format(new Date(session.StartTime || session.Date), 'MMM d, yyyy')} at {format(new Date(session.StartTime || session.Date), 'HH:mm')}
                        </Typography>
                      </Box>
                      <Chip label={session.Status} color={getStatusColor(session.Status)} />
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
                <Calendar size={48} color="#f57c00" style={{ marginBottom: 16 }} />
                <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                  No upcoming sessions scheduled
                </Typography>
                <Typography variant="body1" sx={{ color: '#f57c00', mt: 1 }}>
                  Book your first session to get started!
                </Typography>
              </Paper>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                variant="contained"
                startIcon={<Plus />} 
                endIcon={<ChevronRight />}
                sx={{
                  background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
                  color: '#4a148c',
                  fontWeight: 'bold'
                }}
                onClick={() => {
                  setBookingOpen(true);
                  fetchTherapists();
                }}
              >
                Book New Session
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Book Session Dialog */}
        <Dialog open={bookingOpen || false} onClose={() => setBookingOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
            color: '#4a148c',
            fontWeight: 'bold'
          }}>
            Book New Session
          </DialogTitle>
          <DialogContent sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)', pt: 3 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl fullWidth>
                <InputLabel>Select Therapist</InputLabel>
                <Select
                  value={newBooking?.therapistId || ''}
                  onChange={(e) => setNewBooking({...newBooking, therapistId: e.target.value})}
                  label="Select Therapist"
                >
                  {therapists.map((therapist) => (
                    <MenuItem key={therapist.therapistId || therapist.UserId} value={therapist.therapistId || therapist.UserId}>
                      {therapist.firstName || therapist.FirstName} {therapist.lastName || therapist.LastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                label="Date"
                type="date"
                value={newBooking?.date || ''}
                onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                label="Time"
                type="time"
                value={newBooking?.time || ''}
                onChange={(e) => setNewBooking({...newBooking, time: e.target.value})}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
            <Button onClick={() => setBookingOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleBookSession} 
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
                color: '#4a148c',
                fontWeight: 'bold'
              }}
            >
              Book Session
            </Button>
          </DialogActions>
        </Dialog>

        <Notification
          open={notificationOpen}
          message={notificationMessage}
          severity={notificationSeverity}
          onClose={() => setNotificationOpen(false)}
        />
      </Box>
    </Layout>
  );
}