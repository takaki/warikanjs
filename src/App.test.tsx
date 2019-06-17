import { mount } from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

it("renders without crashing", () => {
  ReactDOM.render(<App />, document.createElement("root"));
});

describe("<App/>", () => {
  it("test", () => {
    const app = mount(<App />);
    expect(app.find("#total").text()).toBe("1000");
    expect(app.find("#total-number").text()).toBe("1");
    const plus = app.find("button.or-plus-button");
    plus.find("button.or-plus-button").simulate("click");
    expect(app.find("#total").text()).toBe("2000");
  });
});
