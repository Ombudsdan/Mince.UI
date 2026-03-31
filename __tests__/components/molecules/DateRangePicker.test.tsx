import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormValidationProvider, useFormValidation } from "@/contexts/FormValidationContext";
import DateRangePicker from "@/components/molecules/DateRangePicker";

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2026-03-15"));
});

afterEach(() => {
  jest.useRealTimers();
});

function setup() {
  return userEvent.setup({ advanceTimers: jest.advanceTimersByTime.bind(jest) });
}

function ControlledPicker({
  initialStart = "",
  initialEnd = "",
}: {
  initialStart?: string;
  initialEnd?: string;
}) {
  const [start, setStart] = React.useState(initialStart);
  const [end, setEnd] = React.useState(initialEnd);
  return (
    <DateRangePicker
      id="test-range"
      startDate={start}
      endDate={end}
      onStartChange={setStart}
      onEndChange={setEnd}
    />
  );
}

function TriggerButton() {
  const { triggerAllValidations } = useFormValidation();
  return (
    <button type="button" onClick={() => triggerAllValidations()}>
      Validate
    </button>
  );
}

function renderInProvider(ui: React.ReactElement) {
  return render(<FormValidationProvider>{ui}</FormValidationProvider>);
}

describe("DateRangePicker — rendering", () => {
  it("renders the current month and year", () => {
    renderInProvider(<ControlledPicker />);
    expect(screen.getByText(/March 2026/i)).toBeInTheDocument();
  });

  it("renders day-of-week headers", () => {
    renderInProvider(<ControlledPicker />);
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("renders day buttons for every day in the month", () => {
    renderInProvider(<ControlledPicker />);
    expect(screen.getByRole("button", { name: "2026-03-01" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2026-03-31" })).toBeInTheDocument();
  });

  it("renders padding cells when the month does not start on Sunday", async () => {
    jest.setSystemTime(new Date("2026-04-01"));
    const { container } = renderInProvider(<ControlledPicker />);
    expect(screen.getByText(/April 2026/i)).toBeInTheDocument();
    const grid = container.querySelector(".grid.grid-cols-7.gap-0\\.5");
    expect(grid).not.toBeNull();
    expect(grid!.children.length).toBe(42);
  });

  it("shows '—' for From and To when no dates are selected", () => {
    renderInProvider(<ControlledPicker />);
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBe(2);
  });
});

describe("DateRangePicker — selecting dates", () => {
  it("shows the start date summary after clicking a day", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "2026-03-09" }));
    expect(screen.getByText("2026-03-09")).toBeInTheDocument();
  });

  it("shows the 'Now select an end date' hint after selecting only the start", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "2026-03-09" }));
    expect(screen.getByText("Now select an end date")).toBeInTheDocument();
  });

  it("shows both dates in the summary after selecting a range", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "2026-03-09" }));
    await user.click(screen.getByRole("button", { name: "2026-03-13" }));
    expect(screen.getByText("2026-03-09")).toBeInTheDocument();
    expect(screen.getByText("2026-03-13")).toBeInTheDocument();
  });

  it("resets to a new start when a third click is made after both dates are set", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "2026-03-09" }));
    await user.click(screen.getByRole("button", { name: "2026-03-13" }));
    await user.click(screen.getByRole("button", { name: "2026-03-20" }));
    expect(screen.getByText("2026-03-20")).toBeInTheDocument();
    expect(screen.getByText("Now select an end date")).toBeInTheDocument();
  });

  it("disables days before the start while picking end", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "2026-03-15" }));
    expect(screen.getByRole("button", { name: "2026-03-01" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "2026-03-15" })).not.toBeDisabled();
  });
});

describe("DateRangePicker — validation via triggerAllValidations", () => {
  it("shows 'Please select a start date' when no dates are selected", async () => {
    const user = setup();
    renderInProvider(<><ControlledPicker /><TriggerButton /></>);
    await user.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.getByText("Please select a start date")).toBeInTheDocument();
  });

  it("shows 'Please select an end date' when only start is set", async () => {
    const user = setup();
    renderInProvider(<><ControlledPicker /><TriggerButton /></>);
    await user.click(screen.getByRole("button", { name: "2026-03-09" }));
    await user.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.getByText("Please select an end date")).toBeInTheDocument();
  });

  it("shows end-before-start error when dates are inverted", async () => {
    const user = setup();
    renderInProvider(<><ControlledPicker initialStart="2026-03-15" initialEnd="2026-03-09" /><TriggerButton /></>);
    await user.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.getByText("End date must be on or after start date")).toBeInTheDocument();
  });
});

describe("DateRangePicker — month navigation", () => {
  it("navigates to the previous month", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText(/February 2026/i)).toBeInTheDocument();
  });

  it("navigates to the next month", async () => {
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText(/April 2026/i)).toBeInTheDocument();
  });

  it("wraps from January to December (previous)", async () => {
    jest.setSystemTime(new Date("2026-01-15"));
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText(/December 2025/i)).toBeInTheDocument();
  });

  it("wraps from December to January (next)", async () => {
    jest.setSystemTime(new Date("2026-12-01"));
    const user = setup();
    renderInProvider(<ControlledPicker />);
    await user.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText(/January 2027/i)).toBeInTheDocument();
  });
});

describe("DateRangePicker — startDate prop syncs calendar month", () => {
  it("navigates to the month of an externally-supplied startDate", async () => {
    renderInProvider(<ControlledPicker initialStart="2026-07-07" />);
    expect(screen.getByText(/July 2026/i)).toBeInTheDocument();
  });
});
