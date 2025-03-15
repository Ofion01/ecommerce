// add product, totalproduct list, remove product

// function for add product
const addProduct = async (req, res) => {
  try {
    //get products details
    const {
      name,
      discription,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    //image
    const image1 = req.files.image1[0];
    const image2 = req.files.image2[0];
    const image3 = req.files.image3[0];
    const image4 = req.files.image4[0];

    console.log(
      name,
      discription,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    );
    console.log(image1, image2, image3, image4);

    res.json({});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProducts = async (req, res) => {};

// function for removing product
const removeProduct = async (req, res) => {};

// function for single product(об отдельном)
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
