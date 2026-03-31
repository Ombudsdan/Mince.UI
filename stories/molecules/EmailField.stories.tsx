import type { Meta, StoryObj } from "@storybook/react";
import EmailField from "@/components/molecules/EmailField";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (<FormValidationProvider><Story /></FormValidationProvider>);

const meta = {
  title: "Molecules/EmailField",
  component: EmailField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof EmailField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { id: "email", label: "Email Address", value: "", onChange: () => {} } };
export const WithValue: Story = { args: { id: "email", label: "Email Address", value: "user@example.com", onChange: () => {} } };
export const ReadOnly: Story = { args: { id: "email", label: "Email Address", value: "user@example.com", readOnly: true } };
