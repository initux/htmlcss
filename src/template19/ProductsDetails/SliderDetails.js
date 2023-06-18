import React, { useState } from "react";

const Slider = ({ children }) => {
  // console.log(children);

  // children.map((item, index) => { console.log(item.type); })
  // const data = children?.filter((child) => {
  //   if (child !== "") return child;
  // });
  // console.log("child, ", data);

  const [active, setActive] = useState(0);

  let item = [];
    if (children[0] === null || children[0] === "") {
      item = children[1]?.filter((child) => {
        if (child.type !== "") return child;
      });
    } else {
      item = [children[0], ...children[1]];
    }

  const thumbStyle = {
    width: "55px",
    height: "55px",
    objectFit: "cover",
    
  };

//   const thumbs = React.Children.map(children, (child) => {
  const thumbs = item?.map((child) => {
    if (
      child.type !== "" &&
      child.type !== undefined &&
      child.type !== null &&
      child.type === "img"
    ) {
      return React.cloneElement(child, { style: thumbStyle });
    } else if (
      child.type !== "" &&
      child.type !== undefined &&
      child.type !== null &&
      child.type !== "img"
    ) {
      // return React.cloneElement(child, { style: thumbStyle });
      return React.createElement(
        "img",
        {
          src: "https://media.istockphoto.com/videos/play-icon-like-on-player-video-id1212476803?s=640x640",
          style: thumbStyle,
        },
        null
        // "My First React Code"
      );
    }
  });

  const handleChange = (index) => {
    if (item.length > index) setActive(index);
    else {
      setActive(0);
    }
  };
  return (
    <>
      {/* <div className="slider-container"> */}
      <div className="image-with-video-slider">
        {item?.map((child, i) => {
          return (
            <div
              key={i}
              className={
                i === active
                  ? "image-with-video-slider-item active"
                  : "image-with-video-slider-item"
              }
            >
              {child}
            </div>
          );
        })}
      </div>
      {/* </div> */}

      <div className="thumb-container">
        {thumbs?.map((item, index) => {
          return (
            <div
              // className="d-thumb"
              className={
                index === active ? "d-thumb thumb-active" : "d-thumb"
              }
              //   style={{outline: "5px solid green"}}

              key={index}
              // style={{ margin: "10px", padding: "10px" }}
              onClick={() => handleChange(index)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
