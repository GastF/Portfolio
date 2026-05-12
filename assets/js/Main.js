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

function setActiveThumb(el) {
    document.querySelectorAll('#modalThumbs .gthumb, #modalThumbs .video-thumb')
        .forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}

function showVideo(p, thumbEl) {
    const mediaEl = document.getElementById('modalMedia');
    const ext = p.video.split('.').pop().toLowerCase();
    mediaEl.innerHTML = `<video controls autoplay muted loop style="width:100%;height:100%;object-fit:contain;display:block;background:#000"><source src="${p.video}" type="video/${ext}"></video>`;
    setActiveThumb(thumbEl);
}

function showImage(src, title, thumbEl) {
    document.getElementById('modalMedia').innerHTML =
        `<img src="${src}" alt="${title}" style="width:100%;height:100%;object-fit:contain;display:block">`;
    setActiveThumb(thumbEl);
}

function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;
    _currentProject = p;

    const mediaEl  = document.getElementById('modalMedia');
    const thumbsEl = document.getElementById('modalThumbs');
    const ext = p.video ? p.video.split('.').pop().toLowerCase() : '';
    const hasVideo = p.video && ['mp4','webm','ogg'].includes(ext);

    // default media = video or first image
    if (hasVideo) {
        mediaEl.innerHTML = `<video controls autoplay muted loop style="width:100%;height:100%;object-fit:contain;display:block;background:#000"><source src="${p.video}" type="video/${ext}"></video>`;
    } else {
        const first = (p.gallery || [])[0] || '';
        mediaEl.innerHTML = `<img src="${first}" alt="${p.title}" style="width:100%;height:100%;object-fit:contain;display:block">`;
    }

    // build thumb strip — video thumb first, then images (skip first image if it's the video poster)
    let thumbsHTML = '';
    if (hasVideo) {
        const poster = (p.gallery || [])[0] || '';
        thumbsHTML += `<div class="video-thumb active" onclick="showVideo(_currentProject, this)">
      <img src="${poster}" alt="${p.title}">
      <div class="play-icon"><i class="fa-solid fa-play"></i></div>
    </div>`;
    }
    // show all gallery images (they're distinct from the video)
    (p.gallery || []).forEach((src, i) => {
        const activeClass = (!hasVideo && i === 0) ? ' active' : '';
        thumbsHTML += `<div class="gthumb${activeClass}" onclick="showImage('${src}','${p.title}',this)">
      <img src="${src}" alt="${p.title}">
    </div>`;
    });
    thumbsEl.innerHTML = thumbsHTML;
    thumbsEl.style.display = thumbsHTML ? 'flex' : 'none';

    // right column info
    document.getElementById('modalTitle').textContent = p.title;

    const linkEl = document.getElementById('modalLink');
    if (p.link) {
        linkEl.href = p.link;
        linkEl.style.display = 'inline-flex';
        linkEl.innerHTML = `<i class="${p.linkIcon || 'fa-brands fa-itch-io'}"></i> ${p.linkLabel || 'Play it here'}`;
    } else {
        linkEl.style.display = 'none';
    }

    document.getElementById('modalTags').innerHTML =
        (p.tags || []).map(t => `<span class="card-tag">${t}</span>`).join('');
    document.getElementById('modalDesc').textContent = p.desc || '';
    document.getElementById('modalFeats').innerHTML =
        (p.features || []).map(f => `<div class="modal-feat">${f}</div>`).join('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const mediaEl = document.getElementById('modalMedia');
    mediaEl.innerHTML = '';
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
});
document.getElementById('modalClose').addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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