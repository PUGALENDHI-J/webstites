
/* ==========================================================================
   ABASS — DEVOTIONAL UPGRADE SCRIPTS
   1. Hero darshan caption (mobile-first hero value image)
   2. Seva Sankalpam sponsor dropdown
   ========================================================================== */

/* ============ HERO DARSHAN CAPTION ============ */
(function(){
  var slideshow = document.querySelector('.hero-slideshow');
  if(!slideshow) return;

  var cap = slideshow.querySelector('.hero-darshan-cap');
  if(!cap) return;
  var capTitle = cap.querySelector('.cap-title');
  if(!capTitle) return;

  function syncCaption(){
    var active = slideshow.querySelector('.hero-slide.active');
    if(!active) return;
    var en = active.getAttribute('data-title-en') || '';
    var ta = active.getAttribute('data-title-ta') || en;
    capTitle.setAttribute('data-en', en);
    capTitle.setAttribute('data-ta', ta);
    capTitle.innerHTML = (document.body.classList.contains('lang-ta') ? ta : en);
  }

  // re-sync whenever the active slide changes
  var observer = new MutationObserver(function(){ syncCaption(); });
  slideshow.querySelectorAll('.hero-slide').forEach(function(s){
    observer.observe(s, { attributes:true, attributeFilter:['class'] });
  });

  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){ setTimeout(syncCaption, 0); });
  });

  syncCaption();
})();


/* ============ SEVA SANKALPAM — SPONSOR DROPDOWN ============ */
(function(){
  var form = document.querySelector('[data-seva-form]');
  if(!form) return;

  var PHONE = '919841820668';

  /* Every seva the Trust accepts, with its tier amounts and what it covers. */
  var SEVAS = [
    {
      id:'annadhaanam', group:'devotional',
      en:'Annadhaanam Mahadhanam', ta:'அன்னதானம் மகா தானம்',
      amounts:[5001, 10001],
      descEn:'Feed hundreds of devotees with sanctified prasadam on pooja and festival days.',
      descTa:'பூஜை மற்றும் திருவிழா நாட்களில் நூற்றுக்கணக்கான பக்தர்களுக்கு பிரசாதம் வழங்குதல்.',
      perksEn:['Sankalpam archana in your name and gothram','Prasadam despatched to your home','Named in the Annadhaanam seva register'],
      perksTa:['உங்கள் பெயர் மற்றும் கோத்திரத்தில் சங்கல்ப அர்ச்சனை','உங்கள் இல்லத்திற்கு பிரசாதம் அனுப்பப்படும்','அன்னதான சேவை பதிவேட்டில் பெயர் பதிவு']
    },
    {
      id:'padi', group:'devotional',
      en:'18 Padi Pooja Sponsorship', ta:'18 படி பூஜை ஸ்பான்சர்ஷிப்',
      amounts:[15001],
      descEn:'Sponsor the full 18 sacred step decoration, 18 kalasam lighting and Sastha Sahasranama archana.',
      descTa:'18 புனித படிகள் அலங்காரம், 18 கலச தீபம் மற்றும் சாஸ்தா சகஸ்ரநாம அர்ச்சனைக்கான முழு ஸ்பான்சர்ஷிப்.',
      perksEn:['Family sankalpam at the 18 Padi altar','Name on the festival sponsor honour board','Reserved darshan for your family'],
      perksTa:['18 படி பீடத்தில் குடும்ப சங்கல்பம்','திருவிழா ஸ்பான்சர் பலகையில் பெயர்','உங்கள் குடும்பத்திற்கு தரிசன இடம்']
    },
    {
      id:'vilakku', group:'devotional',
      en:'Thiru Vilakku Pooja', ta:'திருவிளக்கு பூஜை',
      amounts:[3001, 5001],
      descEn:'Sponsor the lamps, ghee, wicks and Lalitha Sahasranamam parayanam for the Vilakku Pooja.',
      descTa:'விளக்கு பூஜைக்கான தீபங்கள், நெய், திரி மற்றும் லலிதா சகஸ்ரநாம பாராயணத்திற்கு உதவுதல்.',
      perksEn:['Archana during the lamp parayanam','Vilakku prasadam and kumkumam','Seva acknowledgement on WhatsApp'],
      perksTa:['தீப பாராயண நேரத்தில் அர்ச்சனை','விளக்கு பிரசாதம் மற்றும் குங்குமம்','WhatsApp வழியாக சேவை உறுதிப்படுத்தல்']
    },
    {
      id:'abhishekam', group:'devotional',
      en:'Maha Abhishekam', ta:'மகா அபிஷேகம்',
      amounts:[3001, 7501],
      descEn:'Offer milk, sandal paste, honey, panchamirtham, vibhuti and theertham for the Swami abhishekam.',
      descTa:'சுவாமிக்கு பால், சந்தனம், தேன், பஞ்சாமிர்தம், விபூதி மற்றும் தீர்த்த அபிஷேகம் சமர்ப்பித்தல்.',
      perksEn:['Sankalpam read out before the abhishekam','Theertham and vibhuti prasadam','Photo of the abhishekam shared with you'],
      perksTa:['அபிஷேகத்திற்கு முன் சங்கல்பம் ஓதப்படும்','தீர்த்தம் மற்றும் விபூதி பிரசாதம்','அபிஷேக புகைப்படம் பகிரப்படும்']
    },
    {
      id:'alankaram', group:'devotional',
      en:'Thulasi & Pushpalankaram', ta:'துளசி & புஷ்பாலங்காரம்',
      amounts:[2501],
      descEn:'Sacred thulasi garlands, lotus, vana mala and sandalwood kaappu for Lord Ayyappa alankaram.',
      descTa:'ஐயப்பனுக்கு புனித துளசி மாலை, தாமரை, வனமாலை மற்றும் சந்தன காப்பு அலங்காரம்.',
      perksEn:['Alankaram offered in your name','Darshan photo of the alankaram','Thulasi prasadam'],
      perksTa:['உங்கள் பெயரில் அலங்காரம் சமர்ப்பிக்கப்படும்','அலங்கார தரிசன புகைப்படம்','துளசி பிரசாதம்']
    },
    {
      id:'deepam', group:'devotional',
      en:'Nithya Deepam & Pooja Ghee', ta:'நித்திய தீபம் & பூஜை நெய்',
      amounts:[1001],
      descEn:'Keep the daily deepam lit with pure ghee, wicks and camphor through the month.',
      descTa:'மாதம் முழுவதும் தூய நெய், திரி மற்றும் கற்பூரத்துடன் நித்திய தீபம் ஏற்றி வைத்தல்.',
      perksEn:['Deepa aradhana in your name','Monthly seva confirmation','Entry in the nithya deepam register'],
      perksTa:['உங்கள் பெயரில் தீப ஆராதனை','மாதாந்திர சேவை உறுதிப்படுத்தல்','நித்திய தீப பதிவேட்டில் பெயர்']
    },
    {
      id:'mandala', group:'devotional',
      en:'Mandala Pooja Sponsorship', ta:'மண்டல பூஜை ஸ்பான்சர்ஷிப்',
      amounts:[11001],
      descEn:'Support the 41-day Mandala season — daily poojas, bhajans, irumudi guidance and pilgrim care.',
      descTa:'41 நாள் மண்டல கால பூஜைகள், பஜனைகள், இருமுடி வழிகாட்டல் மற்றும் யாத்ரீகர் சேவைக்கு உதவுதல்.',
      perksEn:['Sankalpam through the Mandala season','Irumudi kettu guidance for your family','Special mention at Mandala Pooja'],
      perksTa:['மண்டல காலம் முழுவதும் சங்கல்பம்','உங்கள் குடும்பத்திற்கு இருமுடி கட்டு வழிகாட்டல்','மண்டல பூஜையில் சிறப்பு குறிப்பு']
    },
    {
      id:'medical', group:'welfare',
      en:'Medical Seva & Pilgrim Aid', ta:'மருத்துவ சேவை & யாத்ரீகர் உதவி',
      amounts:[3001, 5001],
      descEn:'Medical camps, medicines and rest-stop support for Sabarimala pilgrims and needy families.',
      descTa:'சபரிமலை யாத்ரீகர்கள் மற்றும் தேவையுள்ள குடும்பங்களுக்கு மருத்துவ முகாம், மருந்து மற்றும் ஓய்வு உதவி.',
      perksEn:['Seva recorded in the welfare ledger','Impact update after each camp','80G-ready official receipt'],
      perksTa:['நல சேவை பதிவேட்டில் பதிவு','ஒவ்வொரு முகாமுக்குப் பின் தகவல்','80G-க்கு ஏற்ற அதிகாரப்பூர்வ ரசீது']
    },
    {
      id:'education', group:'welfare',
      en:'Education & General Welfare Fund', ta:'கல்வி & பொது நல நிதி',
      amounts:[],
      descEn:'Scholarships, books, notebooks and fees support for deserving children of devotee families.',
      descTa:'பக்தர் குடும்பங்களின் தகுதியான குழந்தைகளுக்கு உதவித்தொகை, புத்தகங்கள் மற்றும் கட்டண உதவி.',
      perksEn:['Choose any amount you wish to offer','Annual utilisation report','Official receipt with reference number'],
      perksTa:['நீங்கள் விரும்பும் எந்த தொகையையும் வழங்கலாம்','ஆண்டு பயன்பாட்டு அறிக்கை','குறிப்பு எண்ணுடன் அதிகாரப்பூர்வ ரசீது']
    },
    {
      id:'event', group:'welfare',
      en:'Event / Festival Sponsorship', ta:'நிகழ்வு / திருவிழா ஸ்பான்சர்ஷிப்',
      amounts:[],
      descEn:'Sponsor a full festival day — mandapam, sound, bhajan troupe, decoration and prasadam.',
      descTa:'ஒரு முழு திருவிழா நாளை ஸ்பான்சர் செய்யுங்கள் — மண்டபம், ஒலி, பஜனை, அலங்காரம் மற்றும் பிரசாதம்.',
      perksEn:['Family honoured at the event','Banner acknowledgement at the venue','Photos and video of the day'],
      perksTa:['நிகழ்வில் குடும்பம் கௌரவிக்கப்படும்','நிகழ்வு இடத்தில் பேனர் அங்கீகாரம்','அன்றைய புகைப்படங்கள் மற்றும் காணொளி']
    },
    {
      id:'general', group:'welfare',
      en:'General Donation to the Trust', ta:'அறக்கட்டளைக்கு பொது நன்கொடை',
      amounts:[],
      descEn:'Let the Trustees direct your offering to wherever the need is greatest that month.',
      descTa:'அந்த மாதம் எங்கு தேவை அதிகமோ அங்கு உங்கள் நன்கொடையை அறங்காவலர்கள் பயன்படுத்துவார்கள்.',
      perksEn:['Applied where the need is greatest','Recorded with a donation reference','Included in the annual report'],
      perksTa:['அதிக தேவை உள்ள இடத்தில் பயன்படுத்தப்படும்','நன்கொடை குறிப்பு எண்ணுடன் பதிவு','ஆண்டு அறிக்கையில் சேர்க்கப்படும்']
    }
  ];

  var GROUPS = {
    devotional:{ en:'Pooja & Devotional Seva', ta:'பூஜை & பக்தி சேவை' },
    welfare:{ en:'Welfare, Education & General', ta:'நலன், கல்வி & பொது' }
  };

  var select     = form.querySelector('[data-seva-select]');
  var detailBox  = form.querySelector('[data-seva-detail]');
  var chipsBox   = form.querySelector('[data-seva-chips]');
  var customWrap = form.querySelector('[data-seva-custom]');
  var customInp  = customWrap ? customWrap.querySelector('input') : null;
  if(!select || !detailBox) return;

  var chosenAmount = null;

  function isTa(){ return document.body.classList.contains('lang-ta'); }
  function pick(item, key){ return isTa() ? item[key + 'Ta'] || item[key + 'En'] : item[key + 'En']; }
  function rupee(n){ return '₹' + n.toLocaleString('en-IN'); }
  function current(){
    for(var i = 0; i < SEVAS.length; i++){ if(SEVAS[i].id === select.value) return SEVAS[i]; }
    return SEVAS[0];
  }

  /* ---- build the dropdown, grouped, bilingual ---- */
  function buildOptions(){
    select.innerHTML = '';
    Object.keys(GROUPS).forEach(function(gkey){
      var og = document.createElement('optgroup');
      og.label = isTa() ? GROUPS[gkey].ta : GROUPS[gkey].en;

      SEVAS.filter(function(s){ return s.group === gkey; }).forEach(function(s){
        var opt = document.createElement('option');
        opt.value = s.id;
        // keep labels short so they never clip inside a narrow phone dropdown
        var suffix = '';
        if(s.amounts.length === 1){ suffix = ' · ' + rupee(s.amounts[0]); }
        else if(s.amounts.length > 1){ suffix = ' · ' + rupee(s.amounts[0]) + '+'; }
        opt.setAttribute('data-en', s.en + suffix);
        opt.setAttribute('data-ta', s.ta + suffix);
        opt.textContent = (isTa() ? s.ta : s.en) + suffix;
        og.appendChild(opt);
      });
      select.appendChild(og);
    });
  }

  /* ---- render the detail card + amount chips for the chosen seva ---- */
  function renderDetail(){
    var s = current();

    detailBox.innerHTML =
      '<div class="seva-detail-top">' +
        '<span class="seva-detail-name"></span>' +
        '<span class="seva-detail-amt"></span>' +
      '</div>' +
      '<p class="seva-detail-desc"></p>' +
      '<ul class="seva-detail-perks"></ul>';

    detailBox.querySelector('.seva-detail-name').textContent = isTa() ? s.ta : s.en;

    var amtEl = detailBox.querySelector('.seva-detail-amt');
    if(s.amounts.length){
      amtEl.textContent = s.amounts.map(rupee).join(' / ');
    } else {
      amtEl.setAttribute('data-en', 'Any amount');
      amtEl.setAttribute('data-ta', 'விருப்பத் தொகை');
      amtEl.textContent = isTa() ? 'விருப்பத் தொகை' : 'Any amount';
    }

    detailBox.querySelector('.seva-detail-desc').textContent = pick(s, 'desc');

    var ul = detailBox.querySelector('.seva-detail-perks');
    (isTa() ? s.perksTa : s.perksEn).forEach(function(p){
      var li = document.createElement('li');
      li.textContent = p;
      ul.appendChild(li);
    });

    renderChips(s);
  }

  function renderChips(s){
    if(!chipsBox) return;
    chipsBox.innerHTML = '';
    chosenAmount = s.amounts.length ? s.amounts[0] : null;

    s.amounts.forEach(function(amt, i){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'seva-chip' + (i === 0 ? ' active' : '');
      b.textContent = rupee(amt);
      b.addEventListener('click', function(){
        chipsBox.querySelectorAll('.seva-chip').forEach(function(c){ c.classList.remove('active'); });
        b.classList.add('active');
        chosenAmount = amt;
        if(customInp) customInp.value = '';
      });
      chipsBox.appendChild(b);
    });

    // an "other amount" chip is always available
    var other = document.createElement('button');
    other.type = 'button';
    other.className = 'seva-chip' + (s.amounts.length ? '' : ' active');
    other.setAttribute('data-en', 'Other amount');
    other.setAttribute('data-ta', 'வேறு தொகை');
    other.textContent = isTa() ? 'வேறு தொகை' : 'Other amount';
    other.addEventListener('click', function(){
      chipsBox.querySelectorAll('.seva-chip').forEach(function(c){ c.classList.remove('active'); });
      other.classList.add('active');
      chosenAmount = null;
      if(customWrap){
        customWrap.style.display = 'block';
        if(customInp) customInp.focus();
      }
    });
    chipsBox.appendChild(other);

    if(customWrap) customWrap.style.display = s.amounts.length ? 'none' : 'block';
  }

  /* ---- send the sankalpam to the Trust on WhatsApp ---- */
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var s = current();
    var data = new FormData(form);
    var name   = (data.get('name') || '').trim();
    var mobile = (data.get('mobile') || '').trim();
    var star   = (data.get('star') || '').trim();
    var typed  = customInp ? (customInp.value || '').trim() : '';
    var amount = typed || (chosenAmount ? String(chosenAmount) : '');

    var lines = [
      'Swamiye Saranam Ayyappa!',
      '',
      'ABASS — Seva Sankalpam Request',
      'Seva: ' + s.en,
      'Amount: ' + (amount ? '₹' + amount : 'To be advised'),
      'Devotee Name: ' + (name || '-'),
      'Mobile: ' + (mobile || '-'),
      'Star / Gothram: ' + (star || '-'),
      '',
      'Please guide me with the sankalpam and payment details.'
    ];

    window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });

  select.addEventListener('change', renderDetail);

  // rebuild in the newly chosen language
  document.querySelectorAll('.lang-btn').forEach(function(b){
    b.addEventListener('click', function(){
      var keep = select.value;
      setTimeout(function(){
        buildOptions();
        if(keep) select.value = keep;
        renderDetail();
      }, 0);
    });
  });

  buildOptions();
  select.value = 'annadhaanam';
  renderDetail();
})();
