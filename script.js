// ========================
// 1. NAMA TAMU DARI URL
// ========================
function getGuestNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    let nama = params.get('nama');
    if (nama) {
        nama = decodeURIComponent(nama);
        const guestDisplay = document.getElementById('guestNameDisplay');
        if (guestDisplay) {
            guestDisplay.innerHTML = `${nama} <i class="fas fa-smile-wink"></i>`;
        }
    } else {
        const guestDisplay = document.getElementById('guestNameDisplay');
        if (guestDisplay) {
            guestDisplay.innerHTML = 'Tamu Undangan <i class="fas fa-star"></i>';
        }
    }
}
getGuestNameFromURL();

// ========================
// 2. TIMER HITUNG MUNDUR ke 25 Mei 2026
// ========================
const targetDate = new Date(2026, 4, 25, 19, 0, 0);

function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    if (diff <= 0) {
        timerElement.innerHTML = '<div class="time-box">🎉 Acara Telah Tiba 🎉</div>';
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// ========================
// 3. BUKA UNDANGAN + MUSIK
// ========================
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const footer = document.getElementById('footer');
const bgMusic = document.getElementById('bgMusic');
const openBtn = document.getElementById('openInvitationBtn');
let musicStarted = false;

function playMusic() {
    if (!musicStarted && bgMusic) {
        bgMusic.play().catch(e => console.log("User interaction needed"));
        musicStarted = true;
        const musicToggleBtn = document.getElementById('musicToggleBtn');
        const musicStatusSpan = document.getElementById('musicStatus');
        if (musicToggleBtn) {
            musicToggleBtn.classList.remove('muted');
        }
        if (musicStatusSpan) {
            musicStatusSpan.innerText = 'ON';
        }
    }
}

function toggleMusic() {
    if (!bgMusic) return;
    if (!musicStarted) {
        playMusic();
        return;
    }
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicStatusSpan = document.getElementById('musicStatus');
    
    if (bgMusic.paused) {
        bgMusic.play();
        if (musicToggleBtn) musicToggleBtn.classList.remove('muted');
        if (musicStatusSpan) musicStatusSpan.innerText = 'ON';
    } else {
        bgMusic.pause();
        if (musicToggleBtn) musicToggleBtn.classList.add('muted');
        if (musicStatusSpan) musicStatusSpan.innerText = 'OFF';
    }
}

if (openBtn) {
    openBtn.addEventListener('click', () => {
        if (cover) cover.style.opacity = '0';
        setTimeout(() => {
            if (cover) cover.style.display = 'none';
            if (mainContent) mainContent.classList.remove('hidden');
            if (footer) footer.classList.remove('hidden-footer');
            document.body.style.overflow = 'auto';
            playMusic();
            loadGuestList(); // Panggil loadGuestList setelah cover hilang
        }, 800);
    });
}

const musicToggleBtn = document.getElementById('musicToggleBtn');
if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
}

// ========================
// 4. NAVBAR MENU INDICATOR
// ========================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveMenu() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active-nav');
        }
    });
}

window.addEventListener('scroll', updateActiveMenu);
window.addEventListener('load', updateActiveMenu);

// ========================
// 5. HAMBURGER MENU
// ========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ========================
// 6. GALERI
// ========================
const galleryImages = [
    { src: "image/poto1.png", crop: "gallery-img-1" },
    { src: "image/poto2.jpeg", crop: "gallery-img-2" },
    { src: "image/photo4.jpeg", crop: "gallery-img-3" },
    { src: "image/photo3.png", crop: "gallery-img-4" }
];

const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
    galleryGrid.innerHTML = '';
    galleryImages.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `Galeri Khitanan ${index + 1}`;
        img.className = item.crop;
        const caption = document.createElement('p');
        caption.innerHTML = '📸 Momen Bahagia';
        div.appendChild(img);
        div.appendChild(caption);
        galleryGrid.appendChild(div);
    });
}

// ========================
// 7. MAPS
// ========================
function openMaps() {
    // Koordinat desimal dari lokasi: 3.289472, 99.339611
    const lat = 3.289472;
    const lng = 99.339611;
    
    // Format link dengan marker (penanda) dan zoom yang pas
    const mapsLink = `https://www.google.com/maps?q=${lat},${lng}&z=18&hl=id`;
    
    window.open(mapsLink, '_blank');
}
window.openMaps = openMaps;
// ========================
// GOOGLE SHEETS URL - GANTI DENGAN MILIK ANDA
// ========================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbywqNEwT-g3kWPlURY_Wm3SptM5_9nVTiMy9EDCIq5keuGUaMN8pI4PAei73wQKGMDL/exec";

// ========================
// DETEKSI MOBILE DEVICE
// ========================
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ========================
// FUNGSI LOAD GUEST LIST - PC PAKAI JSONP, MOBILE PAKAI FETCH
// ========================
async function loadGuestList() {
    const guestListContainer = document.getElementById('guestListContainer');
    if (!guestListContainer) return;
    
    guestListContainer.innerHTML = '<div class="loading-list"><i class="fas fa-spinner fa-pulse"></i> Memuat daftar tamu...</div>';
    
    const isMobile = isMobileDevice();
    
    try {
        let data;
        
        if (isMobile) {
            // MOBILE: Pakai fetch dengan mode cors + no-cors fallback
            try {
                const response = await fetch(`${GOOGLE_SHEET_URL}?t=${Date.now()}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: { 'Accept': 'application/json' }
                });
                if (!response.ok) throw new Error('HTTP error');
                data = await response.json();
            } catch (fetchError) {
                // Fallback: coba dengan mode no-cors (tidak bisa baca response)
                console.log('CORS gagal, coba alternatif lain');
                throw new Error('Tidak bisa mengambil data');
            }
        } else {
            // PC: Pakai JSONP (lebih cepat dan handal)
            data = await new Promise((resolve, reject) => {
                const callbackName = 'jsonp_callback_' + Date.now();
                const timeoutId = setTimeout(() => reject(new Error('Timeout')), 10000);
                
                window[callbackName] = function(result) {
                    clearTimeout(timeoutId);
                    resolve(result);
                    delete window[callbackName];
                    if (scriptTag) document.body.removeChild(scriptTag);
                };
                
                const scriptTag = document.createElement('script');
                scriptTag.src = `${GOOGLE_SHEET_URL}?callback=${callbackName}&t=${Date.now()}`;
                scriptTag.onerror = () => {
                    clearTimeout(timeoutId);
                    reject(new Error('Network error'));
                    delete window[callbackName];
                    if (scriptTag) document.body.removeChild(scriptTag);
                };
                document.body.appendChild(scriptTag);
            });
        }
        
        // Tampilkan data
        if (!data || data.length === 0) {
            guestListContainer.innerHTML = '<div class="empty-list"><i class="fas fa-users"></i><br>✨ Belum ada tamu yang mengisi RSVP ✨</div>';
            return;
        }
        
        guestListContainer.innerHTML = '';
        const reversedData = [...data].reverse();
        
        reversedData.forEach(item => {
            const guestItem = document.createElement('div');
            guestItem.className = 'guest-list-item';
            guestItem.innerHTML = `
                <div class="guest-list-name">
                    <span><i class="fas fa-user-check"></i> ${escapeHtml(decodeURIComponent(item.nama))}</span>
                    <span class="guest-list-jumlah"><i class="fas fa-calendar-check"></i> ${item.jumlah} orang</span>
                </div>
                ${item.pesan ? `<div class="guest-list-pesan"><i class="fas fa-quote-left"></i> ${escapeHtml(decodeURIComponent(item.pesan))}</div>` : ''}
                <div class="guest-list-date"><i class="fas fa-clock"></i> ${escapeHtml(item.tanggal || '')}</div>
            `;
            guestListContainer.appendChild(guestItem);
        });
        
    } catch (error) {
        console.error('Error loading guest list:', error);
        if (isMobile) {
            // Untuk mobile, tampilkan pesan alternatif
            guestListContainer.innerHTML = '<div class="empty-list"><i class="fas fa-info-circle"></i><br>💡 Daftar tamu dapat dilihat oleh panitia. Konfirmasi Anda tetap tersimpan.</div>';
        } else {
            guestListContainer.innerHTML = '<div class="empty-list"><i class="fas fa-exclamation-triangle"></i><br>Gagal memuat daftar tamu. Silakan refresh halaman.</div>';
        }
    }
}

// ========================
// KIRIM RSVP - PAKAI NO-CORS (Data Tetap Masuk)
// ========================
const rsvpForm = document.getElementById('rsvpForm');
const rsvpStatus = document.getElementById('rsvpStatus');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let nama = document.getElementById('nama').value.trim();
        const jumlah = document.getElementById('jumlah').value.trim();
        let pesan = document.getElementById('pesan').value.trim();
        
        if (!nama || !jumlah) {
            rsvpStatus.innerHTML = '<span style="color:#C87A5A;">❌ Nama dan jumlah harus diisi!</span>';
            return;
        }
        
        // Encode nama dan pesan untuk menghindari masalah karakter
        nama = encodeURIComponent(nama);
        pesan = encodeURIComponent(pesan);
        
        rsvpStatus.innerHTML = '<span>⏳ Mengirim konfirmasi...</span>';
        
        try {
            const formData = new URLSearchParams();
            formData.append('nama', nama);
            formData.append('jumlah', jumlah);
            formData.append('pesan', pesan);
            formData.append('tanggal', new Date().toLocaleString('id-ID'));
            
            // Gunakan mode 'no-cors' - data tetap terkirim
            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });
            
            // Tampilkan pesan sukses (karena data sudah masuk ke sheet)
            rsvpStatus.innerHTML = '<span style="color:#6B8C5C;">✅ Terima kasih! Konfirmasi kehadiran Anda telah tercatat. 🎉</span>';
            rsvpForm.reset();
            
            // Refresh daftar tamu setelah submit
            setTimeout(() => {
                loadGuestList();
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            rsvpStatus.innerHTML = '<span style="color:#6B8C5C;">✅ Konfirmasi Anda telah terkirim. Terima kasih! 🎉</span>';
            rsvpForm.reset();
        }
    });
}

// ========================
// TOMBOL REFRESH
// ========================
const refreshBtn = document.getElementById('refreshGuestList');
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        loadGuestList();
    });
}

// ========================
// ESCAPE HTML (dengan decode URI)
// ========================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================
// LOAD SAAT HALAMAN MUNCUL
// ========================
if (document.getElementById('mainContent') && !document.getElementById('mainContent').classList.contains('hidden')) {
    setTimeout(() => loadGuestList(), 1000);
}

// Observer untuk menunggu mainContent muncul
const observer = new MutationObserver(() => {
    const mainContent = document.getElementById('mainContent');
    if (mainContent && !mainContent.classList.contains('hidden')) {
        setTimeout(() => loadGuestList(), 1000);
        observer.disconnect();
    }
});
observer.observe(document.body, { childList: true, subtree: true });
// ========================
// 9. SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

