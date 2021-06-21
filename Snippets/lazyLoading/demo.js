//Adapted from: https://scotch.io/tutorials/lazy-loading-images-for-performance-using-intersection-observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const fetchImage = (url) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

const loadImage = (image) => {
    const url = image.getAttribute("data-src");
    fetchImage(url).then(() => {
      image.src = url;
    })
  }

const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      loadImage(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, options);
const images = document.querySelectorAll("img");
console.log(images);

images.forEach((img) => {
  observer.observe(img);
});
