import React, {useState} from 'react';

import AuthMenu from '../../components/auth';
import Container from '../../layouts/Containers/Container';

const AuthScreen = () => {
  const [authPage, setAuthPage] = useState(0);
  const [details, setDetails] = useState(false);

  return (
    <Container>
      <AuthMenu authPage={authPage} setAuthPage={setAuthPage} />
    </Container>
  );
};

export default AuthScreen;
