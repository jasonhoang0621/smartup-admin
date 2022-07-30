import { axiosClient } from ".";

const userAPI = {
  async login(data) {
    const response = await axiosClient.post("/login", data);
    return response;
  },
  async verify() {
    const response = await axiosClient.get("/verify");
    return response;
  },
};

export default userAPI;
