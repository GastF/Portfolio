// si el sistema pide movimiento reducido, ningún video arranca solo (queda el poster)
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

// ── NAV TABS ──────────────────────────────────────────────
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.section).classList.add('active-section');
    });
});

// ── FILTERS ──────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        const cards = document.querySelectorAll('.project-card');
        let visible = 0;
        cards.forEach((card, i) => {
            const cats = card.dataset.category || '';
            const show = f === 'all' || cats.includes(f);
            card.classList.remove('appearing');
            if (show) {
                card.classList.remove('hidden');
                // stagger the animation
                setTimeout(() => card.classList.add('appearing'), i * 40);
                visible++;
            } else {
                card.classList.add('hidden');
            }
        });
        // empty state
        const existing = document.querySelector('.grid-empty');
        if (existing) existing.remove();
        if (visible === 0) {
            const empty = document.createElement('div');
            empty.className = 'grid-empty';
            empty.textContent = 'No projects match this filter.';
            document.getElementById('projectsGrid').appendChild(empty);
        }
    });
});

// ── MODAL ─────────────────────────────────────────────────
const overlay = document.getElementById('modalOverlay');
const modal   = document.getElementById('modal');

let _currentProject = null;

// devuelve los links de un proyecto en formato uniforme: [{url, label, icon}]
function projectLinks(p) {
    if (p.links && p.links.length) return p.links;
    if (p.link) return [{ url: p.link, label: p.linkLabel, icon: p.linkIcon }];
    return [];
}

function setActiveThumb(el) {
    document.querySelectorAll('#modalThumbs .gthumb, #modalThumbs .video-thumb')
        .forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

// media del modal: cada video tiene un .jpg hermano que se usa de poster/thumb
const VIDEO_EXT = ['mp4', 'webm', 'ogg'];
const isVideo   = src => VIDEO_EXT.includes((src || '').split('.').pop().toLowerCase());
const posterFor = src => src.replace(/\.(mp4|webm|ogg)$/i, '.jpg');

// items del carrusel del proyecto abierto: [video principal, ...galeria]
let _currentItems = [];

function mediaHTML(src, title) {
    if (!src) return '';
    if (!isVideo(src)) {
        return `<img src="${src}" alt="${title}" style="width:100%;height:100%;object-fit:contain;display:block">`;
    }
    const ext = src.split('.').pop().toLowerCase();
    const auto = REDUCED_MOTION.matches ? '' : 'autoplay';
    return `<video controls ${auto} muted loop playsinline preload="metadata" poster="${posterFor(src)}"
        style="width:100%;height:100%;object-fit:contain;display:block;background:#000"><source src="${src}" type="video/${ext}"></video>`;
}

function showMediaAt(i, thumbEl) {
    const src = _currentItems[i];
    if (!src) return;
    document.getElementById('modalMedia').innerHTML = mediaHTML(src, _currentProject ? _currentProject.title : '');
    setActiveThumb(thumbEl);
}

// para devolver el foco a la card que abrió el modal
let _lastFocused = null;

function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;
    _currentProject = p;
    _lastFocused = document.activeElement;

    const mediaEl  = document.getElementById('modalMedia');
    const thumbsEl = document.getElementById('modalThumbs');

    // el video principal es el primer item del carrusel, después va la galería
    _currentItems = (p.video ? [p.video] : []).concat(p.gallery || []);
    mediaEl.innerHTML = mediaHTML(_currentItems[0], p.title);

    // proyectos sin media (ej: trabajo bajo NDA) → modal de una sola columna
    modal.classList.toggle('modal--no-media', _currentItems.length === 0);

    // los thumbs son <button> para que se puedan recorrer con el teclado
    const thumbsHTML = _currentItems.map((src, i) => {
        const vid = isVideo(src);
        const label = `${vid ? 'Video' : 'Image'} ${i + 1} of ${_currentItems.length} — ${p.title}`;
        return `<button type="button" class="${vid ? 'video-thumb' : 'gthumb'}${i === 0 ? ' active' : ''}"
      onclick="showMediaAt(${i}, this)" aria-label="${label}">
      <img src="${vid ? posterFor(src) : src}" alt="" loading="lazy">
      ${vid ? '<div class="play-icon"><i class="fa-solid fa-play"></i></div>' : ''}
    </button>`;
    }).join('');
    thumbsEl.innerHTML = thumbsHTML;
    thumbsEl.style.display = thumbsHTML ? 'flex' : 'none';

    // right column info
    document.getElementById('modalTitle').textContent = p.title;

    const studioEl = document.getElementById('modalStudio');
    if (p.studio) {
        studioEl.style.display = 'block';
        studioEl.innerHTML = p.studio.url
            ? `Developed at <a href="${p.studio.url}" target="_blank" rel="noopener">${p.studio.name}</a>`
            : `Developed at ${p.studio.name}`;
    } else {
        studioEl.style.display = 'none';
    }

    const linksEl = document.getElementById('modalLinks');
    const links = projectLinks(p);
    linksEl.innerHTML = links.map(l =>
        `<a class="modal-link" href="${l.url}" target="_blank" rel="noopener"><i class="${l.icon || 'fa-brands fa-itch-io'}"></i> ${l.label || 'Play it here'}</a>`
    ).join('');
    // sin links públicos: si el proyecto define un cta, va al formulario de contacto
    if (!links.length && p.cta) {
        const cta = document.createElement('button');
        cta.type = 'button';
        cta.className = 'modal-link';
        cta.innerHTML = `<i class="${p.cta.icon}"></i> ${p.cta.label}`;
        cta.addEventListener('click', () => { closeModal(); goToSection(p.cta.section); });
        linksEl.appendChild(cta);
    }
    linksEl.style.display = linksEl.children.length ? 'flex' : 'none';

    document.getElementById('modalTags').innerHTML =
        (p.tags || []).map(t => `<span class="card-tag">${t}</span>`).join('');
    document.getElementById('modalDesc').textContent = p.desc || '';
    document.getElementById('modalFeats').innerHTML =
        (p.features || []).map(f => `<div class="modal-feat">${f}</div>`).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('modalClose').focus();
}

function closeModal() {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const mediaEl = document.getElementById('modalMedia');
    mediaEl.innerHTML = '';
    // el foco vuelve a la card desde donde se abrió
    if (_lastFocused && document.contains(_lastFocused)) _lastFocused.focus();
    _lastFocused = null;
}

// mantiene el foco adentro del modal mientras está abierto
function trapFocus(e) {
    const focusables = modal.querySelectorAll('a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
}
// ── SKILL TAGS → PROJECTS ─────────────────────────────────
// cambia de seccion y deja el tab del nav sincronizado
function goToSection(sectionId) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    document.querySelector(`.nav-btn[data-section="${sectionId}"]`)?.classList.add('active');
    document.getElementById(sectionId)?.classList.add('active-section');
}

document.querySelectorAll('.about-right .tag').forEach(tag => {
    tag.addEventListener('click', () => goToSection('projects-section'));
});

document.getElementById('btnViewProjects')?.addEventListener('click', () => goToSection('projects-section'));
document.getElementById('btnContact')?.addEventListener('click', () => goToSection('contact-section'));
// ── MOVIMIENTO REDUCIDO ───────────────────────────────────
const heroVideo = document.querySelector('.about-bg-video');
if (heroVideo && REDUCED_MOTION.matches) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
}

// ── PREVIEWS DE LAS CARDS ─────────────────────────────────
// arrancan con preload="none": solo se ve el poster hasta que pasás el mouse,
// así la grilla carga imágenes y no video
document.querySelectorAll('.card-media').forEach(video => {
    const card = video.closest('.project-card');
    if (!card) return;
    card.addEventListener('mouseenter', () => {
        if (REDUCED_MOTION.matches) return;
        const play = video.play();
        if (play) play.catch(() => {}); // si el browser lo bloquea queda el poster
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    const p = PROJECTS[card.dataset.id];

    // ── botón "Play Now!" (solo si el proyecto tiene link) ──
    const mainLink = p ? projectLinks(p)[0] : null;
    if (mainLink) {
        const playBtn = document.createElement('a');
        playBtn.className = 'card-play-btn';
        playBtn.href = mainLink.url;
        playBtn.target = '_blank';
        playBtn.rel = 'noopener';
        playBtn.innerHTML = `<i class="${mainLink.icon || 'fa-solid fa-play'}"></i> Play Now!`;
        // evita que al clickear el botón se abra también el modal
        playBtn.addEventListener('click', e => e.stopPropagation());
        card.querySelector('.card-body').appendChild(playBtn);
    } else if (p && p.cta) {
        // proyectos sin link público (NDA): el botón lleva al formulario de contacto
        const ctaBtn = document.createElement('button');
        ctaBtn.type = 'button';
        ctaBtn.className = 'card-play-btn';
        ctaBtn.innerHTML = `<i class="${p.cta.icon}"></i> ${p.cta.label}`;
        ctaBtn.addEventListener('click', e => {
            e.stopPropagation();
            goToSection(p.cta.section);
        });
        card.querySelector('.card-body').appendChild(ctaBtn);
    }

    card.addEventListener('click', () => openModal(card.dataset.id));
    // la card es role="button": Enter y Espacio la abren igual que el click
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            openModal(card.dataset.id);
        }
    });
});
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab' && overlay.classList.contains('open')) trapFocus(e);
});

// ── CONTACT FORM (EmailJS) ────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn      = document.getElementById('formSubmit');
        const feedback = document.getElementById('formFeedback');

        const name    = document.getElementById('cf-name').value.trim();
        const email   = document.getElementById('cf-email').value.trim();
        const subject = document.getElementById('cf-subject');
        const message = document.getElementById('cf-message').value.trim();

        const subjectLabels = {
            freelance: 'Freelance Project',
            fulltime:  'Full-time Opportunity',
            gamejam:   'Game Jam Collab',
            other:     'General Inquiry'
        };

        // validation
        feedback.className = 'form-feedback';
        if (!name || !email || !message) {
            feedback.className = 'form-feedback show error';
            feedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fill in all required fields.';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            feedback.className = 'form-feedback show error';
            feedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid email address.';
            return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: name,
                from_name: name,
                email:        email,
                reply_to:     email,
                subject_type: subjectLabels[subject.value] || subject.value,
                message:      message,
            });

            feedback.className = 'form-feedback show success';
            feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
            contactForm.reset();
        } catch (err) {
            console.error('EmailJS error:', err);
            feedback.className = 'form-feedback show error';
            feedback.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong. Try emailing me directly at gastonnff@gmail.com';
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send message';
        }
    });
}
const toggle = document.getElementById('themeToggle');
const knob   = document.getElementById('themeKnob');

function setTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark');
        knob.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        knob.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

// init: default light, respect saved preference
const saved = localStorage.getItem('theme');
setTheme(saved === 'dark');

toggle.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
});