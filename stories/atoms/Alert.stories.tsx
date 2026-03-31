import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/components/atoms/Alert";

const meta = {
  title: "Atoms/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["warning", "info", "danger", "success"] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = { args: { variant: "warning", children: "This is a warning alert message." } };
export const Info: Story = { args: { variant: "info", children: "This is an informational alert." } };
export const Danger: Story = { args: { variant: "danger", children: "This is a danger alert!" } };
export const Success: Story = { args: { variant: "success", children: "Operation completed successfully." } };
