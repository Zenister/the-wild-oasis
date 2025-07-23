import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleteBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}

          {status === "unconfirmed" && (
            <Modal.Open
              opens="delete"
              renderButton={(openModal) => (
                <Button
                  variation="danger"
                  icon={<HiArrowUpOnSquare />}
                  onClick={openModal}
                >
                  Delete booking
                </Button>
              )}
            ></Modal.Open>
          )}

          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Window name="delete">
            {(closeModal) => (
              <ConfirmDelete
                resourceName={`booking #${bookingId}`}
                disabled={isDeleteBooking}
                onConfirm={() =>
                  deleteBooking(bookingId, {
                    onSuccess: () => navigate(-1),
                  })
                }
                onCloseModal={closeModal}
              />
            )}
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
