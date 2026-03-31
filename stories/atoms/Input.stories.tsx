import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/atoms/Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "email", "number", "password", "date", "search"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { placeholder: "Enter text..." } };
export const WithValue: Story = { args: { value: "Hello World" } };
export const ReadOnly: Story = { args: { value: "Read only value", readOnly: true } };
export const Disabled: Story = { args: { value: "Disabled", disabled: true } };
export const Invalid: Story = { args: { value: "bad-email", "aria-invalid": true } };
