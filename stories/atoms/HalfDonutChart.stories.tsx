import type { Meta, StoryObj } from "@storybook/react";
import HalfDonutChart from "@/components/atoms/HalfDonutChart";
import { LeaveStatus } from "@/types";

const meta = {
  title: "Atoms/HalfDonutChart",
  component: HalfDonutChart,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HalfDonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Approved: Story = { args: { total: 25, used: 10, status: LeaveStatus.Approved } };
export const Requested: Story = { args: { total: 25, used: 15, status: LeaveStatus.Requested } };
export const Planned: Story = { args: { total: 25, used: 5, status: LeaveStatus.Planned } };
export const Full: Story = { args: { total: 25, used: 25, status: LeaveStatus.Approved } };
export const Empty: Story = { args: { total: 25, used: 0, status: LeaveStatus.Approved } };
