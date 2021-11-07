import React from 'react';
import { Route as ReactRoute, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';
import { AuthLayout } from '@pages/_layouts/AuthLayout';
import { DefaultLayout } from '@pages/_layouts/DefaultLayout';

interface IRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: React.FC<RouteProps>;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  if (isPrivate && !signed) return <Redirect to="/login" />;

  if (!isPrivate && signed) return <Redirect to="/" />;

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <ReactRoute
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export { Route };
