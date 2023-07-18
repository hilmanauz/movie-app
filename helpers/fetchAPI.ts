import axios from "axios";

export const fetchAPI = async (url: string) => {
  const { data } = await axios.get(
    url,
    {
      headers: {
        Authorization: `Bearer ${process.env.access_token}`,
      },
    }
  );
  return data;
}