import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/atoms/Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary", children: "Primary Button" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary Button" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete" } };
export const Small: Story = { args: { variant: "primary", size: "sm", children: "Small Button" } };
export const Disabled: Story = { args: { variant: "primary", children: "Disabled", disabled: true } };
export const FullWidth: Story = { args: { variant: "primary", children: "Full Width", fullWidth: true }, parameters: { layout: "padded" } };
