import type { Meta, StoryObj } from "@storybook/react";
import FormErrorOutlet from "@/components/molecules/FormErrorOutlet";
import { FormValidationProvider, useFormValidation } from "@/contexts/FormValidationContext";
import { useEffect } from "react";

function ErrorSetup() {
  const { setError } = useFormValidation();
  useEffect(() => {
    setError("name", "Name is required");
    setError("email", "Email is invalid");
  }, [setError]);
  return <FormErrorOutlet />;
}

const meta = {
  title: "Molecules/FormErrorOutlet",
  component: FormErrorOutlet,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof FormErrorOutlet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithErrors: Story = {
  render: () => (<FormValidationProvider><ErrorSetup /></FormValidationProvider>),
};

export const NoErrors: Story = {
  render: () => (<FormValidationProvider><FormErrorOutlet /></FormValidationProvider>),
};
