import React from "react";
import classnames from "classnames";
import { useWindowDimensions } from "../../../services/Enhancer";

const LandingComponent = () => {
  const { isMobile } = useWindowDimensions();

  return (
    <div className="x-landing">
      <p
        className={classnames(
          isMobile ? "heading-lg-bolder" : "heading-xl-bolder"
        )}
      >
        Welcome
      </p>
      <p
        className={classnames(
          "text-center",
          isMobile ? "heading-lg-bolder" : "heading-xl-bolder"
        )}
      >
        Find Your Travel Destination
      </p>
    </div>
  );
};

export default LandingComponent;
