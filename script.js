const getValueFromElement = (elementId) => {
  return document.getElementById(elementId).value;
}

const headerLinks = document.querySelectorAll('#header a');

const smoothScroll = (event) => {
  event.preventDefault();
  const target = document.querySelector(event.currentTarget.getAttribute('href'));
  target.scrollIntoView({ behavior: 'smooth' });
}

const setFooterYear = () => {
  document.getElementById('footerYear').innerHTML = new Date().getFullYear()
}

const clearForm = () => {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('textArea').value = '';
}

const sendEmail = async () => {
  const name = getValueFromElement('nome');
  const email = getValueFromElement('email');
  const text = getValueFromElement('textArea');
  if (!email) {
    throw new Error('Favor preencha seu email')
  }

  const response = await fetch('https://send-email-caions.herokuapp.com/send-email',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, text })
    });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro interno do servidor');
  }
  return response.json();

};

const submitForm = async () => {
  try {
    await sendEmail();
    clearForm()
    alert('Email enviado com sucesso');
  } catch (error) {
    console.error(error.message)
    if (error.message === 'Favor preencha seu email') {
      alert(error.message)
      return
    }
    alert('Atualmente, não estamos conseguindo enviar e-mails. \n Por favor, contate-me pelo WhatsApp');
  }
}

headerLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

window.addEventListener('load', () => {
  setFooterYear()
});

document.getElementById('form-content').addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm();
});

const languageSelector = document.getElementById('language-selector');
const translations = {};

const loadTranslations = async () => {
  try {
    const response = await fetch('translations.json');
    const data = await response.json();
    Object.assign(translations, data);
  } catch (error) {
    console.error('Erro ao carregar traduções:', error);
  }
};

const updateText = (lang) => {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[lang][key] || key;
  });
};

const switchLanguage = (event) => {
  const lang = event.target.id;
  if (lang == 'pt-b') {
    document.getElementById('profile-cv-link').href = "assets/caio-curriculo-2024.pdf"
  }
  if (lang == 'en') {
    document.getElementById('profile-cv-link').href = "assets/caio-resume-2024.pdf"
  }
  updateText(lang);
};

languageSelector.addEventListener('click', switchLanguage);

window.addEventListener('load', () => {
  loadTranslations().then(() => {
    const defaultLang = document.documentElement.lang || 'pt-br';
    updateText(defaultLang);
  });
});

window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  let whatsappIcon = document.getElementById('whatsapp-icon');
  let whatsappIconLink = document.getElementById('whatsapp-icon-link');
  let triggerHeight = 1200;
  var triggerWidth = 800;
  let mobileSize = scrollPosition > triggerHeight && window.innerWidth < triggerWidth
  if (mobileSize) {
    whatsappIcon.style.opacity = 1;
    whatsappIconLink.style.pointerEvents = 'auto';
  } else {
    whatsappIcon.style.opacity = 0;
    whatsappIconLink.style.pointerEvents = 'none';
  }
});