import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./BookingForm";

describe("BookingForm", () => {
  test("renders step 1 correctly", () => {
    render(<BookingForm />);
    expect(screen.getByText(/Seating/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Number of Guests/i)).toBeInTheDocument();
    expect(screen.getByText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
  });

  test("moves to step 2 after clicking Next", () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByLabelText(/Seating/i), {
      target: { value: "Indoor" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2025-12-05" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Birthday" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
  });

  test("shows alert if required fields are missing on final submit", () => {
    window.alert = jest.fn();
    render(<BookingForm />);

    // Step 1 fill and next
    fireEvent.change(screen.getByLabelText(/Seating/i), {
      target: { value: "Indoor" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2025-12-05" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "17:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Birthday" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Click confirm without filling fields
    fireEvent.click(
      screen.getByRole("button", { name: /Confirm Reservation/i })
    );
    expect(window.alert).toHaveBeenCalledWith(
      "Please fill all required fields."
    );
  });

  test("submits successfully and shows confirmation", () => {
    render(<BookingForm />);

    // Step 1
    fireEvent.change(screen.getByLabelText(/Seating/i), {
      target: { value: "Outdoor" },
    });
    fireEvent.change(screen.getByLabelText(/Date/i), {
      target: { value: "2025-12-05" },
    });
    fireEvent.change(screen.getByLabelText(/Time/i), {
      target: { value: "18:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of Guests/i), {
      target: { value: "4" },
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "Anniversary" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Step 2
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone/i), {
      target: { value: "1234567890" },
    });
    fireEvent.click(screen.getByLabelText(/I accept the privacy policy/i));

    fireEvent.click(
      screen.getByRole("button", { name: /Confirm Reservation/i })
    );

    expect(screen.getByText(/Reservation Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
  });
});
