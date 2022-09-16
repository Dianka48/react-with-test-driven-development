import { useState } from "react";

const withHover = (WrappedComponent) => {
  const WithHover = (props) => {
    const [on, setOn] = useState(false);

    const onMouseOver = () => {
      setOn(true);
    };

    const onMouseOut = () => {
      setOn(false);
    };

    let style = {};
    if (on) {
      style = { border: "1px solid red" };
    }

    return (
      <div style={style} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <WrappedComponent {...props} on={on} />
      </div>
    );
  };
  WithHover.displayName = `withHover(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  }`;
  return WithHover;
};

export default withHover;
