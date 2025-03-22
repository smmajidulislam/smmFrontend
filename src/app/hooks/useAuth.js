import { useEffect, useState } from "react";

const useAuth = (route, apiData) => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchServices = async () => {
      try {
        const response = await fetch(`${baseUrl}${route}`);
        const res = await response.json(response);
        setCategory(res);
      } catch (error) {
        setCategory([]);
      }
    };
    fetchServices();
  }, [route, apiData]);

  return { category, setCategory };
};

export default useAuth;
