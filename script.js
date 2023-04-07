const getValueFromElement = (elementId) => {
  return document.getElementById(elementId).value;
}

const sendEmail = async () => {
  const name = getValueFromElement('nome');
  const email = getValueFromElement('email');
  const message = getValueFromElement('textArea');
  try {
    const res = await Email.send({
      Host: 'smtp.elasticemail.com',
      Port: '2525',
      Username: process.env.EMAIL,
      Password: process.env.PASSWORD,
      To: email,
      From: process.env.EMAIL,
      Subject: 'email enviado do meu portfolio',
      Body: `Oi Caio, me chamo ${name}, meu email é ${email}. <br> ${message}`
    })
    if (res.includes('addresses')) {
      throw new Error('Favor preencha seu email')
    }
    if (res !== 'OK') {
      throw new Error(res);
    }

    return res
  } catch (error) {
    throw error
  }
}

const submitForm = async () => {
  try {
    await sendEmail();
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

document.getElementById('form-content').addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm();
});
