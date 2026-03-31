import type { Meta, StoryObj } from "@storybook/react";
import AuthCard from "@/components/molecules/AuthCard";
import Button from "@/components/atoms/Button";

const meta = {
  title: "Molecules/AuthCard",
  component: AuthCard,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof AuthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sign In",
    subtitle: "Welcome back! Please sign in to your account.",
    children: <div className="space-y-4"><p className="text-sm text-gray-600">Form fields would go here.</p><Button fullWidth>Sign In</Button></div>,
    footer: <span>Don't have an account? <a href="#" className="text-indigo-600">Sign up</a></span>,
  },
};
