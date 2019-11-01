import { useRef } from "react";

import measureNode from "./utils/position/measureNode";

type Measure = [{ current?: React.ReactNode }, Function];

/**
 * This hook provides you with a `ref` and a `measure` useful
 * for gathering positional and dimensional data from a RN node.
 *
 * TO-DO: add `callback` param to `useMeasure` that will replace
 * the `useEffect` implementation below and simplify usage.
 *
 * **USAGE:**
 *
 * ```
 * const MyComponent = () => {
 *   const [ref, measure] = useMeasure();
 *
 *   useEffect(() => {
 *     const calcPosition = async () => {
 *       const { x, y, width, height } = await measure();
 *       // do something with this data...
 *     };
 *     // adding this setTimeout made this work for me, I think
 *     // because it guarantees that the render happens before
 *     // the position is calc'd
 *     setTimeout(calcPosition, 0);
 *   }, [ref.current]);
 *
 *   return (
 *     <SomeComponent ref={ref} />
 *   )
 * }
 * ```
 */
export default function useMeasure(): Measure {
  const ref = useRef(null);
  const measure = async () => measureNode(ref.current);
  return [ref, measure];
}
