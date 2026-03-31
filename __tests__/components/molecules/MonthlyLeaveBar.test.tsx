import { render, screen } from "@testing-library/react";
import React from "react";
import MonthlyLeaveBar from "@/components/molecules/MonthlyLeaveBar";

describe("MonthlyLeaveBar — basic rendering", () => {
  it("renders the month name", () => {
    render(<MonthlyLeaveBar monthName="January" approved={2} requested={1} planned={0} bankHolidays={1} maxDays={10} />);
    expect(screen.getByText("January")).toBeInTheDocument();
  });

  it("renders the data-testid container", () => {
    const { getByTestId } = render(<MonthlyLeaveBar monthName="March" approved={0} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    expect(getByTestId("monthly-leave-bar")).toBeInTheDocument();
  });

  it("renders the bar with the correct aria-label", () => {
    render(<MonthlyLeaveBar monthName="April" approved={3} requested={1} planned={2} bankHolidays={2} maxDays={10} />);
    expect(screen.getByRole("img", { name: /April: 3 approved, 1 requested, 2 planned, 2 bank holidays/i })).toBeInTheDocument();
  });
});

describe("MonthlyLeaveBar — total combined days label", () => {
  it("shows the total combined days when there are days to show", () => {
    render(<MonthlyLeaveBar monthName="May" approved={2} requested={1} planned={0} bankHolidays={1} maxDays={10} />);
    expect(screen.getByText("4d")).toBeInTheDocument();
  });

  it("shows '–' when all values are zero", () => {
    render(<MonthlyLeaveBar monthName="June" approved={0} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    expect(screen.getByText("–")).toBeInTheDocument();
  });
});

describe("MonthlyLeaveBar — segments", () => {
  it("renders the approved (green) segment when approved > 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="July" approved={3} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    expect(container.querySelector(".bg-green-300")).toBeInTheDocument();
  });

  it("does not render the approved segment when approved is 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="August" approved={0} requested={2} planned={0} bankHolidays={0} maxDays={10} />);
    expect(container.querySelector(".bg-green-300")).not.toBeInTheDocument();
  });

  it("renders the requested (orange) segment when requested > 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="September" approved={0} requested={2} planned={0} bankHolidays={0} maxDays={10} />);
    expect(container.querySelector(".bg-orange-200")).toBeInTheDocument();
  });

  it("renders the planned (yellow) segment when planned > 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="November" approved={0} requested={0} planned={3} bankHolidays={0} maxDays={10} />);
    expect(container.querySelector(".bg-yellow-200")).toBeInTheDocument();
  });

  it("renders the bank holidays (purple) segment when bankHolidays > 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="February" approved={0} requested={0} planned={0} bankHolidays={2} maxDays={10} />);
    expect(container.querySelector(".bg-purple-300")).toBeInTheDocument();
  });

  it("does not render the bank holidays segment when bankHolidays is 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="March" approved={1} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    expect(container.querySelector(".bg-purple-300")).not.toBeInTheDocument();
  });

  it("renders a NWD bank holiday segment with diagonal stripe style when bankHolidaysNonWorking > 0", () => {
    const { container } = render(<MonthlyLeaveBar monthName="December" approved={0} requested={0} planned={0} bankHolidays={0} bankHolidaysNonWorking={1} maxDays={5} />);
    const purpleEl = container.querySelector(".bg-purple-300") as HTMLElement;
    expect(purpleEl).toBeInTheDocument();
    expect(purpleEl).toHaveAttribute("title", expect.stringContaining("non-working"));
  });

  it("does not apply the stripe style to a working-day bank holiday segment", () => {
    const { container } = render(<MonthlyLeaveBar monthName="May" approved={0} requested={0} planned={0} bankHolidays={1} bankHolidaysNonWorking={0} maxDays={5} />);
    const purpleEl = container.querySelector(".bg-purple-300") as HTMLElement;
    expect(purpleEl).toBeInTheDocument();
    expect(purpleEl.style.backgroundImage).toBe("");
  });
});

describe("MonthlyLeaveBar — segment widths", () => {
  it("sets approved segment width proportional to chartScale", () => {
    const { container } = render(<MonthlyLeaveBar monthName="May" approved={5} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    const greenDiv = container.querySelector(".bg-green-300") as HTMLElement;
    expect(greenDiv.style.width).toBe("50%");
  });

  it("clamps segment width to 100% when value exceeds chartScale", () => {
    const { container } = render(<MonthlyLeaveBar monthName="June" approved={15} requested={0} planned={0} bankHolidays={0} maxDays={10} />);
    const greenDiv = container.querySelector(".bg-green-300") as HTMLElement;
    expect(greenDiv.style.width).toBe("100%");
  });
});

describe("MonthlyLeaveBar — chart scale (nearest 5, upwards)", () => {
  it("chartScale=5 for maxDays=1 (rounds up to 5)", () => {
    const { getAllByTestId } = render(<MonthlyLeaveBar monthName="Jan" approved={1} requested={0} planned={0} bankHolidays={0} maxDays={1} />);
    expect(getAllByTestId("chart-grid-line")).toHaveLength(4);
  });

  it("chartScale=10 for maxDays=6 (rounds up to 10) -> 9 grid lines", () => {
    const { getAllByTestId } = render(<MonthlyLeaveBar monthName="Mar" approved={6} requested={0} planned={0} bankHolidays={0} maxDays={6} />);
    expect(getAllByTestId("chart-grid-line")).toHaveLength(9);
  });
});

describe("MonthlyLeaveBar — maxDays edge case", () => {
  it("does not crash when maxDays is 0", () => {
    const { getByTestId } = render(<MonthlyLeaveBar monthName="July" approved={2} requested={0} planned={0} bankHolidays={0} maxDays={0} />);
    expect(getByTestId("monthly-leave-bar")).toBeInTheDocument();
  });
});
