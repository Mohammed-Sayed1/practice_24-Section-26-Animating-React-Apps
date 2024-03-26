import { motion } from "framer-motion";
import { createPortal } from "react-dom";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
      //* use variants prop to set identefiers to use them for animation states for reuseablility
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
        // initial={{ opacity: 0, y: 30 }} //* use initial prop to specify where the animation starts for the initial state of this component or when this component being added to the DOM
        // animate={{ opacity: 1, y: 0 }} //* use animate prop to define the state we wanna animate to after this component did appear
        // exit={{opacity: 0, y: -30}} //* use exit prop to define the state we wanna animate to when the component or element is removed from the DOM, But you will notice something here: when this component remove from the DOM base on a condition for example react will remove it instantly even before exit animation happens so we will use AnimatePresence as a wrapper for this component in the parent component
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
