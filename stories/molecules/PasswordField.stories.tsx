import type { Meta, StoryObj } from "@storybook/react";
import PasswordField from "@/components/molecules/PasswordField";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (<FormValidationProvider><Story /></FormValidationProvider>);

const meta = {
  title: "Molecules/PasswordField",
  component: PasswordField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { id: "password", label: "Password", value: "", onChange: () => {} } };
export const WithValue: Story = { args: { id: "password", label: "Password", value: "secret123", onChange: () => {} } };
export const ReadOnly: Story = { args: { id: "password", label: "Password", value: "secret123", readOnly: true } };
