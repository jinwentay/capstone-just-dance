import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Flex, Text } from 'theme-ui';
// import socketStore from '../store/store';

const AccuracyGraph = observer(({ accuracy, correctPositions }) => {
  const [state, setState] = useState({
    labels: ['Wrong Positions', 'Correct Positions'],
    datasets: [
      {
        label: 'Accuracy',
        backgroundColor: [
          '#B21F00',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000'
        ],
        data: [correctPositions.length - accuracy, accuracy]
      }
    ]
  });
  useEffect(() => {
    console.log('GRAPH', state.datasets[0].data);
    setState({
      labels: ['Wrong Positions', 'Correct Positions'],
      datasets: [
        {
          label: 'Accuracy',
          backgroundColor: [
            '#B21F00',
            '#C9DE00'
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000'
          ],
          data: [correctPositions.length - accuracy, accuracy]
        }
      ]
    })
  }, [accuracy, correctPositions]);
  
  return (
    <Box sx={{ position: 'relative', mt: 3}}>
      <Flex
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text variant="hd.md">{accuracy}%</Text>
      </Flex>
      <Doughnut
        data={state}
        options={{
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
      />
    </Box>
  )
})

export default AccuracyGraph;