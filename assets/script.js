// ============ LANGUAGE SWITCHER ============
var currentLang = 'en';

(function(){
  var buttons = document.querySelectorAll('.lang-btn');

  window.applyLang = function(lang){
    currentLang = lang;
    var translatable = document.querySelectorAll('[data-en]');
    var placeholders = document.querySelectorAll('[data-en-ph]');
    
    translatable.forEach(function(el){
      var val = el.getAttribute('data-' + lang);
      if(val !== null){ el.innerHTML = val; }
    });
    placeholders.forEach(function(el){
      var val = el.getAttribute('data-' + lang + '-ph');
      if(val !== null){ el.setAttribute('placeholder', val); }
    });
    buttons.forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    document.body.classList.toggle('lang-ta', lang === 'ta');
    document.documentElement.setAttribute('lang', lang === 'ta' ? 'ta' : 'en');

    // Update lightbox if open
    if(window.updateLightboxCaption) {
      window.updateLightboxCaption();
    }
  };

  buttons.forEach(function(b){
    b.addEventListener('click', function(){ window.applyLang(b.getAttribute('data-lang')); });
  });

  window.applyLang('en');
})();

// ============ OBJECTS OF TRUST ACCORDION ============
document.querySelectorAll('.obj-head').forEach(function(head){
  head.addEventListener('click', function(){
    var card = head.closest('.obj-card');
    var wasOpen = card.classList.contains('open');
    document.querySelectorAll('.obj-card').forEach(function(c){ c.classList.remove('open'); });
    if(!wasOpen){ card.classList.add('open'); }
  });
});

// ============ EVENT CALENDAR TABS ============
// ============ EVENT CALENDAR TABS ============
(function(){
  var calTabs = document.querySelectorAll('.cal-tab');
  var calPanels = document.querySelectorAll('.cal-tab-panel');
  if(!calTabs.length) return;

  calTabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){
      calTabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      
      if(calPanels.length){
        calPanels.forEach(function(p){ p.classList.remove('active'); });
        if(calPanels[i]){
          calPanels[i].classList.add('active');
        }
      }
    });
  });
})();

// ============ MOBILE NAVIGATION ============
(function(){
  var toggle=document.querySelector('.nav-toggle');
  var nav=document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click',function(){
    var open=document.body.classList.toggle('mobile-nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('mobile-nav-open');});});
})();

// ============ ACTIVE PAGE NAV ============
(function(){
  var path=location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function(a){
    var href=a.getAttribute('href')||'';
    if(href===path) a.setAttribute('aria-current','page');
  });
})();

// ============ WHATSAPP CONTACT ============
(function(){
  var phone='919841820668';
  document.querySelectorAll('[data-whatsapp-form]').forEach(function(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var data=new FormData(form);
      var name=(data.get('name')||'').trim();
      var message=(data.get('message')||'').trim();
      var type=(data.get('type')||'Website enquiry').trim();
      var text='ABASS Website Enquiry\n\nName: '+name+'\nType: '+type+'\nMessage: '+message;
      window.open('https://wa.me/'+phone+'?text='+encodeURIComponent(text),'_blank','noopener');
    });
  });
})();

// ============ INTERACTIVE MEDIA GALLERY FILTERING ============
(function(){
  var filterBtns = document.querySelectorAll('.gallery-filter-btn');
  var mediaCards = document.querySelectorAll('.media-grid .media-card');
  if(!filterBtns.length || !mediaCards.length) return;

  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var cat = btn.getAttribute('data-filter') || 'all';
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');

      mediaCards.forEach(function(card){
        var cardCat = card.getAttribute('data-category') || '';
        if(cat === 'all' || cardCat.indexOf(cat) !== -1){
          card.style.display = 'flex';
          setTimeout(function(){
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(function(){
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
})();

// ============ INTERACTIVE LIGHTBOX MODAL ============
(function(){
  // Create modal container if not exists
  var modal = document.querySelector('.lightbox-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Image preview');
    modal.innerHTML = 
      '<button class="lightbox-close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<button class="lightbox-btn prev" type="button" aria-label="Previous">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>' +
      '</button>' +
      '<button class="lightbox-btn next" type="button" aria-label="Next">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>' +
      '</button>' +
      '<div class="lightbox-content">' +
        '<figure class="lightbox-figure">' +
          '<div class="lightbox-img-wrap">' +
            '<img class="lightbox-img" src="" alt="">' +
          '</div>' +
          '<div class="lightbox-caption-bar">' +
            '<div class="lightbox-caption-info">' +
              '<span class="lightbox-title"></span>' +
              '<span class="lightbox-desc"></span>' +
            '</div>' +
            '<span class="lightbox-counter"></span>' +
          '</div>' +
        '</figure>' +
      '</div>';
    document.body.appendChild(modal);
  }

  var lightboxImg = modal.querySelector('.lightbox-img');
  var lightboxTitle = modal.querySelector('.lightbox-title');
  var lightboxDesc = modal.querySelector('.lightbox-desc');
  var lightboxCounter = modal.querySelector('.lightbox-counter');
  var closeBtn = modal.querySelector('.lightbox-close');
  var prevBtn = modal.querySelector('.lightbox-btn.prev');
  var nextBtn = modal.querySelector('.lightbox-btn.next');

  var activeGallery = [];
  var currentIndex = 0;

  function collectItems(){
    var items = document.querySelectorAll('[data-lightbox-src], .media-card, .highlight-slide, .hero-slide, .heritage-photo, .hero-visual-photo, .seva-fig');
    activeGallery = [];
    items.forEach(function(item){
      var src = item.getAttribute('data-lightbox-src') || (item.querySelector('img') ? item.querySelector('img').getAttribute('src') : '');
      if(!src) return;
      
      var titleEn = item.getAttribute('data-title-en') || 
                    (item.querySelector('.media-card-title') ? item.querySelector('.media-card-title').getAttribute('data-en') || item.querySelector('.media-card-title').textContent : '') ||
                    (item.querySelector('h4') ? item.querySelector('h4').textContent : '') ||
                    'ABASS Seva Darshan';
      var titleTa = item.getAttribute('data-title-ta') || 
                    (item.querySelector('.media-card-title') ? item.querySelector('.media-card-title').getAttribute('data-ta') || item.querySelector('.media-card-title').textContent : '') ||
                    titleEn;
      
      var descEn = item.getAttribute('data-desc-en') || 
                   (item.querySelector('.media-card-desc') ? item.querySelector('.media-card-desc').getAttribute('data-en') || item.querySelector('.media-card-desc').textContent : '') ||
                   (item.querySelector('p') ? item.querySelector('p').textContent : '') ||
                   '';
      var descTa = item.getAttribute('data-desc-ta') || 
                   (item.querySelector('.media-card-desc') ? item.querySelector('.media-card-desc').getAttribute('data-ta') || item.querySelector('.media-card-desc').textContent : '') ||
                   descEn;

      activeGallery.push({
        src: src,
        titleEn: titleEn,
        titleTa: titleTa,
        descEn: descEn,
        descTa: descTa,
        element: item
      });

      item.style.cursor = 'pointer';
      item.addEventListener('click', function(e){
        e.preventDefault();
        openLightbox(src);
      });
    });
  }

  function openLightbox(src){
    for(var i = 0; i < activeGallery.length; i++){
      if(activeGallery[i].src === src){
        currentIndex = i;
        break;
      }
    }
    renderLightbox();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderLightbox(){
    if(!activeGallery.length || currentIndex < 0 || currentIndex >= activeGallery.length) return;
    var cur = activeGallery[currentIndex];
    lightboxImg.src = cur.src;
    lightboxImg.alt = cur.titleEn;

    window.updateLightboxCaption = function(){
      var isTa = document.body.classList.contains('lang-ta');
      lightboxTitle.textContent = isTa ? cur.titleTa : cur.titleEn;
      lightboxDesc.textContent = isTa ? cur.descTa : cur.descEn;
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + activeGallery.length;
    };
    window.updateLightboxCaption();
  }

  function showPrev(){
    if(currentIndex > 0){
      currentIndex--;
    } else {
      currentIndex = activeGallery.length - 1;
    }
    renderLightbox();
  }

  function showNext(){
    if(currentIndex < activeGallery.length - 1){
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    renderLightbox();
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function(e){ e.stopPropagation(); showPrev(); });
  nextBtn.addEventListener('click', function(e){ e.stopPropagation(); showNext(); });

  modal.addEventListener('click', function(e){
    if(e.target === modal || e.target.classList.contains('lightbox-content')){
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(e){
    if(!modal.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  });

  // Touch Swipe for Lightbox
  var touchStartX = 0;
  var touchEndX = 0;
  modal.addEventListener('touchstart', function(e){
    touchStartX = e.changedTouches[0].screenX;
  }, {passive:true});
  modal.addEventListener('touchend', function(e){
    touchEndX = e.changedTouches[0].screenX;
    if(touchEndX < touchStartX - 40) showNext();
    if(touchEndX > touchStartX + 40) showPrev();
  }, {passive:true});

  // Initialize gallery items
  collectItems();
})();

// ============ HOMEPAGE HIGHLIGHTS SLIDER ============
(function(){
  var track = document.querySelector('.highlights-track');
  var slides = document.querySelectorAll('.highlight-slide');
  var prevBtn = document.querySelector('.slider-nav-btn.prev');
  var nextBtn = document.querySelector('.slider-nav-btn.next');
  var dotsContainer = document.querySelector('.slider-dots');

  if(!track || !slides.length) return;

  var currentSlide = 0;
  var slideCount = slides.length;
  var autoPlayTimer = null;

  function getVisibleCount(){
    if(window.innerWidth <= 620) return 1;
    if(window.innerWidth <= 980) return 2;
    return 3;
  }

  function getMaxIndex(){
    var visible = getVisibleCount();
    return Math.max(0, slideCount - visible);
  }

  // Create dots
  if(dotsContainer){
    dotsContainer.innerHTML = '';
    var totalPages = Math.ceil(slideCount / getVisibleCount());
    for(var i = 0; i <= getMaxIndex(); i++){
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      (function(idx){
        dot.addEventListener('click', function(){
          goToSlide(idx);
          resetAutoPlay();
        });
      })(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(){
    var dots = document.querySelectorAll('.slider-dot');
    dots.forEach(function(d, idx){
      d.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index){
    var maxIdx = getMaxIndex();
    if(index < 0) index = 0;
    if(index > maxIdx) index = maxIdx;
    currentSlide = index;

    var slideWidth = slides[0].offsetWidth;
    var gap = 24;
    var offset = currentSlide * (slideWidth + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';
    updateDots();
  }

  function nextSlide(){
    var maxIdx = getMaxIndex();
    if(currentSlide >= maxIdx){
      goToSlide(0);
    } else {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide(){
    var maxIdx = getMaxIndex();
    if(currentSlide <= 0){
      goToSlide(maxIdx);
    } else {
      goToSlide(currentSlide - 1);
    }
  }

  if(prevBtn) prevBtn.addEventListener('click', function(){ prevSlide(); resetAutoPlay(); });
  if(nextBtn) nextBtn.addEventListener('click', function(){ nextSlide(); resetAutoPlay(); });

  function startAutoPlay(){
    stopAutoPlay();
    autoPlayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay(){
    if(autoPlayTimer) clearInterval(autoPlayTimer);
  }

  function resetAutoPlay(){
    stopAutoPlay();
    startAutoPlay();
  }

  track.parentElement.addEventListener('mouseenter', stopAutoPlay);
  track.parentElement.addEventListener('mouseleave', startAutoPlay);

  window.addEventListener('resize', function(){
    goToSlide(currentSlide);
  });

  startAutoPlay();
})();

// ============ HERO IMAGE SLIDESHOW TRANSITION ============
(function(){
  var heroSlides = document.querySelectorAll('.hero-slideshow .hero-slide');
  var prevBtn = document.querySelector('.hero-nav-arrow.prev');
  var nextBtn = document.querySelector('.hero-nav-arrow.next');
  var dotsContainer = document.querySelector('.hero-slide-dots');
  var slideshow = document.querySelector('.hero-slideshow');

  if(!heroSlides.length || !slideshow) return;

  var currentIdx = 0;
  var slideTimer = null;

  // Build dots
  if(dotsContainer){
    dotsContainer.innerHTML = '';
    heroSlides.forEach(function(_, idx){
      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to hero slide ' + (idx + 1));
      dot.addEventListener('click', function(e){
        e.stopPropagation();
        goToHeroSlide(idx);
        resetHeroTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateHeroDots(){
    var dots = document.querySelectorAll('.hero-dot');
    dots.forEach(function(d, i){
      d.classList.toggle('active', i === currentIdx);
    });
  }

  function goToHeroSlide(idx){
    heroSlides[currentIdx].classList.remove('active');
    currentIdx = (idx + heroSlides.length) % heroSlides.length;
    heroSlides[currentIdx].classList.add('active');
    updateHeroDots();
  }

  function nextHeroSlide(){
    goToHeroSlide(currentIdx + 1);
  }

  function prevHeroSlide(){
    goToHeroSlide(currentIdx - 1);
  }

  if(prevBtn){
    prevBtn.addEventListener('click', function(e){
      e.stopPropagation();
      prevHeroSlide();
      resetHeroTimer();
    });
  }

  if(nextBtn){
    nextBtn.addEventListener('click', function(e){
      e.stopPropagation();
      nextHeroSlide();
      resetHeroTimer();
    });
  }

  function startHeroTimer(){
    stopHeroTimer();
    slideTimer = setInterval(nextHeroSlide, 4500);
  }

  function stopHeroTimer(){
    if(slideTimer) clearInterval(slideTimer);
  }

  function resetHeroTimer(){
    stopHeroTimer();
    startHeroTimer();
  }

  slideshow.addEventListener('mouseenter', stopHeroTimer);
  slideshow.addEventListener('mouseleave', startHeroTimer);

  startHeroTimer();
})();
