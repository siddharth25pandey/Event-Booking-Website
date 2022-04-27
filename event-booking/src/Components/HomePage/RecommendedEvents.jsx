import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventCarousel } from "./EventCarousel";
import styles from "../Styling/RecommendedEvents.module.css";
import { getEvents, getPopularEvents } from "../../Redux/app/actions";
import db from "../../database/db.json"

export const RecommendedEvents = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
        dispatch(getPopularEvents());
      }, []);
    // const events_data = db.events;
    const events_data = useSelector(state => state.app.events_data);
    // const events_data = useSelector((state) => state.data.events.data);
    const filteredRecommendedEvents = events_data.filter(moive => (
        !moive.is_premier
    ))
    console.log(events_data);
    return (
        <div className={styles.parent}>
            <div className={styles.parent__text}>
                <h1>Recommended Events</h1>
            </div>
            <EventCarousel events={filteredRecommendedEvents} />
        </div>
    )
}