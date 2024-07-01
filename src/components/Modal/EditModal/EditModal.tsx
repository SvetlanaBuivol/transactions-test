import { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal";
import {
  ButtonWrapper,
  CheckboxWrapper,
  StyledLabel,
  Title,
} from "./EditModal.styled";
import { ITransaction } from "../../../types/transaction";
import { Controller, useForm } from "react-hook-form";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ITransaction;
  onUpdateType: (newType: string) => void;
  onCancel: () => void;
}

const EditModal: FC<EditModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onUpdateType,
  onCancel,
}) => {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      newType: "",
    },
  });

  useEffect(() => {
    if (transaction && transaction.Type) {
      setValue("newType", transaction.Type);
    }
  }, [transaction, setValue]);

  const onSubmit = (data: { newType: string }) => {
    onUpdateType(data.newType);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <Title>Edit Transaction Type</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckboxWrapper>
            <Controller
              name="newType"
              control={control}
              render={({ field }) => (
                <>
                  <StyledLabel>
                    <input
                      type="radio"
                      value="Refill"
                      checked={field.value === "Refill"}
                      onChange={() => field.onChange("Refill")}
                    />
                    Refill
                  </StyledLabel>
                  <StyledLabel>
                    <input
                      type="radio"
                      value="Withdrawal"
                      checked={field.value === "Withdrawal"}
                      onChange={() => field.onChange("Withdrawal")}
                    />
                    Withdrawal
                  </StyledLabel>
                </>
              )}
            />
          </CheckboxWrapper>
          <ButtonWrapper>
            <Button size="small" variant="contained" type="submit">
              Update
            </Button>
            <Button size="small" variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </ButtonWrapper>
        </form>
    </Modal>
  );
};

// const EditModal: FC<EditModalProps> = ({
//   isOpen,
//   onClose,
//   transaction,
//   onUpdateType,
//   onCancel,
// }) => {
//   const [newType, setNewType] = useState<string>("");

//   useEffect(() => {
//     if (transaction && transaction.Type) {
//       setNewType(transaction.Type);
//     } else {
//       setNewType("");
//     }
//   }, [transaction]);

//   const handleUpdateType = () => {
//     onUpdateType(newType);
//     onClose();
//   };
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <Title>Edit Transaction Type</Title>
//       <CheckboxWrapper>
//         <StyledLabel>
//           <input
//             type="radio"
//             value="refill"
//             checked={newType === "Refill"}
//             onChange={() => setNewType("Refill")}
//           />
//           Refill
//         </StyledLabel>
//         <StyledLabel>
//           <input
//             type="radio"
//             value="withdrawal"
//             checked={newType === "Withdrawal"}
//             onChange={() => setNewType("Withdrawal")}
//           />
//           Withdrawal
//         </StyledLabel>
//       </CheckboxWrapper>
//       <ButtonWrapper>
//         <Button size="small" variant="contained" onClick={handleUpdateType}>
//           Update
//         </Button>
//         <Button size="small" variant="contained" onClick={onCancel}>
//           Cansel
//         </Button>
//       </ButtonWrapper>
//     </Modal>
//   );
// };

export default EditModal;
