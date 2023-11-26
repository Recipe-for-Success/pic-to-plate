"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BarcodeContextProps {
  detectedBarcode: string | null;
  setDetectedBarcode: React.Dispatch<React.SetStateAction<string | null>>;
}
interface BarcodeProviderProps {
    children: ReactNode;
}
const BarcodeContext = createContext<BarcodeContextProps | undefined>(undefined);

export const BarcodeProvider: React.FC<BarcodeProviderProps> = ({ children }) => {
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);

  return (
    <BarcodeContext.Provider value={{ detectedBarcode, setDetectedBarcode }}>
      {children}
    </BarcodeContext.Provider>
  );
};

export const useBarcode = () => {
  const context = useContext(BarcodeContext);
  if (!context) {
    throw new Error('useBarcode must be used within an BarcodeProvider');
  }
  return context;
};