import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Styling/Venues.module.css";
import { handleAddingSeatingData, handleSelectNameTime} from "../../Redux/booking_details/actions";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import Seating from "../Seating";
import SummaryPage from "../../Pages/SummeryPage";

export const VenuesBody = ({ filters }) => {
  const venues_data = useSelector((state) => state.venues.venues_data);
  const date = useSelector((state) => state.booking_details.date);
  const data = useSelector((state) => state.booking_details);
  const dispatch = useDispatch();
  let filteredData = venues_data;
  const [seatingModalOpen, setSeatingModalOpen] = useState(false);
  const [foodModalOpen, setFoodModalOpen] = useState(false);
  const handleFilter = () => {
    if (filters.length) {
      filteredData = venues_data?.filter((item) => {
        return filters.indexOf(item.sub_region) >= 0;
      });
    }
  };
  handleFilter();
  React.useEffect(() => {
    window.scrollTo(window.scrollX, 0);
  }, [seatingModalOpen]);
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    if (hours < 10) hours = "0" + hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const time = formatAMPM(new Date());
  const amOrPm = time[time.length - 2] + time[time.length - 1];
  const currentTime = time.split(":").map(Number).shift();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setSeatingModalOpen(!seatingModalOpen);
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const handleClick = (name, time) => {
    dispatch(handleSelectNameTime(name, time));
    showModal();
  };
  const handleCloseSeatingModal = (seatingData) => {
    setSeatingModalOpen(false);
    setFoodModalOpen(true);
    dispatch(handleAddingSeatingData(seatingData));
  };
  const handleCloseFoodModal = () => {
    setFoodModalOpen(false);
  };
  const handleCloseSeatingButton = () => {
    setSeatingModalOpen(false);
  };
  return seatingModalOpen ? (
    <Seating
      handleCloseSeatingButton={handleCloseSeatingButton}
      seatingActive={seatingModalOpen}
      handleCloseSeatingModal={handleCloseSeatingModal}
    />
  ) : (
    <div className={styles.container}>
      <SummaryPage
        foodModalOpen={foodModalOpen}
        handleCloseFoodModal={handleCloseFoodModal}
      />
      <Modal
        title="Terms & Conditions"
        visible={visible}
        confirmLoading={confirmLoading}
        style={{ color: "black" }}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
            style={{ backgroundColor: "#F84464", border: "none" }}
          >
            Accept
          </Button>,
        ]}
      >
        <div className={styles.modalText}>
          <p>
            1. For your own safety, wearing face masks is compulsory for
            entering the event premises.
          </p>
          <p>2. Entry is allowed only for valid ticket holders.</p>
          <p>
            3. Tickets once purchased cannot be cancelled, exchanged or
            refunded.
          </p>
          <p>
            4. User agrees to be contacted by the G-20 management for the purpose
            of seeking feedback for service improvement.
          </p>
          <p>
            5. Decision(s) taken by the G-20 management shall be final and binding, Rights of
            admission reserved.
          </p>
        </div>
      </Modal>
      <div style={{ padding: "15px", background: "#16161D", borderRadius: "10px" }}>
        {filteredData?.map((venue) => (
          <div
            key={venue.id}
            className="rowA"
            style={{
              marginTop: "30px",
              backgroundColor: "#333338",
              padding: "10px",
              width: "80%",
              height: "150px",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "10px",
            }}
          >
            <div className="imagecard">
              <img
                src={venue.image}
                style={{
                  height: "100px",
                  width: "120px",
                  borderRadius: "10px",
                  flex: 1,
                  overflow: "hidden",
                }}
              />
            </div>
            <div className={styles.container__card}>
              <div className={styles.container__card__title}>
                <h4 style={{ color: "white" }}>{venue.name}</h4>
              </div>
              <div className={styles.container__card__info}>
                <div className={styles.container__card__info__times__container}>
                  <div>
                    {venue.timings?.map((time, index) => {
                      const showTime = time.time.split(":").map(Number).shift();
                      const showMinutes = +time.time
                        .split(":")[1]
                        .split(" ")
                        .shift();
                      return (
                        <div
                          onClick={() => handleClick(venue.name, time.time)}
                          style={
                            amOrPm === "AM" ||
                            (showTime === currentTime
                              ? showMinutes > new Date().getMinutes()
                                ? true
                                : false
                              : showTime > currentTime && showTime !== 12) ||
                            date > new Date().getDate()
                              ? { pointerEvents: "all" }
                              : {
                                  pointerEvents: "none",
                                  color: "white",
                                }
                          }
                          key={index + 1}
                          className={styles.button}
                        >
                          {time.time}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
