// Show loading skeleton
function showLoadingSkeleton(containerId, count = 8) {
  const container = document.getElementById(containerId);
  if (!container) return;
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

// Helper function to create course card
function createCourseCard(course, tagColor = "bg-accent-yellow") {
  return `
    <img class="course-card-image" src="${course.image}" alt="${
    course.title
  }" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Course'">
    <div class="course-card-content">
      <span class="course-tag px-3 py-1 ${tagColor} ${
    tagColor.includes("bg-") ? "text-white" : "text-gray-800"
  } text-xs font-semibold rounded-full mb-3">${course.tag || "HOT"}</span>
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
      </div>
      <div class="course-card-button mt-4">
        <a href="${
          course.enrollBtn
        }" target="_blank" rel="noopener noreferrer" class="block">
          <div class="text-center w-full bg-[#F18526] text-white py-3 rounded-md transition duration-300 font-medium">
            Enroll Now
          </div>
        </a>
      </div>
    </div>
  `;
}

// 1. Marathon Workshop Section
showLoadingSkeleton("marathon-container", 6);
fetch("marathonData.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("marathon-container");
    if (!container) return;
    container.innerHTML = "";
    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = createCourseCard(course, "bg-red-500");
      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading marathons:", error));

// 2. Pre-recorded Courses Section
showLoadingSkeleton("courses-container", 12);
fetch("prerecordedData.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("courses-container");
    if (!container) return;
    container.innerHTML = "";
    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = createCourseCard(course, "bg-accent-yellow");
      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading courses:", error))
  .finally(() => {
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

// 3. Live Training Section
showLoadingSkeleton("livetraining-container", 6);
fetch("liveTrainingData.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("livetraining-container");
    if (!container) return;
    container.innerHTML = "";
    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = createCourseCard(course, "bg-green-500");
      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading live trainings:", error));

// 4. Pricing / Bundle Section
const pricingContainer = document.getElementById("pricing-container");
if (pricingContainer) {
  fetch("pricingData.json")
    .then((res) => res.json())
    .then((data) => {
      pricingContainer.innerHTML = "";
      data.forEach((plan) => {
        const div = document.createElement("div");
        div.className = `bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-8 ${
          plan.popular
            ? "border-4 border-bkash-pink transform scale-105"
            : "border border-gray-200"
        }`;
        div.innerHTML = `
          ${
            plan.popular
              ? '<div class="absolute top-0 right-0 bg-bkash-pink text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">জনপ্রিয়</div>'
              : ""
          }
          <div class="text-center mb-6">
            <a href="${plan.link}" target="_blank">
              <h3 class="text-2xl font-bold text-gray-800 mb-2">${plan.name}</h3>
            </a>
            <div class="flex items-center justify-center gap-2 mb-4">
              <span class="text-gray-400 line-through text-lg">${
                plan.originalPrice
              }</span>
              <span class="text-4xl font-bold text-bkash-pink">${
                plan.price
              }</span>
            </div>
          </div>
          <ul class="space-y-3 mb-8">
            ${plan.features
              .map(
                (feature) => `
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-600 text-sm">${feature}</span>
              </li>
            `
              )
              .join("")}
          </ul>
          <a href="${
            plan.checkout
          }" target="_blank" rel="noopener noreferrer" class="block">
            <button class="w-full ${
              plan.popular
                ? "bg-bkash-pink hover:bg-pink-600"
                : "bg-gray-800 hover:bg-gray-900"
            } text-white py-3 rounded-lg font-semibold transition duration-300">
              এখনই কিনুন
            </button>
          </a>
        `;
        pricingContainer.appendChild(div);
      });
    })
    .catch((error) => console.error("Error loading pricing:", error));
}

// 5. eBook Section
showLoadingSkeleton("ebook-container", 4);
fetch("ebookData.json")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("ebook-container");
    if (!container) return;
    container.innerHTML = "";
    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "course-card bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden";
      div.innerHTML = createCourseCard(course, "bg-accent-yellow");
      container.appendChild(div);
    });
  })
  .catch((error) => console.error("Error loading ebooks:", error));

// AOS Animation
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Countdown Timer
function startCountdown() {
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

    if (distance < 0) {
      clearInterval(timer);
      if (document.getElementById("countdown-timer")) {
        document.getElementById("countdown-timer").innerHTML =
          "<div class='text-center text-bkash-pink font-bold'>OFFER EXPIRED!</div>";
      }
    }
  }, 1000);
}

startCountdown();

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });
}

// Smooth Scroll
document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) mobileMenu.classList.add("hidden");
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTop");
if (scrollToTopBtn) {
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Newsletter form
const newsletterForm = document.getElementById("newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you! ${email} has been added to our mailing list.`);
    this.reset();
  });
}
