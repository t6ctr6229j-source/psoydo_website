(function(){
  try{if(new URLSearchParams(window.location.search).get('qa')==='fullpage')document.documentElement.classList.add('qa-fullpage');}catch(error){}

  var header=document.querySelector('.site-header');

  function onScroll(){
    if(header)header.classList.toggle('scrolled',window.scrollY>20);
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  var toggle=document.querySelector('.menu-toggle');
  var menu=document.querySelector('.mobile-menu');

  function setMenu(open,focusMenu){
    if(!toggle||!menu)return;
    menu.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');
    menu.setAttribute('aria-hidden',String(!open));
    if('inert' in menu)menu.inert=!open;
    if(open&&focusMenu){
      var firstLink=menu.querySelector('a');
      if(firstLink)window.setTimeout(function(){firstLink.focus();},0);
    }
  }

  if(toggle&&menu){
    if('inert' in menu)menu.inert=true;
    toggle.addEventListener('click',function(){
      setMenu(!menu.classList.contains('open'),true);
    });
    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click',function(){setMenu(false);});
    });
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&menu.classList.contains('open')){
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click',function(event){
      if(!menu.classList.contains('open'))return;
      if(menu.contains(event.target)||toggle.contains(event.target))return;
      setMenu(false);
    });
    window.addEventListener('resize',function(){
      if(window.innerWidth>1180&&menu.classList.contains('open'))setMenu(false);
    },{passive:true});
  }

  document.querySelectorAll('.reveal').forEach(function(el){
    el.classList.add('visible');
  });


  // Motion is decorative. Text and primary actions never depend on its lifecycle.
  var motionRoot=document.documentElement;
  var motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion=motionPreference.matches;
  var userPausedMotion=false;
  var motionListeners=[];
  var motionTargets=[];
  var motionButtons=Array.prototype.slice.call(document.querySelectorAll('[data-motion-toggle]'));

  function motionAllowed(){return !reduceMotion&&!userPausedMotion&&!document.hidden;}

  function notifyMotion(){
    reduceMotion=motionPreference.matches;
    var state=reduceMotion?'reduced':userPausedMotion?'paused':document.hidden?'hidden':'running';
    motionRoot.setAttribute('data-motion',state);
    motionRoot.classList.toggle('motion-ready',!reduceMotion);
    motionRoot.classList.toggle('motion-reduced',reduceMotion);
    motionButtons.forEach(function(button){
      button.hidden=false;
      button.disabled=reduceMotion;
      button.setAttribute('aria-pressed',String(reduceMotion||userPausedMotion));
      button.setAttribute('title',reduceMotion?'Dein Gerät hat reduzierte Bewegung aktiviert.':'Bewegungen auf dieser Seite steuern');
      var label=button.querySelector('span');
      if(label)label.textContent=reduceMotion?'Bewegung reduziert':userPausedMotion?'Bewegung fortsetzen':'Bewegung pausieren';
    });
    motionListeners.forEach(function(listener){listener();});
  }

  function isInView(element){
    var rect=element.getBoundingClientRect();
    return rect.bottom>0&&rect.top<window.innerHeight&&rect.right>0&&rect.left<window.innerWidth;
  }

  var sectionObserver='IntersectionObserver' in window?new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      entry.target.setAttribute('data-motion-in-view',String(entry.isIntersecting));
    });
    motionListeners.forEach(function(listener){listener();});
  },{threshold:0}):null;

  function watchMotion(element){
    if(!element||motionTargets.indexOf(element)!==-1)return;
    motionTargets.push(element);
    element.setAttribute('data-motion-in-view',String(isInView(element)));
    element.classList.add('motion-active');
    if(sectionObserver)sectionObserver.observe(element);
  }

  function elementCanMove(element){
    return motionAllowed()&&element.getAttribute('data-motion-in-view')==='true';
  }

  motionButtons.forEach(function(button){
    button.addEventListener('click',function(){
      if(reduceMotion)return;
      userPausedMotion=!userPausedMotion;
      notifyMotion();
    });
  });
  document.addEventListener('visibilitychange',notifyMotion);
  if(motionPreference.addEventListener)motionPreference.addEventListener('change',notifyMotion);
  else if(motionPreference.addListener)motionPreference.addListener(notifyMotion);

  document.querySelectorAll('.membrane-stage,.context-stage,.process-rail,.control-room,.pif-loop-v3,.architecture-map,.control-layers,.impact-list,.closed-loop-track,.home-trust,.pif-signature,.v3-hero').forEach(watchMotion);

  if(!sectionObserver){
    var motionScrollTick=false;
    window.addEventListener('scroll',function(){
      if(motionScrollTick)return;
      motionScrollTick=true;
      window.requestAnimationFrame(function(){
        motionScrollTick=false;
        motionTargets.forEach(function(element){element.setAttribute('data-motion-in-view',String(isInView(element)));});
        motionListeners.forEach(function(listener){listener();});
      });
    },{passive:true});
  }

  // The page position indicator stays still when motion is paused or reduced.
  var progress=document.createElement('div');
  progress.className='page-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);
  var progressTick=false;
  function updateProgress(){
    progressTick=false;
    if(!motionAllowed())return;
    var max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    progress.style.transform='scaleX('+Math.min(1,Math.max(0,window.scrollY/max))+')';
  }
  window.addEventListener('scroll',function(){
    if(!progressTick&&motionAllowed()){progressTick=true;window.requestAnimationFrame(updateProgress);}
  },{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  motionListeners.push(updateProgress);

  // One fictional record, one automatic pass, then visitor-controlled changes.
  var transformDemo=document.querySelector('[data-transform-demo]');
  if(transformDemo){
    watchMotion(transformDemo);
    var transformValues=Array.prototype.slice.call(transformDemo.querySelectorAll('[data-original][data-safe]'));
    var transformStatus=transformDemo.querySelector('[data-transform-status]');
    var transformFoot=transformDemo.querySelector('[data-transform-foot]');
    var transformCounter=transformDemo.querySelector('[data-transform-counter]');
    var transformControls=transformDemo.querySelector('[data-transform-controls]');
    var transformAnnouncement=transformDemo.querySelector('[data-transform-announcement]');
    var transformModeButtons=Array.prototype.slice.call(transformDemo.querySelectorAll('[data-transform-mode]'));
    var transformFrame=0;
    var transformElapsed=0;
    var transformLastTime=null;
    var transformPlaying=false;
    var transformStarted=false;
    var transformSelected='original';
    var transformAnnounce=false;
    var transformDuration=3300;
    if(transformControls)transformControls.hidden=false;

    function stopTransformFrame(){
      if(transformFrame)window.cancelAnimationFrame(transformFrame);
      transformFrame=0;
      transformLastTime=null;
    }

    function selectTransformMode(mode){
      transformSelected=mode;
      transformModeButtons.forEach(function(button){button.setAttribute('aria-pressed',String(button.getAttribute('data-transform-mode')===mode));});
    }

    function setTransformValue(element,safe,changing){
      var value=element.getAttribute(safe?'data-safe':'data-original');
      if(element.textContent!==value)element.textContent=value;
      var row=element.closest('[data-transform-row]');
      if(row){row.classList.toggle('is-safe',safe);row.classList.toggle('is-changing',changing);}
    }

    function setTransformState(state,status,foot,count){
      transformDemo.setAttribute('data-state',state);
      if(transformStatus)transformStatus.textContent=status;
      if(transformFoot)transformFoot.textContent=foot;
      if(transformCounter)transformCounter.textContent=String(count);
    }

    function settleTransform(mode){
      stopTransformFrame();
      transformPlaying=false;
      transformDemo.classList.remove('is-scanning');
      transformDemo.setAttribute('data-playback','idle');
      transformDemo.setAttribute('aria-busy','false');
      selectTransformMode(mode);
      var safe=mode==='safe';
      transformValues.forEach(function(element){setTransformValue(element,safe,false);});
      setTransformState(safe?'safe':'original',safe?'PSEUDONYMISIERT':'ORIGINAL',safe?'Identität ersetzt. Kontext bleibt erhalten.':'Direkte Identifikatoren erkannt',safe?transformValues.length:0);
      if(transformAnnounce&&transformAnnouncement){
        transformAnnouncement.textContent=safe?'Drei Identifikatoren ersetzt. Abteilung und Vorgang bleiben unverändert.':'Fiktive Originalwerte wieder eingeblendet. Der Kontext bleibt unverändert.';
      }
    }

    function renderTransformTimeline(){
      if(transformElapsed>=transformDuration){settleTransform('safe');return;}
      if(transformElapsed>=900){
        setTransformState('processing','DEMO: IDENTITÄT WECHSELT','Fachlicher Kontext bleibt unverändert.',0);
        transformDemo.classList.add('is-scanning');
      }
      var completed=0;
      transformValues.forEach(function(element,index){
        var local=transformElapsed-(1350+index*470);
        var safe=local>=220;
        var changing=local>=0&&local<440;
        setTransformValue(element,safe,changing);
        if(safe)completed+=1;
      });
      if(transformCounter)transformCounter.textContent=String(completed);
    }

    function transformTick(now){
      transformFrame=0;
      if(!transformPlaying||!elementCanMove(transformDemo)){transformLastTime=null;return;}
      if(transformLastTime!==null)transformElapsed+=Math.max(0,now-transformLastTime);
      transformLastTime=now;
      renderTransformTimeline();
      if(transformPlaying)transformFrame=window.requestAnimationFrame(transformTick);
    }

    function syncTransformPlayback(){
      if(reduceMotion){
        transformStarted=true;
        settleTransform(transformPlaying?'safe':transformSelected);
        return;
      }
      if(!transformStarted&&elementCanMove(transformDemo)){startTransform(false);return;}
      if(!transformPlaying)return;
      var allowed=elementCanMove(transformDemo);
      transformDemo.setAttribute('data-playback',allowed?'playing':'paused');
      if(!allowed){stopTransformFrame();return;}
      if(!transformFrame)transformFrame=window.requestAnimationFrame(transformTick);
    }

    function startTransform(manual){
      transformStarted=true;
      transformAnnounce=manual;
      settleTransform('original');
      selectTransformMode('safe');
      if(!motionAllowed()){settleTransform('safe');return;}
      transformElapsed=0;
      transformPlaying=true;
      transformDemo.setAttribute('aria-busy','true');
      syncTransformPlayback();
    }

    transformModeButtons.forEach(function(button){
      button.addEventListener('click',function(){
        transformStarted=true;
        transformAnnounce=true;
        if(button.getAttribute('data-transform-mode')==='original')settleTransform('original');
        else startTransform(true);
      });
    });
    motionListeners.push(syncTransformPlayback);
    if(reduceMotion){transformStarted=true;settleTransform('safe');}
  }

  // Focus follows the reader; link targets do not move or intercept navigation.
  var caseList=document.querySelector('[data-case-list]');
  if(caseList){
    var caseMarker=caseList.querySelector('[data-case-marker]');
    var currentCase=null;
    function markCase(link){
      if(!caseMarker||!link)return;
      currentCase=link;
      caseList.classList.add('has-case-focus');
      caseMarker.style.setProperty('--case-marker-y',link.offsetTop+'px');
      caseMarker.style.height=link.offsetHeight+'px';
    }
    caseList.querySelectorAll('a').forEach(function(link){
      link.addEventListener('pointerenter',function(){markCase(link);});
      link.addEventListener('pointerdown',function(){markCase(link);},{passive:true});
      link.addEventListener('focus',function(){markCase(link);});
    });
    caseList.addEventListener('pointerleave',function(){
      var focused=caseList.querySelector('a:focus');
      if(focused)markCase(focused);else caseList.classList.remove('has-case-focus');
    });
    caseList.addEventListener('focusout',function(event){if(!caseList.contains(event.relatedTarget))caseList.classList.remove('has-case-focus');});
    window.addEventListener('resize',function(){if(currentCase)markCase(currentCase);},{passive:true});
  }

  // A small, deliberate brand joke. No input, cookies, analytics or network requests.
  var aliasEgg=document.querySelector('[data-alias-egg]');
  if(aliasEgg){
    aliasEgg.hidden=false;
    var aliasButton=aliasEgg.querySelector('[data-alias-toggle]');
    var aliasLabel=aliasEgg.querySelector('[data-alias-label]');
    var aliasNote=aliasEgg.querySelector('[data-alias-note]');
    var aliasHint=aliasEgg.querySelector('[data-alias-hint]');
    aliasButton.addEventListener('click',function(){
      var active=aliasButton.getAttribute('aria-expanded')!=='true';
      aliasButton.setAttribute('aria-expanded',String(active));
      aliasButton.setAttribute('aria-label',active?'Psoydo wiederherstellen':'Psoydo pseudonymisieren');
      aliasLabel.textContent=active?'MARKE_001':'PSOYDO';
      aliasNote.hidden=!active;
      aliasHint.hidden=active;
      aliasEgg.classList.toggle('is-alias',active);
    });
  }

  notifyMotion();


  // 30-second public AI decision check.
  var aiQuiz=document.querySelector('[data-ai-quiz]');
  if(aiQuiz){
    var aiQuizQuestions=[
      {
        eyebrow:'ÖFFENTLICH',
        question:'Die Pressemitteilung steht bereits auf eurer Website. Du möchtest sie von einer KI kürzen lassen.',
        context:'Es werden keine zusätzlichen internen Informationen ergänzt.',
        correct:'allow',
        recommendation:'Rein damit',
        title:'Bereits öffentlich ist etwas anderes als intern.',
        copy:'Wenn wirklich nur bereits veröffentlichte Inhalte enthalten sind, entsteht durch den Upload keine zusätzliche Offenlegung interner Informationen. Unternehmensregeln und Anbieterbedingungen gelten natürlich trotzdem.'
      },
      {
        eyebrow:'PERSONENBEZUG',
        question:'Für eine Auswertung sind 800 Support-Tickets fachlich freigegeben. Darin stehen aber Namen, E-Mail-Adressen und Kundennummern.',
        context:'Das Modell braucht Problemtyp, Verlauf und Lösung – nicht die Identität des Kunden.',
        correct:'protect',
        recommendation:'Erst prüfen & schützen',
        title:'Genau hier wird Pseudonymisierung interessant.',
        copy:'Direkte Identifikatoren können vor der Übergabe konsistent ersetzt werden, während der fachliche Zusammenhang für die Analyse erhalten bleibt.'
      },
      {
        eyebrow:'GESCHÄFTSGEHEIMNIS',
        question:'Ein internes Strategiepapier enthält keine Personendaten. Dafür unveröffentlichte Preise, Margen und mögliche Übernahmeziele.',
        context:'Die Information selbst ist sensibel – nicht die Identität einer Person.',
        correct:'block',
        recommendation:'Auf keinen Fall',
        title:'Keine Namen heißt nicht unkritisch.',
        copy:'Solche Inhalte können Geschäftsgeheimnisse sein. Psoydo prüft deshalb zusätzlich auf Hinweise auf mögliche Geschäftsgeheimnisse nach den Kriterien des GeschGehG. Pseudonymisierung allein würde hier das Kernproblem nicht lösen.'
      },
      {
        eyebrow:'VERTRAGSANALYSE',
        question:'Eine große Vertragsmenge soll extern analysiert werden. Der Vertragsinhalt ist für diesen Analyseweg freigegeben, reale Ansprechpartner aber nicht.',
        context:'Klauseln und Beziehungen sind relevant. Namen, E-Mails, Adressen und Unterschriften stehen trotzdem in den Dokumenten.',
        correct:'protect',
        recommendation:'Erst prüfen & schützen',
        title:'Kontext behalten. Identität ersetzen.',
        copy:'Wenn der fachliche Inhalt genutzt werden darf, aber direkte Identifikatoren nicht zum Modell sollen, kann Psoydo genau diese Trennung herstellen.'
      },
      {
        eyebrow:'IT & SECURITY',
        question:'Für Angriffskorrelation sollen Logs ausgewertet werden. Sie enthalten Usernamen, IP-Adressen und interne Hostnamen.',
        context:'Zeitstempel, Ereignisse und Beziehungen braucht das Modell. Reale Nutzerbezüge nicht; interne Systemnamen können zusätzlich vertraulich sein.',
        correct:'protect',
        recommendation:'Erst prüfen & schützen',
        title:'Hier reicht eine reine Namenssuche nicht.',
        copy:'Psoydo kann Identifikatoren pseudonymisieren und den Inhalt zusätzlich auf Hinweise auf mögliche Geschäftsgeheimnisse prüfen. Welche Informationen als geschützter Kontext verbleiben dürfen, muss für den Einsatz feststehen.'
      }
    ];

    var aiQuizIndex=0;
    var aiQuizScore=0;
    var aiQuizAnswered=false;
    var aiQuizCount=aiQuiz.querySelector('[data-ai-quiz-count]');
    var aiQuizBar=aiQuiz.querySelector('[data-ai-quiz-bar]');
    var aiQuizEyebrow=aiQuiz.querySelector('[data-ai-quiz-eyebrow]');
    var aiQuizQuestion=aiQuiz.querySelector('[data-ai-quiz-question]');
    var aiQuizContext=aiQuiz.querySelector('[data-ai-quiz-context]');
    var aiQuizActions=aiQuiz.querySelector('[data-ai-quiz-actions]');
    var aiQuizButtons=Array.prototype.slice.call(aiQuiz.querySelectorAll('[data-ai-answer]'));
    var aiQuizFeedback=aiQuiz.querySelector('[data-ai-quiz-feedback]');
    var aiQuizVerdict=aiQuiz.querySelector('[data-ai-quiz-verdict]');
    var aiQuizFeedbackTitle=aiQuiz.querySelector('[data-ai-quiz-feedback-title]');
    var aiQuizFeedbackCopy=aiQuiz.querySelector('[data-ai-quiz-feedback-copy]');
    var aiQuizNext=aiQuiz.querySelector('[data-ai-quiz-next]');
    var aiQuizStage=aiQuiz.querySelector('[data-ai-quiz-stage]');
    var aiQuizFinish=aiQuiz.querySelector('[data-ai-quiz-finish]');
    var aiQuizResult=aiQuiz.querySelector('[data-ai-quiz-result]');

    function padQuizNumber(value){
      return value<10?'0'+value:String(value);
    }

    function renderAiQuizQuestion(){
      var item=aiQuizQuestions[aiQuizIndex];
      aiQuizAnswered=false;
      if(aiQuizCount)aiQuizCount.textContent=padQuizNumber(aiQuizIndex+1)+' / '+padQuizNumber(aiQuizQuestions.length);
      if(aiQuizBar)aiQuizBar.style.transform='scaleX('+((aiQuizIndex+1)/aiQuizQuestions.length)+')';
      if(aiQuizEyebrow)aiQuizEyebrow.textContent=item.eyebrow;
      if(aiQuizQuestion)aiQuizQuestion.textContent=item.question;
      if(aiQuizContext)aiQuizContext.textContent=item.context;
      if(aiQuizFeedback)aiQuizFeedback.hidden=true;
      if(aiQuizActions)aiQuizActions.hidden=false;
      aiQuizButtons.forEach(function(button){
        button.disabled=false;
        button.classList.remove('is-selected','is-correct','is-wrong');
      });
    }

    function finishAiQuiz(){
      if(aiQuizStage)aiQuizStage.hidden=true;
      if(aiQuizFinish)aiQuizFinish.hidden=false;
      if(aiQuizCount)aiQuizCount.textContent='FERTIG';
      if(aiQuizBar)aiQuizBar.style.transform='scaleX(1)';
      if(aiQuizResult)aiQuizResult.textContent=aiQuizScore+' von '+aiQuizQuestions.length+' Situationen passend eingeschätzt';
      var finishLink=aiQuizFinish?aiQuizFinish.querySelector('a'):null;
      if(finishLink)window.setTimeout(function(){finishLink.focus();},0);
    }

    aiQuizButtons.forEach(function(button){
      button.addEventListener('click',function(){
        if(aiQuizAnswered)return;
        aiQuizAnswered=true;
        var item=aiQuizQuestions[aiQuizIndex];
        var answer=button.getAttribute('data-ai-answer');
        var correct=answer===item.correct;
        if(correct)aiQuizScore+=1;

        aiQuizButtons.forEach(function(option){
          option.disabled=true;
          if(option.getAttribute('data-ai-answer')===item.correct)option.classList.add('is-correct');
        });
        button.classList.add('is-selected');
        if(!correct)button.classList.add('is-wrong');

        if(aiQuizVerdict)aiQuizVerdict.textContent='EMPFEHLUNG · '+item.recommendation.toUpperCase();
        if(aiQuizFeedbackTitle)aiQuizFeedbackTitle.textContent=item.title;
        if(aiQuizFeedbackCopy)aiQuizFeedbackCopy.textContent=item.copy;
        if(aiQuizActions)aiQuizActions.hidden=false;
        if(aiQuizFeedback)aiQuizFeedback.hidden=false;
        if(aiQuizNext)aiQuizNext.innerHTML=(aiQuizIndex===aiQuizQuestions.length-1?'Auswertung ansehen':'Nächste Situation')+' <span>→</span>';
        if(aiQuizFeedback)window.setTimeout(function(){aiQuizFeedback.focus&&aiQuizFeedback.focus();},0);
      });
    });

    if(aiQuizNext){
      aiQuizNext.addEventListener('click',function(){
        if(!aiQuizAnswered)return;
        if(aiQuizIndex>=aiQuizQuestions.length-1){
          finishAiQuiz();
          return;
        }
        aiQuizIndex+=1;
        renderAiQuizQuestion();
        var firstButton=aiQuizButtons[0];
        if(firstButton)window.setTimeout(function(){firstButton.focus();},0);
      });
    }

    renderAiQuizQuestion();
  }

  // Never request Tally until a visitor explicitly opens the pilot form.
  // The form is published; if JavaScript is unavailable, the email CTA stays usable.
  var tallyOpen=document.getElementById('pilot-tally-open');
  var tallyClose=document.getElementById('pilot-tally-close');
  var tallyFrame=document.getElementById('pilot-tally-frame');
  var tallyDirect=document.getElementById('pilot-tally-direct');
  var tallyContact=document.getElementById('pilot-contact');
  if(tallyOpen&&tallyClose&&tallyFrame&&tallyContact){
    var tallyStage=tallyOpen.closest('[data-tally-state]');
    var pilotSubmissionIds=new Set();
    var tallyURL='https://tally.so/embed/KppMYg?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';
    // Hide the email-first fallback only once the interactive form is ready.
    if(tallyStage&&tallyStage.dataset.tallyState==='published'){
      tallyOpen.hidden=false;
      tallyStage.classList.add('is-tally-ready');
    }
    tallyOpen.addEventListener('click',function(){
      if(!tallyStage||tallyStage.dataset.tallyState!=='published')return;
      if(tallyFrame.querySelector('iframe'))return;
      var frame=document.createElement('iframe');
      frame.title='Psoydo Pilot unverbindlich anfragen';
      frame.loading='eager';
      frame.width='100%';
      frame.height='900';
      frame.referrerPolicy='strict-origin-when-cross-origin';
      frame.setAttribute('data-tally-src',tallyURL);
      frame.src=tallyURL; // Direct iframe load, no third-party widget script required.
      tallyFrame.hidden=false;
      tallyFrame.appendChild(frame);
      if(tallyDirect)tallyDirect.hidden=false;
      tallyContact.classList.add('is-tally-open');
      tallyOpen.setAttribute('aria-expanded','true');
      tallyOpen.hidden=true;
      tallyClose.hidden=false;
      if(window.__psoydoTrack)window.__psoydoTrack('psoydo_pilot_form_open');
    });
    tallyClose.addEventListener('click',function(){
      tallyFrame.replaceChildren();
      tallyFrame.hidden=true;
      if(tallyDirect)tallyDirect.hidden=true;
      tallyContact.classList.remove('is-tally-open');
      tallyOpen.hidden=false;
      tallyOpen.setAttribute('aria-expanded','false');
      tallyClose.hidden=true;
      tallyOpen.focus();
    });
    // Verify origin, iframe, event type and form ID; never send form answers to analytics.
    window.addEventListener('message',function(event){
      if(event.origin!=='https://tally.so')return;
      var frame=tallyFrame.querySelector('iframe');
      if(!frame||event.source!==frame.contentWindow)return;
      var message=event.data;
      if(typeof message==='string'){
        try{message=JSON.parse(message);}catch(error){return;}
      }
      var payload=message&&message.payload;
      if(!payload||payload.formId!=='KppMYg')return;
      if(message.event==='Tally.FormHeight'){
        var height=Number(payload.height);
        if(Number.isFinite(height)&&height>300&&height<6000)frame.height=String(Math.ceil(height));
        return;
      }
      if(message.event!=='Tally.FormSubmitted'||typeof payload.id!=='string'||!payload.id||
         pilotSubmissionIds.has(payload.id))return;
      // IDs stay in this document only; they and the form answers never reach Google.
      pilotSubmissionIds.add(payload.id);
      if(window.__psoydoTrack){
        window.__psoydoTrack('psoydo_pilot_form_submitted');
        window.__psoydoTrack('generate_lead');
      }
    });
  }
  var pilotEmail=document.getElementById('pilot-email');
  if(pilotEmail)pilotEmail.addEventListener('click',function(){
    if(window.__psoydoTrack)window.__psoydoTrack('psoydo_pilot_email_click');
  });

  // Product screenshot lightbox: enlarge real UI screenshots in-place without navigation.
  var lightboxTriggers=Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if(lightboxTriggers.length){
    var lightbox=document.createElement('div');
    lightbox.className='product-lightbox';
    lightbox.id='product-lightbox';
    lightbox.setAttribute('role','dialog');
    lightbox.setAttribute('aria-modal','true');
    lightbox.setAttribute('aria-hidden','true');
    lightbox.setAttribute('aria-labelledby','product-lightbox-title');
    lightbox.innerHTML='<div class="product-lightbox-dialog" role="document"><div class="product-lightbox-head"><strong id="product-lightbox-title">Psoydo Produktscreenshot</strong><button class="product-lightbox-close" type="button" aria-label="Großansicht schließen">×</button></div><div class="product-lightbox-body"><img alt=""></div><span class="product-lightbox-hint">ESC ZUM SCHLIESSEN</span></div>';
    document.body.appendChild(lightbox);

    var lightboxImage=lightbox.querySelector('.product-lightbox-body img');
    var lightboxTitle=lightbox.querySelector('#product-lightbox-title');
    var lightboxClose=lightbox.querySelector('.product-lightbox-close');
    var lightboxReturnFocus=null;

    function closeLightbox(){
      if(!lightbox.classList.contains('is-open'))return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden','true');
      document.body.classList.remove('lightbox-open');
      if(lightboxImage){
        lightboxImage.removeAttribute('src');
        lightboxImage.alt='';
      }
      if(lightboxReturnFocus&&typeof lightboxReturnFocus.focus==='function'){
        lightboxReturnFocus.focus();
      }
      lightboxReturnFocus=null;
    }

    function openLightbox(trigger){
      var image=trigger.querySelector('img');
      if(!image)return;
      lightboxReturnFocus=trigger;
      if(lightboxImage){
        lightboxImage.src=trigger.getAttribute('data-lightbox-src')||image.currentSrc||image.src;
        lightboxImage.alt=image.alt||'Psoydo Produktscreenshot';
      }
      if(lightboxTitle)lightboxTitle.textContent=trigger.getAttribute('data-lightbox-title')||image.alt||'Psoydo Produktscreenshot';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden','false');
      document.body.classList.add('lightbox-open');
      if(lightboxClose)window.setTimeout(function(){lightboxClose.focus();},0);
    }

    lightboxTriggers.forEach(function(trigger){
      trigger.setAttribute('aria-haspopup','dialog');
      trigger.setAttribute('aria-controls','product-lightbox');
      trigger.addEventListener('click',function(){openLightbox(trigger);});
    });

    if(lightboxClose)lightboxClose.addEventListener('click',closeLightbox);
    lightbox.addEventListener('click',function(event){
      if(event.target===lightbox)closeLightbox();
    });
    lightbox.addEventListener('keydown',function(event){
      if(event.key==='Escape'){
        event.preventDefault();
        closeLightbox();
        return;
      }
      if(event.key!=='Tab')return;
      var focusable=Array.prototype.slice.call(lightbox.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')).filter(function(el){
        return !el.hasAttribute('disabled')&&el.offsetParent!==null;
      });
      if(focusable.length<2)return;
      var first=focusable[0];
      var last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){
        event.preventDefault();
        last.focus();
      }else if(!event.shiftKey&&document.activeElement===last){
        event.preventDefault();
        first.focus();
      }
    });
  }

  var box=document.getElementById('consent');
  if(!box)return;

  var KEY='psoydo-consent-v3';
  var CONSENT_VERSION=4;
  var LIFETIME=180*24*60*60*1000;
  var expiryTimer;

  var consentReturnFocus=null;

  function showConsent(){
    consentReturnFocus=document.activeElement;
    box.classList.add('show');
    box.setAttribute('aria-hidden','false');
    box.setAttribute('aria-modal','true');
    var first=box.querySelector('button,a[href]');
    if(first)window.setTimeout(function(){first.focus();},0);
  }

  function hideConsent(){
    box.classList.remove('show');
    box.setAttribute('aria-hidden','true');
    box.removeAttribute('aria-modal');
    if(consentReturnFocus&&typeof consentReturnFocus.focus==='function'){
      consentReturnFocus.focus();
      consentReturnFocus=null;
    }
  }

  var GA='G-EYFT82SFN7';
  var ADS='AW-18355213487';
  var production=location.protocol==='https:'&&/^(www\.)?psoydo\.com$/.test(location.hostname);
  var current={analytics:false,ads:false};
  var configured=false;
  var analyticsOption=document.getElementById('consent-analytics');
  var adsOption=document.getElementById('consent-ads');
  window['ga-disable-'+GA]=true;

  function cleanURL(value){
    try{var url=new URL(value);return url.origin+url.pathname;}catch(error){return '';}
  }

  function externalReferrer(value){
    try{
      var url=new URL(value);
      if(!/^https?:$/.test(url.protocol)||/^(www\.)?psoydo\.com$/.test(url.hostname))return '';
      return url.origin;
    }catch(error){return '';}
  }

  var measurementEvents=['psoydo_pilot_form_open','psoydo_pilot_form_submitted','psoydo_pilot_email_click','generate_lead'];
  window.__psoydoTrack=function(name){
    if(measurementEvents.indexOf(name)===-1)return;
    if(current.expires<=Date.now()){stopMeasurement();return;}
    if(!production||!configured||typeof window.gtag!=='function')return;
    if(current.analytics){
      var parameters={send_to:GA,event_category:'registration',event_label:'pilot_inquiry'};
      if(name==='generate_lead'){
        parameters.lead_source='pilot_form';
        parameters.form_id='KppMYg';
        parameters.method='tally';
      }
      window.gtag('event',name,parameters);
    }
  };

  function loadMeasurement(choice){
    current=choice;
    watchExpiry(choice.expires);
    if(analyticsOption)analyticsOption.checked=choice.analytics;
    if(adsOption)adsOption.checked=choice.ads;
    if(!production||(!choice.analytics&&!choice.ads)||configured)return;
    configured=true;
    window['ga-disable-'+GA]=!choice.analytics;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{
      analytics_storage:choice.analytics?'granted':'denied',
      ad_storage:choice.ads?'granted':'denied',
      ad_user_data:choice.ads?'granted':'denied',
      ad_personalization:'denied'
    });
    window.gtag('js',new Date());
    window.gtag('set',{
      page_location:cleanURL(location.href),page_referrer:externalReferrer(document.referrer),
      allow_ad_personalization_signals:false
    });
    if(choice.analytics)window.gtag('config',GA,{
      send_page_view:true,allow_google_signals:false,
      allow_ad_personalization_signals:false,cookie_expires:LIFETIME/1000,cookie_update:false
    });
    if(choice.ads)window.gtag('config',ADS,{allow_ad_personalization_signals:false});
    var script=document.createElement('script');
    script.id='google-gtag';
    script.async=true;
    script.src='https://www.googletagmanager.com/gtag/js?id='+(choice.analytics?GA:ADS);
    document.head.appendChild(script);
  }

  function clearMeasurementCookies(keep){
    var domains=['',location.hostname,'.'+location.hostname,'.psoydo.com'];
    document.cookie.split(';').forEach(function(cookie){
      var name=cookie.split('=')[0].trim();
      if(!/^(_ga|_gid|_gat|_gcl)(_|$)/.test(name))return;
      if(keep&&((keep.analytics&&/^(_ga|_gid|_gat)(_|$)/.test(name))||(keep.ads&&/^_gcl(_|$)/.test(name))))return;
      domains.forEach(function(domain){
        document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');
      });
    });
  }

  function stopMeasurement(){
    window['ga-disable-'+GA]=true;
    clearTimeout(expiryTimer);
    current={analytics:false,ads:false};
    if(analyticsOption)analyticsOption.checked=false;
    if(adsOption)adsOption.checked=false;
    clearMeasurementCookies();
    if(configured)location.reload();
  }

  function watchExpiry(expires){
    clearTimeout(expiryTimer);
    var remaining=expires-Date.now();
    if(remaining<=0){stopMeasurement();showConsent();return;}
    expiryTimer=setTimeout(function(){watchExpiry(expires);},Math.min(remaining,2147483647));
  }

  function readChoice(){
    try{
      var value=JSON.parse(localStorage.getItem(KEY));
      if(value&&value.version===CONSENT_VERSION&&typeof value.analytics==='boolean'&&
         typeof value.ads==='boolean'&&Number.isFinite(value.expires)&&
         value.expires>Date.now()&&value.expires<=Date.now()+LIFETIME)return value;
    }catch(error){}
    return null;
  }

  function saveChoice(choice){
    choice={version:CONSENT_VERSION,analytics:choice.analytics,ads:choice.ads,expires:Date.now()+LIFETIME};
    var changed=current.analytics!==choice.analytics||current.ads!==choice.ads;
    try{localStorage.setItem(KEY,JSON.stringify(choice));}catch(error){}
    if(configured&&changed){
      // A new document prevents the old runtime from sending further events.
      stopMeasurement();
      return;
    }
    if(!choice.analytics&&!choice.ads)clearMeasurementCookies();
    loadMeasurement(choice);
    hideConsent();
  }

  window.addEventListener('storage',function(event){
    if(event.key!==KEY&&event.key!==null)return;
    stopMeasurement();
    if(!configured){
      var choice=readChoice();
      if(choice){loadMeasurement(choice);hideConsent();}
      else showConsent();
    }
  });
  window.addEventListener('pageshow',function(event){
    if(event.persisted)location.reload();
  });
  // Expired, malformed and old unlimited choices require a new decision.
  var stored=readChoice();
  clearMeasurementCookies(stored);
  if(stored)loadMeasurement(stored);
  else showConsent();

  var yes=document.getElementById('consent-accept');
  var no=document.getElementById('consent-decline');
  var reopen=document.getElementById('consent-reopen');
  if(yes)yes.addEventListener('click',function(){
    saveChoice({analytics:!!analyticsOption.checked,ads:!!adsOption.checked});
  });
  if(no)no.addEventListener('click',function(){saveChoice({analytics:false,ads:false});});

  if(reopen)reopen.addEventListener('click',showConsent);

  box.addEventListener('keydown',function(event){
    if(event.key==='Escape'){
      hideConsent();
      return;
    }
    if(event.key!=='Tab')return;
    var focusable=Array.prototype.slice.call(box.querySelectorAll('button,a[href],input')).filter(function(el){
      return !el.hasAttribute('disabled')&&el.offsetParent!==null;
    });
    if(focusable.length<2)return;
    var first=focusable[0];
    var last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){
      event.preventDefault();
      last.focus();
    }else if(!event.shiftKey&&document.activeElement===last){
      event.preventDefault();
      first.focus();
    }
  });
})();



/* Product example only: static, fictional content; no data is processed or transmitted. */
(function(){
  'use strict';
  var demo=document.querySelector('[data-psoydo-demo]');
  if(!demo)return;
  var original=demo.querySelector('#psoydo-demo-original');
  var protectedText=demo.querySelector('#psoydo-demo-protected');
  var explanation=demo.querySelector('#psoydo-demo-insight');
  var cases={
    vertrag:{
      original:'Nina Berger prüft den Entwurf der Beispielwerk GmbH. Nina Berger informiert Tim Vogel. Beispielwerk GmbH verlangt bis Freitag eine überarbeitete Fassung.',
      protected:'PERSON_001 prüft den Entwurf der FIRMA_001. PERSON_001 informiert PERSON_002. FIRMA_001 verlangt bis Freitag eine überarbeitete Fassung.',
      insight:'Die wiederkehrende Person und Firma behalten denselben Ersatzwert. Aufgabe, Frist und Beziehungen bleiben nachvollziehbar.'
    },
    support:{
      original:'Jana Sommer (jana@beispiel.invalid) meldet im Ticket T-241 einen doppelten Rechnungsversand. Jana Sommer verweist auf Ticket T-218. Tim Vogel soll beide Fälle prüfen.',
      protected:'PERSON_001 (EMAIL_001) meldet im Ticket TICKET_001 einen doppelten Rechnungsversand. PERSON_001 verweist auf Ticket TICKET_002. PERSON_002 soll beide Fälle prüfen.',
      insight:'Die Ticketbeziehungen und das Fehlerbild bleiben erkennbar. Namen, E-Mail-Adresse und Ticketkennungen sind in diesem Beispiel konsistent ersetzt.'
    }
  };
  demo.querySelectorAll('[data-demo-case]').forEach(function(button){
    button.addEventListener('click',function(){
      var key=button.getAttribute('data-demo-case');
      var selected=Object.prototype.hasOwnProperty.call(cases,key)?cases[key]:null;
      if(!selected)return;
      demo.querySelectorAll('[data-demo-case]').forEach(function(other){
        var active=other===button;
        other.setAttribute('aria-pressed',String(active));
        other.classList.toggle('is-active',active);
      });
      original.textContent=selected.original;
      protectedText.textContent=selected.protected;
      explanation.textContent=selected.insight;
    });
  });
})();
