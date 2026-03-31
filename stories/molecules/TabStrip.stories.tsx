import type { Meta, StoryObj } from "@storybook/react";
import TabStrip from "@/components/molecules/TabStrip";

const meta = {
  title: "Molecules/TabStrip",
  component: TabStrip,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof TabStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "history", label: "History" },
];

export const Default: Story = { args: { tabs, activeTab: "overview", onChange: () => {} } };
export const SecondTab: Story = { args: { tabs, activeTab: "details", onChange: () => {} } };
