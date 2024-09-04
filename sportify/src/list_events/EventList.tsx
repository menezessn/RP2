import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

interface Event {
  name: string;
  type: string;
  time_event: string;
  number_of_person:number
  localization: string;
  description: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://66d6f9b6006bfbe2e64f53b6.mockapi.io/api/test/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Erro ao buscar os eventos:", error));
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            fontFamily: 'Roboto, sans-serif', 
            color: '#6a27a1' ,
            fontWeight: "bold"
          }}
        >
          Atividades
        </Typography>
        <Grid container spacing={2}>
          {currentItems.map((event, index) => {
            

              const eventDate = new Date(event.time_event);

              const date = eventDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              const time = eventDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              });

            return(

            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="#6a27a1">
                    {event.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tipo:</strong> {event.type}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Data:</strong> {date}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Horário:</strong> {time}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Localização:</strong> {event.localization}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Número de Pessoas:</strong> {event.number_of_person}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Descrição:</strong> {event.description || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            );
})}
        </Grid>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={Math.ceil(events.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default EventList;
