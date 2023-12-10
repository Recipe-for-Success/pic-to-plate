"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';

//Interface for ImageContext
interface ImageContextProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ImageProviderProps {
  children: ReactNode;
}

//Create image context using Image properties
const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  //string for storing image in base64
  const [image, setImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
//Define and export useImage as context provider for images
export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};