import { createContext, useContext, useState } from "react";

interface UIContextType {
  overlayOpen: boolean;
  setOverlayOpen: (value: boolean) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <UIContext.Provider value={{ overlayOpen, setOverlayOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI debe usarse dentro de UIProvider");
  }

  return context;
}