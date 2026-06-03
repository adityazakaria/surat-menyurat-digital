export const uploadToCloudinary = async (filePath) => {
  return { secure_url: "http://localhost:5000/uploads/" + filePath };
};
