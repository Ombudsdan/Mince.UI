import type { Meta, StoryObj } from "@storybook/react";
import LeaveCard from "@/components/molecules/LeaveCard";
import { LeaveStatus, LeaveType } from "@/types";

const meta = {
  title: "Molecules/LeaveCard",
  component: LeaveCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof LeaveCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseEntry = {
  id: "1",
  startDate: "2024-06-03",
  endDate: "2024-06-07",
  status: LeaveStatus.Approved,
  type: LeaveType.Holiday,
};

export const Approved: Story = { args: { entry: baseEntry, nonWorkingDays: [0, 6], bankHolidays: [], isOwnProfile: false } };
export const Requested: Story = { args: { entry: { ...baseEntry, status: LeaveStatus.Requested }, nonWorkingDays: [0, 6], bankHolidays: [], isOwnProfile: false } };
export const Planned: Story = { args: { entry: { ...baseEntry, status: LeaveStatus.Planned }, nonWorkingDays: [0, 6], bankHolidays: [], isOwnProfile: false } };
export const Sick: Story = { args: { entry: { ...baseEntry, type: LeaveType.Sick, status: LeaveStatus.Approved }, nonWorkingDays: [0, 6], bankHolidays: [], isOwnProfile: false } };
export const WithActions: Story = {
  args: { entry: baseEntry, nonWorkingDays: [0, 6], bankHolidays: [], isOwnProfile: true, onEdit: () => alert("Edit"), onDelete: () => alert("Delete") },
};
