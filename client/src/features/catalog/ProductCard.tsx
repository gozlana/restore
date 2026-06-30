import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAddBasketItemMutation } from "../basket/basketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 160, sm: 240 },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: { xs: "0.85rem", sm: "1rem" },
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            fontWeight: 700,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          {currencyFormat(product.price)}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          px: { xs: 1, sm: 2 },
          pb: 1.5,
          pt: 0,
          gap: 1,
        }}
      >
        <Button
          size="small"
          disabled={isLoading}
          onClick={() => addBasketItem({ product, quantity: 1 })}
          startIcon={<ShoppingCartIcon fontSize="small" />}
          sx={{
            minWidth: 0,
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            px: { xs: 0.5, sm: 1 },
          }}
        >
          Add
        </Button>

        <Button
          size="small"
          component={Link}
          to={`/catalog/${product.id}`}
          startIcon={<VisibilityIcon fontSize="small" />}
          sx={{
            minWidth: 0,
            fontSize: { xs: "0.7rem", sm: "0.875rem" },
            px: { xs: 0.5, sm: 1 },
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
