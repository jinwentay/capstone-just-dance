import React from 'react';
import { observer } from 'mobx-react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import offlineStore from '../store/offlineStore';
import { Box } from 'theme-ui';

const OverallAccuracyGraph = observer(() => {
  const { numWrong, numCorrect } = offlineStore;
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: '1000px',
        overflowX: 'scroll'
      }}
    >
      <Box
        sx={{
          width: '3000px',
          height: '400px'
        }}
      >
        <Bar
          width={3000}
          height={400}
          data={{
              labels: numCorrect.map(i => Number(i.x) === i.x && i.x % 1 === 0 ? i.x: ""),
              datasets: [{
                  label: 'Correct positions',
                  data: numCorrect.map(i => i.y),
                  backgroundColor: '#BB80F6',
                  borderColor: '#BB80F6',
                  borderWidth: 1
              }, {
                label: 'Wrong positions',
                data: numWrong.map(i => i.y),
                backgroundColor: '#C4C4C4',
                borderColor: '#C4C4C4',
                borderWidth: 1
            }]
          }}
          options={{
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Session'
                }
              }]
            }
          }}
          />
      </Box>
    </Box>
  )
})

export default OverallAccuracyGraph;