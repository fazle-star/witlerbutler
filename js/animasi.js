const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots-container");
const detailSections = document.getElementById("detail-sections");
const characters = [
  {
    name: "RISOL",
    color: "#cfb312",
    desc: "Sunlight’s precision, victory’s sight—One shot, one light!☀️\nSAYA VTUBER dari Whicker Butler Gen 1: NO1R Maiden!\nSuka ngobrol dan nyanyi",
  },
  {
    name: "DARLYNE",
    color: "#e613c9",
    desc: "Call my name in the midnight, and my love will blooming for you. Darlyne siap membantu memperbaiki kisah cintamu.\nWhicker Butler Gen 1: NO1R Maidens",
  },
  {
    name: "THALITA",
    color: "#56fa15",
    desc: "Whicker Butler GEN 1: NO1R Maidens || ID/EN || All eyes on winds, Collides zone, wings! ||",
  },
  {
    name: "IGNIS",
    color: "#f33412",
    desc: "The contract is sealed, The flames unleashed hi i'm Ingis Grimoire from Whicker Butler Gen 0 M0NARCH!!\nHalo aku Butler Wibu Softspoken, aku anak baik pliss jangan bully aku yaa 😭😭",
  },
  {
    name: "VALTHEA",
    color: "#1133f3",
    desc: "The stage is set, the storm is brewing, let the show begin! Valthea Nankila from Whicker Butler Gen 0 is ready to entertain you :)\nBaik-baik ya sama aku soalnya aku baik hati dan tidak sombong juga :P",
  },
];

let currentDetailIndex = -1;

// Create dots for each slide
characters.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.className =
    "selector-box w-8 h-5 skew-x-[-20deg] bg-white/20 cursor-pointer";
  dot.id = `dot-${i}`;
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

let index = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}vw)`;
  document
    .querySelectorAll(".fade-in")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".selector-box")
    .forEach((dot) => dot.classList.remove("active"));

  setTimeout(() => {
    document.getElementById(`name-${index}`).classList.add("active");
    document.getElementById(`desc-${index}`).classList.add("active");
    document.getElementById(`dot-${index}`).classList.add("active");

    const slide = document.querySelectorAll("#slider > div")[index];
    slide.querySelector(".absolute.right-10").style.backgroundColor =
      characters[index].color;

    createFloatingParticles();
  }, 300);
}

function nextSlide() {
  index = (index + 1) % characters.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + characters.length) % characters.length;
  updateSlider();
}

function goToSlide(i) {
  index = i;
  updateSlider();
}

function toggleDetail(detailIndex) {
  // Sembunyikan semua detail section
  document.querySelectorAll(".detail-section").forEach((section) => {
    section.classList.remove("active");
    section
      .querySelectorAll(".slide-from-left, .slide-from-right")
      .forEach((el) => {
        el.classList.remove("active");
      });
  });

  // Tampilkan detail-sections jika belum muncul
  detailSections.style.display = "block";

  if (currentDetailIndex === detailIndex) {
    currentDetailIndex = -1;
    detailSections.style.display = "none"; // Sembunyikan lagi jika ditutup
    return;
  }

  currentDetailIndex = detailIndex;
  const detailSection = document.getElementById(`detail-${detailIndex}`);

  // Aktifkan detail section
  detailSection.classList.add("active");

  // Scroll ke detail section dengan animasi
  setTimeout(() => {
    detailSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Aktifkan animasi slide setelah scroll selesai
    setTimeout(() => {
      detailSection
        .querySelectorAll(".slide-from-left, .slide-from-right")
        .forEach((el) => {
          el.classList.add("active");
        });
    }, 500); // Delay untuk sinkronisasi dengan scroll
  }, 100);
}

function createFloatingParticles() {
  const currentSlide = document.querySelectorAll("#slider > div")[index];
  const particleContainer =
    currentSlide.querySelector(".absolute.left-10");

  particleContainer
    .querySelectorAll(".light-particle")
    .forEach((p) => p.remove());

  for (let i = 0; i < 6; i++) {
    const particle = document.createElement("div");
    particle.className = "light-particle";
    particle.style.left = Math.random() * 300 + "px";
    particle.style.top = Math.random() * 200 + "px";
    particle.style.animationDelay = Math.random() * 2 + "s";
    particle.style.animationDuration = 2 + Math.random() * 2 + "s";
    particleContainer.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 5000);
  }
}

updateSlider();

setInterval(() => {
  if (currentDetailIndex === -1) {
    nextSlide();
  }
}, 8000);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "Escape" && currentDetailIndex !== -1) {
    toggleDetail(currentDetailIndex);
  }
});

document.querySelectorAll(".detail-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform =
      "perspective(1000px) rotateX(-5deg) translateY(-5px)";
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform =
      "perspective(1000px) rotateX(0deg) translateY(0px)";
  });
});

const imageBackgrounds = [
  {
    url: 'url("risolimg/risol.png")',
    size: "cover",
    position: "center",
  },
  {
    url: 'url("risolimg/risol2.jpg")',
    size: "cover",
    position: "center",
  },
  {
    url: 'url("risolimg/risol3.jpg")',
    size: "cover",
    position: "center top",
  },
  {
    url: 'url("risolimg/risol4.jpg")',
    size: "cover",
    position: "center",
  },
  {
    url: "linear-gradient(135deg, #fefa0d 0%, #fefc73 100%)",
    size: "cover",
    position: "center",
  },
];

let currentImageIndex = 0;

function changeImage() {
  const imageElement = document.querySelector(".character-image");
  currentImageIndex = (currentImageIndex + 1) % imageBackgrounds.length;

  imageElement.style.transform = "scale(0.8) rotateY(90deg)";

  setTimeout(() => {
    const currentBg = imageBackgrounds[currentImageIndex];

    imageElement.style.background = currentBg.url;
    imageElement.style.backgroundSize = currentBg.size;
    imageElement.style.backgroundPosition = currentBg.position;
    imageElement.style.backgroundRepeat = "no-repeat";

    imageElement.style.transform = "scale(1) rotateY(0deg)";
  }, 200);
}

function autoAdjustImage() {
  const imageElement = document.querySelector(".character-image");
  const currentBg = imageBackgrounds[currentImageIndex];

  if (currentBg.url.includes("url(")) {
    const imgUrl = currentBg.url.match(/url\("(.+)"\)/)[1];
    const img = new Image();

    img.onload = function () {
      const imgRatio = this.width / this.height;
      const containerRatio =
        imageElement.offsetWidth / imageElement.offsetHeight;

      if (imgRatio > containerRatio) {
        imageElement.style.backgroundSize = "contain";
        imageElement.style.backgroundPosition = "center";
      } else {
        imageElement.style.backgroundSize = "cover";
        imageElement.style.backgroundPosition = "center";
      }
    };

    img.src = imgUrl;
  }
}

function changeImageSize(size) {
  const imageElement = document.querySelector(".character-image");

  switch (size) {
    case "contain":
      imageElement.style.backgroundSize = "contain";
      imageElement.style.backgroundPosition = "center";
      break;
    case "cover":
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center";
      break;
    case "stretch":
      imageElement.style.backgroundSize = "100% 100%";
      imageElement.style.backgroundPosition = "center";
      break;
    case "fit-width":
      imageElement.style.backgroundSize = "100% auto";
      imageElement.style.backgroundPosition = "center";
      break;
    case "fit-height":
      imageElement.style.backgroundSize = "auto 100%";
      imageElement.style.backgroundPosition = "center";
      break;
    case "small":
      imageElement.style.backgroundSize = "80%";
      imageElement.style.backgroundPosition = "center";
      break;
    case "large":
      imageElement.style.backgroundSize = "120%";
      imageElement.style.backgroundPosition = "center";
      break;
    case "auto":
      autoAdjustImage();
      break;
    default:
      imageElement.style.backgroundSize = "contain";
      imageElement.style.backgroundPosition = "center";
  }
}

function changeImagePosition(position) {
  const imageElement = document.querySelector(".character-image");
  imageElement.style.backgroundPosition = position;
}

function changeImageHeight(height) {
  const imageElement = document.querySelector(".character-image");
  imageElement.style.height = height + "px";
}

function changeImageWidth(width) {
  const imageElement = document.querySelector(".character-image");
  imageElement.style.width = width + "%";
}

function setImagePreset(preset) {
  const imageElement = document.querySelector(".character-image");

  switch (preset) {
    case "square":
      imageElement.style.width = "100%";
      imageElement.style.height = "300px";
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center";
      break;
    case "portrait":
      imageElement.style.width = "100%";
      imageElement.style.height = "450px";
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center top";
      break;
    case "landscape":
      imageElement.style.width = "100%";
      imageElement.style.height = "250px";
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center";
      break;
    case "fullscreen":
      imageElement.style.width = "100%";
      imageElement.style.height = "500px";
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center";
      break;
    case "character":
      imageElement.style.width = "100%";
      imageElement.style.height = "400px";
      imageElement.style.backgroundSize = "cover";
      imageElement.style.backgroundPosition = "center top";
      break;
    default:
      imageElement.style.width = "100%";
      imageElement.style.height = "400px";
      imageElement.style.backgroundSize = "contain";
      imageElement.style.backgroundPosition = "center";
  }
}

document.querySelectorAll(".preference-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.boxShadow = "none";
  });
});

document.querySelectorAll(".profile-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    if (e.target.classList.contains("character-image")) return;

    this.style.transform = "scale(1.02)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

document.addEventListener("mousemove", function (e) {
  const stars = document.querySelectorAll(".floating-star");
  stars.forEach((star) => {
    const speed = parseFloat(
      star.getAttribute("data-speed") || Math.random() * 0.2
    );
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    star.style.transform = `translate(${x}px, ${y}px) rotate(${x * y}deg)`;
  });
});

// Initialize on load
window.addEventListener("load", () => {
  updateSlider();
  createFloatingParticles();
  document.querySelectorAll(".floating-star").forEach((star) => {
    star.setAttribute("data-speed", Math.random() * 0.2);
  });
  initializeSliders();
});

// Add this new slider functionality
function initializeSliders() {
  document.querySelectorAll(".lore-image-slider").forEach((slider) => {
    const container = slider.querySelector(".slider-container");
    const images = slider.querySelectorAll(".slider-image");
    const nav = slider.querySelector(".slider-nav");
    let currentIndex = 0;

    // Create navigation dots
    images.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(idx));
      nav.appendChild(dot);
    });

    // Add button listeners
    slider.querySelector(".prev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlider();
    });

    slider.querySelector(".next").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider();
    });

    function goToSlide(idx) {
      currentIndex = idx;
      updateSlider();
    }

    function updateSlider() {
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      slider.querySelectorAll(".slider-dot").forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    }
  });
}

    // Add Navbar functionality
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });

function changeImage(event) {
    const charImage = event.target;
    const char = charImage.getAttribute('data-char');
    const currentImage = charImage.style.backgroundImage;
    const images = characterImages[char];
    
    let currentIndex = 0;
    for(let i = 0; i < images.length; i++) {
        if(currentImage.includes(images[i])) {
            currentIndex = i;
            break;
        }
    }
    
    const nextIndex = (currentIndex + 1) % images.length;
    charImage.style.backgroundImage = `url('${images[nextIndex]}')`;
}

// Initialize character images
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.character-image').forEach(img => {
        const char = img.getAttribute('data-char');
        if(char && characterImages[char]) {
            img.style.backgroundImage = `url('${characterImages[char][0]}')`;
        }
    });
});