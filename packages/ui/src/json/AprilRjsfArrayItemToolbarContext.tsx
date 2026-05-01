/* eslint-disable react-refresh/only-export-components -- tiny RJSF context module */
import { createContext, useContext, type ReactNode } from 'react';

export type AprilRjsfArrayItemToolbarContextValue = {
  /** Renders inside `TextInput` / `Input` `rightSection` (array item actions). */
  toolbar: ReactNode;
};

const AprilRjsfArrayItemToolbarContext = createContext<AprilRjsfArrayItemToolbarContextValue | null>(null);

export function AprilRjsfArrayItemToolbarProvider({
  value,
  children,
}: {
  value: AprilRjsfArrayItemToolbarContextValue;
  children: ReactNode;
}) {
  return (
    <AprilRjsfArrayItemToolbarContext.Provider value={value}>{children}</AprilRjsfArrayItemToolbarContext.Provider>
  );
}

export function useAprilRjsfArrayItemToolbar(): AprilRjsfArrayItemToolbarContextValue | null {
  return useContext(AprilRjsfArrayItemToolbarContext);
}
