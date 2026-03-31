import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FormValidationProvider, useFormValidation } from "@/contexts/FormValidationContext";
import FormSelect from "@/components/molecules/FormSelect";

type Colour = "red" | "blue" | "green";

const options: { value: Colour; label: string }[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];

function renderInProvider(ui: React.ReactElement) {
  return render(<FormValidationProvider>{ui}</FormValidationProvider>);
}

function TriggerButton() {
  const { triggerAllValidations } = useFormValidation();
  return <button type="button" onClick={() => triggerAllValidations()}>Validate</button>;
}

describe("FormSelect — rendering", () => {
  it("renders a labelled select element", () => {
    renderInProvider(<FormSelect id="colour" label="Colour" value="red" onChange={jest.fn()} options={options} />);
    expect(screen.getByLabelText("Colour")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all provided options", () => {
    renderInProvider(<FormSelect id="colour" label="Colour" value="red" onChange={jest.fn()} options={options} />);
    expect(screen.getByRole("option", { name: "Red" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Blue" })).toBeInTheDocument();
  });

  it("shows the currently selected value", () => {
    renderInProvider(<FormSelect id="colour" label="Colour" value="blue" onChange={jest.fn()} options={options} />);
    expect(screen.getByRole("combobox")).toHaveValue("blue");
  });
});

describe("FormSelect — onChange", () => {
  it("calls onChange with the selected value when the user changes selection", async () => {
    const handleChange = jest.fn();
    renderInProvider(<FormSelect id="colour" label="Colour" value="red" onChange={handleChange} options={options} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "blue");
    expect(handleChange).toHaveBeenCalledWith("blue");
  });
});

describe("FormSelect — required validation", () => {
  it("shows a required error when triggered on an empty value via triggerAllValidations", async () => {
    const emptyOptions: { value: "" | Colour; label: string }[] = [{ value: "", label: "Select…" }, ...options];
    renderInProvider(<><FormSelect id="colour" label="Colour" value={"" as Colour} onChange={jest.fn()} options={emptyOptions as { value: Colour; label: string }[]} required /><TriggerButton /></>);
    await userEvent.click(screen.getByRole("button", { name: "Validate" }));
    expect(screen.getByText("Colour is required")).toBeInTheDocument();
  });
});
