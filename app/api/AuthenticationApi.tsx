import axios from "axios";

export const Signup = async (data: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/`,
    data
  );
  console.log("register");
  return res;
};
