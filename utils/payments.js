import { v4 as uuidv4 } from "uuid";
export const getNewPayment = (r) => {
  console.log("in payments", r);
  //   creating new payment object.
  const id = uuidv4();
  console.log("id", id);
  const payment = {
    isPrivateDonation: r.isPrivateDonation,
    currency: r.currency,
    sum: r.sum,
    fee: r.fee,
    isRecurring: r.isRecurring,
    recurringCount: r.currentRecurringCount,
    isAnonymous: r.isAnonymous,
    reference_id: r.reference,
    isCompleteFee: r.isCompleteFee,
    paymentType: r.paymentType,
    campaign: r.campaign,
    recurring: r._id,
    reference_id: uuidv4(),
  };

  return payment;
};

export const createFuturePayments = (r) => {};
