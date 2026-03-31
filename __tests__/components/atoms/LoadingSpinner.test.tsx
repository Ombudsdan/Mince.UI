import { render, screen } from "@testing-library/react";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders the default loading message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading\u2026")).toBeInTheDocument();
  });

  it("renders a custom message when provided", () => {
    render(<LoadingSpinner message={"Please wait\u2026"} />);
    expect(screen.getByText("Please wait\u2026")).toBeInTheDocument();
  });

  it("renders an SVG spinner", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies a light background class to avoid dark-mode flash", () => {
    const { container } = render(<LoadingSpinner />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper?.className).toContain("bg-gray-50");
  });
});
