import { useRef } from "react";

import measureNode from "./utils/position/measureNode";

interface Measure {
  ref: {
    current?: React.ReactNode;
  };
  measure: Function;
}

export default function useMeasure(
  _key: string,
  _keyNext: string,
  placement: string
): Measure {
  const ref = useRef(null);
  const measure = async () => measureNode(ref.current);
  return { ref, measure };
}
