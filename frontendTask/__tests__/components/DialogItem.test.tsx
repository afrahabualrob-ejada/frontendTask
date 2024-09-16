import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DialogItem from "../../src/components/DialogItem";
import { TestIDs } from "../../src/TestIDs";
import dayjs from "dayjs";

describe("DialogItem Component", () => {
  const component = (title: string, data: string | string[] | Date) =>
    render(<DialogItem title={title} data={data} />);

  test("render when data is String", () => {
    const { getByTestId, getByText } = component("FirstName", "Afrah");
    expect(getByTestId(TestIDs.dialogItemTitle)).toHaveTextContent("FirstName");
    const content = getByTestId(TestIDs.dialogItemContent);
    expect(getByText("FirstName:")).toHaveStyle("font-weight: bold");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Afrah");
  });

  test("render when data is Array of string", () => {
    const { getByTestId } = component("Disorders", ["PD", "Tourtte", "Dyst_G"]);
    const content = getByTestId(TestIDs.dialogItemContent);
    expect(getByTestId(TestIDs.dialogItemTitle)).toHaveTextContent("Disorders");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("PD, Tourtte, Dyst_G");
  });

  test("render when data is Date", () => {
    const date = "2024-09-01T21:00:00.000Z";
    const { getByTestId } = component("BirthDate", date);
    const content = getByTestId(TestIDs.dialogItemContent);
    expect(getByTestId(TestIDs.dialogItemTitle)).toHaveTextContent("BirthDate");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(dayjs(date).format("DD-MM-YYYY"));
    expect(getByTestId(TestIDs.dialogItemContent)).toHaveTextContent(
      "02-09-2024"
    );
  });
});
