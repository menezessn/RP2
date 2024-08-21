import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Interface para o tipo de evento
interface Event {
    name: string;
    type: string;
    time_event: string;
    number_of_person: number;
    localization: string;
    description: string | null;
}

const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    color: #333;
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
`;

const EventListElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const EventCard = styled.div`
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const EventName = styled.h2`
    font-size: 18px;
    color: #007BFF;
`;

const EventDetail = styled.p`
    margin: 0;
    font-size: 14px;
    color: #555;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const PageButton = styled.button`
    padding: 10px 15px;
    border-radius: 4px;
    border: none;
    background-color: #007BFF;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

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

    // Função para lidar com a paginação
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <Container>
    <Title>Lista de Eventos</Title>
    <EventListElement>
        {currentItems.map((event, index) => (
        <EventCard key={index}>
            <EventName>{event.name}</EventName>
            <EventDetail>Tipo: {event.type}</EventDetail>
            <EventDetail>Horário: {event.time_event}</EventDetail>
            <EventDetail>Localização: {event.localization}</EventDetail>
            <EventDetail>Número de Pessoas: {event.number_of_person}</EventDetail>
            <EventDetail>Descrição: {event.description || 'N/A'}</EventDetail>
        </EventCard>
        ))}
    </EventListElement>
    <Pagination>
        <PageButton onClick={prevPage} disabled={currentPage === 1}>
        Anterior
        </PageButton>
        <PageButton
        onClick={nextPage}
        disabled={indexOfLastItem >= events.length}
        >
        Próxima
        </PageButton>
    </Pagination>
    </Container>
    );
};

export default EventList;
