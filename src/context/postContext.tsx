import { createContext, ReactNode, useContext, useState } from "react";

interface PostContextData {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void; // Allow setting back to null
}

const FormPostModeContext = createContext<PostContextData>({
  selectedId: null,
  setSelectedId: () => {},
});

function FormPostModeProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <FormPostModeContext.Provider
      value={{
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </FormPostModeContext.Provider>
  );
}

function useFormPostMode() {
  const context = useContext(FormPostModeContext);
  if (context === undefined)
    throw new Error(
      "FormPostModeContext is used outside of FormPostModeProvider",
    );
  return context;
}

export { FormPostModeProvider, useFormPostMode };
