const soalContainer = document.getElementById("soal");
const jawabanContainer = document.getElementById("jawaban");
const hasilContainer = document.getElementById("hasil");
const benarSound = document.getElementById("benarSound");
const salahSound = document.getElementById("salahSound");

const pertanyaan = [
    {
        soal: "Siapa nama presiden pertama Indonesia?",
        jawaban: ["Soekarno", "Soeharto", "BJ Habibie", "Moh. Hatta"],
        jawabanBenar: "Soekarno",
    },
    {
        soal: "Tahun berapa Indonesia merdeka?",
        jawaban: ["1942", "1945", "1947", "1950"],
        jawabanBenar: "1945",
    },
    {
        soal: "Apa nama perjanjian yang ditandatangani antara Indonesia dan Belanda pada tahun 1949?",
        jawaban: ["Perjanjian Linggarjati", "Perjanjian Renville", "Perjanjian Roem-Roijen", "Konferensi Meja Bundar"],
        jawabanBenar: "Konferensi Meja Bundar",
    },
    {
        soal: "Apa nama peristiwa yang terjadi pada 10 November 1945 di Surabaya?",
        jawaban: ["Pertempuran Surabaya", "Pertempuran Bandung", "Pertempuran Jakarta", "Pertempuran Medan"],
        jawabanBenar: "Pertempuran Surabaya",
    },
    {
        soal: "Apa nama organisasi pergerakan nasional yang dipimpin oleh Ir. Soekarno pada tahun 1927?",
        jawaban: ["Partai Nasional Indonesia (PNI)", "Budi Utomo", "Sarekat Islam", "Indische Partij"],
        jawabanBenar: "Partai Nasional Indonesia (PNI)",
    },
];

let skor = 0;
let soalSaatIni = 0;
let timer;
let waktuSisa = 5;

const infoSoalContainer = document.createElement("div");
infoSoalContainer.style.margin = "10px";
infoSoalContainer.style.fontWeight = "bold";
infoSoalContainer.style.color = "blue";
document.getElementById("kuis-container").insertBefore(infoSoalContainer, soalContainer);

// Menyusun progress bar untuk timer
const progressBar = document.createElement("div");
progressBar.id = "progress-bar";
progressBar.style.background = "green";
progressBar.style.height = "10px";
progressBar.style.width = "0%";
document.getElementById("kuis-container").insertBefore(progressBar, soalContainer);

const timerContainer = document.createElement("div");
timerContainer.style.margin = "10px";
timerContainer.style.fontWeight = "bold";
timerContainer.style.color = "red";
document.getElementById("kuis-container").insertBefore(timerContainer, hasilContainer);

function tampilkanSoal() {
    const soal = pertanyaan[soalSaatIni];
    infoSoalContainer.textContent = `Soal ${soalSaatIni + 1} dari ${pertanyaan.length}`;
    soalContainer.textContent = soal.soal;

    jawabanContainer.innerHTML = "";
    soal.jawaban.forEach((jawaban) => {
        const tombol = document.createElement("button");
        tombol.textContent = jawaban;
        tombol.style.margin = "5px";
        tombol.addEventListener("click", function () {
            clearInterval(timer);
            cekJawaban(jawaban, tombol);
        });
        jawabanContainer.appendChild(tombol);
    });

    mulaiTimer();
}

function mulaiTimer() {
    waktuSisa = 5;
    timerContainer.textContent = `Waktu tersisa: ${waktuSisa} detik`;

    timer = setInterval(() => {
        waktuSisa--;
        timerContainer.textContent = `Waktu tersisa: ${waktuSisa} detik`;
        progressBar.style.width = `${(waktuSisa / 5) * 100}%`; 

        if (waktuSisa <= 0) {
            clearInterval(timer);
            soalSaatIni++;
            if (soalSaatIni < pertanyaan.length) {
                tampilkanSoal();
            } else {
                tampilkanHasil();
            }
        }
    }, 1000);
}

function cekJawaban(jawabanDipilih, tombol) {
    const soal = pertanyaan[soalSaatIni];
    if (jawabanDipilih === soal.jawabanBenar) {
        skor++;
        tombol.style.backgroundColor = "green";
        if (benarSound) benarSound.play();
    } else {
        tombol.style.backgroundColor = "red";
        if (salahSound) salahSound.play();
    }

    setTimeout(() => {
        soalSaatIni++;
        if (soalSaatIni < pertanyaan.length) {
            tampilkanSoal();
        } else {
            tampilkanHasil();
        }
    }, 1000);
}

function tampilkanHasil() {
    soalContainer.textContent = "Kuis Selesai!";
    jawabanContainer.innerHTML = "";
    timerContainer.textContent = "";
    infoSoalContainer.textContent = "";
    progressBar.style.width = "0%";
    hasilContainer.textContent = `Skor anda: ${skor} dari ${pertanyaan.length}`;

    document.getElementById("selesaiBtn").style.display = "inline-block";
}

// Dark mode toggle
const tombolDarkMode = document.createElement("button");
tombolDarkMode.textContent = "Aktifkan Dark Mode";
tombolDarkMode.style.marginTop = "20px";
tombolDarkMode.style.padding = "10px 20px";
tombolDarkMode.style.cursor = "pointer";
document.body.appendChild(tombolDarkMode);

tombolDarkMode.addEventListener("click", () => {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark"); 
        tombolDarkMode.textContent = "Aktifkan Dark Mode"; 
    } else {
        document.body.classList.add("dark"); 
        tombolDarkMode.textContent = "Aktifkan Light Mode"; 
    }
});

document.getElementById("selesaiBtn").addEventListener("click", () => {
    window.location.href = "index.html"; // atau "portofolio.html" jika itu halaman utama
});

tampilkanSoal();
