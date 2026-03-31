import type { Meta, StoryObj } from "@storybook/react";
import ViewToggle from "@/components/molecules/ViewToggle";

const meta = {
  title: "Molecules/ViewToggle",
  component: ViewToggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: [{ value: "list"; label: string }, { value: "calendar"; label: string }] = [
  { value: "list", label: "Upcoming Leave" },
  { value: "calendar", label: "Calendar" },
];

export const List: Story = { args: { options, value: "list", onChange: () => {} } };
export const Calendar: Story = { args: { options, value: "calendar", onChange: () => {} } };
