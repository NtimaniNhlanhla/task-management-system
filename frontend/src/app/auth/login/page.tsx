import React from 'react';
import LoginForm from '../../../components/Auth/LoginForm';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  return (
    <div>
    <LoginForm />
    <p>
      You don't have an account? <Link href="/auth/signup">Sign up</Link>
    </p>
  </div>
  );
};

export default LoginPage;
