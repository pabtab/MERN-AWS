exports.registerEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h1>Verify your email</h1>
            <p>Please use the following link to complete registration:</p>
            <a>${process.env.CLIENT_URL}/auth/activate/${token}</a>
          </html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete your registration",
      },
    },
  }
}

exports.forgotEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h1>Reset Password Link</h1>
            <p>Please use the following link to reset your password:</p>
            <a>${process.env.CLIENT_URL}/auth/password/reset/${token}</a>
          </html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset Password Link",
      },
    },
  }
}