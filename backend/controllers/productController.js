// Get all products for the current route
export const getAllProducts = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Route is working successfully",
  });
};
