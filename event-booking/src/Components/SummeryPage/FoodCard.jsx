import React from "react";
import styles from "../Styling/Food.module.css";

const FoodCard = ({food_image, food_name, food_tag, food_price, _id, handleCount, count,}) => {
  return (
    <div className={styles.card}>
      <div className={styles.price}>
        <i class="fas fa-rupee-sign"></i>
        <div>{food_price}</div>
      </div>

      <img src={food_image} alt="" style={{ borderRadius: "10px" }} />

      <div className={styles.details}>
        <div className={styles.title}>
          <div style={{ color: "White" }}>{food_name}</div>
          <div style={{ color: "White" }}>{food_tag}</div>
        </div>
        <div className={styles.btn}>
          <div>
            <div className={styles.veg}>
              <i class="fas fa-circle"></i>
            </div>
          </div>
          <div>
            {count === 0 ? (
              <span onClick={() => handleCount(_id, +1)}>ADD</span>
            ) : (
              <div className={styles.counter}>
                <div onClick={() => handleCount(_id, -1)}>
                  <i class="fas fa-minus-circle"></i>
                </div>
                <div>{count}</div>
                <div onClick={() => handleCount(_id, +1)}>
                  <i class="fas fa-plus-circle"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
