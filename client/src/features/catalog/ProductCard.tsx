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
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

  return (
    <Card
      elevation={2}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 188, sm: 170, md: 190 },
          backgroundSize: "cover",
          backgroundPosition: "center",
          mt: 1,
          mr: 1,
          ml: 1,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(15, 23, 42, 0.08)"
        }}
        image={product.pictureUrl}
        title={product.name}
      />

      <CardContent >
        <Typography
          gutterBottom
          variant="subtitle2"
          sx={{
            textTransform: "uppercase",
            fontWeight: 450,
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
            fontWeight: 370,
            fontSize: { xs: "1.1rem", sm: "1.25rem" },
          }}
        >
          {currencyFormat(product.price)}
        </Typography>
        <Rating
          value={5}
          readOnly
          size="small"
          precision={0.5}
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarIcon fontSize="inherit" />}
          sx={{
            color: '#f6b01e',
            mb: 1,
            mt: 1
          }}
        />
        <CardActions
          sx={{
            justifyContent: "space-between",
            gap: 4
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
              px: { xs: 0.5, sm: 4 },
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
              px: { xs: 0.5, sm: 4},
            }}
          >
            View
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
