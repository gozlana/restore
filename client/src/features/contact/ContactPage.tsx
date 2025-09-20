
import { decrement, increment} from "./CounterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h4">
        Contact Page
      </Typography>
      <Typography variant="body1">
        The data is: {data}
      </Typography>
      <ButtonGroup>
        <Button onClick={()=> dispatch(decrement(1))} color='error'>decrement</Button>
        <Button onClick={()=> dispatch(increment(1))} color="success">increment</Button>
        <Button onClick={()=> dispatch(increment(7))} color="primary">increment by 7</Button>
        <Button onClick={()=> dispatch(decrement(7))} color="secondary">decrement by 7</Button>
      </ButtonGroup>
    </>
  )
}