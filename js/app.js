fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const courseContainer = document.getElementById("courses-container");

    data.courses.forEach((course) => {
      const div = document.createElement("div");
      div.className =
        "bg-white p-2 rounded-lg shadow-md hover:shadow-xl transition duration-300";
      div.innerHTML = `
                                    <img class="rounded-md" src="${
                                      course.image
                                    }" alt="${
        course.title
      }" class="w-full h-48 object-cover">
                                    <div class="p-2">
                                      <div class="inline-block px-3 py-1 bg-accent-yellow text-xs font-semibold rounded-full mb-3">${
                                        course.badge || "HOT"
                                      }</div>
                                      <h3 class="text-xl font-semibold font-poppins mb-2">${
                                        course.title
                                      }</h3>
                                      <p class="text-gray-600 mb-4 text-sm">• ${
                                        course.subtitle
                                      }</p>
                                      <div class="flex items-center justify-between mb-4">
                                        <div>
                                          <del class="text-gray-500 text-sm">${
                                            course.oldPrice
                                              ? `${course.oldPrice}`
                                              : ""
                                          }</del>
                                          <p class="text-xl font-bold text-bkash-pink">${
                                            course.newPrice
                                          }</p>
                                        </div>
                                        <span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">${
                                          course.discount || ""
                                        }</span>
                                      </div>
                                     <a href="${course.enrollBtn}">
  <div class="text-center w-full bg-bkash-pink text-white py-2 rounded-md hover:bg-opacity-90 transition duration-300">
    Enroll Now
  </div>
</a>

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

document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you! ${email} has been added to our mailing list.`);
    this.reset();
  });
