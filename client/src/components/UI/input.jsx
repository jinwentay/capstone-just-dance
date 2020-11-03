import React from 'react';
import { Input, Label, Box, Text } from 'theme-ui';

const InputField = React.forwardRef(
  (
    {
      label,
      error,
      inputProps,
      type,
      name,
      placeholder,
      disabled,
      defaultValue,
      ...props
    },
    ref
  ) => {
    return (
      <Box
        {...props}
        sx={{
          mb: error ? 1 : 3,
          ...props.sx,
        }}
      >
        <Label htmlFor={props.id} mb="2">
          {label}
        </Label>
        <Input
          {...inputProps}
          type={type}
          disabled={disabled}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          sx={{
            ...inputProps?.sx,
            borderColor: error ? 'danger' : 'border',
            ':focus': {
              borderColor: error ? 'danger' : 'primary',
            },
            ':disabled': {
              cursor: 'not-allowed',
            },
          }}
          ref={ref}
        />
        {!!error && (
          <Text variant="pg.sm" color="danger">
            {error.message}
          </Text>
        )}
      </Box>
    );
  }
);

export default InputField;
