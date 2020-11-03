import React, { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Box, Text } from 'theme-ui';
import OfflineStore from '../store/offlineStore';
import { Table, Column, Row, Header } from './';

const PositionReport = observer(() => {
  const { sessionPositions } = OfflineStore;
  const positions = useMemo(() => {
    const newPositions = [];
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
      }
    }
    return newPositions;
  }, [sessionPositions])
  return (
    <Box
      sx={{
        maxHeight: 'calc(100vh - 350px)',
        overflow: 'scroll',
      }}
    >
      <Table>
        <tbody>
          <Row>
            <Header>No.</Header>
            <Header>Your position</Header>
            <Header>Correct</Header>
          </Row>
          {positions.map((position) => (
              <Row>
                <Column>{position.index}</Column>
                <Column>{position.value}</Column>
                <Column>{position.correct}</Column>
              </Row>
          ))}
        </tbody>
      </Table>
    </Box>
  )
})

export default PositionReport;