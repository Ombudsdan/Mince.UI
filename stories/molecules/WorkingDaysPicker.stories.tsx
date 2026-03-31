import type { Meta, StoryObj } from "@storybook/react";
import WorkingDaysPicker from "@/components/molecules/WorkingDaysPicker";

const meta = {
  title: "Molecules/WorkingDaysPicker",
  component: WorkingDaysPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof WorkingDaysPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: [1, 2, 3, 4, 5], onChange: () => {} } };
export const AllDays: Story = { args: { value: [], onChange: () => {} } };
export const ManyDaysOff: Story = { args: { value: [1, 2, 3, 4], onChange: () => {} } };
