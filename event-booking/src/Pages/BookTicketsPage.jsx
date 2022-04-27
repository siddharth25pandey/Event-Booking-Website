import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVenues } from "../Redux/venues/action";
import { VenuesBody } from "../Components/BookTickets/VenuesBody";

import { useParams } from "react-router";
import { Header } from "../Components/BookTickets/Header";
import { getEvents } from "../Redux/data/actions";
import { Filter } from "../Components/BookTickets/Filter";

export const BookTicketsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [filters, setFilters] = useState([]);
  const [count, setCount] = useState(0);
  const name = useSelector((state) => state.booking_details);
  useEffect(() => {
    dispatch(getVenues());
    dispatch(getEvents(id));
  }, []);
  const handleFilters = (item) => {
    const newData = filters;
    if (filters.indexOf(item) >= 0) {
      newData.splice(filters.indexOf(item), 1);
      setFilters(newData);
    } else {
      newData.push(item);
      setFilters(newData);
    }
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
  }, [count]);
  return (
    <div style={{ paddingBottom: 20 }}>
      <Header />
      <Filter handleFilters={handleFilters} filters={filters} />
      <VenuesBody filters={filters} />
    </div>
  );
};
