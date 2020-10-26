import React from 'react';
import { Flex } from 'theme-ui';
import { ReactComponent as User1 } from '../icons/user1.svg';
import { ReactComponent as User2 } from '../icons/user2.svg';
import { ReactComponent as User3 } from '../icons/user3.svg';

const Profile = (props) => {
  return (
    <Flex
      sx={{
        maxHeight: props.isSelf ? '60px' : '50px',
        maxWidth: props.isSelf ? '60px' : '50px',
        minWidth: props.isSelf ? '60px' : '50px',
        minHeight: props.isSelf ? '60px' : '50px',
        border: '2px solid',
        borderColor: props.isSelf ? 'primary' : 'border',
        borderRadius: '9999px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      {props.user === '1' && (
        <User1
          title="user"
          width={props.isSelf ? '50px' : '40px'}
          height={props.isSelf ? '50px' : '40px'}
        />
      )}
      {props.user === '2' && (
        <User2
          title="user"
          width={props.isSelf ? '50px' : '40px'}
          height={props.isSelf ? '50px' : '40px'}
        />
      )}
      {props.user === '3' && (
        <User3
          title="user"
          width={props.isSelf ? '50px' : '40px'}
          height={props.isSelf ? '50px' : '40px'}
        />
      )}
    </Flex>
  )
}

export default Profile;