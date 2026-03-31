import type { Meta, StoryObj } from "@storybook/react";
import AllowanceListItem from "@/components/molecules/AllowanceListItem";

const meta = {
  title: "Molecules/AllowanceListItem",
  component: AllowanceListItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof AllowanceListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseAllowance = { year: 2024, company: "Acme Ltd", core: 25, bought: 0, carried: 0, holidayStartMonth: 1 };

export const Current: Story = { args: { allowance: { ...baseAllowance, active: true }, currentYear: 2024 } };
export const Past: Story = { args: { allowance: { ...baseAllowance, year: 2023, active: true }, currentYear: 2024 } };
export const Inactive: Story = { args: { allowance: { ...baseAllowance, active: false }, currentYear: 2024 } };
export const WithEdit: Story = { args: { allowance: { ...baseAllowance, active: true }, currentYear: 2024, onEdit: (a) => alert(`Edit ${a.year}`) } };
