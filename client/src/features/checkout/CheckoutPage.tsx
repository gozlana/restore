import { Grid2, Typography } from "@mui/material";
import OrderSummary from "../../app/shared/components/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchBasketQuery } from "../basket/basketApi";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useEffect, useMemo, useRef } from "react";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
import { useAppSelector } from "../../app/store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function CheckoutPage() {
  const { data: basket } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const created = useRef(false);
  const { darkMode } = useAppSelector(state => state.ui);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent])


  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: 'floating',
        theme: darkMode ? 'night' : 'stripe'
      }
    }
  }, [basket?.clientSecret, darkMode]);

  return (
    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      sx={{
        mt: { xs: -4, md: 4 },
        px: { xs: 1.5, sm: 2, md: 0 },
        maxWidth: "1100px",
        mx: "auto",
        alignItems: "flex-start",
      }}
    >
      <Grid2 size={{ xs: 12, md: 8 }}>
        {!stripePromise || !options || isLoading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <Elements key={basket?.clientSecret} stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid2>

      <Grid2 size={{ xs: 12, md: 4 }}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}