import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { X, Settings2 } from "lucide-react";
import IconButton from "@/components/atoms/IconButton";

describe("IconButton — rendering", () => {
  it("renders a <button> element", () => {
    render(<IconButton icon={<X size={18} />} ariaLabel="Close" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders the provided icon as children", () => {
    const { container } = render(<IconButton icon={<X size={18} />} ariaLabel="Close" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

describe("IconButton — accessibility", () => {
  it("applies the ariaLabel as aria-label on the button", () => {
    render(<IconButton icon={<X size={18} />} ariaLabel="Close dialog" />);
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });

  it("uses type='button' by default", () => {
    render(<IconButton icon={<X size={18} />} ariaLabel="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});

describe("IconButton — interaction", () => {
  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<IconButton icon={<X size={18} />} ariaLabel="Close" onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = jest.fn();
    render(<IconButton icon={<X size={18} />} ariaLabel="Close" onClick={handleClick} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("IconButton — variant styling", () => {
  it("applies ghost variant classes by default", () => {
    render(<IconButton icon={<X size={18} />} ariaLabel="Close" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("text-gray-400");
    expect(btn.className).toContain("hover:text-gray-600");
  });

  it("applies subtle variant classes for variant='subtle'", () => {
    render(<IconButton icon={<Settings2 size={18} />} ariaLabel="Settings" variant="subtle" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("text-gray-600");
    expect(btn.className).toContain("hover:text-indigo-700");
  });
});
