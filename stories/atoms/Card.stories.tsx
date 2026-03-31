import type { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/atoms/Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
    as: { control: "select", options: ["div", "section", "article", "aside", "main"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Card content goes here", padding: "md" } };
export const NoPadding: Story = { args: { children: "No padding card", padding: "none" } };
export const LargePadding: Story = { args: { children: "Large padding card", padding: "lg" } };
