// 1. SELECT ELEMENTS
const hamburger = document.querySelector(".hamburger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const homeCaret = document.getElementById("home-caret");
const homeDropdown = document.getElementById("home-dropdown");

// 2. SIDEBAR TOGGLE LOGIC (HAMBURGER CLICK)
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");

  // AOS Animation Reset when sidebar opens
  if (sidebar.classList.contains("active")) {
    const aosItems = sidebar.querySelectorAll("[data-aos]");

    aosItems.forEach((item) => {
      item.classList.remove("aos-animate");
    });

    // Small delay to allow sidebar to slide in before AOS starts
    setTimeout(() => {
      AOS.refreshHard();
    }, 100);
  }
});

// 3. HOME DROPDOWN TOGGLE (CARET CLICK)
// Specifically handles showing/hiding Home 2 and rotating the arrow
// if (homeCaret) {
//   homeCaret.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevents click from bubbling up

//     homeDropdown.classList.toggle("open");
//     homeCaret.classList.toggle("rotate");
//   });
// }
// 4. CLOSE SIDEBAR (OVERLAY CLICK)

overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// Drop Down
// 5)) DROP DOWN TOGGLE LOGIC (DROPDOWN ICON CLICK)
// const dropdown = document.querySelector(".dropdown");
// const dropToggle = document.querySelector(".drop-toggle"); 

// dropToggle.addEventListener("click", function (e) {
//   e.preventDefault(); 
//   e.stopPropagation(); 
//   dropdown.classList.toggle("active");
// });

// // Close dropdown when clicking outside
// window.addEventListener("click", function () {
//   dropdown.classList.remove("active");
// });

// End

// data target count

/**
 * BIO-COUNTER MODULE
 * Handles Intersection Observation and GSAP Count-up
 */
const initCounters = () => {
  const statsSection = document.querySelector(".global-stats");
  const counters = document.querySelectorAll(".counter");

  if (!statsSection) return;

  // 1. Logic to animate the numbers
  const startCounting = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const suffix = counter.getAttribute("data-suffix") || "";

      gsap.to(counter, {
        innerText: target,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 }, // Increments by whole numbers
        onUpdate: function () {
          // Update text with suffix during the animation
          counter.innerText = Math.floor(this.targets()[0].innerText) + suffix;
        },
        onComplete: function () {
          // Ensure the final value is exact
          counter.innerText = target + suffix;
        },
      });
    });
  };

  // 2. Intersection Observer to detect arrival
  const observerOptions = {
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting();
        // Stop observing after it runs once to keep data stable
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(statsSection);
};

// Initialize on load
document.addEventListener("DOMContentLoaded", initCounters);
