import FormField from "@/components/molecules/FormField";
import { FormValidationProvider } from "@/contexts/FormValidationContext";

export interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  required?: boolean | string;
}

export default function PasswordField({ ...props }: PasswordFieldProps) {
  return <FormField {...props} type="password" />;
}

export function StandalonePasswordField(props: PasswordFieldProps) {
  return (
    <FormValidationProvider>
      <PasswordField {...props} />
    </FormValidationProvider>
  );
}
