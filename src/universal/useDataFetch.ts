import { useEffect, useState } from "react";

const useDataFetch = (
  callback: () => Promise<any>,
  initialData: any = null
) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await callback();
        setData(result);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [callback]);

  return { data, isLoading, isError };
};

export default useDataFetch;
