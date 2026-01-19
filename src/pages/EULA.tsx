import DriftoBanner from "@/components/DriftoBanner";
import Footer from "@/components/Footer";
import React, { useState } from "react";

export default function EULA() {
    const [activeSection, setActiveSection] = useState(null);

    const sections = [
        { id: 1, title: "Acceptance of Terms" },
        { id: 2, title: "License Grant" },
        { id: 3, title: "User-Generated Content (UGC)" },
        { id: 4, title: "Objectionable Content and Abusive Behavior" },
        { id: 5, title: "Content Moderation and Enforcement" },
        { id: 6, title: "Liability and Disclaimer" },
        { id: 7, title: "Termination" },
        { id: 8, title: "Changes to this Agreement" },
        { id: 9, title: "Governing Law" },
        { id: 10, title: "Contact Information" },
    ];

    return (
        <div className="overflow-x-hidden">
            <div className=" bg-white py-2 md:py-6  lg:px-24 mt-28">
                <div className=" mx-auto">
                    <div>
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-5xl font-bold mb-2">
                                End User License Agreement (EULA)
                            </h1>
                            <p className="text-xs md:text-base">
                                Last Updated: January 2026
                            </p>
                        </div>

                        <div className="prose max-w-none">
                            <p className="text-sm md:text-lg  mb-8 text-center italic">
                                Please read this agreement carefully before using the Drifto
                                application.
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
                                        <h2 className=" font-bold  mb-4">1. Acceptance of Terms</h2>
                                        <p className=" leading-relaxed mb-4">
                                            By downloading, installing, or using the Drifto mobile
                                            application ("App"), you agree to be bound by this End
                                            User License Agreement ("Agreement"). This Agreement is a
                                            binding legal contract between you and Drifto ("we," "us,"
                                            or "our").
                                        </p>
                                        <p className=" leading-relaxed mb-4">
                                            Please note that this Agreement governs your license to
                                            use the App software. Any financial transactions, ticket
                                            sales, or service fees are further governed by our{" "}
                                            <strong>Terms of Service</strong>.
                                        </p>
                                        <p className=" leading-relaxed">
                                            If you do not agree to the terms of this Agreement, do not
                                            install or use the App.
                                        </p>
                                    </section>

                                    {/* Section 2 */}
                                    <section id="section-2" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">2. License Grant</h2>
                                        <p className=" leading-relaxed mb-4">
                                            Subject to your compliance with this Agreement, Drifto
                                            grants you a limited, non-exclusive, non-transferable,
                                            revocable license to download, install, and use the App
                                            for your personal use and for the intended business
                                            purposes facilitated by the App (such as creating events,
                                            selling tickets, and managing bookings) on a mobile device
                                            owned or controlled by you.
                                        </p>
                                        <p className=" leading-relaxed">
                                            This license does <strong>not</strong> allow you to
                                            sublicense, resell, or commercially exploit the App source
                                            code or binary itself.
                                        </p>
                                    </section>

                                    {/* Section 3 */}
                                    <section id="section-3" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">
                                            3. User-Generated Content (UGC)
                                        </h2>
                                        <p className=" leading-relaxed mb-4">
                                            Drifto allows users to create events, upload images, post
                                            descriptions, and interact with other users
                                            ("User-Generated Content").
                                        </p>
                                        <p className=" leading-relaxed">
                                            You retain ownership of the content you post. However, by
                                            posting content, you grant Drifto a worldwide,
                                            non-exclusive, royalty-free license to use, display,
                                            reproduce, and distribute this content within the App and
                                            for the purpose of operating the service.
                                        </p>
                                    </section>

                                    {/* Section 4 */}
                                    <section id="section-4" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">
                                            4. Objectionable Content and Abusive Behavior (Zero
                                            Tolerance)
                                        </h2>
                                        <p className=" leading-relaxed mb-4">
                                            Drifto is committed to maintaining a safe and respectful
                                            community. We have a <strong>zero-tolerance policy</strong>{" "}
                                            for objectionable content and abusive users.
                                        </p>
                                        <p className=" mb-3">
                                            You agree that you will <strong>NOT</strong> post, upload,
                                            or share content that:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 ">
                                            <li>
                                                Is defamatory, discriminatory, or mean-spirited,
                                                including references or commentary about religion, race,
                                                sexual orientation, gender, national/ethnic origin, or
                                                other targeted groups.
                                            </li>
                                            <li>
                                                Contains overt sexual content, nudity, or pornography.
                                            </li>
                                            <li>
                                                Depicts or encourages violence, illegal acts, or extreme
                                                recklessness.
                                            </li>
                                            <li>
                                                Is threatening, harassing, or bullying towards other
                                                users.
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Section 5 */}
                                    <section id="section-5" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">
                                            5. Content Moderation and Enforcement
                                        </h2>
                                        <p className=" mb-3">
                                            To ensure community safety and compliance with App Store
                                            guidelines, Drifto employs the following mechanisms:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-2 ">
                                            <li>
                                                <strong>Monitoring:</strong> We employ methods to filter
                                                and flag objectionable content.
                                            </li>
                                            <li>
                                                <strong>Reporting:</strong> Users can report
                                                objectionable content or abusive users directly within
                                                the App via the reporting feature on event pages and
                                                user profiles.
                                            </li>
                                            <li>
                                                <strong>Action:</strong> Drifto will review reported
                                                content and act within 24 hours. If a violation is
                                                found, we will remove the content and eject the
                                                offending user.
                                            </li>
                                            <li>
                                                <strong>Suspension/Ban:</strong> Any user found posting
                                                objectionable content or engaging in abusive behavior
                                                will be blocked and ejected from the service
                                                immediately. We reserve the right to remove any content
                                                that violates this Agreement at our sole discretion,
                                                without prior notice.
                                            </li>
                                        </ul>
                                    </section>

                                    {/* Section 6 */}
                                    <section id="section-6" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">
                                            6. Liability and Disclaimer
                                        </h2>
                                        <p className=" leading-relaxed mb-4">
                                            The App is provided on an "AS IS" and "AS AVAILABLE"
                                            basis. Drifto makes no warranties regarding the accuracy,
                                            reliability, or availability of the App.
                                        </p>
                                        <p className=" leading-relaxed">
                                            Drifto is not responsible for the content posted by users.
                                            However, we will take swift action to remove content that
                                            violates our policies once we become aware of it. To the
                                            maximum extent permitted by law, Drifto shall not be
                                            liable for any indirect, incidental, or consequential
                                            damages arising from your use of the App.
                                        </p>
                                    </section>

                                    {/* Section 7 */}
                                    <section id="section-7" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">7. Termination</h2>
                                        <p className="">
                                            This Agreement is effective until terminated by you or
                                            Drifto. Your rights under this Agreement will terminate
                                            automatically without notice if you fail to comply with
                                            any term(s) of this Agreement. Upon termination, you must
                                            cease all use of the App and delete all copies of the App
                                            from your devices.
                                        </p>
                                    </section>

                                    {/* Section 8 */}
                                    <section id="section-8" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">
                                            8. Changes to this Agreement
                                        </h2>
                                        <p className="">
                                            We reserve the right to modify this Agreement at any time.
                                            If we make material changes, we will notify you by
                                            updating the date at the top of this policy or through a
                                            notification within the App. Continued use of the App
                                            constitutes acceptance of the revised terms.
                                        </p>
                                    </section>

                                    {/* Section 9 */}
                                    <section id="section-9" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">9. Governing Law</h2>
                                        <p className="">
                                            This Agreement shall be governed by and construed in
                                            accordance with the laws of the Federal Republic of
                                            Nigeria, without regard to its conflict of law principles.
                                        </p>
                                    </section>

                                    {/* Section 10 */}
                                    <section id="section-10" className="mb-8 scroll-mt-32">
                                        <h2 className=" font-bold  mb-4">10. Contact Information</h2>
                                        <p className=" mb-4">
                                            If you have any questions about this Agreement, please
                                            contact us:
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
