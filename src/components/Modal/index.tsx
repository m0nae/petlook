import ReactDom from "react-dom";
import PropTypes, { InferProps } from "prop-types";

export default function Modal({
  isOpen,
  setIsOpen,
}: InferProps<typeof Modal.propTypes>) {
  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div
        id="overlay"
        className="fixed inset-0 bg-black opacity-70 z-50"
        onClick={() => setIsOpen(false)}
      />
      <div
        id="modal"
        className="transform -translate-x-1/2 -translate-y-1/2 z-[100] fixed top-[50%] left-[50%] h-[400px] w-[550px] bg-white rounded-xl"
      >
        <p>Some content here.</p>
        <button onClick={() => setIsOpen(false)}>Close modal</button>
      </div>
    </>,
    document.getElementById("modal")!
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
