import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  verifyCode: string;
}

export const VerificationCodeEmail =({
  username,
  verifyCode
}:EmailTemplateProps) => (
  <div>
    <h1>Welcome, {username} to CRONOS!</h1>
    <p>We have a sign-up request from you email , your verification code is</p>
    <p style={{fontWeight:"bolder",fontSize:"20px"}}>{verifyCode}</p>
  </div>
)