import { useSearchParams } from "react-router-dom";

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = (key: string, value?: string | string[]) => {
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
  };

  return {
    get: (key: string) => {
      const values = searchParams.getAll(key);
      return values.length > 1 ? values : values[0] ?? null;
    },
    set: setFilter,
    all: searchParams,
  };
};

export default useFilters;
