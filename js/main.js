window.onload = function () {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("opacity0");
    preloader.addEventListener("transitionend", function () {
      preloader.classList.add("d-none");
    });
  }
  const body = document.querySelector("body");
  body.classList.add("overflowVisible");
};

/*************************************************************************************** */

document.addEventListener("DOMContentLoaded", function () {
  // LazyLoad
  function lazyLoad() {
    const images = document.querySelectorAll(".lazy-img");

    const optionsLazyLoad = {};

    const imageObserver = new IntersectionObserver(function (enteries) {
      enteries.forEach(function (entery) {
        if (!entery.isIntersecting) {
          return;
        } else {
          preloadImage(entery.target);
          imageObserver.unobserve(entery.target);
        }
      });
    }, optionsLazyLoad);

    images.forEach(function (image) {
      imageObserver.observe(image);
    });
  }

  function preloadImage(img) {
    img.src = img.getAttribute("data-src");
    img.onload = function () {
      img.removeAttribute("data-src");
      img.parentElement.classList.remove("loading-img");
      img.parentElement.classList.add("loaded-img");
      // img.parentElement.parentElement.classList.add("lazy-head-img");
    };
  }

  lazyLoad();
  /*************************************************************************************** */

  // fixed header
  let header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1) {
      header.classList.add("fixed-header");
    } else if (window.scrollY === 0) {
      header.classList.remove("fixed-header");
    }
  });
  /*************************************************************************************** */

  // Infinite Marquee
  new InfiniteMarquee({
    element: ".marquee-container",
    speed: 45000,
    direction:
      document.documentElement.getAttribute("dir") === "rtl" ? "left" : "right",
    gap: "15px",
    duplicateCount: 3,
    mobileSettings: {
      speed: 50000,
    },
    on: {
      beforeInit: () => {
        console.log("Not Yet Initialized");
      },

      afterInit: () => {
        console.log("Initialized");
      },
    },
  });
  /*************************************************************************************** */

  // Counters
  const statisticsSection = document.querySelector(".statistics");
  if (statisticsSection) {
    const sectionOffsetTop = statisticsSection.offsetTop;
    const windowHeight = window.innerHeight;
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition > sectionOffsetTop - windowHeight) {
        const numberElements = document.querySelectorAll(".stat-item .number");
        const interval = 2500;
        numberElements.forEach((numberElement) => {
          if (numberElement.textContent == 0) {
            let startValue = 0;
            const endValue = parseInt(numberElement.dataset.num);
            const duration = Math.floor(interval / endValue);
            const counter = setInterval(() => {
              startValue++;
              numberElement.textContent = startValue;
              if (startValue === endValue) {
                clearInterval(counter);
              }
            }, duration);
          }
        });
      }
    });
  }
  /*************************************************************************************** */

  //  mobile nav

  const openNavBtn = document.querySelector(".open-nav-btn");
  const closeNavBtn = document.querySelector(".close-nav-btn");
  const navigation = document.querySelector(".navigation");
  const body = document.querySelector("body");

  openNavBtn.addEventListener("click", function () {
    navigation.classList.add("open-sidebar");
    body.classList.add("overflowHidden");
  });
  closeNavBtn.addEventListener("click", function () {
    navigation.classList.remove("open-sidebar");
    body.classList.remove("overflowHidden");
  });

  /*************************************************************************************** */

  // totop Button

  const toTopBtn = document.querySelector(".toTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
      toTopBtn.classList.add("showToTop");
    } else {
      toTopBtn.classList.remove("showToTop");
    }
  });

  toTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}); // End of DOMContentLoaded
