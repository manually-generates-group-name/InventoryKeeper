import { render, fireEvent, screen } from "@testing-library/react";
import AlexAPI from "./pages/AlexAPI";

//test block
test("changes button text", () => {
// render the component on virtual dom
render(<AlexAPI />);

//select the elements you want to interact with
const signinBtn = screen.getByTestId("Sign in");

//interact with those elements
fireEvent.click(signinBtn);

//assert the expected result
expect(signinBtn).toHaveTextContent("Signing in...");
});