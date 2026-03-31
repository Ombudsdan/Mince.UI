import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import FormErrorOutlet from "@/components/molecules/FormErrorOutlet";
import FormField from "@/components/molecules/FormField";

function renderInProvider(ui: React.ReactElement) {
  return render(<FormValidationProvider>{ui}</FormValidationProvider>);
}

function ControlledField({ id, label, required, initialValue = "Alice" }: { id: string; label: string; required?: boolean | string; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  return <FormField id={id} label={label} value={value} onChange={setValue} required={required} />;
}

describe("FormErrorOutlet — empty state", () => {
  it("renders nothing when there are no errors", () => {
    const { container } = renderInProvider(<FormErrorOutlet />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("FormErrorOutlet — with errors via FormField", () => {
  it("shows an alert with the error message when a required field is invalid", async () => {
    renderInProvider(<><ControlledField id="name" label="Name" required /><FormErrorOutlet /></>);
    await userEvent.clear(screen.getByLabelText("Name"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getAllByText("Name is required").length).toBeGreaterThanOrEqual(1);
  });

  it("renders a clickable button for each error in the outlet", async () => {
    renderInProvider(<><ControlledField id="first" label="First Name" required /><ControlledField id="last" label="Last Name" required /><FormErrorOutlet /></>);
    await userEvent.clear(screen.getByLabelText("First Name"));
    await userEvent.clear(screen.getByLabelText("Last Name"));
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("has role='alert' on the container so screen readers announce it", async () => {
    renderInProvider(<><ControlledField id="email" label="Email" required /><FormErrorOutlet /></>);
    await userEvent.clear(screen.getByLabelText("Email"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
