import { render, screen } from "@testing-library/react";
import React from "react";
import {
  LeaveKey,
  LEAVE_KEY_APPROVED,
  LEAVE_KEY_REQUESTED,
  LEAVE_KEY_PLANNED,
  LEAVE_KEY_SICK,
  LEAVE_KEY_BANK_HOLIDAY,
  LEAVE_KEY_NON_WORKING,
  LEAVE_KEY_ITEMS_BASE,
} from "@/components/atoms/LeaveKey";

describe("LeaveKey — swatch shape", () => {
  it("renders swatches as w-3 h-3 rounded squares", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_APPROVED]} />);
    const swatch = container.querySelector(".w-3.h-3.rounded");
    expect(swatch).toBeInTheDocument();
    expect(swatch).not.toHaveClass("rounded-full");
  });

  it("every swatch carries both w-3 and h-3", () => {
    const { container } = render(<LeaveKey items={LEAVE_KEY_ITEMS_BASE} />);
    const swatches = container.querySelectorAll("[data-testid^='leave-key-swatch']");
    expect(swatches.length).toBe(4);
    swatches.forEach((s) => {
      expect(s).toHaveClass("w-3");
      expect(s).toHaveClass("h-3");
    });
  });
});

describe("LeaveKey — colour classes", () => {
  it("renders Approved swatch with bg-green-300", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_APPROVED]} />);
    expect(container.querySelector(".bg-green-300")).toBeInTheDocument();
  });

  it("renders Requested swatch with bg-orange-200", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_REQUESTED]} />);
    expect(container.querySelector(".bg-orange-200")).toBeInTheDocument();
  });

  it("renders Planned swatch with bg-yellow-200", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_PLANNED]} />);
    expect(container.querySelector(".bg-yellow-200")).toBeInTheDocument();
  });

  it("renders Sick swatch with bg-red-200", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_SICK]} />);
    expect(container.querySelector(".bg-red-200")).toBeInTheDocument();
  });

  it("renders Bank Holiday swatch with bg-purple-300", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_BANK_HOLIDAY]} />);
    expect(container.querySelector(".bg-purple-300")).toBeInTheDocument();
  });

  it("renders Non-Working swatch with bg-gray-100", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_NON_WORKING]} />);
    expect(container.querySelector(".bg-gray-100")).toBeInTheDocument();
  });
});

describe("LeaveKey — labels", () => {
  it("renders all four base item labels", () => {
    render(<LeaveKey items={LEAVE_KEY_ITEMS_BASE} />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Requested")).toBeInTheDocument();
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.getByText("Bank Holiday")).toBeInTheDocument();
  });

  it("renders the Bank Holiday label (singular, not plural)", () => {
    render(<LeaveKey items={[LEAVE_KEY_BANK_HOLIDAY]} />);
    expect(screen.getByText("Bank Holiday")).toBeInTheDocument();
    expect(screen.queryByText("Bank Holidays")).not.toBeInTheDocument();
  });
});

describe("LeaveKey — className", () => {
  it("applies an extra className to the wrapper", () => {
    const { container } = render(<LeaveKey items={[LEAVE_KEY_APPROVED]} className="mt-4" />);
    expect(container.querySelector("[data-testid='leave-key']")).toHaveClass("mt-4");
  });
});
