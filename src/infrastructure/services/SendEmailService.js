const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const send = async (employees) => {
  const messages = employees.map(employee => ({
    to: employee.email,
    from: employee.email,
    subject: 'Assunto do Email',
    text: `Olá ${employee.name}, este é um email de teste.`,
    html: `<strong>Olá ${employee.name}, este é um email de teste.</strong>`,
  }));

  try {
    await sgMail.send(messages);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Erro ao enviar email');
  }
};

module.exports = { send };