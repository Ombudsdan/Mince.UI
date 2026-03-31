import type { Meta, StoryObj } from "@storybook/react";
import UserSelector from "@/components/molecules/UserSelector";

const meta = {
  title: "Molecules/UserSelector",
  component: UserSelector,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof UserSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const alice = {
  id: "1",
  profile: { firstName: "Alice", lastName: "Smith", email: "alice@example.com", nonWorkingDays: [0, 6], pinnedUserIds: ["2"] },
  yearAllowances: [],
  entries: [],
};

const bob = {
  id: "2",
  profile: { firstName: "Bob", lastName: "Jones", email: "bob@example.com", nonWorkingDays: [0, 6], pinnedUserIds: [] },
  yearAllowances: [],
  entries: [],
};

export const Default: Story = { args: { currentUser: alice, allUsers: [alice, bob], viewingUserId: null, onSelectUser: () => {} } };
export const ViewingBob: Story = { args: { currentUser: alice, allUsers: [alice, bob], viewingUserId: "2", onSelectUser: () => {} } };
