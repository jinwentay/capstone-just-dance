import React, { useState, useEffect } from 'react';
import { Flex, Text } from 'theme-ui';

const Profile = (props) => {
  const [width, setWidth] = useState(Math.ceil(window.innerWidth > 768 ? window.innerWidth/10 : window.innerWidth/6) - 20);
  useEffect(() => {
    window.addEventListener('resize', () => {
      const size = Math.ceil(window.innerWidth > 768 ? window.innerWidth/10 : window.innerWidth/6) - 20;
      setWidth(size > 20 ? size : 20);
    });
    return () => {
      window.removeEventListener('resize', () => {
        const size = Math.ceil(window.innerWidth > 768 ? window.innerWidth/10 : window.innerWidth/6) - 20;
        setWidth(size > 20 ? size : 20);
      });
    }
  }, [])
  return (
    <Flex
      sx={{
        maxHeight: width + 'px',
        maxWidth: width + 'px',
        minWidth: width + 'px',
        minHeight: width + 'px',
        border: '2px solid',
        borderColor: props.isSelf ? 'primary' : 'border',
        borderRadius: '9999px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text 
        variant="hd.lg"
        sx={{
          fontSize: [30,40]
        }}
      >
        {props.user}
      </Text>
    </Flex>
  )
}

export default Profile;