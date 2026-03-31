import type { Meta, StoryObj } from "@storybook/react";
import FormField from "@/components/molecules/FormField";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (<FormValidationProvider><Story /></FormValidationProvider>);

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { id: "name", label: "Full Name", value: "", onChange: () => {}, type: "text" } };
export const Required: Story = { args: { id: "name", label: "Full Name", value: "", onChange: () => {}, required: true } };
export const ReadOnly: Story = { args: { id: "name", label: "Full Name", value: "John Doe", readOnly: true } };
export const Password: Story = { args: { id: "password", label: "Password", value: "", onChange: () => {}, type: "password" } };
