type numOrNull = number | null | undefined;

export interface Coords {
  x: numOrNull;
  y: numOrNull;
  width: numOrNull;
  height: numOrNull;
}

interface ReactNativeNode {
  measure?: Function;
}

/**
 * Given a react native node, measure and return its position and sizing
 * @param {ReactChild} node
 * @returns {Promise<Coords>}
 */
export default async function measureNode(
  node: React.ReactChild & ReactNativeNode
): Promise<Coords> {
  const defaultVal: Coords = {
    x: null,
    y: null,
    width: null,
    height: null
  };
  if (!node || typeof node.measure !== "function")
    return Promise.resolve(defaultVal);
  return new Promise(resolve => {
    node.measure(
      (
        _fx: numOrNull,
        _fy: numOrNull,
        width: numOrNull,
        height: numOrNull,
        px: numOrNull,
        py: numOrNull
      ) => {
        resolve({
          x: px,
          y: py,
          width,
          height
        });
      }
    );
  });
}
