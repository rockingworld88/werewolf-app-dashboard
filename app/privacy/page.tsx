import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WEREWOLF ALPHA",
  description: "Privacy policy for the WEREWOLF ALPHA private rider community and admin operations dashboard.",
};

const sections = [
  {
    title: "Overview",
    body: [
      "WEREWOLF ALPHA operates a private rider community platform for approved members and authorized administrators. This Privacy Policy explains what information we collect, how we use it, and how we protect it when you use the WEREWOLF ALPHA mobile member app, the admin dashboard, and related services.",
      "By using the service, you acknowledge that your information may be processed as described below for account access, community operations, moderation, and platform security.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "We may collect account details such as full name, username, email address, membership status, role, bike information, and profile photo.",
      "We may collect community content you choose to submit, including chat messages, images, voice notes, and moderation-related records connected to your account.",
      "We may collect technical and usage information required to operate the service, such as authentication events, timestamps, and storage metadata.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use personal information to create and manage rider accounts, authenticate users, display profile information inside the private community, deliver announcements, support moderation, and maintain platform security.",
      "We may also use information to troubleshoot issues, improve reliability, enforce private-community rules, and investigate abuse or unauthorized access.",
    ],
  },
  {
    title: "Community Content And Moderation",
    body: [
      "Messages, media uploads, and voice notes shared in the private community may be reviewed or moderated by authorized administrators to protect the community, enforce standards, and remove inappropriate content.",
      "Deleted or moderated content may remain in logs or backups for a limited period where necessary for security, legal, or operational reasons.",
    ],
  },
  {
    title: "Sharing Of Information",
    body: [
      "We do not sell your personal information. Information is shared only as needed with infrastructure and service providers that operate the platform on our behalf, such as hosting, authentication, database, storage, and analytics providers.",
      "We may disclose information if required by law, to respond to valid legal requests, or to protect the rights, safety, security, and integrity of WEREWOLF ALPHA, its members, or the public.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We retain account and community information for as long as reasonably necessary to operate the service, support moderation, maintain records, comply with legal obligations, and resolve disputes.",
      "If an account is deactivated, some associated information may still be retained in backups, logs, or internal records for security and operational purposes.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use commercially reasonable administrative, technical, and organizational measures to protect the platform and the information stored within it. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "Members may request updates to certain profile details through the app or through an administrator, subject to platform permissions and moderation requirements.",
      "If you want to request account access changes, data corrections, or account deactivation, contact us using the details below.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have questions about this Privacy Policy or the handling of personal information, contact WEREWOLF ALPHA at support@werewolfalpha.com.",
    ],
  },
  {
    title: "Policy Updates",
    body: [
      "We may update this Privacy Policy from time to time. When we do, we will revise the effective date on this page. Continued use of the service after changes take effect means the updated policy will apply.",
      "Effective date: March 25, 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-10 text-[var(--text)] sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="rounded-[28px] border border-[var(--border-strong)] bg-[var(--bg-soft)] px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">WEREWOLF ALPHA</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-[var(--text)]">Privacy Policy</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
            This policy explains how the WEREWOLF ALPHA private rider platform collects, uses, stores, and protects member and admin information across the mobile app and admin dashboard.
          </p>
        </header>

        <section className="grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-5 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.2)] sm:px-6"
            >
              <h2 className="text-xl font-bold text-[var(--text)]">{section.title}</h2>
              <div className="mt-3 grid gap-3 text-sm leading-7 text-[var(--text-soft)] sm:text-[15px]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
