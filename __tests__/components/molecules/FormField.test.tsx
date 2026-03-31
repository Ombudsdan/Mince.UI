import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { FormValidationProvider, useFormValidation } from "@/contexts/FormValidationContext";
import FormField from "@/components/molecules/FormField";

function renderInProvider(ui: React.ReactElement) {
  return render(<FormValidationProvider>{ui}</FormValidationProvider>);
}

function ControlledFormField(props: React.ComponentProps<typeof FormField> & { initialValue?: string | number }) {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState<string | number>(initialValue ?? rest.value);
  return <FormField {...rest} value={value} onChange={setValue} />;
}

function TriggerButton() {
  const { triggerAllValidations } = useFormValidation();
  return <button type="button" onClick={() => triggerAllValidations()}>Validate</button>;
}

describe("FormField — rendering", () => {
  it("renders a labelled input", () => {
    renderInProvider(<FormField id="name" label="Full Name" value="Alice" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toHaveValue("Alice");
  });

  it("renders as read-only when readOnly is true", () => {
    renderInProvider(<FormField id="email" label="Email" value="a@b.com" readOnly />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("readonly");
  });

  it("renders a number input when type='number'", () => {
    renderInProvider(<FormField id="days" label="Days" type="number" value={5} onChange={jest.fn()} />);
    expect(screen.getByLabelText("Days")).toHaveAttribute("type", "number");
  });
});

describe("FormField — required validation", () => {
  it("shows default error message when required field is cleared", async () => {
    renderInProvider(<FormField id="name" label="Name" value="Alice" onChange={jest.fn()} required />);
    await userEvent.clear(screen.getByLabelText("Name"));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("shows a custom error message when required is a string", async () => {
    renderInProvider(<FormField id="name" label="Name" value="Alice" onChange={jest.fn()} required="Please enter your full name" />);
    await userEvent.clear(screen.getByLabelText("Name"));
    expect(screen.getByText("Please enter your full name")).toBeInTheDocument();
  });

  it("applies red border class when there is an error", async () => {
    renderInProvider(<FormField id="name" label="Name" value="Alice" onChange={jest.fn()} required />);
    await userEvent.clear(screen.getByLabelText("Name"));
    expect(screen.getByLabelText("Name").className).toContain("border-red-400");
  });
});

describe("FormField — number validation", () => {
  it("shows min error when the number is below the minimum", async () => {
    renderInProvider(<ControlledFormField id="days" label="Days" type="number" initialValue={5} value={5} min={1} />);
    await userEvent.clear(screen.getByLabelText("Days"));
    await userEvent.type(screen.getByLabelText("Days"), "0");
    expect(screen.getByText("Days must be at least 1")).toBeInTheDocument();
  });

  it("shows max error when the number exceeds the maximum", async () => {
    renderInProvider(<ControlledFormField id="days" label="Days" type="number" initialValue={5} value={5} max={10} />);
    await userEvent.clear(screen.getByLabelText("Days"));
    await userEvent.type(screen.getByLabelText("Days"), "11");
    expect(screen.getByText("Days must be no more than 10")).toBeInTheDocument();
  });
});

describe("FormField — triggerAllValidations", () => {
  it("sets the required error when triggered externally on an empty field", async () => {
    renderInProvider(<><FormField id="name" label="Name" value="" onChange={jest.fn()} required /><TriggerButton /></>);
    await userEvent.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("does not set an error when triggered on a valid field", async () => {
    renderInProvider(<><FormField id="name" label="Name" value="Alice" onChange={jest.fn()} required /><TriggerButton /></>);
    await userEvent.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.queryByText("Name is required")).toBeNull();
  });
});

describe("FormField — email validation", () => {
  it("shows a format error when an invalid email is entered and the field is blurred", async () => {
    renderInProvider(<ControlledFormField id="email" label="Email" type="email" initialValue="" value="" />);
    await userEvent.type(screen.getByLabelText("Email"), "notvalid");
    await userEvent.tab();
    expect(screen.getByText("Email must be a valid email address")).toBeInTheDocument();
  });

  it("does not show a format error while typing (before blur)", async () => {
    renderInProvider(<ControlledFormField id="email" label="Email" type="email" initialValue="" value="" />);
    await userEvent.type(screen.getByLabelText("Email"), "notvalid");
    expect(screen.queryByText(/valid email address/i)).toBeNull();
  });
});
