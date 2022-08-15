import { axiosClient } from ".";

const orderAPI = {
  async getListOrder() {
    const response = await axiosClient.get("/order");
    return response;
  },
};

export default orderAPI;
