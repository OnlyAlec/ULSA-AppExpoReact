import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconCircleMultiple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <Path d="M15 4A8 8 0 1 1 7 12A8 8 0 0 1 15 4M3 12A6 6 0 0 0 7 17.65V19.74A8 8 0 0 1 7 4.26V6.35A6 6 0 0 0 3 12Z" />
    </Svg>
  );
}

export default IconCircleMultiple;
