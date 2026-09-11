
// ============ LANGUAGE SWITCHER ============
(function(){
  var STORAGE = {}; // in-memory only
  var currentLang = 'en';
  var translatable = document.querySelectorAll('[data-en]');
  var placeholders = document.querySelectorAll('[data-en-ph]');
  var buttons = document.querySelectorAll('.lang-btn');

  function applyLang(lang){
    currentLang = lang;
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
  }

  buttons.forEach(function(b){
    b.addEventListener('click', function(){ applyLang(b.getAttribute('data-lang')); });
  });

  applyLang('en');
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
var calTabs = document.querySelectorAll('.cal-tab');
var calPanelText = {
  0: {
    en: ['Event details will appear here once published','Dates, venues, sponsorship options and registration details are added by Trust administrators through the content dashboard.'],
    ta: ['வெளியிடப்பட்டவுடன் நிகழ்வு விவரங்கள் இங்கே தோன்றும்','தேதிகள், இடங்கள், ஸ்பான்சர்ஷிப் விருப்பங்கள் மற்றும் பதிவு விவரங்கள் அறக்கட்டளை நிர்வாகிகளால் சேர்க்கப்படும்.']
  },
  1: {
    en: ['Monthly calendar will be published here','The recurring monthly Annadhaanam schedule is maintained by Trust administrators and shown here once available.'],
    ta: ['மாதாந்திர நாள்காட்டி இங்கே வெளியிடப்படும்','மீண்டும் மீண்டும் நடைபெறும் மாதாந்திர அன்னதான அட்டவணை அறக்கட்டளை நிர்வாகிகளால் பராமரிக்கப்பட்டு இங்கே கிடைக்கும்போது காட்டப்படும்.']
  },
  2: {
    en: ['Annual calendar will be published here','The full-year calendar of Villakku Pooja and major observances will be listed here once approved.'],
    ta: ['ஆண்டு நாள்காட்டி இங்கே வெளியிடப்படும்','விளக்கு பூஜை மற்றும் முக்கிய நிகழ்வுகளின் முழு ஆண்டு நாள்காட்டி ஒப்புதல் அளிக்கப்பட்டவுடன் இங்கே பட்டியலிடப்படும்.']
  },
  3: {
    en: ['Past events archive will appear here','A yearly historical record of completed events and poojas is maintained for reference.'],
    ta: ['கடந்த நிகழ்வுகளின் காப்பகம் இங்கே தோன்றும்','நிறைவடைந்த நிகழ்வுகள் மற்றும் பூஜைகளின் ஆண்டுவாரி வரலாற்றுப் பதிவு குறிப்புக்காக பராமரிக்கப்படுகிறது.']
  }
};
var panelHeading = document.querySelector('.cal-panel h4');
var panelBody = document.querySelector('.cal-panel p');
calTabs.forEach(function(tab, i){
  tab.addEventListener('click', function(){
    calTabs.forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
    var lang = document.body.classList.contains('lang-ta') ? 'ta' : 'en';
    panelHeading.textContent = calPanelText[i][lang][0];
    panelBody.textContent = calPanelText[i][lang][1];
    panelHeading.setAttribute('data-en', calPanelText[i]['en'][0]);
    panelHeading.setAttribute('data-ta', calPanelText[i]['ta'][0]);
    panelBody.setAttribute('data-en', calPanelText[i]['en'][1]);
    panelBody.setAttribute('data-ta', calPanelText[i]['ta'][1]);
  });
});

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
  var phone='919962130253';
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
