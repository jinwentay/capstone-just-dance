import React from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const Column = styled('td')`
  border: 1px solid #ddd;
  padding: 8px;
`
export const Row = styled('tr')`
  &:nth-child(even) {
    background-color: #F2F2F2;
  }
`

export const ColSelect = styled('td')`
  border: 1px solid #ddd;
  padding: 8px;
  cursor: pointer;
`
export const Header = styled('th')`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #876BD4;
  color: white;
  border: 1px solid #ddd;
  padding: 8px;
`

export const Table = styled('table')`
  text-align: center;
  font-family: 'Quicksand', sans-serif;
  border-collapse: collapse;
  border: 3px solid #ddd;
  width: 100%;
`

const DataTable = observer((props) => {
  const { headers, rowItems, rowFunc } = props;
  return (
    <Table>
      <tbody>
        <Row>
          {headers.map((header) => (
            <Header>{header}</Header>
          ))}
        </Row>
        {rowItems.map((item, index) => (
          <Row key={index} onClick={rowFunc ? () => rowFunc(item) : () => {}}>
            {Object.values(item).map((value) => (
              <>
                {rowFunc ? <ColSelect>{value}</ColSelect> : <Column>{value}</Column>}
              </>
            ))}
          </Row>
        ))}
      </tbody>
    </Table>
  )
});

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  rowItems: PropTypes.array,
  rowFunc: PropTypes.func
};

export default DataTable;