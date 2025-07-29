// import React, { useState, useEffect } from "react";
// import Layout from '../components/Layout';
// import LoadingSpinner from '../components/LoadingSpinner';
// import Notification from '../components/Notification';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import { Calendar, CheckCircle, Plus, Clock, AlertTriangle } from "lucide-react";

// function getLoggedInUser() {
//   return {
//     clientId: localStorage.getItem('userId'),
//     firstName: localStorage.getItem('firstName'),
//     lastName: localStorage.getItem('lastName'),
//     userType: localStorage.getItem('userType')
//   };
// }

// export default function ClientDashboard() {
//   const [user, setUser] = useState(null);
//   const [upcomingSessions, setUpcomingSessions] = useState([]);
//   const [recentSessions, setRecentSessions] = useState([]);
//   const [paymentStatus, setPaymentStatus] = useState({ balance: 0 });
//   const [isLoading, setIsLoading] = useState(true);
//   const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
//   const [therapists, setTherapists] = useState([]);
//   const [selectedTherapist, setSelectedTherapist] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

//   useEffect(() => {
//     const { clientId, firstName, lastName } = getLoggedInUser();
    
//     if (clientId && firstName && lastName) {
//       setUser({
//         UserId: clientId,
//         FirstName: firstName,
//         LastName: lastName
//       });
//       fetchClientData(clientId);
//     }

//     const timer = setTimeout(() => setIsLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const fetchClientData = async (clientId) => {
//     try {
//       // Fetch upcoming sessions - placeholder for now
//       setUpcomingSessions([]);
//       setRecentSessions([]);
//       setPaymentStatus({ balance: 0 });
//     } catch (err) {
//       console.error('Error fetching client data:', err);
//     }
//   };

//   const fetchTherapists = async () => {
//     try {
//       const res = await fetch('https://localhost:7152/api/Manager/GetTherapists');
//       if (res.ok) {
//         const therapistsData = await res.json();
//         setTherapists(therapistsData);
//       }
//     } catch (err) {
//       console.error('Error fetching therapists:', err);
//     }
//   };

//   const handleBookSession = async () => {
//     if (!selectedTherapist || !selectedDate || !selectedTime) {
//       setNotification({
//         open: true,
//         message: 'Please fill in all fields',
//         severity: 'warning'
//       });
//       return;
//     }

//     try {
//       const bookingData = {
//         ClientId: parseInt(user.UserId),
//         TherapistId: parseInt(selectedTherapist),
//         Date: selectedDate,
//         Time: selectedTime,
//         Status: 'Scheduled'
//       };

//       const res = await fetch('https://localhost:7152/api/Client/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData)
//       });

//       if (res.ok) {
//         setNotification({
//           open: true,
//           message: 'Session booked successfully!',
//           severity: 'success'
//         });
//         setBookingDialogOpen(false);
//         setSelectedTherapist('');
//         setSelectedDate('');
//         setSelectedTime('');
//         // Refresh the sessions
//         fetchClientData(user.UserId);
//       } else {
//         throw new Error('Failed to book session');
//       }
//     } catch (err) {
//       setNotification({
//         open: true,
//         message: 'Failed to book session. Please try again.',
//         severity: 'error'
//       });
//     }
//   };

//   const openBookingDialog = () => {
//     fetchTherapists();
//     setBookingDialogOpen(true);
//   };

//   if (isLoading) {
//     return <LoadingSpinner message="Loading your dashboard..." />;
//   }

//   if (!user) {
//     return (
//       <Layout currentPageName="ClientDashboard">
//         <Box sx={{ 
//           minHeight: 'calc(100vh - 120px)',
//           background: 'linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)',
//           borderRadius: 2,
//           p: 3,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
//             <AlertTriangle size={48} color="#f57c00" style={{ marginBottom: 16 }} />
//             <Typography variant="h6">Unable to load your account.</Typography>
//           </Paper>
//         </Box>
//       </Layout>
//     );
//   }

//   return (
//     <Layout currentPageName="ClientDashboard">
//       <Box sx={{ 
//         minHeight: 'calc(100vh - 120px)',
//         background: 'linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)',
//         borderRadius: 2,
//         p: 3
//       }}>
//         {/* Welcome Header */}
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             p: 3, 
//             mb: 3, 
//             background: 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',
//             borderRadius: 3
//           }}
//         >
//           <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1b5e20', mb: 1 }}>
//             Welcome, {user.FirstName} {user.LastName}
//           </Typography>
//           <Typography variant="h6" sx={{ color: '#2e7d32', opacity: 0.8 }}>
//             Your journey to wellness continues here
//           </Typography>
//         </Paper>

//         {/* Quick Stats */}
//         <Grid container spacing={3} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card 
//               elevation={3} 
//               sx={{ 
//                 background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
//                 borderRadius: 3,
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-4px)' }
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 3 }}>
//                 <Calendar size={48} color="#1565c0" style={{ marginBottom: 16 }} />
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565c0', mb: 1 }}>
//                   Upcoming Sessions
//                 </Typography>
//                 <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
//                   {upcomingSessions.length}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={4}>
//             <Card 
//               elevation={3} 
//               sx={{ 
//                 background: 'linear-gradient(135deg, #c8e6c9 0%, #e8f5e8 100%)',
//                 borderRadius: 3,
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-4px)' }
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 3 }}>
//                 <CheckCircle size={48} color="#388e3c" style={{ marginBottom: 16 }} />
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 1 }}>
//                   Sessions Completed
//                 </Typography>
//                 <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
//                   {recentSessions.length}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={4}>
//             <Card 
//               elevation={3} 
//               sx={{ 
//                 background: 'linear-gradient(135deg, #f8bbd9 0%, #fce4ec 100%)',
//                 borderRadius: 3,
//                 cursor: 'pointer',
//                 transition: 'transform 0.2s',
//                 '&:hover': { transform: 'translateY(-4px)' },
//                 border: '2px solid #e91e63'
//               }}
//               onClick={openBookingDialog}
//             >
//               <CardContent sx={{ textAlign: 'center', p: 3 }}>
//                 <Plus size={48} color="#c2185b" style={{ marginBottom: 16 }} />
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#c2185b', mb: 1 }}>
//                   Book New Session
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: '#ad1457', fontWeight: 'bold' }}>
//                   Click to schedule
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Upcoming Sessions */}
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             borderRadius: 3,
//             background: 'rgba(255, 248, 253, 0.8)',
//             backdropFilter: 'blur(10px)',
//             mb: 3
//           }}
//         >
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4a148c', mb: 3 }}>
//               Upcoming Sessions
//             </Typography>
//             {upcomingSessions.length > 0 ? (
//               <Box>
//                 {upcomingSessions.map((session, index) => (
//                   <Paper 
//                     key={session.AppointmentId || session.Id || index} 
//                     elevation={2}
//                     sx={{ 
//                       p: 2, 
//                       mb: 2, 
//                       borderRadius: 2,
//                       background: 'linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%)',
//                       border: '1px solid #e1bee7'
//                     }}
//                   >
//                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                       <Box>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4a148c' }}>
//                           {session.TherapistName || 'Dr. Smith'}
//                         </Typography>
//                         <Typography variant="body1" sx={{ color: '#6a1b9a' }}>
//                           {session.Date ? new Date(session.Date).toLocaleDateString() : 'Date TBD'}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: '#8e24aa' }}>
//                           {session.Time || 'Time TBD'}
//                         </Typography>
//                       </Box>
//                       <Chip 
//                         label={session.Status || 'Scheduled'} 
//                         color="primary"
//                         sx={{ fontWeight: 'bold' }}
//                       />
//                     </Box>
//                   </Paper>
//                 ))}
//               </Box>
//             ) : (
//               <Paper 
//                 elevation={1}
//                 sx={{ 
//                   p: 4, 
//                   textAlign: 'center', 
//                   background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
//                   borderRadius: 2
//                 }}
//               >
//                 <Calendar size={48} color="#f57c00" style={{ marginBottom: 16 }} />
//                 <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 'bold' }}>
//                   No upcoming sessions
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: '#f57c00', mt: 1 }}>
//                   Book your first session to get started!
//                 </Typography>
//               </Paper>
//             )}
//           </Box>
//         </Paper>

//         {/* Book Session Dialog */}
//         <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ 
//             background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
//             color: '#4a148c',
//             fontWeight: 'bold'
//           }}>
//             Book New Session
//           </DialogTitle>
//           <DialogContent sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)', pt: 3 }}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Select Therapist</InputLabel>
//               <Select
//                 value={selectedTherapist}
//                 label="Select Therapist"
//                 onChange={(e) => setSelectedTherapist(e.target.value)}
//               >
//                 {therapists.map((therapist) => (
//                   <MenuItem key={therapist.UserId} value={therapist.UserId}>
//                     {therapist.FirstName} {therapist.LastName} - {therapist.Specialization}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
            
//             <TextField
//               fullWidth
//               type="date"
//               label="Select Date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               sx={{ mb: 2 }}
//             />
            
//             <TextField
//               fullWidth
//               type="time"
//               label="Select Time"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//             />
//           </DialogContent>
//           <DialogActions sx={{ background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)' }}>
//             <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
//             <Button 
//               onClick={handleBookSession}
//               variant="contained"
//               sx={{
//                 background: 'linear-gradient(135deg, #e1bee7 0%, #f8bbd9 100%)',
//                 color: '#4a148c',
//                 fontWeight: 'bold'
//               }}
//             >
//               Book Session
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Notification 
//           open={notification.open}
//           message={notification.message}
//           severity={notification.severity}
//           onClose={() => setNotification({ ...notification, open: false })}
//         />
//       </Box>
//     </Layout>
//   );
// }
