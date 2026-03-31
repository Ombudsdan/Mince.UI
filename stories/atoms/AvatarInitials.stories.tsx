import type { Meta, StoryObj } from "@storybook/react";
import AvatarInitials from "@/components/atoms/AvatarInitials";

const meta = {
  title: "Atoms/AvatarInitials",
  component: AvatarInitials,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
  },
} satisfies Meta<typeof AvatarInitials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { firstName: "John", lastName: "Doe", size: "md" } };
export const ExtraSmall: Story = { args: { firstName: "Jane", lastName: "Smith", size: "xs" } };
export const Small: Story = { args: { firstName: "Alice", lastName: "Brown", size: "sm" } };
export const Large: Story = { args: { firstName: "Bob", lastName: "Jones", size: "lg" } };
