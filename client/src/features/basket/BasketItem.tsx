import { Box, Grid2, IconButton, Paper, Typography } from "@mui/material"
import { Item } from "../../app/models/basket"
import { Add, Close, Remove } from "@mui/icons-material"
import { useAddBasketItemMutation, useRemoveBasketItemMutation } from "./basketApi"
import { currencyFormat } from "../../lib/util"


type Props = {
  item: Item
}

export default function BasketItem({ item }: Props) {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  return (
    <Paper
      sx={{
        position: "relative",
        p: { xs: 2, md: 3 },
        pr: { xs: 7, md: 8 },
        borderRadius: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        alignItems: { xs: "stretch", sm: "center" },
        mb: 2,
      }}
    >
      <Box display='flex' alignItems='center'>
        <Box
          component='img'
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: {
              xs: 115,
              sm: 115,
            },
            height: {
              xs: 130,
              sm: 120,
            },
            objectFit: "contain",
            borderRadius: 2,
            backgroundColor: "#fff",
            flexShrink: 0,
          }}

        />
        <Box
          sx={{
            flex: 1,
            ml: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 1
          }}
        >
          <Typography variant="h6">{item.name}</Typography>

          <Box display='flex' alignContent='center' gap={3}>
            <Typography sx={{ fontSize: '1.1rem' }}>
              {currencyFormat(item.price)} x {item.quantity}
            </Typography>
            <Typography sx={{ fontSize: '1.1rem' }}>
              {currencyFormat(item.price * item.quantity)}
            </Typography>
          </Box>

          <Grid2
            container
            spacing={1}
            alignItems='center'
            sx={{
              justifyContent: { xs: "center", sm: "flex-start" },
              mt: { xs: 1, sm: 0 }
            }}
          >
            <IconButton
              onClick={() => removeBasketItem({ productId: item.productId, quantity: 1 })}
              color="error"
              size="small"
              sx={{
                border: 1,
                borderRadius: 1,
                minWidth: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
                mt: { xs: -1, sm: 0 }
              }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              onClick={() => addBasketItem({ product: item, quantity: 1 })}
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}>
              <Add />
            </IconButton>
          </Grid2>
        </Box>
      </Box>
      <IconButton
        onClick={() =>
          removeBasketItem({
            productId: item.productId,
            quantity: item.quantity,
          })
        }
        color="error"
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          border: 1,
          borderRadius: 1,
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: "error.light",
            color: "white",
          },
        }}
      >
        <Close />
      </IconButton>
    </Paper>
  )
}