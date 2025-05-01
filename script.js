// تفعيل مكتبة AOS (Animation on Scroll)
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000, // ضبط مدة التأثير
    easing: "ease-in-out", // نوع التأثير
    disable: "mobile", // تعطيل التأثيرات على الجوال لتحسين الأداء
    once: true, // تشغيل التأثير مرة واحدة فقط
  });

  // تطبيق التعديلات المتجاوبة عند تحميل الصفحة
  adjustResponsiveElements();
});
// احصل على اسم الصفحة الحالية
const currentPage = window.location.pathname.split("/").pop();

// احصل على كل روابط التنقل
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  // إذا تطابق الرابط مع الصفحة الحالية، أضف له class "active"
  if (linkPage === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

document.getElementById("showMoreBtn").addEventListener("click", function () {
  const extraCards = document.querySelectorAll(".extra-card");
  const btn = this;

  if (btn.textContent === "عرض المزيد") {
    // إظهار الكروت مع تأثير حركي
    extraCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove("d-none");
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      }, index * 100);
    });
    btn.textContent = "عرض أقل";

    // التمرير إلى أول كارت مخفي
    setTimeout(() => {
      if (extraCards.length > 0) {
        extraCards[0].scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 100);
  } else {
    // إخفاء الكروت مع تأثير حركي
    extraCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.classList.add("d-none");
      }, 500);
    });
    btn.textContent = "عرض المزيد";

    // التمرير إلى الزر
    btn.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// نختار كل أزرار "عرض الوصفة"
const viewButtons = document.querySelectorAll(".btn-primary");

viewButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    // نحدد الكارت الحالي
    const card = this.closest(".card");

    // نجلب البيانات (العنوان والصورة والوصف المخفي)
    const title = card.querySelector(".card-text").innerText;
    const description = card.querySelector(
      ".recipe-full-description"
    ).innerText;
    const imageSrc = card.querySelector("img").src;

    // تعبئة المودال
    document.getElementById("recipeModalLabel").innerText = title;
    document.getElementById("recipeDescription").innerText = description;
    document.getElementById("recipeImage").src = imageSrc;

    // عرض المودال
    const recipeModal = new bootstrap.Modal(
      document.getElementById("recipeModal")
    );
    recipeModal.show();
  });
});

// وظيفة التعديلات المتجاوبة
function adjustResponsiveElements() {
  // تعديل قسم الهيرو بناءً على حجم الشاشة
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    if (window.innerWidth < 768) {
      heroSection.style.backgroundAttachment = "scroll";
    } else {
      heroSection.style.backgroundAttachment = "fixed";
    }
  }

  // تعديل حجم الكروت إذا لزم الأمر
  const cards = document.querySelectorAll(".card");
  if (cards.length > 0) {
    if (window.innerWidth < 576) {
      cards.forEach((card) => {
        const cardBody = card.querySelector(".card-body");
        if (cardBody) {
          cardBody.style.padding = "15px";
        }
        const cardImg = card.querySelector(".card-img-top");
        if (cardImg) {
          cardImg.style.height = "180px";
        }
      });
    } else if (window.innerWidth < 768) {
      cards.forEach((card) => {
        const cardBody = card.querySelector(".card-body");
        if (cardBody) {
          cardBody.style.padding = "20px";
        }
        const cardImg = card.querySelector(".card-img-top");
        if (cardImg) {
          cardImg.style.height = "200px";
        }
      });
    } else {
      cards.forEach((card) => {
        const cardBody = card.querySelector(".card-body");
        if (cardBody) {
          cardBody.style.padding = "";
        }
        const cardImg = card.querySelector(".card-img-top");
        if (cardImg) {
          cardImg.style.height = "";
        }
      });
    }
  }
}

// تطبيق التعديلات المتجاوبة عند تغيير حجم النافذة
window.addEventListener("resize", function () {
  adjustResponsiveElements();
});
