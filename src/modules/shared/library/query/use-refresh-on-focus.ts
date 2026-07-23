import { useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

/** Refetch when the screen gains focus (tabs stay mounted). Skips the first mount. */
export function useRefreshOnFocus(refetch: () => unknown) {
  const firstRender = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      void refetch();
    }, [refetch]),
  );
}
