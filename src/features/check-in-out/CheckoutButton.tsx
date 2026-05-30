
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckout";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CheckoutButton({ bookingId }:any) {
  const { checkout, isCheckingOut } = useCheckOut();
  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
