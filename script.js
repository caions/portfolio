const getValueFromElement = (elementId) => {
  return document.getElementById(elementId).value;
}

const setFooterYear = () => {
  document.getElementById('footerYear').innerHTML = new Date().getFullYear()
}

const clearForm = () =>{
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

window.addEventListener('load', () => {
  setFooterYear()
});

document.getElementById('form-content').addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm();
});
