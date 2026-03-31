import { render, screen } from "@testing-library/react";
import React from "react";
import HalfDonutChart from "@/components/atoms/HalfDonutChart";
import { LeaveStatus } from "@/types";

describe("HalfDonutChart — rendering", () => {
  it("renders an SVG element", () => {
    const { container } = render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Approved} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the remaining count in the SVG", () => {
    render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Approved} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders the 'Remaining' label", () => {
    render(<HalfDonutChart total={25} used={5} status={LeaveStatus.Planned} />);
    expect(screen.getByText("Remaining")).toBeInTheDocument();
  });

  it("sets the aria-label with the remaining count", () => {
    render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Approved} />);
    expect(screen.getByRole("img", { name: /15 days remaining/i })).toBeInTheDocument();
  });

  it("shows remaining=0 when used equals total", () => {
    render(<HalfDonutChart total={25} used={25} status={LeaveStatus.Requested} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows negative remaining when used exceeds total", () => {
    render(<HalfDonutChart total={25} used={30} status={LeaveStatus.Approved} />);
    expect(screen.getByText("-5")).toBeInTheDocument();
  });
});

describe("HalfDonutChart — arc paths", () => {
  it("renders only the background track path when used=0", () => {
    const { container } = render(<HalfDonutChart total={25} used={0} status={LeaveStatus.Approved} />);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(1);
  });

  it("renders both track and used arc paths when used > 0", () => {
    const { container } = render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Approved} />);
    const paths = container.querySelectorAll("path");
    expect(paths).toHaveLength(2);
  });
});

describe("HalfDonutChart — status colours", () => {
  it("uses the Approved colour (green-300) for Approved status", () => {
    const { container } = render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Approved} />);
    const paths = container.querySelectorAll("path");
    expect(paths[1].getAttribute("stroke")).toBe("#86efac");
  });

  it("uses the Requested colour (orange-300) for Requested status", () => {
    const { container } = render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Requested} />);
    const paths = container.querySelectorAll("path");
    expect(paths[1].getAttribute("stroke")).toBe("#fed7aa");
  });

  it("uses the Planned colour (yellow-300) for Planned status", () => {
    const { container } = render(<HalfDonutChart total={25} used={10} status={LeaveStatus.Planned} />);
    const paths = container.querySelectorAll("path");
    expect(paths[1].getAttribute("stroke")).toBe("#fde047");
  });
});
