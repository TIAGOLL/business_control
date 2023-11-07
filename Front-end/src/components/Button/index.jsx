import React from 'react';

function Button(props) {
  const { children } = props;
  
  return (
    <button data-testid="Button" className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
      {children}
    </button>
  );
}

export default Button;
