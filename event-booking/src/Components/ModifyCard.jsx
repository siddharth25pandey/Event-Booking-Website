import React from 'react'
import { useHistory } from 'react-router';
import styles from './Styling/Card.module.css';

const ModifyCard = ({ banner_image_url, name , genre, id }) => {
    const history = useHistory();
    const handleChange = () => {
        history.push(`/modifyevents/${id}`)
    }
    return (
        <div onClick={handleChange} className={styles.card}> 
            <img src={banner_image_url} alt={name} />
            <div className={styles.title}>{ name }</div>
            <div className={styles.genre}>{genre?.map((genre, index)=>index === genre.length-1?genre.genre:genre.genre)}</div>
        </div>
    )
}
export default ModifyCard
