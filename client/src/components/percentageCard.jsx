import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Box, Grid, Flex, Text } from 'theme-ui';
import socketStore from '../store/store';
import 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';

const PercentageCard = observer((props) => {
  const { accuracy, totalPositions } = props;  
  const percentage = totalPositions ? Math.round((accuracy/totalPositions)* 100) : 0;
  return (
    <Box 
      sx={{ 
        my: 'auto'
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text 
          variant="dp.lg" 
          sx={{  

            color: percentage >= 70 
            ? 'correctGreen' 
            : percentage >= 50
              ? 'brightYellow'
              : 'danger'
          }}
        >
          {percentage}%
        </Text>
        <Text variant="lb.lg" mt="3">{
          percentage >= 70 
          ? "Spectacular!"
          : percentage >= 50
            ? "You're doing great!"
            : "You can do better!"
          }
        </Text>
      </Flex>
    </Box>
  )
})

PercentageCard.propTypes = {
  accuracy: PropTypes.number,
  totalPositions: PropTypes.number
};

export default PercentageCard;