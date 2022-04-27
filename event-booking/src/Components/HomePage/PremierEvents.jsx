import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EventCarousel } from "./EventCarousel";
import styles from "../Styling/RecommendedEvents.module.css";
import { getEvents, getPopularEvents } from "../../Redux/app/actions";

export const PremierEvents = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
        dispatch(getPopularEvents());
      }, []);
    const events_data = useSelector(state => state.app.events_data);
    const filteredPremierEvents = events_data.filter(moive => (
        moive.is_premier
    ))
    console.log(events_data);
    const premierEventContainerStyle = `${styles.parent} ${styles.premier__container}`
    return (
        <div className={premierEventContainerStyle} >
            <div className={styles.parent__text} >
                <h1 style={{ color: "white" }}>Premium Events</h1>
            </div>
            <span style={{ color: "white", marginLeft: "11%" }}>Exclusive Events!</span>
            <EventCarousel events={filteredPremierEvents} />
        </div>
    )
}