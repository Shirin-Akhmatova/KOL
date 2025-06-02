import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = useCallback(
    (key: string, value?: string | string[]) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);

      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => newParams.append(key, v));
        } else {
          newParams.set(key, value);
        }
      }

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );
  const setFilters = useCallback(
    (filters: Record<string, string | string[] | undefined>) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(filters).forEach(([key, value]) => {
        newParams.delete(key);
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => newParams.append(key, v));
          } else {
            newParams.set(key, value);
          }
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );
  const getFilter = useCallback(
    (key: string) => {
      const values = searchParams.getAll(key);
      return values.length > 1 ? values : values[0] ?? null;
    },
    [searchParams]
  );
  return {
    getFilter: getFilter,
    setFilter: setFilter,
    setFilters: setFilters,
    clear: () => setSearchParams({}, { replace: true }),
    all: searchParams,
  };
};

export default useFilters;
