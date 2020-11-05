import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Box } from 'theme-ui';
import OfflineStore from '../store/offlineStore';
import { DataTable } from './';

const PositionReport = observer(() => {
  const { sessionPositions } = OfflineStore;
  const positions = useMemo(() => {
    let newPositions = [];
    if (sessionPositions.length > 0) {
      const numPositions = sessionPositions[sessionPositions.length - 1].index;
      if (sessionPositions.length < numPositions) {
        for (let i = 1; i <= numPositions; i++) {
          const position = sessionPositions.find((p) => p.index === i);
          if (position) {
            newPositions.push(position);
          } else {
            newPositions.push({
              index: i,
              value: 'NA',
              correct: 'NA'
            })
          }
        }
      } else {
        newPositions = sessionPositions;
      }
    }
    console.log(newPositions);
    return newPositions;
  }, [sessionPositions])
  return (
    <Box
      sx={{
        maxHeight: ['','calc(100vh - 350px)'],
        overflow: 'scroll',
      }}
    >
      <DataTable headers={['No.', 'Your position', 'Correct']} rowItems={positions}/>
    </Box>
  )
})

export default PositionReport;