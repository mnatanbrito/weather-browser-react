import React from 'react';

import Icon from './Icon';

export default function ConfirmationDialog({
  visible = false,
  title,
  confirmLabel,
  confirmClass,
  cancelLabel,
  cancelClass,
  icon,
  showCloseButton,
  handleConfirm,
  handleCancel,
  children,
}) {
  return visible ? (
    <div className="modal is-active confirmation-dialog">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {icon && <Icon icon={icon} />}
            &nbsp;&nbsp;
            {title}
          </p>
          {showCloseButton && (
            <button
              className="delete"
              aria-label="close"
              onClick={handleCancel}
            />
          )}
        </header>
        <section className="modal-card-body confirmation-dialog__body">
          {children}
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button ${cancelClass || ''}`}
            onClick={handleCancel}
          >
            {cancelLabel}
          </button>
          <button
            className={`button ${confirmClass || ''}`}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  ) : null;
}
