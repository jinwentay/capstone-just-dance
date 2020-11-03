import React from 'react';
import { Flex, Text } from "theme-ui";

const Card = ({ title, children }) => {
  const isAccuracy = title === 'ACCURACY';
  const isPercentage = title === '';
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        p: '16px',
        borderTopRightRadius: isAccuracy ? '0px' : '10px',
        borderBottomRightRadius: isAccuracy ? '0px' : '10px',
        borderTopLeftRadius: isPercentage ? '0px' : '10px',
        borderBottomLeftRadius: isPercentage ? '0px' : '10px',
        border: '1px solid #DADADA',
        borderRight: isAccuracy ? 'none' : '1px solid #DADADA',
        borderLeft: isPercentage ? 'none' : '1px solid #DADADA',
      }}
    >
      <Text variant="lb.md">{title}</Text>
      {children}
    </Flex>
  )
}

export default Card;