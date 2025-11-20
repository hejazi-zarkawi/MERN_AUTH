import { resend, FROM } from "./mailtrap.config.js";
import { WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {

    try {
        const response = await resend.emails.send({
            from: FROM,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log(`Verification email sent to ${email}`, response);
    }

    catch (error) {
        console.error(`Error sending verification email to ${email}`, error);
    }


}

export const sendWelcomeEmail = async (email, name) => {

    try {
        const response = await resend.emails.send({
            from: FROM,
            to: email,
            subject: "Welcome to Authentication Process!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        })

        console.log(`Welcome email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending welcome email to ${email}`, error.message);
    }
}

export const sendResetPasswordEmail = async (email, resetURL) => {

    try {
        const response = await resend.emails.send({
            from: FROM,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        })

        console.log(`Password reset email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending password reset email to ${email}`, error.message);
    }
}

export const sendResetSuccessfullEmail = async (email) => {

    try {
        const response = await resend.emails.send({
            from: FROM,
            to: email,
            subject: "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })

        console.log(`Password reset successfull email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending password reset successfull email to ${email}`, error.message);
    }
}