import React from "react";
import styles from "../Styling/PaymentsPage.module.css";

const FirstSection = ({ handlePayment }) => {
  return (
    <div>
      <div className={styles.contact}>
        <div>Payment options</div>
        <div className={styles.StoredCard}>
          <div className={styles.sidebar}>
            <div style={{ background: "#383838", color: "white" }}>
              Quick pay
            </div>
            <div
              style={{
                background: "#f84464",
                borderRadius: "0px 50px 50px 0px",
                color: "white",
              }}
            >
              Credit / Debit card
            </div>
            <div style={{ background: "#383838", color: "white" }}>
              Net Banking
            </div>
            <div style={{ background: "#383838", color: "white" }}>
              Mobile wallet
            </div>
            <div style={{ background: "#383838", color: "white" }}>
              Gift Voucher
            </div>
            <div style={{ background: "#383838", color: "white" }}>UPI</div>
            <div style={{ background: "#383838", color: "white" }}>
              Redeem Points
            </div>
            <div style={{ background: "#383838", color: "white" }}>
              Credit Voucher
            </div>
          </div>
          <div className={styles.cardDetails} style={{ background: "#383838" }}>
            <span style={{ color: "white" }}>Enter your card details</span>
            <div className={styles.sampleCard}>
              <div style={{ fontSize: "13px", color: "gray" }}>Card Number</div>
              <input
                type="text"
                placeholder="Enter Your Card Number"
                value="4568 6749 7864 6543"
              />
              <input
                type="text"
                placeholder="Name on the card"
                value="Group 20"
              />
              <div className={styles.otherDetails}>
                <div>
                  <div style={{ fontSize: "13px", color: "gray" }}>Expiry</div>
                  <div style={{ display: "flex" }}>
                    <input type="text" placeholder="MM" value="06" />
                    <input type="text" placeholder="YY" value="23" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "13px", color: "gray" }}>CVV</div>
                  <div>
                    <input
                      style={{ width: "50px" }}
                      type="text"
                      placeholder="CVV"
                      value="933"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.payment}>
              <button onClick={handlePayment}>Make Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;

// ```
// npm install redux react-redux redux-thunk axios react-router-dom material-ui/@core @material-ui/icons @material-ui/lab antd react-multi-carousel
// ```
