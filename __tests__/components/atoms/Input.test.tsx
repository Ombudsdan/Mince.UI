import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/atoms/Input";

describe("Input — rendering", () => {
  it("renders an input element", () => {
    render(<Input aria-label="name" />);
    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
  });

  it("defaults to type='text'", () => {
    render(<Input aria-label="test" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });
});

describe("Input — disabled state", () => {
  it("is disabled when disabled prop is true", () => {
    render(<Input aria-label="test" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies disabled styling classes", () => {
    render(<Input aria-label="test" disabled />);
    expect(screen.getByRole("textbox").className).toContain("opacity-50");
    expect(screen.getByRole("textbox").className).toContain("cursor-not-allowed");
  });
});

describe("Input — readOnly state", () => {
  it("sets readOnly attribute when readOnly is true", () => {
    render(<Input aria-label="test" readOnly value="fixed" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("applies readOnly background class", () => {
    render(<Input aria-label="test" readOnly value="fixed" />);
    expect(screen.getByRole("textbox").className).toContain("bg-gray-50");
  });

  it("applies white background when not readOnly", () => {
    render(<Input aria-label="test" value="editable" onChange={() => {}} />);
    expect(screen.getByRole("textbox").className).toContain("bg-white");
  });
});

describe("Input — aria-invalid (validation state)", () => {
  it("applies error border class when aria-invalid is true", () => {
    render(<Input aria-label="test" aria-invalid />);
    expect(screen.getByRole("textbox").className).toContain("border-red-400");
  });

  it("applies normal border class when aria-invalid is false", () => {
    render(<Input aria-label="test" aria-invalid={false} />);
    expect(screen.getByRole("textbox").className).toContain("border-gray-300");
  });
});

describe("Input — className prop", () => {
  it("merges extra className onto the input", () => {
    render(<Input aria-label="test" className="my-custom-class" />);
    expect(screen.getByRole("textbox").className).toContain("my-custom-class");
  });
});
