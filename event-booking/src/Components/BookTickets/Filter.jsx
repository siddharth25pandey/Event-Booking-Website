import React from "react";
import { Calendar } from "./Calendar";
import { DropDowns } from "./DropDowns";

export const Filter = ({ handleFilters, filters }) => {
  return (
    <div
      style={{
        backgroundColor: "#16161D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 7.5%",
        color: "white",
      }}
    >
      <Calendar />
      <DropDowns handleFilters={handleFilters} filters={filters} />
    </div>
  );
};
