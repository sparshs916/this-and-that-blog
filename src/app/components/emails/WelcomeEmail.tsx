import * as React from "react";

interface WelcomeEmailProps {
  userName: string;
}

const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ userName }) => (
  <div>
    <h1>Welcome to This and That, {userName}!</h1>
    <p>
      We're thrilled to have you join our community. Get ready for a weekly dose
      of interesting posts and delicious recipes.
    </p>
    <p>Stay tuned for our first newsletter!</p>
    <p>Best,</p>
    <p>The This and That Team</p>
  </div>
);

export default WelcomeEmail;
