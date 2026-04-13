import React, { useState, createContext, useContext } from 'react';
type DensityMode = 'comfortable' | 'compact';
interface DensityContextType {
  density: DensityMode;
  setDensity: (density: DensityMode) => void;
  toggleDensity: () => void;
}
const DensityContext = createContext<DensityContextType | undefined>(undefined);
export function DensityProvider({ children }: {children: ReactNode;}) {
  const [density, setDensity] = useState<DensityMode>('comfortable');
  const toggleDensity = () => {
    setDensity((prev) => prev === 'comfortable' ? 'compact' : 'comfortable');
  };
  return (
    <DensityContext.Provider
      value={{
        density,
        setDensity,
        toggleDensity
      }}>
      
      {children}
    </DensityContext.Provider>);

}
export function useDensity() {
  const context = useContext(DensityContext);
  if (context === undefined) {
    throw new Error('useDensity must be used within a DensityProvider');
  }
  return context;
}