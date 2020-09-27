import React from 'react';
import { Flex } from 'theme-ui';
import { ReactComponent as User1 } from '../icons/user1.svg';
import { ReactComponent as User2 } from '../icons/user2.svg';
import { ReactComponent as User3 } from '../icons/user3.svg';

const Profile = (props) => {
  return (
    <Flex
      sx={{
        maxHeight: '50px',
        maxWidth: '50px',
        minWidth: '50px',
        minHeight: '50px',
        border: '2px solid',
        borderColor: props.isSelf ? 'primary' : 'border',
        borderRadius: '9999px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        ml: 2,
      }}
    >
      {props.user1 && (
        <User1
          title="user"
          width={'45px'}
          height={'45px'}
        />
      )}
      {props.user2 && (
        <User2
          title="user"
          width={'45px'}
          height={'45px'}
        />
      )}
      {props.user3 && (
        <User3
          title="user"
          width={'45px'}
          height={'45px'}
        />
      )}
    </Flex>
  )
}

export default Profile;