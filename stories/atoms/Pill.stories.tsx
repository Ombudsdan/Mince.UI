import type { Meta, StoryObj } from "@storybook/react";
import Pill from "@/components/atoms/Pill";

const meta = {
  title: "Atoms/Pill",
  component: Pill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "success", "warning", "danger", "muted"] },
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "Default", variant: "default" } };
export const Primary: Story = { args: { label: "Primary", variant: "primary" } };
export const Success: Story = { args: { label: "Success", variant: "success" } };
export const Warning: Story = { args: { label: "Warning", variant: "warning" } };
export const Danger: Story = { args: { label: "Danger", variant: "danger" } };
export const Muted: Story = { args: { label: "Muted", variant: "muted" } };
