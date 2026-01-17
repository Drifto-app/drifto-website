import DriftoBanner from "@/components/DriftoBanner";
import Footer from "@/components/Footer";
import React, { useState } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, title: "Introduction" },
    { id: 2, title: "Information We Collect" },
    { id: 3, title: "How We Use Your Information" },
    { id: 4, title: "How We Share Your Information" },
    { id: 5, title: "Data Security" },
    { id: 6, title: "Your Rights" },
    { id: 7, title: "Data Retention" },
    { id: 8, title: "Children's Privacy" },
    { id: 9, title: "Changes to This Policy" },
    { id: 10, title: "Contact Us" },
  ];

  return (
    <div>
      <div className=" bg-white py-2 md:py-6  lg:px-24 mt-28">
        <div className=" mx-auto">
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-5xl font-bold mb-2">
                Privacy Policy
              </h1>
              <p className="text-xs md:text-base">
                Last Updated: November 2025
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-sm md:text-lg  mb-8 text-center italic">
                Your privacy matters to us. Learn how we collect, use, and
                protect your personal information.
              </p>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-center gap-4 md:gap-8">
              {/* Table of Contents */}
              <div className="w-max">
                <div className=" w-max p-6 sticky top-6">
                  <h2 className=" font-bold text-gray-800 mb-4">
                    Table of Contents
                  </h2>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#section-${section.id}`}
                        onClick={() => setActiveSection(section.id)}
                        className={`block px-3 py-2 rounded-md text-sm md:text-base font-bold underline underline-offset-4 `}
                      >
                        {section.id}. {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="max-w-3xl">
                <div className="p-8 text-sm md:text-base">
                  {/* Section 1 */}
                  <section id="section-1" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">1. Introduction</h2>
                    <p className=" leading-relaxed">
                      Welcome to Drifto ("we," "our," "us"). We respect your
                      privacy and are committed to protecting your personal
                      information. This Privacy Policy explains how we collect,
                      use, store, and share your data when you use the Drifto
                      mobile application ("App") and related services.
                    </p>
                  </section>

                  {/* Section 2 */}
                  <section id="section-2" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      2. Information We Collect
                    </h2>

                    <h3 className=" font-semibold text-gray-800 mb-3">
                      A. Information You Provide Directly
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 ">
                      <li>
                        <strong>Account Information:</strong> Name, username,
                        email address, phone number (if provided), and profile
                        photo.
                      </li>
                      <li>
                        <strong>Payment Information:</strong> Processed securely
                        via Paystack; we do not store full card details.
                      </li>
                      <li>
                        <strong>Event Content:</strong> Photos, descriptions,
                        and other event-related details you upload.
                      </li>
                      <li>
                        <strong>Messages:</strong> Chats within the app, stored
                        securely and visible only to intended recipients.
                      </li>
                    </ul>

                    <h3 className=" font-semibold text-gray-800 mb-3">
                      B. Information Collected Automatically
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 ">
                      <li>
                        <strong>Device Information:</strong> Device model, OS
                        version, app version.
                      </li>
                      <li>
                        <strong>Usage Data:</strong> Pages visited, features
                        used, and session duration.
                      </li>
                      <li>
                        <strong>Location Data:</strong> When enabled, your
                        approximate or precise location for event
                        recommendations.
                      </li>
                    </ul>

                    <h3 className=" font-semibold text-gray-800 mb-3">
                      C. Permissions Used
                    </h3>
                    <ul className="list-disc pl-6 mb-4 space-y-2 ">
                      <li>
                        <strong>Camera:</strong> To capture photos/videos for
                        your profile, events, or messages.
                      </li>
                      <li>
                        <strong>Gallery/Storage:</strong> To upload media from
                        your device.
                      </li>
                      <li>
                        <strong>Location:</strong> To show nearby events and
                        improve recommendations.
                      </li>
                    </ul>
                  </section>

                  {/* Section 3 */}
                  <section id="section-3" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      3. How We Use Your Information
                    </h2>
                    <p className=" mb-3">We use the collected data to:</p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>Create and manage user accounts.</li>
                      <li>
                        Facilitate event creation, discovery, booking, and
                        payments.
                      </li>
                      <li>Provide secure in-app messaging.</li>
                      <li>Personalize event recommendations.</li>
                      <li>Improve app performance and security.</li>
                      <li>Send notifications, updates, and reminders.</li>
                    </ul>
                  </section>

                  {/* Section 4 */}
                  <section id="section-4" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      4. How We Share Your Information
                    </h2>
                    <p className=" mb-3">
                      We do not sell personal data. We may share information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        <strong>With Service Providers:</strong> Payment
                        processors, cloud hosting, analytics services.
                      </li>
                      <li>
                        <strong>With Event Participants:</strong> Limited
                        profile details (name, photo) to facilitate event
                        communication.
                      </li>
                      <li>
                        <strong>For Legal Reasons:</strong> If required by law
                        or to protect safety and security.
                      </li>
                    </ul>
                  </section>

                  {/* Section 5 */}
                  <section id="section-5" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">5. Data Security</h2>
                    <p className=" mb-3">
                      We implement industry-standard measures such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>SSL encryption for transactions.</li>
                      <li>End-to-end encryption for chats.</li>
                      <li>Tokenization for stored payment methods.</li>
                    </ul>
                  </section>

                  {/* Section 6 */}
                  <section id="section-6" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">6. Your Rights</h2>
                    <p className=" mb-3">
                      Depending on your location, you may have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        Access, update, or delete your personal information.
                      </li>
                      <li>Restrict or object to certain data processing.</li>
                      <li>
                        Withdraw consent for optional features like location and
                        camera access.
                      </li>
                    </ul>
                  </section>

                  {/* Section 7 */}
                  <section id="section-7" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">7. Data Retention</h2>
                    <p className="">
                      We keep personal data only as long as necessary to provide
                      our services or comply with legal obligations. You may
                      request account deletion at any time.
                    </p>
                  </section>

                  {/* Section 8 */}
                  <section id="section-8" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">8. Children's Privacy</h2>
                    <p className="">
                      Drifto is not intended for individuals under 13 (or the
                      applicable age in your region). We do not knowingly
                      collect information from children.
                    </p>
                  </section>

                  {/* Section 9 */}
                  <section id="section-9" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      9. Changes to This Policy
                    </h2>
                    <p className="">
                      We may update this Privacy Policy from time to time.
                      Updates will be posted within the App and/or on our
                      website.
                    </p>
                  </section>

                  {/* Section 10 */}
                  <section id="section-10" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">10. Contact Us</h2>
                    <p className=" mb-4">
                      If you have questions or concerns about this Privacy
                      Policy, please contact us:
                    </p>
                    <div className="rounded-lg">
                      <p className="my-10">
                        <strong>Email:</strong>{" "}
                        <a
                          href="mailto:support@drifto.app"
                          className="text-blue-600 hover:underline"
                        >
                          support@drifto.app
                        </a>
                      </p>
                      <p className="">
                        <strong>Website:</strong>{" "}
                        <a
                          href="https://www.drifto.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          https://www.drifto.app
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <DriftoBanner />
    </div>
  );
}
