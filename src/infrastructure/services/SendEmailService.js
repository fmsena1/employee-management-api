const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const send = async (employees) => {
  const messages = employees.map(employee => ({
    to: employee.email,
    from: 'filipemagalhaessena@gmail.com',
    subject: 'Cadastro de Tamanhos para Brindes de Final de Ano',
    text: `Olá ${employee.name},

Estamos preparando os brindes de final de ano e gostaríamos de confirmar os seus tamanhos de calçados e camisetas.

Por favor, verifique se as informações abaixo estão corretas:

- Tamanho da camiseta: ${employee.shirtSize}
- Tamanho do calçado: ${employee.shoeSize}

Caso haja alguma correção, entre em contato com o RH o mais breve possível.

Atenciosamente
Equipe Employee Management`,
  }));

  try {
    await sgMail.send(messages);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Erro ao enviar email');
  }
};

module.exports = { send };