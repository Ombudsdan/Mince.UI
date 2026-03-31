import type { Meta, StoryObj } from "@storybook/react";
import MonthlyLeaveBar from "@/components/molecules/MonthlyLeaveBar";

const meta = {
  title: "Molecules/MonthlyLeaveBar",
  component: MonthlyLeaveBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof MonthlyLeaveBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { monthName: "June", approved: 3, requested: 1, planned: 2, bankHolidays: 1, maxDays: 10 },
};

export const Empty: Story = {
  args: { monthName: "January", approved: 0, requested: 0, planned: 0, bankHolidays: 0, maxDays: 10 },
};
