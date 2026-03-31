import type { Meta, StoryObj } from "@storybook/react";
import FormSelect from "@/components/molecules/FormSelect";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (<FormValidationProvider><Story /></FormValidationProvider>);

const meta = {
  title: "Molecules/FormSelect",
  component: FormSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

export const Default: Story = { args: { id: "select", label: "Choose an option", value: "", onChange: () => {}, options } };
export const WithValue: Story = { args: { id: "select", label: "Choose an option", value: "opt1", onChange: () => {}, options } };
export const Required: Story = { args: { id: "select", label: "Choose an option", value: "", onChange: () => {}, options, required: true } };
