import FormField from "@/components/molecules/FormField";
import { FormValidationProvider } from "@/contexts/FormValidationContext";

interface EmailFieldProps {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  required?: boolean | string;
}

export default function EmailField({ ...props }: EmailFieldProps) {
  return <FormField {...props} type="email" />;
}

export function StandaloneEmailField(props: EmailFieldProps) {
  return (
    <FormValidationProvider>
      <EmailField {...props} />
    </FormValidationProvider>
  );
}
