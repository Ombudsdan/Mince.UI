import type { Meta, StoryObj } from "@storybook/react";
import CompanyCombobox from "@/components/molecules/CompanyCombobox";

const meta = {
  title: "Molecules/CompanyCombobox",
  component: CompanyCombobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CompanyCombobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: "company", label: "Company", value: "", onChange: () => {}, suggestions: ["Acme Ltd", "Globex Corp", "Initech"] },
};
export const WithValue: Story = {
  args: { id: "company", label: "Company", value: "Acme Ltd", onChange: () => {}, suggestions: ["Acme Ltd", "Globex Corp"] },
};
