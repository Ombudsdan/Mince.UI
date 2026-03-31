import type { Meta, StoryObj } from "@storybook/react";
import FormLabelledInput from "@/components/atoms/FormLabelledInput";

const meta = {
  title: "Atoms/FormLabelledInput",
  component: FormLabelledInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url"] },
  },
} satisfies Meta<typeof FormLabelledInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { id: "name", label: "Full Name", value: "", placeholder: "Enter your name" } };
export const WithError: Story = { args: { id: "email", label: "Email", value: "bad-email", error: "Invalid email address" } };
export const Email: Story = { args: { id: "email", label: "Email", type: "email", value: "" } };
