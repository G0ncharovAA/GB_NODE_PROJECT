"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slides img");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.querySelector(".dots");

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[index].style.display = "block";
  }

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        showSlide(index);
        currentSlide = index;
        updateActiveDot();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateActiveDot() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    updateActiveDot();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    updateActiveDot();
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  createDots();
  showSlide(currentSlide);
});
