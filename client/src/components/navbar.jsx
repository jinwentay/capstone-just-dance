import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Card, Button } from 'theme-ui';
import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import styled from "@emotion/styled";
import { ReactComponent as Profile } from '../icons/profile.svg';
import { observer } from 'mobx-react';
import dashboardStore from '../store/dashboardStore';
import store from '../store/store';
import ls from 'local-storage';

const SList = styled(MenuList)`
  background-color: transparent;
  padding: 0px;
  position: relative;
  border: none;
  z-index: 3;
  outline: none;
`;

const Item = styled(MenuItem)`
  :hover {
    background-color: #a6eef1;
  }
  cursor: pointer;
  display: flex;
  padding: 8px 24px;
`;

const SButton = styled(MenuButton)`
  border: none;
  background-color: transparent;
  padding: 0px;
  cursor: pointer;
  outline: none;
`;

const Link = styled(NavLink)`
  font-family: 'Quicksand';
  text-decoration: none;
  cursor: pointer;
  color: initial;
  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
      color: #7151C9;
  };
  &:link, &:active, &:focus {
    border-bottom: 2px solid;
    border-color: #7151C9;
    color: #7151C9;
  }
  padding: 12px;
`
const Navbar = observer(() => {
  const { account, logout } = dashboardStore;
  const { leaveSession, startSession } = store;
  return (
    <Box
      sx={{
        zIndex: 3,
        position: 'sticky',
        top: '0px',
        boxShadow: 'stroke.bottom',
      }}
    >
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
          // maxWidth: '1160px',
          mx: 'auto',
          px: 3,
          backgroundColor: 'white',
        }}
      >
        <Text variant="hd.md" color="primary">JustDance!</Text>
        <Flex sx={{ alignItems: 'center' }}>
          {startSession && (
            <Button
              variant="default"
              sx={{
                backgroundColor: 'danger',
                width: '130px',
                mr: 1
              }}
              onClick={() => {
                const deviceId = ls.get('deviceId');
                console.log(deviceId)
                leaveSession(deviceId);
              }}
            >
              Stop session
            </Button>
          )}
          {account.id !== -1 && (
            <>
              <Link to="/">Live</Link>
              <Link to="/overall">Overall</Link>
            </>
          )}
          <Menu>
            <SButton>
              <Flex
                sx={{
                  maxHeight: '50px',
                  maxWidth: '50px',
                  minWidth: '50px',
                  minHeight: '50px',
                  border: '2px solid',
                  borderColor: 'border',
                  borderRadius: '9999px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  ml: 2,
                }}
              >
                <Profile
                  title="user"
                  width={'48px'}
                  height={'48px'}
                />
              </Flex>
            </SButton>
            <SList>
              <Card mt="3" variant="profile">
                <Item 
                  style={{
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                    borderBottom: '1px solid',
                  }}
                >
                  <Text variant="pg.sm">{account.username}</Text>
                </Item>
                <Item
                  onClick={logout}
                >
                  <Text variant="pg.sm" color="danger">Log out</Text>
                </Item>
              </Card>
            </SList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
});

export default Navbar;