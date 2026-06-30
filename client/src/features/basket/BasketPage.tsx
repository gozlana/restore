import { Grid2, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi"
import BasketItem from "./BasketItem";
import OrderSummary from "../../app/shared/components/OrderSummary";

export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>

  if (!data || data.items.length === 0) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <Grid2 container spacing={2} sx={{ mt: { xs: -4, md: 4 }}}>
      <Grid2 size={{ xs: 12, md: 8 }}>
        {data.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid2>

      <Grid2
        size={{ xs: 12, md: 4 }}
        sx={{
          position: { md: "sticky" },
          top: 100,
          alignSelf: "flex-start",
        }}
      >
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
}