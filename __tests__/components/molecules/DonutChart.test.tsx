import { render, screen } from "@testing-library/react";
import React from "react";
import DonutChart from "@/components/molecules/DonutChart";

describe("DonutChart — rendering", () => {
  it("renders an SVG element", () => {
    const { container } = render(<DonutChart segments={[]} total={25} centerValue={25} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the remaining count in the SVG", () => {
    render(<DonutChart segments={[{ value: 5, color: "#86efac" }]} total={25} centerValue={20} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("renders the 'Remaining' label in the SVG", () => {
    render(<DonutChart segments={[]} total={25} centerValue={25} />);
    expect(screen.getByText("Remaining")).toBeInTheDocument();
  });

  it("sets the aria-label with the remaining count", () => {
    render(<DonutChart segments={[]} total={25} centerValue={25} />);
    expect(screen.getByRole("img", { name: /25 days remaining/i })).toBeInTheDocument();
  });

  it("renders the background track path", () => {
    const { container } = render(<DonutChart segments={[]} total={25} centerValue={25} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(1);
  });

  it("uses paths for arc segments and circles only for the two round end-caps", () => {
    const { container } = render(<DonutChart segments={[{ value: 25, color: "#86efac" }]} total={25} centerValue={0} />);
    expect(container.querySelectorAll("circle").length).toBe(2);
    expect(container.querySelectorAll("path").length).toBeGreaterThanOrEqual(1);
  });
});

describe("DonutChart — geometry", () => {
  it("renders only the track path when all segments have value=0", () => {
    const { container } = render(
      <DonutChart segments={[{ value: 0, color: "#86efac" }, { value: 0, color: "#93c5fd" }]} total={25} centerValue={25} />
    );
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(1);
  });

  it("renders track + segment path when a segment has value > 0", () => {
    const { container } = render(<DonutChart segments={[{ value: 10, color: "#86efac" }]} total={25} centerValue={15} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(2);
  });

  it("renders one path per non-zero segment plus the track", () => {
    const { container } = render(
      <DonutChart
        segments={[{ value: 5, color: "#86efac" }, { value: 3, color: "#93c5fd" }, { value: 2, color: "#fde047" }]}
        total={25}
        centerValue={15}
      />
    );
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(4);
  });

  it("skips zero-value segments", () => {
    const { container } = render(
      <DonutChart
        segments={[{ value: 5, color: "#86efac" }, { value: 0, color: "#93c5fd" }, { value: 2, color: "#fde047" }]}
        total={25}
        centerValue={18}
      />
    );
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(3);
  });
});

describe("DonutChart — edge cases", () => {
  it("renders without error when total is 0", () => {
    const { container } = render(<DonutChart segments={[{ value: 0, color: "#86efac" }]} total={0} centerValue={0} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders only the track when total is 0 (no segments drawn)", () => {
    const { container } = render(<DonutChart segments={[{ value: 5, color: "#86efac" }]} total={0} centerValue={0} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBe(1);
  });
});
