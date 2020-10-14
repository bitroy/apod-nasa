export const isImageURL = (url) => {
  const extension = url.substr(url.lastIndexOf(".") + 1);
  switch (extension) {
    case "jpg":
      return true;
    case "png":
      return true;
    case "gif":
      return true;
    default:
      return false;
  }
};
