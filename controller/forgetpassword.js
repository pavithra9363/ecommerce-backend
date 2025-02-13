import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

// Forgot Password route with additional security
export const forgotPassword = async (req, res) => {
  try { 
    const { email } = req.body;

    // Only allow requests from the admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ success: false, message: "Invalid email address" });
    }

    // Generate a password reset token with a short expiry time (e.g., 15 minutes)     
    const resetToken = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRETKEY, // Use your secret key
      { expiresIn: '15m' } // Token expires after 15 minutes
    );

    // Create the reset URL with the token (for password reset page)
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail or other email services
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Send the reset link to the admin email
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetLink}`,
    };

    // Send the reset email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset email has been sent. Please check your inbox.",
    });
  } catch (error) {
    console.log("Error sending reset email:", error);
    res.status(500).json({ success: false, message: "Error sending reset email." });
  }
};
