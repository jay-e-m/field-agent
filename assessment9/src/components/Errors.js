import React from 'react';

function Errors({ errors }) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="alert alert-danger" role="alert">
      <ul className="mb-0">
        {errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export default Errors;
