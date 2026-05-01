/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
type DensityMode = 'comfortable' | 'compact';
interface DensityContextType {
  density: DensityMode;
  setDensity: (density: DensityMode) => void;
  toggleDensity: () => void;
}
const DensityContext = createContext<DensityContextType | undefined>(undefined);
export function DensityProvider({
  children,
  initialDensity = 'comfortable',
}: {
  children: ReactNode;
  /** For shells/tests that start in a fixed density. */
  initialDensity?: DensityMode;
}) {
  const [density, setDensity] = useState<DensityMode>(initialDensity);
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