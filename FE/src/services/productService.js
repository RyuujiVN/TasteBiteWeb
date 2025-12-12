import { instance } from "~/api";


const filter = async (params) => {
  return await instance.get("/product/filter", {
    params: params
  });
}

const productService = {
  filter
}

export default productService