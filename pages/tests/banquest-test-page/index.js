import React, { useEffect } from "react";
import axios from "axios";
import api from "../../../apis/PaymentsAPIS/banquestAPI";

const index = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, []);

  return <div>Hello</div>;
};

export default index;

const card = {
  amount: 3.01,
  expiry_month: 12,
  expiry_year: 2022,
  cvv2: "123",
  card: "4111111111111111",
  capture: true,
  save_card: false,
};

export async function getServerSideProps({ query }) {
  let data = null;
  try {
    const json = JSON.stringify(card);
    const test = await api.post("/charge/", json);
    const { data } = test;
    console.log("data2", data);
  } catch (error) {
    console.log("error", error);
    data = error;
  }

  return {
    props: {
      data: "sad",
    }, // will be passed to the page component as props
  };
}
