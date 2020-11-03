import styled from '@emotion/styled';
export const Column = styled('td')`
  border: 1px solid #ddd;
  padding: 8px;
`
export const Row = styled('tr')`
  &:nth-child(even) {
    background-color: #F2F2F2;
  }
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