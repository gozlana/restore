import { useParams } from "react-router-dom"
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [addBasketItem] = useAddBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find(x => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item])

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? +id : 0)

  if (!product || isLoading) return <div>Loading...</div>

  const handleUpdateBasket = () => {
    const updatedQuantity = item ? Math.abs(quantity - item.quantity) : quantity;

    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = +event.currentTarget.value;

    if (value >= 0) setQuantity(value);
  }

  const productDetails = [
    { label: 'Name', value: product.name },
    { label: 'Description', value: product.description },
    { label: 'Type', value: product.type },
    { label: 'Brand', value: product.brand },
    { label: 'Quantity in stock', value: product.quantityInStock }
  ]

  return (
    <Grid2
      container
      spacing={{ xs: 3, md: 6 }}
      maxWidth="lg"
      sx={{
        mx: "auto",
        px: { xs: 2, md: 0 },
        pt: 0,
        mt: { xs: -4, md: 0 },
      }}
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: 420,
            objectFit: "contain",
            borderRadius: 16,
            background: "#fff",
          }}
        />
      </Grid2>

      <Grid2 size={{ xs: 12, md: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            lineHeight: 1.15,
            mb: 1,
          }}
        >
          {product.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="h4"
          color="secondary"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 700,
            mb: 3,
          }}
        >
          ${(product.price / 100).toFixed(2)}
        </Typography>

        <TableContainer
          sx={{
            mb: 3,
            "& td": {
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              py: 1.5,
              fontSize: { xs: "0.95rem", md: "1rem" },
            },
          }}
        >
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 700, width: "42%" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-word" }}>
                    {detail.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Button
              onClick={handleUpdateBasket}
              disabled={quantity === item?.quantity || (!item && quantity === 0)}
              sx={{ height: "56px", borderRadius: 2, fontWeight: 700 }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update quantity" : "Add to basket"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );

}