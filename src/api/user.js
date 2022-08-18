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
  async register(data) {
    const response = await axiosClient.post("/register", data);
    return response;
  },
  async getListAdmin() {
    const response = await axiosClient.get("/admin");
    return response;
  },
  async getListUser() {
    const response = await axiosClient.get("/user");
    return response;
  },
  async blockUser(email) {
    const response = await axiosClient.post(`/deleteAccount`, { email });
    return response;
  },
  async unblockUser(id) {
    const response = await axiosClient.post(`/deleteAccount`);
    return response;
  },
};

export default userAPI;
