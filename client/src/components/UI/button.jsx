import React from 'react';
import { Button, Spinner } from 'theme-ui';

const PrimitiveButton = React.forwardRef(
  (
    { loading, fullWidth, children, sx, ...props },
    ref
  ) => {
    return (
      <Button
        {...props}
        ref={ref}
        sx={{
          cursor: 'pointer',
          outline: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ':disabled': {
            cursor: 'not-allowed',
          },
          opacity: props.disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : 'initial',
          borderRadius: '4px',
          ...sx,
        }}
      >
        {loading ? <Spinner color="background" size="16" /> : children}
      </Button>
    );
  }
);

export default PrimitiveButton;