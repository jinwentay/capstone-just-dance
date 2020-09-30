import React from 'react';
import { Flex, Text } from "theme-ui";

const Card = ({ title, children }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: '16px',
        borderRadius: '10px',
        border: '1px solid #DADADA',
      }}
    >
      <Text variant="lb.md">{title}</Text>
      {children}
    </Flex>
  )
}

export default Card;