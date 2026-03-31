import type { Meta, StoryObj } from "@storybook/react";
import ConnectionsHeader from "@/components/molecules/ConnectionsHeader";

const meta = {
  title: "Molecules/ConnectionsHeader",
  component: ConnectionsHeader,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectionsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { manageHref: "/connections", pendingCount: 0 } };
export const WithPending: Story = { args: { manageHref: "/connections", pendingCount: 3 } };
