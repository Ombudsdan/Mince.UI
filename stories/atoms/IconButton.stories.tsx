import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "@/components/atoms/IconButton";
import { Trash2, Edit, X } from "lucide-react";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["ghost", "subtle"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = { args: { icon: <Trash2 size={16} />, ariaLabel: "Delete", variant: "ghost" } };
export const Subtle: Story = { args: { icon: <Edit size={16} />, ariaLabel: "Edit", variant: "subtle" } };
export const Disabled: Story = { args: { icon: <X size={16} />, ariaLabel: "Close", disabled: true } };
