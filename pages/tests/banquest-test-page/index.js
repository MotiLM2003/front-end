import React, { useEffect } from "react";
import axios from "axios";
import api from "../../../apis/PaymentsAPIS/banquestAPI";

const index = () => {
  useEffect(() => {}, []);

  return <div>Hello</div>;
};

export default index;

// export async function getServerSideProps({ query }) {
//   try {
//     const test = await api.post("/charge/", {});
//   } catch (error) {
//     console.log("error", error);
//   }

//   return {
//     props: {
//       data: "dasd",
//     }, // will be passed to the page component as props
//   };
// }
