import { render, screen } from "@testing-library/react";
import React from "react";
import LeaveEntryCard from "@/components/molecules/LeaveEntryCard";
import { LeaveStatus, LeaveType, LeaveDuration } from "@/types";
import type { LeaveEntry, BankHolidayEntry } from "@/types";

const nonWorkingDays: number[] = [0, 6];
const bankHolidays: BankHolidayEntry[] = [];

const approvedEntry: LeaveEntry = {
  id: "e1",
  startDate: "2026-03-16",
  endDate: "2026-03-18",
  status: LeaveStatus.Approved,
  type: LeaveType.Holiday,
  notes: "Beach holiday",
};

const requestedEntry: LeaveEntry = {
  id: "e2",
  startDate: "2026-04-01",
  endDate: "2026-04-01",
  status: LeaveStatus.Requested,
  type: LeaveType.Holiday,
};

const sickEntry: LeaveEntry = {
  id: "e4",
  startDate: "2026-03-10",
  endDate: "2026-03-10",
  status: LeaveStatus.Approved,
  type: LeaveType.Sick,
  notes: "Flu",
};

const halfMorningEntry: LeaveEntry = {
  id: "e5",
  startDate: "2026-03-20",
  endDate: "2026-03-20",
  status: LeaveStatus.Approved,
  type: LeaveType.Holiday,
  duration: LeaveDuration.HalfMorning,
  notes: "Doctor",
};

const halfAfternoonEntry: LeaveEntry = {
  id: "e6",
  startDate: "2026-03-21",
  endDate: "2026-03-21",
  status: LeaveStatus.Approved,
  type: LeaveType.Holiday,
  duration: LeaveDuration.HalfAfternoon,
  notes: "School run",
};

describe("LeaveEntryCard — rendering", () => {
  it("renders the card with data-testid", () => {
    const { getByTestId } = render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(getByTestId("leave-entry-card")).toBeInTheDocument();
  });

  it("renders the notes text", () => {
    render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("Beach holiday")).toBeInTheDocument();
  });

  it("renders '–' when notes are not provided", () => {
    render(<LeaveEntryCard entry={requestedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("–")).toBeInTheDocument();
  });

  it("renders the formatted date range", () => {
    render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText(/16 Mar/)).toBeInTheDocument();
    expect(screen.getByText(/18 Mar/)).toBeInTheDocument();
  });
});

describe("LeaveEntryCard — status label", () => {
  it("renders 'Approved' for approved holiday entries", () => {
    render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders 'Sick' for sick leave entries", () => {
    render(<LeaveEntryCard entry={sickEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("Sick")).toBeInTheDocument();
  });
});

describe("LeaveEntryCard — colour classes", () => {
  it("applies sick-leave red card class for sick entries", () => {
    const { getByTestId } = render(<LeaveEntryCard entry={sickEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(getByTestId("leave-entry-card")).toHaveClass("bg-red-100");
  });

  it("applies the approved green card class for approved holiday entries", () => {
    const { getByTestId } = render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(getByTestId("leave-entry-card")).toHaveClass("bg-green-100");
  });
});

describe("LeaveEntryCard — days count", () => {
  it("renders the days count for a full-day multi-day entry", () => {
    render(<LeaveEntryCard entry={approvedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("(3d)")).toBeInTheDocument();
  });

  it("renders '1d' for a single-day full entry", () => {
    render(<LeaveEntryCard entry={requestedEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("(1d)")).toBeInTheDocument();
  });
});

describe("LeaveEntryCard — half-day entries", () => {
  it("renders 'Half Day AM' label for HalfMorning entries", () => {
    render(<LeaveEntryCard entry={halfMorningEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("(Half Day AM)")).toBeInTheDocument();
  });

  it("renders 'Half Day PM' label for HalfAfternoon entries", () => {
    render(<LeaveEntryCard entry={halfAfternoonEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("(Half Day PM)")).toBeInTheDocument();
  });

  it("appends '(AM)' to notes for HalfMorning entries with notes", () => {
    render(<LeaveEntryCard entry={halfMorningEntry} nonWorkingDays={nonWorkingDays} bankHolidays={bankHolidays} />);
    expect(screen.getByText("Doctor (AM)")).toBeInTheDocument();
  });
});
