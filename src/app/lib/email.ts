"use server";

import { Resend } from 'resend';
import WelcomeEmail from '@/app/components/emails/WelcomeEmail';
import prismaClientModule from '@/app/lib/prisma'; // Renamed import
import { 
  PrismaClient as OriginalPrismaClient, 
  NewsletterIssue, 
  NewsletterSubscription, 
  NewsletterStatus 
} from '@/generated/prisma/client'; 
import WeeklyNewsletterEmail from '@/app/components/emails/WeeklyNewsletterEmail';
import { convertLexicalToHtml } from '@/app/lib/lexicalToHtml';

const resend = new Resend(process.env.RESEND_API_KEY);

// Cast the prisma client instance to OriginalPrismaClient
const prisma = prismaClientModule as OriginalPrismaClient;

export async function sendWelcomeEmail(toEmail: string, userName: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return { success: false, error: "Email service is not configured." };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Blog <onboarding@resend.dev>', 
      to: [toEmail],
      subject: 'Welcome to This and That!',
      react: WelcomeEmail({ userName }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error: error.message };
    }

    console.log("Welcome email sent successfully:", data);
    return { success: true, data };
  } catch (exception) {
    console.error("Exception sending welcome email:", exception);
    const errorMessage = exception instanceof Error ? exception.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}

export async function sendWeeklyNewsletter(issueId: string) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return { success: false, error: "Email service is not configured." };
  }
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.warn("NEXT_PUBLIC_BASE_URL is not set. Unsubscribe links may not work correctly.");
  }

  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || 'Your Blog <onboarding@resend.dev>';

  try {
    const issue = await prisma.newsletterIssue.findUnique({
      where: { id: issueId },
    });

    if (!issue) {
      return { success: false, error: "Newsletter issue not found." };
    }

    if (issue.status !== NewsletterStatus.DRAFT) {
      return { success: false, error: `Newsletter is not a draft. Current status: ${issue.status}` };
    }

    if (!issue.content) {
      return { success: false, error: "Newsletter content is empty." };
    }

    const htmlContent = convertLexicalToHtml(issue.content);

    const subscribers = await prisma.newsletterSubscription.findMany({
      where: { subscribed: true },
    });

    if (subscribers.length === 0) {
      await prisma.newsletterIssue.update({
        where: { id: issueId },
        data: { status: NewsletterStatus.SENT, sentAt: new Date() },
      });
      return { success: true, message: "No subscribers to send to. Newsletter marked as SENT." };
    }

    type EmailResult = {
      email: string;
      success: boolean;
      error?: string;
      data?: any; 
    };

    const emailPromises = subscribers.map(async (subscription: NewsletterSubscription): Promise<EmailResult> => {
      const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/newsletter/unsubscribe?email=${encodeURIComponent(subscription.email)}`;
      
      try {
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: [subscription.email],
          subject: issue.title, // Changed from issue.subject
          react: WeeklyNewsletterEmail({ 
            subject: issue.title, // Changed from issue.subject
            htmlContent, 
            unsubscribeUrl 
          }) as React.ReactElement,
        });

        if (error) {
          console.error(`Failed to send newsletter to ${subscription.email}:`, error.message);
          return { email: subscription.email, success: false, error: error.message };
        }
        return { email: subscription.email, success: true, data };
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : 'Unknown error during email sending';
        console.error(`Exception sending newsletter to ${subscription.email}:`, errorMsg);
        return { email: subscription.email, success: false, error: errorMsg };
      }
    });

    const results: EmailResult[] = await Promise.all(emailPromises);
    
    const successfulSends = results.filter((r: EmailResult) => r.success).length;
    const failedSends = results.length - successfulSends;

    await prisma.newsletterIssue.update({
      where: { id: issueId },
      data: { status: NewsletterStatus.SENT, sentAt: new Date() },
    });

    let message = `Newsletter sent. ${successfulSends} successful, ${failedSends} failed.`;
    if (failedSends > 0) {
        console.warn(`Some emails failed to send for newsletter issue ${issueId}. Details:`, results.filter((r: EmailResult) => !r.success));
    }

    return { success: true, message, details: results };

  } catch (exception) {
    console.error("Exception sending weekly newsletter:", exception);
    const errorMessage = exception instanceof Error ? exception.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}
