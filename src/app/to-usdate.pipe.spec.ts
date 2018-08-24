import { ToUSDatePipe } from "./to-usdate.pipe";

describe("ToUSDatePipe", () => {
  it("create an instance", () => {
    const pipe = new ToUSDatePipe();
    expect(pipe).toBeTruthy();
  });
});
