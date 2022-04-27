import React from "react";
import { useSelector } from "react-redux";
import { EventCarousel } from "./HomePage/EventCarousel";
import styles from "./Styling/RecommendedEvents.module.css";
import userdata from '../database/db.json';

export const BookedEvents = () => {
    const events_data = useSelector(state => state.app.events_data);
    const user_events = userdata.users.filter(ele => ele.id == 1)[0].booked_events;
    const filteredBookedEvents = events_data.filter(event => (
        user_events.includes(event.id)
    ))
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Booked Events</h1>
            </div>
            <EventCarousel events={filteredBookedEvents} />
        </div>
    )
}