"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BarcodeContextProps {
  detectedBarcode: string | null;
  setDetectedBarcode: React.Dispatch<React.SetStateAction<string | null>>;
  identified: boolean
  setIdentified: React.Dispatch<React.SetStateAction<boolean>>
  ingredientName: string
  setIngredientName: React.Dispatch<React.SetStateAction<string>>
  newItem: UPCData | null
  setNewItem: React.Dispatch<React.SetStateAction<UPCData | null>>
}

interface BarcodeProviderProps {
  children: ReactNode;
}

type UPCData = {
  UPC: {
    N: number
  },
  ingredient: {
    S: String
  },
  productName: {
    S: String
  }
}

const BarcodeContext = createContext<BarcodeContextProps | undefined>(undefined);

export const BarcodeProvider: React.FC<BarcodeProviderProps> = ({ children }) => {
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  const [identified, setIdentified] = useState<boolean>(false)
  const [ingredientName, setIngredientName] = useState<string>('');
  const [newItem, setNewItem] = useState<UPCData | null>(null);

  return (
    <BarcodeContext.Provider value={{ detectedBarcode, setDetectedBarcode, identified, setIdentified, ingredientName, setIngredientName, newItem, setNewItem }}>
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