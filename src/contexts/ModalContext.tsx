import React, { ReactNode, createContext, useContext, useState } from "react";
import Modal from "react-modal";
import styles from "@/components/Checkout/CheckoutModal/CheckoutModal.module.css";

type ModalContextType = {
  close: () => void;
  open: () => void;
};

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("ModalContext must be used within a ModalProvide");
  }
  return context;
};

type ModalProviderProps = {
  children: ReactNode;
  onRequestClose: () => void;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  onRequestClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  Modal.setAppElement(document.getElementById("root") as HTMLElement);

  const contextValue: ModalContextType = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Checkout Complete"
        className={styles.modal}
      >
        <div className={styles.modalContent}>{children}</div>
      </Modal>
    </ModalContext.Provider>
  );
};
