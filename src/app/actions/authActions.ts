"use server";

import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models/User";
import { sendEmail } from "@/lib/nodemailer";
import { signToken, setAuthCookie, removeAuthCookie, getAuthUser } from "@/lib/jwt";
import bcrypt from "bcryptjs";

// Helper to generate a 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function signupAction(formData: { name: string; email: string; password: string; phone?: string }) {
  await dbConnect();
  const { name, email, password, phone } = formData;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    if (existingUser.isVerified) {
      return { success: false, message: "User already exists with this email." };
    }
    // If user registered but never verified, we overwrite or send new OTP
    const otp = generateOtp();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    existingUser.name = name;
    existingUser.phone = phone;
    existingUser.passwordHash = passwordHash;
    existingUser.verificationOtp = otp;
    existingUser.verificationOtpExpires = expiry;
    await existingUser.save();

    await sendEmail({
      to: email,
      subject: "Reature Organic - Verify Your Account",
      text: `Your verification OTP is: ${otp}. It is valid for 10 minutes.`,
    });

    return { success: true, message: "Verification OTP sent to email." };
  }

  const otp = generateOtp();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    phone,
    passwordHash,
    role: "customer",
    isVerified: false,
    verificationOtp: otp,
    verificationOtpExpires: expiry,
  });

  await newUser.save();

  await sendEmail({
    to: email,
    subject: "Reature Organic - Verify Your Account",
    text: `Your verification OTP is: ${otp}. It is valid for 10 minutes.`,
  });

  return { success: true, message: "Verification OTP sent to email." };
}

export async function verifySignupAction(email: string, otp: string) {
  await dbConnect();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.isVerified) {
    return { success: false, message: "Account is already verified." };
  }

  if (user.verificationOtp !== otp || !user.verificationOtpExpires || new Date() > user.verificationOtpExpires) {
    return { success: false, message: "Invalid or expired OTP." };
  }

  user.isVerified = true;
  user.verificationOtp = undefined;
  user.verificationOtpExpires = undefined;
  await user.save();

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });
  await setAuthCookie(token);

  return {
    success: true,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}

export async function loginAction(formData: { email: string; password?: string }) {
  await dbConnect();
  const { email, password } = formData;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "Invalid credentials." };
  }

  if (password) {
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return { success: false, message: "Invalid credentials." };
    }
  } else {
    return { success: false, message: "Password is required for password login." };
  }

  if (!user.isVerified) {
    // Resend verification email
    const otp = generateOtp();
    user.verificationOtp = otp;
    user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Reature Organic - Verify Your Account",
      text: `Your account is not verified. Please verify using OTP: ${otp}`,
    });

    return { success: false, requiresVerification: true, message: "Account is not verified. OTP sent." };
  }

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });
  await setAuthCookie(token);

  return {
    success: true,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}

export async function sendLoginOtpAction(email: string) {
  await dbConnect();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User with this email does not exist." };
  }

  const otp = generateOtp();
  user.verificationOtp = otp;
  user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail({
    to: email,
    subject: "Reature Organic - Login OTP",
    text: `Your login OTP is: ${otp}. It is valid for 10 minutes.`,
  });

  return { success: true, message: "Login OTP sent to email." };
}

export async function verifyLoginOtpAction(email: string, otp: string) {
  await dbConnect();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.verificationOtp !== otp || !user.verificationOtpExpires || new Date() > user.verificationOtpExpires) {
    return { success: false, message: "Invalid or expired OTP." };
  }

  user.isVerified = true;
  user.verificationOtp = undefined;
  user.verificationOtpExpires = undefined;
  await user.save();

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });
  await setAuthCookie(token);

  return {
    success: true,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
  };
}

export async function forgotPasswordAction(email: string) {
  await dbConnect();
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  const otp = generateOtp();
  user.resetOtp = otp;
  user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendEmail({
    to: email,
    subject: "Reature Organic - Reset Password OTP",
    text: `Your reset password OTP is: ${otp}. It is valid for 10 minutes.`,
  });

  return { success: true, message: "Reset OTP sent to email." };
}

export async function resetPasswordAction(formData: { email: string; otp: string; newPassword?: string }) {
  await dbConnect();
  const { email, otp, newPassword } = formData;
  if (!newPassword) return { success: false, message: "New password is required" };

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.resetOtp !== otp || !user.resetOtpExpires || new Date() > user.resetOtpExpires) {
    return { success: false, message: "Invalid or expired OTP." };
  }

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  user.resetOtp = undefined;
  user.resetOtpExpires = undefined;
  await user.save();

  return { success: true, message: "Password reset successfully. You can now login." };
}

export async function logoutAction() {
  await removeAuthCookie();
  return { success: true };
}

export async function getCurrentUserAction() {
  const decoded = await getAuthUser();
  if (!decoded) return null;

  await dbConnect();
  const user = await User.findById(decoded.userId).select("-passwordHash");
  if (!user) return null;

  return JSON.parse(JSON.stringify(user));
}

export async function resendVerificationOtpAction(email: string) {
  await dbConnect();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  if (user.isVerified) {
    return { success: false, message: "Account is already verified." };
  }

  const otp = generateOtp();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.verificationOtp = otp;
  user.verificationOtpExpires = expiry;
  await user.save();

  await sendEmail({
    to: email,
    subject: "Reature Organic - Verify Your Account (Resend)",
    text: `Your verification OTP is: ${otp}. It is valid for 10 minutes.`,
  });

  return { success: true, message: "A new verification OTP has been sent." };
}

export async function isSmtpConfiguredAction() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

