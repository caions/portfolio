//import { EMAIL, PASSWORD } from './env.js'

const sendEmail = async(event) => {
  event.preventDefault();
  
  let name = document.getElementById('nome').value
  let email = document.getElementById('email').value
  let texto = document.getElementById('textArea').value

  try {
    Email.send({  
      Host: "smtp.elasticemail.com",
      Port: "2525",
      Username : process.env.EMAIL,
      Password : process.env.PASSWORD,
      To : EMAIL,
      From : EMAIL,
      Subject : "email enviado do meu portfolio",
      Body : `Oi Caio, me chamo ${name}, meu email é ${email}. ${texto}`,
      })
    alert("Email enviado com sucesso")
  } catch (error) {
    console.log(error)
    alert("Falha no envio")
  }
}

document.getElementById('button').addEventListener(
  'click', sendEmail
);

