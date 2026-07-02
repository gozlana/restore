import { debounce, TextField, InputAdornment } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const { searchTerm } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  const debounceSearch = debounce(event => {
    dispatch(setSearchTerm(event.target.value))
  }, 1000)

  return (
    <TextField
      placeholder="Search gear..."
      variant="outlined"
      fullWidth
      type="search"
      value={term}
      onChange={(e) => {
        setTerm(e.target.value);
        debounceSearch(e);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 3,

        "& .MuiOutlinedInput-root": {
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",

          "& fieldset": {
            borderColor: "#E2E8F0",
          },

          "&:hover fieldset": {
            borderColor: "#1976d2",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: "2px",
          },
        },

        "& .MuiInputBase-input": {
          padding: "16px 14px",
          fontSize: "1rem",
        },
      }}
    />
  )
}