// Show loading skeleton
function showLoadingSkeleton(containerId, count = 8) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className =
      "bg-white rounded-lg shadow-md overflow-hidden animate-pulse";
    skeleton.innerHTML = `
      <div class="h-48 bg-gray-300"></div>
      <div class="p-4">
        <div class="h-4 bg-gray-300 rounded mb-2"></div>
        <div class="h-6 bg-gray-300 rounded mb-2"></div>
        <div class="h-4 bg-gray-300 rounded mb-4"></div>
        <div class="flex justify-between mb-4">
          <div class="h-6 bg-gray-300 rounded w-20"></div>
          <div class="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        <div class="h-10 bg-gray-300 rounded"></div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

// Show loading for courses
showLoadingSkeleton("courses-container", 8);

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const courseContainer = document.getElementById("courses-container");
    courseContainer.innerHTML = ""; // Clear loading skeleton

    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = `
        <img class="course-card-image" src="${course.image}" alt="${
        course.title
      }" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Course+Image'">
        <div class="course-card-content">
          <span class="course-tag px-3 py-1 bg-accent-yellow text-xs font-semibold rounded-full mb-3">${
            course.tag || "HOT"
          }</span>
          <div class="course-card-title">
            <a class="text-lg font-semibold hover:text-bkash-pink transition-colors" href="${
              course.courseLink
            }" target="_blank">
              <h3 class="text-lg font-semibold mb-2 line-clamp-2">${
                course.title
              }</h3>
            </a>
            <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">${
              course.subtitle
            }</p>
          </div>
          <div class="course-card-price flex items-center justify-between">
            <div>
              ${
                course.oldPrice
                  ? `<del class="text-gray-500 text-sm">BDT ${course.oldPrice}</del>`
                  : ""
              }
              <p class="text-xl font-bold text-bkash-pink">BDT ${
                course.newPrice
              }</p>
            </div>
            ${
              course.discount
                ? `<span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">${course.discount}</span>`
                : ""
            }
          </div>
          <div class="course-card-button mt-4">
            <a href="${
              course.enrollBtn
            }" target="_blank" rel="noopener noreferrer" class="block">
              <div class="text-center w-full bg-bkash-pink text-white py-3 rounded-md hover:bg-opacity-90 transition duration-300 font-medium">
                Enroll Now
              </div>
            </a>
          </div>
        </div>
      `;
      courseContainer.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading courses:", error))
  .finally(() => {
    // Hide loading screen after courses are loaded
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 300);
      }
    }, 1000);
  });

// ebook section
// Show loading for ebooks
showLoadingSkeleton("ebook-container", 4);

fetch("ebookData.json")
  .then((res) => res.json())
  .then((data) => {
    const courseContainer = document.getElementById("ebook-container");
    courseContainer.innerHTML = ""; // Clear loading skeleton

    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = `
        <img class="course-card-image" src="${course.image}" alt="${
        course.title
      }" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=eBook+Image'">
        <div class="course-card-content">
          <span class="course-tag px-3 py-1 bg-accent-yellow text-xs font-semibold rounded-full mb-3">${
            course.tag || "HOT"
          }</span>
          <div class="course-card-title">
            <a class="text-lg font-semibold hover:text-bkash-pink transition-colors" href="${
              course.courseLink
            }" target="_blank">
              <h3 class="text-lg font-semibold mb-2 line-clamp-2">${
                course.title
              }</h3>
            </a>
          </div>
          <div class="course-card-price flex items-center justify-between">
            <div>
              ${
                course.oldPrice
                  ? `<del class="text-gray-500 text-sm">BDT ${course.oldPrice}</del>`
                  : ""
              }
              <p class="text-xl font-bold text-bkash-pink">BDT ${
                course.newPrice
              }</p>
            </div>
            ${
              course.discount
                ? `<span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">${course.discount}</span>`
                : ""
            }
          </div>
          <div class="course-card-button mt-4">
            <a href="${
              course.enrollBtn
            }" target="_blank" rel="noopener noreferrer" class="block">
              <div class="text-center w-full bg-bkash-pink text-white py-3 rounded-md hover:bg-opacity-90 transition duration-300 font-medium">
                Order Now
              </div>
            </a>
          </div>
        </div>
      `;
      courseContainer.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading courses:", error));

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Countdown Timer
function startCountdown() {
  // Set the date we're counting down to (7 days from now)
  const countDownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    if (document.getElementById("days")) {
      document.getElementById("days").innerHTML = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").innerHTML = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").innerHTML = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").innerHTML = seconds
        .toString()
        .padStart(2, "0");
    }

    // If the count down is over, show expired message
    if (distance < 0) {
      clearInterval(timer);
      if (document.getElementById("countdown-timer")) {
        document.getElementById("countdown-timer").innerHTML =
          "<div class='text-center text-bkash-pink font-bold'>OFFER EXPIRED!</div>";
      }
    }
  }, 1000);
}

// Start countdown when page loads
startCountdown();

document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });

document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("mobile-menu").classList.add("hidden");
    const target = document.querySelector(this.getAttribute("href"));
    const offsetTop = target.offsetTop - 70; // Adjust for fixed header
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
  });
});

const swiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const pricingToggle = document.getElementById("pricing-toggle");
const monthlyElements = document.querySelectorAll(".pricing-monthly");
const yearlyElements = document.querySelectorAll(".pricing-yearly");

pricingToggle.addEventListener("change", function () {
  if (this.checked) {
    monthlyElements.forEach((elem) => elem.classList.add("hidden"));
    yearlyElements.forEach((elem) => elem.classList.remove("hidden"));
  } else {
    monthlyElements.forEach((elem) => elem.classList.remove("hidden"));
    yearlyElements.forEach((elem) => elem.classList.add("hidden"));
  }
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.remove("scale-0");
    scrollToTopBtn.classList.add("scale-100");
  } else {
    scrollToTopBtn.classList.remove("scale-100");
    scrollToTopBtn.classList.add("scale-0");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Newsletter form (if exists)
if (document.getElementById("newsletter-form")) {
  document
    .getElementById("newsletter-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Thank you! ${email} has been added to our mailing list.`);
      this.reset();
    });
}
