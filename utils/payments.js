import { v4 as uuidv4 } from "uuid";
import { donationOptions } from "../utils/donations";
import moment from "moment";

import { initialPayment } from "../json-data/initialPayment";

export const getNewPayment = (r) => {
  //   creating new payment object.
  const id = uuidv4();

  const payment = {
    isPrivateDonation: r.isPrivateDonation,
    currency: r.currency,
    sum: r.sum,
    fee: r.fee,
    isRecurring: r.isRecurring,
    recurringCount: r.currentRecurringCount,
    isAnonymous: r.isAnonymous,
    createdDate: Date.now(),
    reference_id: r.reference,
    isCompleteFee: r.isCompleteFee,
    status: 0,
    paymentType: r.paymentType,
    campaign: r.campaign,
    recurring: r._id,
    reference_id: uuidv4(),
    isAdmin: false,
  };

  return payment;
};

export const getLastRoundPayment = (list) => {
  const newList = list.sort(compare);
  const last = newList[list.length - 1];
  console.log("last", last);
  return last;
};

function compare(a, b) {
  if (a.recurringCount < b.recurringCount) {
    return -1;
  }
  if (a.recurringCount > b.recurringCount) {
    return 1;
  }
  return 0;
}

export const createFuturePayments = (r) => {
  const futurePayments = [...Array(10).keys()].map((item, index) => ({
    isPrivateDonation: r.isPrivateDonation,
    currency: 0,
    sum: r.sum,
    fee: r.fee,
    isRecurring: r.isRecurring,
    createdDate: "test",
    recurringCount: r.currentRecurringCount,
    isAnonymous: r.isAnonymous,
    isCompleteFee: r.isCompleteFee,
    paymentType: r.paymentType,
    status: 3,
    campaign: r.campaign,
    recurring: r._id,
    reference_id: uuidv4(),
    createdAt: Date.now(),
    isAdmin: false,
  }));

  return futurePayments;
};

export const paymentStatus = {
  0: { text: "Success" },
  3: { text: "Uncompleted" },
};
