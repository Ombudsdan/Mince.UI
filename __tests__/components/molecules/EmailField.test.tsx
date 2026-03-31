import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { FormValidationProvider } from "@/contexts/FormValidationContext";
import EmailField, { StandaloneEmailField } from "@/components/molecules/EmailField";

function renderInProvider(ui: React.ReactElement) {
  return render(<FormValidationProvider>{ui}</FormValidationProvider>);
}

function ControlledEmailField(props: React.ComponentProps<typeof EmailField> & { initialValue?: string }) {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState(initialValue ?? (rest.value as string));
  return <EmailField {...rest} value={value} onChange={setValue} />;
}

describe("EmailField — rendering", () => {
  it("renders a labelled email input", () => {
    renderInProvider(<EmailField id="email" label="Email" value="alice@example.com" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
  });

  it("renders as read-only when readOnly is true", () => {
    renderInProvider(<EmailField id="email" label="Email" value="alice@example.com" readOnly />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("readonly");
  });

  it("renders with the placeholder", () => {
    renderInProvider(<EmailField id="email" label="Email" value="" onChange={jest.fn()} placeholder="you@example.com" />);
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });
});

describe("EmailField — validation", () => {
  it("shows a format error when an invalid email is typed and field is blurred", async () => {
    renderInProvider(<ControlledEmailField id="email" label="Email" initialValue="" value="" />);
    await userEvent.type(screen.getByLabelText("Email"), "notanemail");
    await userEvent.tab();
    expect(screen.getByText(/valid email address/i)).toBeInTheDocument();
  });

  it("does not show a format error while typing (before blur)", async () => {
    renderInProvider(<ControlledEmailField id="email" label="Email" initialValue="" value="" />);
    await userEvent.type(screen.getByLabelText("Email"), "notanemail");
    expect(screen.queryByText(/valid email address/i)).toBeNull();
  });
});

describe("StandaloneEmailField — isolated validation scope", () => {
  it("renders without needing an outer FormValidationProvider", () => {
    render(<StandaloneEmailField id="email" label="Email" value="" onChange={jest.fn()} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
