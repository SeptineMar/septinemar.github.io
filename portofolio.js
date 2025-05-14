const text = ["Student", "Designer", "Developer",];
let index = 0;
let charIndex = 0;
const speed = 100;
const typewriterElement = document.querySelector(".typewriter-text");

function typeWriter() {
    if (!typewriterElement) return; // untuk menghindari error jika elemen tidak ditemukan

    if (charIndex < text[index].length) {
        typewriterElement.textContent += text[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(() => {
            typewriterElement.textContent = "";
            charIndex = 0;
            index = (index + 1) % text.length;
            typeWriter();
        }, 1500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeWriter();
});