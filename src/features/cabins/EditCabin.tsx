import { useState } from "react";

import Modal from "../../ui/Modal";
import EditCabinForm from "./EditCabinForm";
import type { CabinProps } from "./CabinRow";

function EditCabin({
  cabin,
  onCloseForm,
}: {
  cabin: CabinProps;
  onCloseForm: () => void;
}) {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const handleClose = () => {
    setIsOpenModal(false);
    onCloseForm();
  };
  return (
    <div>
      {isOpenModal && (
        <Modal onClose={handleClose}>
          <EditCabinForm
            cabintoEdit={cabin}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditCabin;
