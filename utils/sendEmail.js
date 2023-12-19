import nodeMailer from 'nodemailer'

export const sendEmail = async (optios)=>{

    const transporter = nodeMailer.createTransport({

        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from : process.env.SMPT_MAIL,
        to: optios.email,
        subject : optios.subject,
        text:optios.message,
    };

    await transporter.sendMail(mailOptions);


}