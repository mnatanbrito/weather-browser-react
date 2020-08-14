import React from 'react';
import { useSelector } from 'react-redux';
import { isApiCallLimitError } from './reducer';

export default function ApiStatus() {
  const cities = useSelector((state) => state.cities);
  const hasLimitError = isApiCallLimitError(cities);

  if (!hasLimitError) {
    return null;
  }

  return (
    <span className="tag is-danger is-small has-text-centered">
      <span className="icon">
        <i className="fas fa-exclamation-triangle"></i>
      </span>
      You might have reached free tier limit
    </span>
  );
}
