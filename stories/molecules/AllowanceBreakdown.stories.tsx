import type { Meta, StoryObj } from "@storybook/react";
import AllowanceBreakdown from "@/components/molecules/AllowanceBreakdown";

const meta = {
  title: "Molecules/AllowanceBreakdown",
  component: AllowanceBreakdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof AllowanceBreakdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { allowance: { core: 25, bought: 3, carried: 2 } } };
export const NoBonusDays: Story = { args: { allowance: { core: 20, bought: 0, carried: 0 } } };
