import DriftoBanner from "@/components/DriftoBanner";
import Footer from "@/components/Footer";
import React, { useState } from "react";

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 1, title: "Acceptance of Terms" },
    { id: 2, title: "Eligibilty" },
    { id: 3, title: "How We Use Your Information" },
    { id: 4, title: "Hosting on Drifto" },
    { id: 5, title: "Content Rules" },
    { id: 6, title: "Payments" },
    { id: 7, title: "Refunds & Cancellations" },
    { id: 8, title: "Drifto’s Role" },
    { id: 9, title: "Safety" },
    { id: 10, title: "Termination" },
    { id: 11, title: "Data & Privacy" },
    { id: 12, title: "Intellectual Property" },
    { id: 13, title: "Change of Terms" },
  ];

  return (
    <div className="overflow-x-hidden">
      <div className=" bg-white py-2 md:py-6  lg:px-24 mt-28">
        <div className=" mx-auto">
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-5xl font-bold mb-2">
                Terms of Service
              </h1>
              <p className="text-xs md:text-base">
                Last Updated: November 2025
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-sm md:text-lg  mb-8 text-center italic">
                Welcome to Drifto ("we", "our", "us"), operated by DRIFTO
                LIMITED, registered in Nigeria under the Corporate Affairs
                Commission (CAC) with RC Number 8334986. By accessing or using
                Drifto's website, mobile application, or services (collectively,
                the "Platform"), you agree to these Terms of Service. Please
                read them carefully.
              </p>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-center gap-4 md:gap-8">
              {/* Table of Contents */}
              <div className="w-max">
                <div className=" w-max p-6 sticky top-12">
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
                    <h2 className=" font-bold  mb-4">1. Acceptance of Terms</h2>
                    <p className=" leading-relaxed">
                      By using Drifto, you agree to comply with these Terms. If
                      you do not agree, please do not use the Platform.
                    </p>
                  </section>

                  {/* Section 2 */}
                  <section id="section-2" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">2. Eligibility</h2>
                    <div>
                      Users must be at least 13 year old to create an account to
                      book or host experiences. There is no strict age limit,
                      but hosts may set age requirements for their events. Hosts
                      must provide a valid phone number for communication and
                      safety verification.
                    </div>
                  </section>

                  {/* Section 3 */}
                  <section id="section-3" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">3. User Accounts</h2>
                    <p className=" mb-3">Users are responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>Keeping login credentials secure</li>
                      <li>Providing accurate information</li>
                      <li>Not impersonating others</li>
                    </ul>
                    <div>We may suspend accounts that violate our rules.</div>
                  </section>

                  {/* Section 4 */}
                  <section id="section-4" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">4. Hosting on Drifto</h2>

                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        Anyone can become a host after passing our simple
                        onboarding process.
                      </li>
                      <li>
                        Hosts are fully responsible for the accuracy, safety,
                        and quality of their events.
                      </li>
                      <li>
                        Only physical events/experiences are allowed at this
                        time.
                      </li>{" "}
                      <li>
                        Hosts agree that Drifto is a facilitator, not the
                        creator or organizer of events.
                      </li>
                    </ul>
                  </section>

                  {/* Section 5 */}
                  <section id="section-5" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">5. Content Rules</h2>
                    <p className=" mb-3">
                      Users may post photos, videos, and text. Content must
                      align with the purpose of the platform: sharing and
                      discovering experiences.
                    </p>
                    <p>Prohibited content includes:</p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>Nudity</li>
                      <li>Sexual content</li>
                      <li>Violence</li>
                      <li>Illegal activities</li>
                      <li>Irrelevant or inappropriate posts</li>
                    </ul>
                  </section>

                  {/* Section 6 */}
                  <section id="section-6" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">6. Payments</h2>

                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        Drifto charges a 4.5% commission on every booking. For
                        tickets priced above 1,500 Naira, an additional 100
                        Naira service fee applies.
                      </li>
                      <li>
                        Host payouts are sent approximately 24 hours after an
                        event ends.
                      </li>
                      <li>Payments are processed through Paystack.</li>
                    </ul>
                  </section>

                  {/* Section 7 */}
                  <section id="section-7" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      7. Refunds & Cancellations
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>Refunds are allowed.</li>
                      <li>
                        Users requesting a refund may be charged a small refund
                        fee.
                      </li>
                      <li>Hosts must comply with Drifto's refund standards.</li>
                    </ul>
                  </section>

                  {/* Section 8 */}
                  <section id="section-8" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      8. Drifto's Role (Liability)
                    </h2>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        We may intervene in cases involving safety concerns,
                        but:
                      </li>
                      <li>
                        We are not responsible for host behavior, event
                        outcomes, injuries, damages, or disputes.
                      </li>
                      <li>
                        Hosts are independent providers, not employees or agents
                        of Drifto.
                      </li>
                    </ul>
                  </section>

                  {/* Section 9 */}
                  <section id="section-9" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">9. Safety</h2>
                    <p className="">
                      Users and hosts are responsible for their own safety
                      during events.
                    </p>
                  </section>

                  {/* Section 10 */}
                  <section id="section-10" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">10. Termination</h2>
                    <p className=" mb-4">We reserve the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>Suspend accounts temporarily</li>
                      <li>Permanently ban accounts for serious violations</li>
                      <li>Remove violating content</li>
                    </ul>
                  </section>

                  {/* Section 11 */}
                  <section id="section-11" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">11. Data & Privacy</h2>
                    <ul className="list-disc pl-6 space-y-2 ">
                      <li>
                        We collect location data to recommend nearby
                        experiences.
                      </li>
                      <li>We do not use cookies on our website.</li>
                      <li>We do not use external analytics tools.</li>
                    </ul>
                  </section>

                  {/* Section 12 */}
                  <section id="section-12" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">
                      12. Intellectual Property
                    </h2>
                    <p className=" mb-4">
                      All branding, design, and platform content belong to
                      Drifto. Users retain ownership of their posts but grant
                      Drifto a license to display them.
                    </p>
                  </section>

                  {/* Section 13 */}
                  <section id="section-13" className="mb-8 scroll-mt-32">
                    <h2 className=" font-bold  mb-4">13. Changes to Terms</h2>
                    <p className=" mb-4">
                      We may update these Terms occasionally. Continued use
                      means acceptance.
                    </p>
                  </section>
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
