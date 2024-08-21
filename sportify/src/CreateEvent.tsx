import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type FormData = {
  date: string;
  description: string;
  location: string;
  time: string;
  title: string;
};

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    description: '',
    location: '',
    time: '',
    title: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.format('YYYY-MM-DD') : '',
    }));
  };

  const handleTimeChange = (time: any) => {
    setFormData((prev) => ({
      ...prev,
      time: time ? time.format('HH:mm') : '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Evento criado com sucesso!');
        // Resetar o formulário
        setFormData({
          date: '',
          description: '',
          location: '',
          time: '',
          title: '',
        });
      } else {
        alert('Erro ao criar o evento.');
      }
    } catch (error) {
      alert('Erro na requisição.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Criar Evento
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Localização"
          name="location"
          value={formData.location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={formData.date ? new Date(formData.date) : null}
            onChange={handleDateChange}
            //renderInput={(params) => <TextField fullWidth margin="normal" required {...params} />}
          />
          <TimePicker
            label="Hora"
            value={formData.time ? new Date(`1970-01-01T${formData.time}:00`) : null}
            onChange={handleTimeChange}
            //renderInput={(params) => <TextField fullWidth margin="normal" required {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Criar Evento
        </Button>
      </form>
    </Box>
  );
};

export default EventForm;
