document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.querySelector(".cta-button");
    const notification = document.getElementById("notification-container");
    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".imagenes img, .presentacion img");
    const textBlocks = document.querySelectorAll(".text-block");
    
    // Efecto de entrada en imágenes
    images.forEach(img => {
        img.style.opacity = "0";
        img.style.transform = "translateY(20px)";
        img.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });
    
    const revealImages = () => {
        images.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight - 50) {
                img.style.opacity = "1";
                img.style.transform = "translateY(0)";
            }
        });
    };
    
    window.addEventListener("scroll", revealImages);
    revealImages();
    
    // Efecto de desplazamiento en secciones
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transition = "opacity 0.8s ease-in-out";
    });
    
    const revealSections = () => {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight - 50) {
                section.style.opacity = "1";
            }
        });
    };
    
    window.addEventListener("scroll", revealSections);
    revealSections();
    
    // Animación para los bloques de texto
    textBlocks.forEach(block => {
        block.style.opacity = "0";
        block.style.transform = "translateX(-50px)";
        block.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });
    
    const revealTextBlocks = () => {
        textBlocks.forEach(block => {
            if (block.getBoundingClientRect().top < window.innerHeight - 50) {
                block.style.opacity = "1";
                block.style.transform = "translateX(0)";
            }
        });
    };
    
    window.addEventListener("scroll", revealTextBlocks);
    revealTextBlocks();
    
    // Notificación emergente mejorada con div animado + redirección
    ctaButton.addEventListener("click", (e) => {
        e.preventDefault();
        notification.innerHTML = "<div class='notification-content'>¡Gracias por interesarte en nuestra colección!</div>";
        notification.style.display = "block";
        notification.style.opacity = "1";
        notification.style.transition = "opacity 1s ease-in-out, transform 0.5s ease-out";
        notification.style.transform = "translateY(0)";
        
        setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateY(20px)";
            setTimeout(() => {
                notification.style.display = "none";
                window.location.href = "https://yimms.xyz/";
            }, 1000);
        }, 3000);
    });
});
