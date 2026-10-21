const b = document.querySelector('.menubtn'), m = document.querySelector('.menu'); b?.addEventListener('click', () => m?.classList.toggle('open'));
const overlay = document.querySelector('#intro-overlay'), skip = document.querySelector('#intro-skip'); let player;
function closeIntro(mark = true) { if (overlay) { overlay.hidden = true; document.body.classList.remove('intro-open') } if (player?.stopVideo) player.stopVideo(); if (mark) localStorage.setItem('scoutsPuisayeIntroSeen', '1') }
function openIntro(force = false) { if (!overlay) return; if (!force && localStorage.getItem('scoutsPuisayeIntroSeen')) return; overlay.hidden = false; document.body.classList.add('intro-open'); if (player?.playVideo) player.playVideo() }
window.onYouTubeIframeAPIReady = () => { player = new YT.Player('intro-player', { videoId: 'ZbKz8zQnRMM', playerVars: { autoplay: 1, mute: 1, controls: 1, rel: 0, playsinline: 1 }, events: { onReady: () => openIntro(false), onStateChange: e => { if (e.data === YT.PlayerState.ENDED) closeIntro(true) } } }) };
const api = document.createElement('script'); api.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(api); skip?.addEventListener('click', () => closeIntro(true)); document.querySelectorAll('.intro-replay').forEach(x => x.addEventListener('click', () => openIntro(true)));

// Lightbox pour les galeries photos
document.addEventListener('DOMContentLoaded', () => {

    const images = document.querySelectorAll('.gallery img');

    if (!images.length) return;

    // Création de la lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-content');

    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});