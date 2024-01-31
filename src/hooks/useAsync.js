import { useReducer, useRef, useEffect } from 'react';

const useAsync = (fn) => {
  const initialState = { loading: false, error: null, value: null };
  const stateReducer = (_, action) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null };
      case 'finish':
        return { loading: false, error: null, value: action.value };
      case 'error':
        return { loading: false, error: action.error, value: null };
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const run = async (...args) => {
    try {
      dispatch({ type: 'start' });
      const value = await fn(...args);
      if (isMountedRef.current) {
        dispatch({ type: 'finish', value });
      }
      return value;
    } catch (error) {
      if (isMountedRef.current) {
        dispatch({ type: 'error', error });
      }
      return error;
    }
  };

  return { ...state, run };
};

export default useAsync;
