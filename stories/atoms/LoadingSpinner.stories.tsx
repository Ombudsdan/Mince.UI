import type { Meta, StoryObj } from "@storybook/react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

const meta = {
  title: "Atoms/LoadingSpinner",
  component: LoadingSpinner,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomMessage: Story = { args: { message: "Please wait..." } };
