import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import { useCheckOut } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";

import ConfirmDelete from "../../ui/ConfirmDelete";

import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

function BookingDetail() {
  const { booking, isPending } = useBooking();
  const { checkout, isCheckingOut } = useCheckOut();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking as {
    status: BookingStatus;
    id: number;
  };
  const statusToTagName: Record<BookingStatus, string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status as BookingStatus]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            variation="danger"
            onClick={() => checkout(bookingId as number)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
