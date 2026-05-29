interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="ui-modal" onClick={onClose} role="presentation">
      <div className="ui-modal__panel" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="ui-modal-title">
        <div className="ui-modal__header">
          <h2 className="ui-modal__title" id="ui-modal-title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="ui-modal__close"
            aria-label="Cerrar ventana emergente"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}