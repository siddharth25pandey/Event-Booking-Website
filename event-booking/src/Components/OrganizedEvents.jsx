import React from "react";
import { useSelector } from "react-redux";
import { EventCarousel } from "./HomePage/EventCarousel";
import { ModifyCarousel } from "./HomePage/ModifyCarousel";
import styles from "./Styling/RecommendedEvents.module.css";
import userdata from '../database/db.json';

export const OrganizedEvents = () => {
    const events_data = useSelector(state => state.app.events_data);
    const user_events = userdata.organizers.filter(ele => ele.id == 1)[0].organized_events;


    const filteredPastEvents = events_data.filter(event => (
        user_events.includes(event.id) && !event.is_premier
    ))
    const filteredUpcomingEvents = events_data.filter(event => (
        user_events.includes(event.id) && event.is_premier
    ))
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Upcoming Events</h1>
                </div>
                <EventCarousel events={filteredUpcomingEvents} />
            </div>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Past Events</h1>
                </div>
                <EventCarousel events={filteredPastEvents} />
            </div>
            <div className={styles.parent}>
                <div className={styles.parent__text}>
                    <h1>Modify Events</h1>
                </div>
                <ModifyCarousel events={events_data} />
            </div>
        </>
    )
}