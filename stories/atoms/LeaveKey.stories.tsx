import type { Meta, StoryObj } from "@storybook/react";
import { LeaveKey, LEAVE_KEY_ITEMS_BASE, LEAVE_KEY_ITEMS_OVERVIEW } from "@/components/atoms/LeaveKey";

const meta = {
  title: "Atoms/LeaveKey",
  component: LeaveKey,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof LeaveKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = { args: { items: LEAVE_KEY_ITEMS_BASE } };
export const Overview: Story = { args: { items: LEAVE_KEY_ITEMS_OVERVIEW } };
