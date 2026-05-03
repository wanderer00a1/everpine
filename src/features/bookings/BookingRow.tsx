/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import type { CabinProps } from "../cabins/CabinRow";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router";

type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export interface BookingProp {
  id?: number;
  created_at?: string;
  startDate?: string;
  endDate?: string;
  numNights?: string;
  numGuests?: string;
  totalPrice?: number;
  status?: BookingStatus;
  guests: {
    fullName?: string;
    email?: string;
  } | null;
  cabins: CabinProps;
}

export interface BookingsProps {
  booking: BookingProp;
}

function BookingRow({ booking }: BookingsProps) {
  const navigate = useNavigate();

  const {
    id: bookingId,
    created_at,
    startDate = "",
    endDate = "",
    numNights,
    numGuests,
    totalPrice = 0,
    status = "unconfirmed",
    cabins: { name: cabinName },
    guests,
  } = booking;

  const guestName = guests?.fullName ?? "Unknown guest";
  const email = guests?.email ?? "—";

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  } as const;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            Show details
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
