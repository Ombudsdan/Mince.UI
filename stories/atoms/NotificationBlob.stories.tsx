import type { Meta, StoryObj } from "@storybook/react";
import NotificationBlob from "@/components/atoms/NotificationBlob";

const meta = {
  title: "Atoms/NotificationBlob",
  component: NotificationBlob,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationBlob>;

export default meta;
type Story = StoryObj<typeof meta>;

export const One: Story = { args: { count: 1 } };
export const Many: Story = { args: { count: 5 } };
export const Zero: Story = { args: { count: 0 } };
