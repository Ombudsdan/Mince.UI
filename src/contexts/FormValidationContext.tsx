import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

interface FormValidationContextValue {
  errors: Record<string, string>;
  setError: (id: string, message: string) => void;
  clearError: (id: string) => void;
  clearAllErrors: () => void;
  getError: (id: string) => string | undefined;
  hasErrors: boolean;
  registerValidator: (id: string, fn: () => boolean) => () => void;
  triggerAllValidations: () => boolean;
}

const FormValidationContext = createContext<FormValidationContextValue | null>(null);

export function FormValidationProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validators = useRef<Map<string, () => boolean>>(new Map());

  const setError = useCallback((id: string, message: string) => {
    setErrors((prev) => ({ ...prev, [id]: message }));
  }, []);

  const clearError = useCallback((id: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearAllErrors = useCallback(() => setErrors({}), []);

  const getError = useCallback((id: string) => errors[id], [errors]);

  const registerValidator = useCallback((id: string, fn: () => boolean) => {
    validators.current.set(id, fn);
    return () => validators.current.delete(id);
  }, []);

  const triggerAllValidations = useCallback(() => {
    let allValid = true;
    for (const validate of validators.current.values()) {
      if (!validate()) allValid = false;
    }
    return allValid;
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <FormValidationContext.Provider
      value={{
        errors,
        setError,
        clearError,
        clearAllErrors,
        getError,
        hasErrors,
        registerValidator,
        triggerAllValidations,
      }}
    >
      {children}
    </FormValidationContext.Provider>
  );
}

export function useFormValidation(): FormValidationContextValue {
  const ctx = useContext(FormValidationContext);
  if (!ctx) {
    throw new Error("useFormValidation must be used within a FormValidationProvider");
  }
  return ctx;
}
