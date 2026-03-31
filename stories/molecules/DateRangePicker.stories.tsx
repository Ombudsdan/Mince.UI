import type { Meta, StoryObj } from "@storybook/react";
import DateRangePicker from "@/components/molecules/DateRangePicker";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import type { Decorator } from "@storybook/react";

const withProvider: Decorator = (Story) => (
  <FormValidationProvider><Story /></FormValidationProvider>
);

const meta = {
  title: "Molecules/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [withProvider],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: "dates", startDate: "", endDate: "", onStartChange: () => {}, onEndChange: () => {} },
};
export const WithDates: Story = {
  args: { id: "dates", startDate: "2024-06-01", endDate: "2024-06-07", onStartChange: () => {}, onEndChange: () => {} },
};
export const HalfDay: Story = {
  args: { id: "dates", startDate: "2024-06-01", endDate: "2024-06-01", onStartChange: () => {}, onEndChange: () => {}, halfDayMode: true },
};
