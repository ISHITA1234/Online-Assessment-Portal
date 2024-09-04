//Create a Context:
import React, { createContext, useState } from 'react';

export const OutputContext = createContext();

export const OutputProvider = ({ children }) => {
  const [output, setOutput] = useState({
    output1:"", output2:"", output3:"", output4:"", output5:"", 
    output6:"", output7:"", output8:"", output9:"", output10:""
    });

  return (
    <OutputContext.Provider value={{ output, setOutput }}>
      {children}
    </OutputContext.Provider>
  );
};
