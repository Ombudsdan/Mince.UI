import type { Meta, StoryObj } from "@storybook/react";
import MonthYearPicker from "@/components/molecules/MonthYearPicker";

const meta = {
  title: "Molecules/MonthYearPicker",
  component: MonthYearPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof MonthYearPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { year: 2024, month: 5, onChange: () => {}, minYear: 2023, minMonth: 0, maxYear: 2025, maxMonth: 11 },
};
