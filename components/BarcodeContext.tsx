"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

//Interface for BarcodeContext
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

//Define type for UPC data
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

//Create barcode context using Barcode properties
const BarcodeContext = createContext<BarcodeContextProps | undefined>(undefined);

//Barcode Provider Component manages state of UPC Data
export const BarcodeProvider: React.FC<BarcodeProviderProps> = ({ children }) => {
  //string for barcode numbers
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  //boolean for setting successful identification
  const [identified, setIdentified] = useState<boolean>(false)
  //string for ingredient name returned from API call
  const [ingredientName, setIngredientName] = useState<string>('');
  //UPCData Object to read data from
  const [newItem, setNewItem] = useState<UPCData | null>(null);

  return (
    <BarcodeContext.Provider value={{ detectedBarcode, setDetectedBarcode, identified, setIdentified, ingredientName, setIngredientName, newItem, setNewItem }}>
      {children}
    </BarcodeContext.Provider>
  );
};

//Define and export useBarcode as context provider for barcodes
export const useBarcode = () => {
  const context = useContext(BarcodeContext);
  if (!context) {
    throw new Error('useBarcode must be used within an BarcodeProvider');
  }
  return context;
};