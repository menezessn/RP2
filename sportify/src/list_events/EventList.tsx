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
  number_of_person: number;
  localization: string;
  description: string | null;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/api/event/get/all")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Erro ao buscar os eventos:", error));
  }, []);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Lista de Eventos
        </Typography>
        <Grid container spacing={2}>
          {currentItems.map((event, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {event.name}
                  </Typography>
                  <Typography variant="body2">
                    Tipo: {event.type}
                  </Typography>
                  <Typography variant="body2">
                    Horário: {event.time_event}
                  </Typography>
                  <Typography variant="body2">
                    Localização: {event.localization}
                  </Typography>
                  <Typography variant="body2">
                    Número de Pessoas: {event.number_of_person}
                  </Typography>
                  <Typography variant="body2">
                    Descrição: {event.description || "N/A"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
