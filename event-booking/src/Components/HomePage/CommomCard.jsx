import React from 'react'
import styles from '../Styling/Card.module.css';
import { useHistory } from 'react-router';

export const CommonCard = ({ banner_image_url, name, location , id }) => {
    const history = useHistory();
    const handleChange = () => {
        history.push(`/events/${id}`)
    }    
    return ( 
        <div onClick={handleChange} className={styles.card}>
            <img src={banner_image_url} alt={name} />
            <div className={styles.title}>{name}</div>
            <div className={styles.genre}>{location}</div>
        </div>
    )
}
