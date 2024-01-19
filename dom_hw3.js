"use strict";

const accessKey = "надо держать в секрете)";

function getRandomImage() {
  fetch("https://api.unsplash.com/photos/random?client_id=" + accessKey)
    .then((response) => response.json())
    .then((data) => {
      const image = data.urls.regular;
      const photographer = data.user.name;

      document.getElementById("galleryImage").src = image;
      document.getElementById("photographerInfo").innerText = `Photographer: ${photographer}`;

      const imageInfo = {
        url: image,
        photographer: photographer,
        likes: 0,
      };
      localStorage.setItem("currentImage", JSON.stringify(imageInfo));
    })
    .catch((error) => {
      console.log("Error fetching image:", error);
    });
}

document.getElementById("likeButton").addEventListener("click", function () {
  let likeCount = parseInt(document.getElementById("likeCount").innerText);
  likeCount += 1;

  document.getElementById("likeCount").innerText = likeCount;

  const currentImageInfo = JSON.parse(localStorage.getItem("currentImage"));
  currentImageInfo.likes = likeCount;

  localStorage.setItem("currentImage", JSON.stringify(currentImageInfo));
});

window.onload = function () {
  const savedImageInfo = localStorage.getItem("currentImage");

  if (savedImageInfo) {
    const imageInfo = JSON.parse(savedImageInfo);
    
    document.getElementById("galleryImage").src = imageInfo.url;
    document.getElementById("photographerInfo").innerText = `Photographer: ${imageInfo.photographer}`;
    document.getElementById("likeCount").innerText = imageInfo.likes;
  } else {
    getRandomImage();
  }
};
