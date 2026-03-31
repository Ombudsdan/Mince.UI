import type { Meta, StoryObj } from "@storybook/react";
import DonutChart from "@/components/molecules/DonutChart";

const meta = {
  title: "Molecules/DonutChart",
  component: DonutChart,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 25,
    centerValue: 7,
    segments: [
      { value: 10, color: "#86efac" },
      { value: 5, color: "#fed7aa" },
      { value: 3, color: "#fde047" },
    ],
  },
};

export const Empty: Story = {
  args: { total: 25, centerValue: 25, segments: [] },
};
