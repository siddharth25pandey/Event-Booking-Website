import React from "react";
import { useSelector } from "react-redux";
import styles from "../Styling/PaymentsPage.module.css";

const SecondSection = () => {
  const booking_details = useSelector((state) => state.booking_details);
  return (
    <div>
      <div className={styles.summeryPart}>
        <div>Booking Summary</div>
        <div className={styles.categories}>
          <div style={{ textTransform: "uppercase" }}>
            {booking_details.venues_name}
          </div>
          <div>
            {booking_details.silver.length + booking_details.platinium.length}{" "}
            Ticket(s)
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.categories}>
          <div>Sub total</div>
          <div>Rs. {booking_details.total_price}</div>
        </div>
        <div className={styles.total}>
          <div>Amount Payable</div>
          <div>Rs. {booking_details.total_price}</div>
        </div>
        <div className={styles.cancellation_policy}>
          You cannot cancel the tickets for the show. No refunds will be done according to <a href="">Cancellation Policy</a>
        </div>
      </div>
    </div>
  );
};
export default SecondSection;
