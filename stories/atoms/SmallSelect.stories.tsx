import type { Meta, StoryObj } from "@storybook/react";
import SmallSelect from "@/components/atoms/SmallSelect";

const meta = {
  title: "Atoms/SmallSelect",
  component: SmallSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SmallSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "option1",
    onChange: () => {},
    ariaLabel: "Select an option",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
