import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function MissingRoute({ pathname = '/' }) {
    return <Navigate to={pathname} />;
}

MissingRoute.propTypes = {
    pathname: PropTypes.string.isRequired
};

MissingRoute.defaultProps = {
    pathname: '/'
};

export default React.memo(MissingRoute);