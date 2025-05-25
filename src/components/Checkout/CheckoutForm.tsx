import styles from "./CheckoutForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePersonContext } from "@/contexts/PersonContext";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import checkoutFormSchema from "./validationSchemas";
import FormButton from "@/components/common/Button/FormButton";
import Form from "../common/Form/Form";
import InputForm from "@/components/common/Form/InputForm";
import InputRadio from "../common/Form/InputRadio";
import {
  BillingInformation,
  Order,
  OrderItem,
  PaymentOption,
} from "@/types/entities";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import {
  postOrder,
  getOrderItems,
  confirmPayment,
} from "@/services/orderService";
import toast from "react-hot-toast";
import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal/CheckoutModal";
import useRequireAuth from "@/hooks/useRequireAuth";
import { ModalProvider } from "@/contexts/ModalContext";
import useEmptyCartRedirect from "@/hooks/useEmptyCartRedirect";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import InformationIcon from "../common/InformationIcon/InformationIcon";

type FormData = {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentOption: string;
};

const CheckoutForm = () => {
  const { data: session } = useSession();
  const { user } = useUserContext();
  const { person } = usePersonContext();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  let [order, setOrder] = useState<Order | null>(null);
  const [paymentOption, setPaymentOption] = useState<string>(
    PaymentOption.ON_DELIVERY
  );
  const router = useRouter();
  useRequireAuth();
  useEmptyCartRedirect();
  const stripe = useStripe();
  const elements = useElements();

  if (!person) {
    return <></>;
  }

  const defaultValues = {
    firstName: person.firstName || "",
    lastName: person.lastName || "",
    email: person.user?.username || "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentOption: PaymentOption.ON_DELIVERY,
  };

  const resolver = yupResolver(checkoutFormSchema);

  if (!session || !user || !orderItems) {
    return null;
  }

  const handlePaymentOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentOption(event.target.value);
  };

  const onSubmit = async (formData: FormData) => {
    if (!stripe || !elements) {
      throw new Error("Stripe has not loaded yet.");
    }
    const billingInfo: BillingInformation = {
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      zipCode: formData.zipCode,
      city: formData.city,
      country: formData.country,
      paymentOption: PaymentOption.ON_DELIVERY,
    };
    if (paymentOption === PaymentOption.ONLINE_PAYMENT) {
      billingInfo.paymentOption = PaymentOption.ONLINE_PAYMENT;
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        return;
      }
      // @ts-ignore
      const cardElementComplete = cardElement._complete;
      if (!cardElementComplete) {
        toast.error("Please complete your credit card details.");
        return;
      }
    }
    try {
      const orderResponse = await postOrder(
        session.accessToken!,
        user.id,
        billingInfo
      );
      const orderItemsResponse = await getOrderItems(
        session.accessToken!,
        user.id,
        orderResponse.id
      );
      setOrderItems(orderItemsResponse);
      setOrder(orderResponse);

      if (paymentOption === PaymentOption.ONLINE_PAYMENT) {
        const { error } = await stripe.confirmCardPayment(
          orderResponse.stripeClientSecret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
            },
          }
        );

        if (error) {
          console.error("Payment failed:", error);
          toast.error("Payment failed. Please try again.");
          return;
        }
        console.log(orderResponse);
        const confirmPaymentResponse = await confirmPayment(orderResponse);
        toast.success("Payment and Order completed successfully.");
      } else {
        toast.success("Order completed successfully.");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      if (typeof error === "object" && error !== null && "response" in error) {
        const status = (error as { response: { status: number } }).response
          .status;
        if (status === 406) {
          toast.error(
            "The address must be valid and located within Cluj-Napoca."
          );
        } else if (status == 400) {
          toast.error("An error occurred. Is the cart empty?");
          router.push("/");
        } else if (status == 410) {
          toast.error(
            "Cart contains disabled products. They have been removed from your cart."
          );
          router.push("/");
        } else {
          toast.error("An error occurred.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Form
        className={styles.checkoutFormWrapper}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={resolver}
      >
        <div className={styles.checkoutBanner}>
          <h1>Checkout</h1>
          <div className={styles.checkoutCategory}>
            <div className={styles.checkoutCategoryText}>
              <h3>Billing details</h3>
            </div>
            <div className={styles.checkoutCategoryContent}>
              <InputForm
                name="firstName"
                placeholder="First Name"
                type="text"
                label="First Name"
                readOnly={true}
              />
              <InputForm
                name="lastName"
                placeholder="Last Name"
                type="text"
                label="Last Name"
                readOnly={true}
              />
              <InputForm
                name="email"
                placeholder="Email"
                type="email"
                label="Email"
                readOnly={true}
              />
              <InputForm
                name="phoneNumber"
                placeholder="Phone Number"
                type="text"
                label="Phone Number"
              />
            </div>
          </div>

          <div className={styles.checkoutCategory}>
            <div className={styles.checkoutCategoryText}>
              <h3>SHIPPING INFO</h3>
            </div>
            <div className={styles.checkoutCategoryContent}>
              <InputForm
                name="address"
                placeholder="Address"
                type="text"
                label="Address"
              />
              <InputForm
                name="zipCode"
                placeholder="Zip Code"
                type="text"
                label="Zip Code"
              />
              <InputForm
                name="city"
                placeholder="City"
                type="text"
                label="City"
              />
              <InputForm
                name="country"
                placeholder="Country"
                type="text"
                label="Country"
              />
            </div>
          </div>

          <div className={styles.checkoutCategory}>
            <div className={styles.checkoutCategoryText}>
              <h3>Payment Details</h3>
            </div>
            <InputRadio
              options={{
                ONLINE_PAYMENT: "Online Payment",
                ON_DELIVERY: "On delivery",
              }}
              name="paymentOption"
              label="Payment Option"
              onChange={handlePaymentOptionChange}
            />
          </div>

          <div className={styles.stripePayment}>
            {paymentOption === PaymentOption.ONLINE_PAYMENT && (
              <div className={styles.stripeForm}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  <InformationIcon content="This is just a demo, do not enter real credit card details." />
                  <p
                    style={{ color: "var(--apricotcream)", marginLeft: "1rem" }}
                  >
                    Use 4000006420000001 for demonstartion purposes.
                  </p>
                </div>
                <CardElement />
              </div>
            )}
          </div>
        </div>

        <div className={styles.checkoutBanner}>
          <h2>SUMMARY</h2>
          <CheckoutSummary />
          <FormButton onClick={onSubmit} text="Continue" />
        </div>
      </Form>
      {order && (
        <ModalProvider onRequestClose={() => router.push("/")}>
          <CheckoutModal order={order} orderItems={orderItems} />
        </ModalProvider>
      )}
    </>
  );
};

export default CheckoutForm;
