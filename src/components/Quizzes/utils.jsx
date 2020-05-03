import { useEffect, useRef } from "react";

/**
 * use an effect that skips running on the first render event.
 * @param {*} effect 
 * @param {*} deps 
 */
export const useSkippingEffect = (effect, deps) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    effect();
  }, deps);
};

