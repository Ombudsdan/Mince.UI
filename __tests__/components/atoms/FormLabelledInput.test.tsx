import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import FormLabelledInput from "@/components/atoms/FormLabelledInput";

describe("FormLabelledInput — rendering", () => {
  it("renders a labeled input pair", () => {
    render(<FormLabelledInput id="email" label="Email" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("associates the label with the input via id/htmlFor", () => {
    render(<FormLabelledInput id="fname" label="First Name" value="" onChange={jest.fn()} />);
    const input = screen.getByLabelText("First Name");
    expect(input).toHaveAttribute("id", "fname");
  });

  it("defaults to type='text'", () => {
    render(<FormLabelledInput id="x" label="X" value="" onChange={jest.fn()} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("renders type='email' when specified", () => {
    render(<FormLabelledInput id="em" label="Email" type="email" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("renders type='password' when specified", () => {
    render(<FormLabelledInput id="pw" label="Password" type="password" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
  });
});

describe("FormLabelledInput — controlled value", () => {
  it("shows the provided value in the input", () => {
    render(<FormLabelledInput id="em" label="Email" type="email" value="you@example.com" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Email")).toHaveValue("you@example.com");
  });
});

describe("FormLabelledInput — onChange interaction", () => {
  it("calls onChange with the raw string value on each keystroke", async () => {
    const handleChange = jest.fn();
    render(<FormLabelledInput id="fn" label="Name" value="" onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText("Name"), "J");
    expect(handleChange).toHaveBeenCalledWith("J");
  });
});

describe("FormLabelledInput — error state", () => {
  it("renders the error message when error prop is provided", () => {
    render(<FormLabelledInput id="fn" label="First Name" value="" onChange={jest.fn()} error="First Name is required" />);
    expect(screen.getByText("First Name is required")).toBeInTheDocument();
  });

  it("applies a red border class when an error is present", () => {
    render(<FormLabelledInput id="fn" label="First Name" value="" onChange={jest.fn()} error="Required" />);
    expect(screen.getByLabelText("First Name")).toHaveClass("border-red-400");
  });

  it("applies the normal border class when no error is present", () => {
    render(<FormLabelledInput id="fn" label="First Name" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("First Name")).toHaveClass("border-gray-300");
  });

  it("sets aria-invalid on the input when an error is present", () => {
    render(<FormLabelledInput id="fn" label="First Name" value="" onChange={jest.fn()} error="Required" />);
    expect(screen.getByLabelText("First Name")).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby pointing to the error element id", () => {
    render(<FormLabelledInput id="fn" label="First Name" value="" onChange={jest.fn()} error="Required" />);
    expect(screen.getByLabelText("First Name")).toHaveAttribute("aria-describedby", "fn-error");
    expect(document.getElementById("fn-error")).toHaveTextContent("Required");
  });
});

describe("FormLabelledInput — native HTML attribute passthrough", () => {
  it("forwards placeholder to the input", () => {
    render(<FormLabelledInput id="em" label="Email" value="" onChange={jest.fn()} placeholder="you@example.com" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("placeholder", "you@example.com");
  });

  it("forwards required to the input", () => {
    render(<FormLabelledInput id="em" label="Email" value="" onChange={jest.fn()} required />);
    expect(screen.getByLabelText("Email")).toBeRequired();
  });
});
