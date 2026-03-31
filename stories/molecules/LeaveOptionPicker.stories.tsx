import type { Meta, StoryObj } from "@storybook/react";
import LeaveOptionPicker from "@/components/molecules/LeaveOptionPicker";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import { LeaveType } from "@/types";
import { LEAVE_TYPE_LABELS, LEAVE_TYPE_ORDER } from "@/variables/leaveConfig";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (<FormValidationProvider><Story /></FormValidationProvider>);

const meta = {
  title: "Molecules/LeaveOptionPicker",
  component: LeaveOptionPicker,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof LeaveOptionPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const typeOptions = LEAVE_TYPE_ORDER.map((t) => ({ value: t, label: LEAVE_TYPE_LABELS[t] }));

export const Default: Story = {
  args: { id: "type", label: "Leave Type", options: typeOptions, value: LeaveType.Holiday, onChange: () => {} },
};
