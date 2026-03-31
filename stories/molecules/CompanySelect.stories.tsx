import type { Meta, StoryObj } from "@storybook/react";
import CompanySelect from "@/components/molecules/CompanySelect";

const meta = {
  title: "Molecules/CompanySelect",
  component: CompanySelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CompanySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: "company", label: "Company", value: "", onChange: () => {}, companies: ["Acme Ltd", "Globex Corp", "Initech"] },
};
export const WithSelection: Story = {
  args: { id: "company", label: "Company", value: "Acme Ltd", onChange: () => {}, companies: ["Acme Ltd", "Globex Corp"] },
};
