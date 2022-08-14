import { axiosClient } from ".";

const productAPI = {
  async getListProduct() {
    const response = await axiosClient.get("/product");
    return response;
  },
};

export default productAPI;
