import React from 'react';

const Alert = ({ title, description, variant = 'default', onClose }) => {
  const baseStyles = 'alert alert-dismissible fade show shadow-sm d-flex ';
  const variantStyles = {
    default: 'alert-primary bg-light text-primary border-primary',
    success: 'alert-success bg-light text-success border-success',
    warning: 'alert-warning bg-light text-warning border-warning',
    error: 'alert-danger bg-light text-danger border-danger',
    elegant: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  // 將 purpleStyles 轉換為對象
  const purpleStyles = {
    '--bs-purple': '#8e44ad',
    '--bs-purple-rgb': '142,68,173',
    '--bs-purple-text': '#6c3483',
    '--bs-purple-bg-subtle': '#f3e5f5',
    '--bs-purple-border-subtle': '#d1c4e9',
    backgroundColor: 'var(--bs-purple-bg-subtle)',
    color: 'var(--bs-purple-text)',
    borderColor: 'var(--bs-purple-border-subtle)',
  };

  const containerStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2050,
    maxWidth: '90%',
    width: '400px',
  };

  const getButtonStyles = () => {
    switch (variant) {
      case 'success':
        return 'btn-outline-success';
      case 'warning':
        return 'btn-outline-warning';
      case 'error':
        return 'btn-outline-danger';
      case 'elegant':
        return purpleStyles;
      default:
        return 'btn-outline-primary';
    }
  };
  const iconStyles = {
    fontSize: '3rem',
    marginRight: '1rem',
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
  };

  const buttonStyles = getButtonStyles();
  const isButtonStylesObject = typeof buttonStyles === 'object';

  return (
    <div style={containerStyles}>
      <div className="row">
        <div
          className={`${baseStyles} ${
            variantStyles[variant] || variantStyles.elegant
          }`}
          role="alert"
          style={variant === 'elegant' ? purpleStyles : {}}
        >
          <div>
            <button
              type="button"
              className={`btn btn-sm ms-2 border-0 ${
                !isButtonStylesObject ? buttonStyles : ''
              }`}
              style={isButtonStylesObject ? buttonStyles : {}}
              onClick={onClose}
              aria-label="Close"
            >
              <i className="fi fi-br-rocket-lunch" style={iconStyles}></i>
            </button>
          </div>
          <div className="flex-grow-1">
            {title && <h4 className="alert-heading fw-bold mb-2">{title}</h4>}
            {description && <p className="mb-0">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
