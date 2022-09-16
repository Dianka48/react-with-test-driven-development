import { render, screen } from "../test/setup";
import Input from "./Input";

it("has is-invalid class for input when help is set", () => {
  render(<Input help="Error message" label="Label" id="label" />);
  const input = screen.getByLabelText("Label");
  expect(input.classList).toContain("is-invalid");
});

it("has invalid-feedback class for span when help is set", () => {
  render(<Input help="Error message" label="Label" id="label" />);
  const span = screen.getByText("Error message");
  expect(span.classList).toContain("invalid-feedback");
});

it("does not have is-invalid class for input when help is not set", () => {
  render(<Input label="Label" id="label" />);
  const input = screen.getByLabelText("Label");
  expect(input.classList).not.toContain("is-invalid");
});
