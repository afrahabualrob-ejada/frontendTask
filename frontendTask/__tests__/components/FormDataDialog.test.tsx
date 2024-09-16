import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IFormInput } from "../../src/types";
import { TestIDs } from "../../src/TestIDs";
import FormDataDialog from "../../src/components/FormDataDialog";

describe("FormDialog Component", () => {
  const mockOnClose = jest.fn();
  const data: IFormInput = {
    firstName: "Afrah",
    lastName: "Abualrob",
    gender: "female",
    birthDate: "2024-09-01T21:00:00.000Z",
    disorders: ["PD", "Tourtte", "Dyst_G"],
    workspaces: ["Template 3", "Template 2"],
  };

  const renderComponent = (open: boolean) =>
    render(<FormDataDialog open={open} onClose={mockOnClose} data={data} />);

  test("renders FormDialog with open state", () => {
    const { getByTestId, getAllByTestId } = renderComponent(true);
    expect(getByTestId(TestIDs.dialogHeader)).toBeInTheDocument();
    expect(getByTestId(TestIDs.dialogHeader)).toHaveTextContent("PATIENT DATA");

    const DialogItemTitle = getAllByTestId(TestIDs.dialogItemTitle);
    const DialogItemContent = getAllByTestId(TestIDs.dialogItemContent);
    expect(DialogItemTitle[5]).toHaveTextContent("Workspaces:");
    expect(DialogItemContent[5]).toHaveTextContent("Template 3, Template 2");
  });

  test("calls onClose when Close button is clicked", () => {
    const { getByTestId } = renderComponent(true);
    const closeButton = getByTestId(TestIDs.dialogCloseButton);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("does not render when closed", () => {
    const { queryByTestId } = renderComponent(false);
    expect(queryByTestId(TestIDs.formDataDialog)).not.toBeInTheDocument();
  });
});
