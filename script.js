// تفعيل مكتبة AOS (Animation on Scroll)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000,  // ضبط مدة التأثير
        easing: 'ease-in-out', // نوع التأثير
    });
});
    // احصل على اسم الصفحة الحالية
    const currentPage = window.location.pathname.split("/").pop();

    // احصل على كل روابط التنقل
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        // إذا تطابق الرابط مع الصفحة الحالية، أضف له class "active"
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    document.getElementById("showMoreBtn").addEventListener("click", function () {
        document.querySelectorAll(".extra-card").forEach(card => {
            card.classList.remove("d-none");
        });
        this.style.display = "none";
    });

  // نختار كل أزرار "عرض الوصفة"
  const viewButtons = document.querySelectorAll('.btn-primary');

  viewButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // نحدد الكارت الحالي
      const card = this.closest('.card');
      
      // نجلب البيانات (العنوان والصورة والوصف المخفي)
      const title = card.querySelector('.card-text').innerText;
      const description = card.querySelector('.recipe-full-description').innerText;
      const imageSrc = card.querySelector('img').src;

      // تعبئة المودال
      document.getElementById('recipeModalLabel').innerText = title;
      document.getElementById('recipeDescription').innerText = description;
      document.getElementById('recipeImage').src = imageSrc;

      // عرض المودال
      const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
      recipeModal.show();
    });
  });

