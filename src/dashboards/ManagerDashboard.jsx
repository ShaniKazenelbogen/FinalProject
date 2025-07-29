import React, { useState, useEffect } from "react";
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser } from "../UserContext";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Users, UserCheck, Calendar, TrendingUp, Settings, Plus, Trash2, UserPlus } from "lucide-react";
import Layout from '../components/Layout';
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ConfirmDialog from '../components/ConfirmDialog';
import Notification from '../components/Notification';

export default function ManagerDashboard() {
  const { user, signOut } = useUser();

  const [stats, setStats] = useState({
    totalTherapists: 0,
    totalClients: 0,
    todayAppointments: 0,
    monthlyRevenue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);

  // Dialog states
  const [addTherapistOpen, setAddTherapistOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [manageStaffOpen, setManageStaffOpen] = useState(false);

  // Form states
  const [newTherapist, setNewTherapist] = useState({
    therapistId: '',
    firstName: '',
    lastName: '',
    email: '',
    celNumber: '',
    specialization: ''
  });

  const [newClient, setNewClient] = useState({
    clientId: '',
    firstName: '',
    lastName: '',
    email: '',
    celNumber: '',
    address: ''
  });

  // Confirm dialog states
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState('');

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
    let timeoutId;
    async function fetchStats() {
      setIsLoading(true);
      const start = Date.now();
      
      // Maximum loading time of 5 seconds
      const maxTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      
      try {
        // Fetch therapists count from the correct endpoint
        const therapistsRes = await fetch('https://localhost:7152/api/Manager/GetTherapists');
        let totalTherapists = 0;
        if (therapistsRes.ok) {
          const therapistsData = await therapistsRes.json();
          totalTherapists = therapistsData.length;
        }

        // Fetch clients count - all clients from the all-clients endpoint
        const clientsRes = await fetch('https://localhost:7152/api/Therapist/all-clients');
        let totalClients = 0;
        if (clientsRes.ok) {
          const clientsData = await clientsRes.json();
          // Count all clients
          totalClients = clientsData.length;
        }

        // Try to fetch other stats from the stats endpoint
        const res = await fetch('https://localhost:7152/api/Manager/stats');
        let statsData = {
          totalTherapists: totalTherapists,
          totalClients: totalClients,
          todayAppointments: 0,
          monthlyRevenue: 0
        };
        
        if (res.ok) {
          const data = await res.json();
          statsData = { ...statsData, ...data, totalTherapists: totalTherapists, totalClients: totalClients };
        }
        
        setStats(statsData);

        const actRes = await fetch('https://localhost:7152/api/Manager/recent-activity');
        if (actRes.ok) {
          const actData = await actRes.json();
          setRecentActivity(actData);
        } else {
          setRecentActivity([]);
        }
      } catch (err) {
        setStats({
          totalTherapists: 0,
          totalClients: 0,
          todayAppointments: 0,
          monthlyRevenue: 0
        });
        setRecentActivity([]);
      }
      
      // Ensure loading shows for minimum 1 second to prevent flicker
      const elapsed = Date.now() - start;
      const remainingTime = Math.max(0, 1000 - elapsed);
      
      timeoutId = setTimeout(() => {
        clearTimeout(maxTimeout);
        setIsLoading(false);
      }, remainingTime);
    }
    fetchStats();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const fetchStaff = async () => {
    try {
      const [therapistsRes, clientsRes] = await Promise.all([
        fetch('https://localhost:7152/api/Manager/GetTherapists'),
        fetch('https://localhost:7152/api/Therapist/all-clients')
      ]);

      if (therapistsRes.ok) {
        const therapistsData = await therapistsRes.json();
        setTherapists(therapistsData);
      }

      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  const handleAddTherapist = async () => {
    try {
      // Map UI field names to server field names (Pascal case)
      const therapistData = {
        TherapistId: parseInt(newTherapist.therapistId),
        FirstName: newTherapist.firstName,
        LastName: newTherapist.lastName,
        Email: newTherapist.email,
        CelNumber: parseInt(newTherapist.celNumber),
        Spacialization: newTherapist.specialization // Server expects 'Spacialization'
      };

      const response = await fetch('https://localhost:7152/api/Manager/AddTherapist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(therapistData)
      });

      if (response.ok) {
        showNotification('Therapist added successfully!', 'success');
        setAddTherapistOpen(false);
        setNewTherapist({
          therapistId: '',
          firstName: '',
          lastName: '',
          email: '',
          celNumber: '',
          specialization: ''
        });
        fetchStaff();
      } else {
        const error = await response.text();
        showNotification(`Error: ${error}`, 'error');
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    }
  };

  const handleAddClient = async () => {
    try {
      // Map UI field names to server field names (Pascal case) - matching exact Client model
      const clientData = {
        ClientId: parseInt(newClient.clientId),
        FirstName: newClient.firstName,
        LastName: newClient.lastName,
        Email: newClient.email,
        CelNumber: parseInt(newClient.celNumber),
        Adress: newClient.address // Server has typo "Adress"
      };

      const response = await fetch('https://localhost:7152/api/Manager/AddClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
      });

      if (response.ok) {
        showNotification('Client added successfully!', 'success');
        setAddClientOpen(false);
        setNewClient({
          clientId: '',
          firstName: '',
          lastName: '',
          email: '',
          celNumber: '',
          address: ''
        });
        fetchStaff();
      } else {
        const error = await response.text();
        showNotification(`Error: ${error}`, 'error');
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    }
  };

  const confirmAndDeleteTherapist = (therapistId) => {
    setConfirmMessage("Are you sure you want to delete this therapist?");
    setConfirmAction(() => () => handleDeleteTherapist(therapistId));
    setConfirmDialogOpen(true);
  };

  const handleDeleteTherapist = async (therapistId) => {
    try {
      const response = await fetch(`https://localhost:7152/api/Manager/DeleteTherapist/${therapistId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('Therapist deleted successfully!', 'success');
        fetchStaff();
      } else {
        const error = await response.text();
        showNotification(`Error: ${error}`, 'error');
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  const confirmAndDeleteClient = (clientId) => {
    setConfirmMessage("Are you sure you want to delete this client?");
    setConfirmAction(() => () => handleDeleteClient(clientId));
    setConfirmDialogOpen(true);
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`https://localhost:7152/api/Manager/DeleteClient/${clientId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('Client deleted successfully!', 'success');
        fetchStaff();
      } else {
        const error = await response.text();
        showNotification(`Error: ${error}`, 'error');
      }
    } catch (err) {
      showNotification(`Error: ${err.message}`, 'error');
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <Layout currentPageName="ManagerDashboard">
      <Box p={8}>
        <Box mb={2}>
          <Typography variant="h4">Manager Dashboard</Typography>
          <Typography variant="subtitle1">
            Hi {user?.firstName} {user?.lastName}!<br />
            Overview of your therapy center operations.
          </Typography>
          <Button onClick={signOut} variant="outlined" sx={{ mt: 2 }}>
            Sign Out
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={2} mb={4}>
          <Card>
            <CardHeader title="Total Therapists" avatar={<UserCheck />} />
            <CardContent>
              <Typography variant="h4">{stats.totalTherapists}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Total Clients" avatar={<Users />} />
            <CardContent>
              <Typography variant="h4">{stats.totalClients}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Today's Appointments" avatar={<Calendar />} />
            <CardContent>
              <Typography variant="h4">{stats.todayAppointments}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Monthly Revenue" avatar={<TrendingUp />} />
            <CardContent>
              <Typography variant="h4">${stats.monthlyRevenue?.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Activity */}
        <Card sx={{ mb: 4 }}>
          <CardHeader title="Recent Activity" />
          <CardContent>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <Box key={activity.id || activity.timestamp} display="flex" gap={2} p={1} borderBottom={1}>
                  <Typography flex={1}>{activity.description}</Typography>
                  <Typography variant="caption">
                    {activity.timestamp ? format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a') : ""}
                  </Typography>
                  <Typography variant="caption">{activity.status}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No recent activity.</Typography>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader title="Quick Actions" />
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<UserPlus />}
                onClick={() => setAddTherapistOpen(true)}
              >
                Add New Therapist
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<UserPlus />}
                onClick={() => setAddClientOpen(true)}
              >
                Add New Client
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<UserCheck />}
                onClick={() => {
                  setManageStaffOpen(true);
                  fetchStaff();
                }}
              >
                Manage Staff
              </Button>
              <Link to="/all-appointments">
                <Button variant="outlined" fullWidth startIcon={<Calendar />}>
                  View All Appointments
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="outlined" fullWidth startIcon={<Settings />}>
                  Center Settings
                </Button>
              </Link>
              <Button variant="outlined" fullWidth startIcon={<TrendingUp />}>
                Generate Reports
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Add Therapist Dialog */}
        <Dialog open={addTherapistOpen} onClose={() => setAddTherapistOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Therapist</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Therapist ID"
                type="number"
                value={newTherapist.therapistId}
                onChange={(e) => setNewTherapist({...newTherapist, therapistId: e.target.value})}
                fullWidth
              />
              <TextField
                label="First Name"
                value={newTherapist.firstName}
                onChange={(e) => setNewTherapist({...newTherapist, firstName: e.target.value})}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={newTherapist.lastName}
                onChange={(e) => setNewTherapist({...newTherapist, lastName: e.target.value})}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={newTherapist.email}
                onChange={(e) => setNewTherapist({...newTherapist, email: e.target.value})}
                fullWidth
              />
              <TextField
                label="Cell Number"
                type="number"
                value={newTherapist.celNumber}
                onChange={(e) => setNewTherapist({...newTherapist, celNumber: e.target.value})}
                fullWidth
              />
              <TextField
                label="Specialization"
                value={newTherapist.specialization}
                onChange={(e) => setNewTherapist({...newTherapist, specialization: e.target.value})}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddTherapistOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTherapist} variant="contained">Add Therapist</Button>
          </DialogActions>
        </Dialog>

        {/* Add Client Dialog */}
        <Dialog open={addClientOpen} onClose={() => setAddClientOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Client ID"
                type="number"
                value={newClient.clientId}
                onChange={(e) => setNewClient({...newClient, clientId: e.target.value})}
                fullWidth
              />
              <TextField
                label="First Name"
                value={newClient.firstName}
                onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={newClient.lastName}
                onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                fullWidth
              />
              <TextField
                label="Cell Number"
                type="number"
                value={newClient.celNumber}
                onChange={(e) => setNewClient({...newClient, celNumber: e.target.value})}
                fullWidth
              />
              <TextField
                label="Address"
                value={newClient.address}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddClientOpen(false)}>Cancel</Button>
            <Button onClick={handleAddClient} variant="contained">Add Client</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={manageStaffOpen} onClose={() => setManageStaffOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Manage Staff</DialogTitle>
          <DialogContent>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Therapists</Typography>
              <List>
                {therapists.map((therapist) => (
                  <ListItem key={therapist.therapistId || therapist.id}>
                    <ListItemText
                      primary={`${therapist.firstName} ${therapist.lastName}`}
                      secondary={`${therapist.email} | ${therapist.celNumber || therapist.phone || 'No phone'} | ${therapist.specialization || therapist.spacialization || 'No specialization'}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => confirmAndDeleteTherapist(therapist.therapistId || therapist.id)}
                      >
                        <Trash2 />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Clients</Typography>
              <List>
                {clients.map((client) => (
                  <ListItem key={client.clientId || client.id}>
                    <ListItemText
                      primary={`${client.firstName} ${client.lastName}`}
                      secondary={`${client.email} | ${client.celNumber || 'No phone'} | ${client.adress || client.address || 'No address'}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => confirmAndDeleteClient(client.clientId || client.id)}
                      >
                        <Trash2 />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setManageStaffOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <ConfirmDialog
          open={confirmDialogOpen}
          title="Confirm Deletion"
          message={confirmMessage}
          onConfirm={confirmAction}
          onCancel={() => setConfirmDialogOpen(false)}
        />

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