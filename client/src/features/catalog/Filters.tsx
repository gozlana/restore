import { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
  resetParams,
  setBrands,
  setOrderBy,
  setTypes,
} from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import SortIcon from "@mui/icons-material/Sort";
import CategoryIcon from "@mui/icons-material/Category";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to low" },
  { value: "price", label: "Price: Low to high" },
];

type Props = {
  filtersData: {
    brands: string[];
    types: string[];
  };
  hideSearch?: boolean;
};

export default function Filters({ filtersData: data }: Props) {
  const { orderBy, brands, types } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const [openSort, setOpenSort] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);
  const [openTypes, setOpenTypes] = useState(true);

  if (!data?.brands || !data?.types) {
    return <Typography>Loading...</Typography>;
  }

  const cardSx = {
    p: { xs: 2.5, sm: 3 },
    borderRadius: 3,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  };

  const headerSx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    mb: 1,
  };

  const titleSx = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontWeight: 800,
    color: "text.primary",
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      sx={{
        width: "100%",
        pb: { xs: 2, md: 0 },
      }}
    >
      <Box>
        <Search />
      </Box>

      <Paper sx={cardSx}>
        <Box sx={headerSx} onClick={() => setOpenSort(!openSort)}>
          <Typography variant="h6" sx={titleSx}>
            <SortIcon color="primary" />
            Sort by
          </Typography>

          <IconButton size="small">
            <KeyboardArrowDownIcon
              sx={{
                transform: openSort ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </IconButton>
        </Box>

        <Collapse in={openSort}>
          <RadioButtonGroup
            selectedValue={orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setOrderBy(e.target.value))}
          />
        </Collapse>
      </Paper>

      <Paper sx={cardSx}>
        <Box sx={headerSx} onClick={() => setOpenBrands(!openBrands)}>
          <Typography variant="h6" sx={titleSx}>
            <CategoryIcon color="primary" />
            Category
          </Typography>

          <IconButton size="small">
            <KeyboardArrowDownIcon
              sx={{
                transform: openBrands ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </IconButton>
        </Box>

        <Collapse in={openBrands}>
          <CheckboxButtons
            items={data.brands}
            checked={brands}
            onChange={(items: string[]) => dispatch(setBrands(items))}
          />
        </Collapse>
      </Paper>

      <Paper sx={cardSx}>
        <Box sx={headerSx} onClick={() => setOpenTypes(!openTypes)}>
          <Typography variant="h6" sx={titleSx}>
            <CheckroomIcon color="primary" />
            Apparel
          </Typography>

          <IconButton size="small">
            <KeyboardArrowDownIcon
              sx={{
                transform: openTypes ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </IconButton>
        </Box>

        <Collapse in={openTypes}>
          <CheckboxButtons
            items={data.types}
            checked={types}
            onChange={(items: string[]) => dispatch(setTypes(items))}
          />
        </Collapse>
      </Paper>

      <Button
        fullWidth
        size="large"
        variant="contained"
        startIcon={<RestartAltIcon />}
        onClick={() => dispatch(resetParams())}
        sx={{
          py: 1.4,
          borderRadius: 3,
          fontWeight: 800,
          letterSpacing: 0.5,
          boxShadow: "0 8px 20px rgba(25,118,210,0.25)",
        }}
      >
        Reset Filters
      </Button>
    </Box>
  );
}