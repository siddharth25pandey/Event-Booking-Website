import React, { useEffect } from "react";
import { BsClockHistory, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "../Styling/Venues.module.css";
import { handleAddEventName } from "../../Redux/booking_details/actions";

export const Header = () => {
    const data_temp = useSelector((state) => state.data);
    const event = useSelector(state => state.data.events).data;
    const isLoading = useSelector(state => state.data.isLoading);
    const isError = useSelector(state => state.data.isError);
    const dispatch = useDispatch();
    useEffect(() => {
        if (event) {
            dispatch(handleAddEventName(event.name, event.grade, event.banner_image_url))
        }
    }, [event])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return event === undefined ? <div>Loading...</div> : isLoading ? <div>Loading...</div> : isError ? <div>Something wrong happened</div> : (
        <div className={styles.header__container}>
            <div className={styles.header_container__info}>
                <h1>{event.name}</h1>
                <div>
                    <div className={styles.header_container__info__grade}> {event.grade}</div>
                    <div className={styles.header_container__info__rating}>
                        <div>  <BsHeartFill style={{ color: "red", marginRight: 5 }} /> <span> {event.rating.percentage}%  </span> </div>
                        <span> {event.rating.no_of_ratings}k VOTES</span>
                    </div>
                    <div className={styles.header_container__info__genre}>
                        {
                            event.genre?.map((genreItem, index) => (
                                <div key={genreItem.genre + index}>
                                    {genreItem.genre}
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.header_container__info__date}> {event.release_date}</div>
                    <div className={styles.header_container__info__duration}>
                        <BsClockHistory style={{ marginRight: 5 }} />
                        {event.duration}
                    </div>
                </div>
            </div>
            <div className={styles.header__container__crew}>
                <h4>Cast & Crew</h4>
                <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]}>
                    {
                        event.cast?.map((person, index) => (
                            <div key={index + 1} className={styles.header__container__crew__item}>
                                <img src={person.cast_image} alt={person.original_name} /><br />
                                <span>{person.original_name}</span>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    )
}