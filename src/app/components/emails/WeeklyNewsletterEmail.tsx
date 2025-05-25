import React from "react";

interface WeeklyNewsletterEmailProps {
  subject: string;
  htmlContent: string; // This will be the HTML generated from the Lexical editor state
  unsubscribeUrl: string; // URL for the user to unsubscribe
}

const WeeklyNewsletterEmail: React.FC<WeeklyNewsletterEmailProps> = ({
  subject,
  htmlContent,
  unsubscribeUrl,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{subject}</title>
        <style>{`
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
          }
          .content {
            padding: 20px 0;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #777;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
          .unsubscribe-link {
            margin-top: 15px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="header">
            <h1>{subject}</h1>
          </div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div className="footer">
            <p>
              You are receiving this email because you subscribed to our
              newsletter.
            </p>
            <p className="unsubscribe-link">
              <a href={unsubscribeUrl}>Unsubscribe</a>
            </p>
            <p>
              &copy; {new Date().getFullYear()} Ally Blog. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};

export default WeeklyNewsletterEmail;
