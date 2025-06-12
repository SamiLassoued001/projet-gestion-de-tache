import AppLayout from './AppLayout'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

export default function MeetingListPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/meetings')
      .then(res => {
        setMeetings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement des réunions :', err);
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
    <Container maxWidth="100%" sx={{ mt: 6 }}>
      <Card elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
            <EventIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
            <Typography variant="h4" component="h1" color="primary">
              Liste des Réunions
            </Typography>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : meetings.length === 0 ? (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              Aucune réunion trouvée.
            </Alert>
          ) : (
            <TableContainer component={Paper} elevation={1}>
              <Table>
                <TableHead sx={{ backgroundColor: '#f0f4f8' }}>
                  <TableRow>
                    <TableCell><strong>#</strong></TableCell>
                    <TableCell><strong>Titre</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Heure</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meetings.map((meeting, index) => (
                    <TableRow key={meeting._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{meeting.title}</TableCell>
                      <TableCell>{new Date(meeting.date).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{meeting.hour}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
    </AppLayout>
  );
}
