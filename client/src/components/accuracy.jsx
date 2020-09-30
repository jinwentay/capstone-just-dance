import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { Doughnut } from 'react-chartjs-2';
import { Box, Flex, Text } from 'theme-ui';

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
        data: [correctPositions.length ? (correctPositions[correctPositions.length - 1].index - accuracy) : 0, accuracy]
      }
    ]
  });

  useEffect(() => {
    autorun(() => {
      console.log('GRAPH', state.datasets[0].data, accuracy, correctPositions[correctPositions.length - 1].index);
      if (correctPositions.length) {
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
              data: [correctPositions[correctPositions.length - 1].index - accuracy, accuracy]
            }
          ]
        })
      }
    })
  }, []);
  
  return (
    <Box sx={{ position: 'relative', mt: 3}}>
      <Flex
        sx={{
          position: 'absolute',
          width: '100%',
          height: 'calc(100% - 10px)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -1,
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