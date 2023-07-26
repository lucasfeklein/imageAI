import { ReactNode, createContext, useState } from "react";

// Define the type for your context value
type ImageBlurContextValue = {
  isBlur: boolean;
  setIsBlur: (value: boolean) => void;
};

// Provide an initial value for the context
const initialContextValue: ImageBlurContextValue = {
  isBlur: true,
  setIsBlur: () => {},
};

// Create the context with the initial value
export const BlurImagesContext =
  createContext<ImageBlurContextValue>(initialContextValue);

interface MyComponentProps {
  children: ReactNode;
}

const BlurImagesProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [isBlur, setIsBlur] = useState(true);

  return (
    <BlurImagesContext.Provider value={{ isBlur, setIsBlur }}>
      {children}
    </BlurImagesContext.Provider>
  );
};

export default BlurImagesProvider;
