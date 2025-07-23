import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          renderButton={(open) => <Button onClick={open}>Add new Cabin</Button>}
        ></Modal.Open>
        <Modal.Window name="cabin-form">
          {/* RENDER PROP PATTERN */}
          {/* WE'RE PASSING A FUNCTION INSTEAD */}
          {(closeModal) => <CreateCabinForm onCloseModal={closeModal} />}
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function onCloseModal() {
//     setIsOpenModal(false);
//   }
//   return (
//     <div>x
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={onCloseModal}>
//           <CreateCabinForm onCloseModal={onCloseModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
