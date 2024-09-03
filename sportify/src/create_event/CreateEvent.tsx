import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; 
dayjs.extend(utc); 

type FormData = {
  date: string;
  description: string;
  localization: string;
  time: string;
  name: string;
  type: string;
  number_of_person:number
};

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    date: '',
    description: '',
    localization: '',
    time: '',
    name: '',
    type: '',
    number_of_person: 1,
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

    const combinedTimestamp = dayjs.utc(`${formData.date} ${formData.time}`).toISOString();
    const payload = {
      name: formData.name,
      type: formData.type,
      time_event: combinedTimestamp,
      number_of_person: formData.number_of_person,
      localization: formData.localization,
      description: formData.description
    }
    try {
      const response = await fetch('/api/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Evento criado com sucesso!');
        //resetar forms
        setFormData({
          date: '',
          description: '',
          localization: '',
          time: '',
          name: '',
          type: '',
          number_of_person: 1,
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
      <Typography variant="h4" gutterBottom color={"#6a27a1"} align='center'>
        Novo Evento
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Título"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Tipo"
          name="type"
          value={formData.type}
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
          name="localization"
          value={formData.localization}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Número de pessoas"
          name="number_of_person" 
          type="number" 
          value={formData.number_of_person} 
          onChange={handleChange} 
          margin="normal"
          required
          inputProps={{
            step: 1, 
            min: 1, 
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={formData.date ? dayjs(formData.date) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true
              }
            }}
          />
          <TimePicker
            label="Hora"
            value={formData.time ? dayjs.utc(`${formData.time}`) : null}
            onChange={handleTimeChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
                required: true
              }
            }}
            ampm={false}
          />
        </LocalizationProvider>
        <Button variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ 
            mt: 2, 
            backgroundColor: '#6a27a1', 
            color: '#ffffff',  
            '&:hover': {
              backgroundColor: '#4d137c', 
              color: '#ffffff',
            },
            marginBottom:5
          }}
          >
          Criar Evento
        </Button>
      </form>
    </Box>
  );
};

export default EventForm;
