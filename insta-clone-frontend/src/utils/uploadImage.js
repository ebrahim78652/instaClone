//this js file used for uploading an image to cloudinary

export const postDetails = async (imgFile) => {
  const data = new FormData();
  data.append("file", imgFile);
  data.append("upload_preset", "insta-clone");
  data.append("cloud-name", "ebrahim");

  const imgUrl = await fetch(
    "https://api.cloudinary.com/v1_1/ebrahim/image/upload",
    {
      method: "POST",
      body: data,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.url);
      return data.url;
    })
    .catch((err) => {
      console.log(err);
    });

  return imgUrl;
};
