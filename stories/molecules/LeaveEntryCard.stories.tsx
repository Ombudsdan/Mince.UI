import type { Meta, StoryObj } from "@storybook/react";
import LeaveEntryCard from "@/components/molecules/LeaveEntryCard";
import { LeaveStatus, LeaveType } from "@/types";

const meta = {
  title: "Molecules/LeaveEntryCard",
  component: LeaveEntryCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof LeaveEntryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const entry = {
  id: "1",
  startDate: "2024-06-03",
  endDate: "2024-06-07",
  status: LeaveStatus.Approved,
  type: LeaveType.Holiday,
};

export const Default: Story = { args: { entry, nonWorkingDays: [0, 6], bankHolidays: [] } };
export const WithActions: Story = { args: { entry, nonWorkingDays: [0, 6], bankHolidays: [], onEdit: () => {}, onDelete: () => {} } };
