import { mailTrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log(`Verification email sent to ${email}`, response);
    }

    catch (error) {
        console.error(`Error sending verification email to ${email}`, error);
    }


}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "06fdcc36-2f48-4e91-a0a7-8fa64a9f972f",
            template_variables: {
                "name": name
            }
        })

        console.log(`Welcome email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending welcome email to ${email}`, error.message);
    }
}

export const sendResetPasswordEmail = async (email, resetURL) =>{
    const recipient =[{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject : "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log(`Password reset email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending password reset email to ${email}`, error.message);
    }
}

export const sendResetSuccessfullEmail = async (email)=>{
    const recipient =[{email}];
    try {
        const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject : "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Successfull"
        })

        console.log(`Password reset successfull email sent to ${email}`, response);
    } catch (error) {
        console.log(`Error sending password reset successfull email to ${email}`, error.message);
    }
}