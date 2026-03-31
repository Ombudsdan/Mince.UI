import type { Meta, StoryObj } from "@storybook/react";
import StatusBadge from "@/components/atoms/StatusBadge";
import { LeaveStatus } from "@/types";

const meta = {
  title: "Atoms/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    status: { control: "select", options: Object.values(LeaveStatus) },
    isSick: { control: "boolean" },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Approved: Story = { args: { status: LeaveStatus.Approved } };
export const Requested: Story = { args: { status: LeaveStatus.Requested } };
export const Planned: Story = { args: { status: LeaveStatus.Planned } };
export const Sick: Story = { args: { status: LeaveStatus.Approved, isSick: true } };
