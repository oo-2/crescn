import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center pt-5">
      <title>Terms and Conditions | {process.env.REACT_APP_WEBSITE_NAME}</title>
      <Logo />

      <div className="text-white bg-gray-800 rounded w-full ">
        <div className="container mx-auto p-4 max-w-screen-xl">
          <h1 className="text-3xl font-bold mb-1">Terms and Conditions</h1>
          <p className="font-light text-md m-2">
            Last updated: {process.env.REACT_APP_TERMS_DATE}
          </p>
          <div className="bg-gray-700 p-4 text-lg leading-relaxed">
            <ol className="list-none">
              <p className="font-semibold m-4">
                These Terms and Conditions govern your use of{" "}
                {process.env.REACT_APP_BASE_URL} ("Website") operated by the
                website's owners (collectively referred to as "we", "us", or
                "our"). By accessing and using the Website, you agree to be
                bound by these Terms and Conditions and our Privacy Policy
                (found{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-blue-300 hover:opacity-75"
                >
                  here
                </a>
                ). These two documents will be collectively referred to as the
                "Agreement". If you do not agree with any part of this
                Agreement, please immediately cease all usage of the Website.
              </p>
              <li
                id="website-use"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#website-use">Website Use</a>
              </li>
              <p className="ml-4">
                You must be at least 13 years old to use the Website. By using
                the Website, you confirm that you meet this age requirement.
              </p>
              <p className="m-4">
                The content on the Website is provided for general information
                and entertainment purposes only. It is subject to change without
                notice.
              </p>
              <p className="m-4">
                Your use of any information or materials on the Website is
                entirely at your own risk, for which we shall not be liable. It
                is your responsibility to ensure that any products, services, or
                information available through the Website meet your specific
                requirements.
              </p>
              <li
                id="intellectual-property"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#intellectual-property">Intellectual Property</a>
              </li>
              <p className="m-4">
                The Website and its original content, features, and
                functionality are owned by the website's owners and are
                protected by international copyright, trademark, patent, trade
                secret, and other intellectual property laws.
              </p>
              <p className="m-4">
                You may access and view the content on the Website for personal,
                non-commercial use only. You must not reproduce, distribute,
                modify, create derivative works of, publicly display, or exploit
                any content from the Website without our prior written consent.
              </p>
              <p className="m-4">
                The use of any third-party trademarks, logos, or copyrighted
                material on the Website is solely for identification purposes
                and does not imply any endorsement or association with the
                respective owners.
              </p>
              <li
                id="dmca-complaints"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#dmca-complaints">DMCA Complaints</a>
              </li>
              <p className="m-4">
                We respect the intellectual property rights of others and expect
                our users to do the same. If you believe that any content on the
                Website infringes upon your intellectual property rights, you
                may submit a notification in accordance with the Digital
                Millennium Copyright Act (DMCA) by providing us with the
                following information:
              </p>
              <ol className="list-decimal ml-8">
                <li className="m-4">
                  A physical or electronic signature of the copyright owner or a
                  person authorized to act on their behalf.
                </li>
                <li className="m-4">
                  Identification of the copyrighted work claimed to have been
                  infringed.
                </li>
                <li className="m-4">
                  Identification of the material that is claimed to be
                  infringing or to be the subject of infringing activity and
                  that is to be removed or access to which is to be disabled,
                  and information reasonably sufficient to permit us to locate
                  the material.
                </li>
                <li className="m-4">
                  Your contact information, including your name, address,
                  telephone number, and email address.
                </li>
                <li className="m-4">
                  A statement by you that you have a good faith belief that use
                  of the material in the manner complained of is not authorized
                  by the copyright owner, its agent, or the law.
                </li>
                <li className="m-4">
                  A statement that the information in the notification is
                  accurate, and, under penalty of perjury, that you are
                  authorized to act on behalf of the copyright owner.
                </li>
              </ol>
              <p className="m-4">
                To submit a DMCA notification, please send an email to{" "}
                <a
                  href={`mailto:${process.env.REACT_APP_DMCA_EMAIL}`}
                  className="underline text-blue-300 hover:opacity-75"
                >
                  {process.env.REACT_APP_DMCA_EMAIL}
                </a>{" "}
                with the required information mentioned above.
              </p>
              <p className="m-4">
                Upon receiving a valid DMCA notification, we will take
                appropriate action, which may include removing or disabling
                access to the allegedly infringing content.
              </p>

              <li
                id="limitation-of-liability"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#limitation-of-liability">Limitation of Liability</a>
              </li>
              <p className="m-4">
                The website's owners shall not be liable for any direct,
                indirect, incidental, consequential, or exemplary damages,
                including but not limited to, damages for loss of profits, data,
                or other intangible losses arising from or in connection with
                your use or inability to use the Website.
              </p>
              <p className="m-4">
                The website's owners does not warrant or make any
                representations regarding the accuracy, reliability, or
                availability of the content on the Website. Any reliance you
                place on such information is therefore strictly at your own
                risk.
              </p>
              <li
                id="links-to-third-party-websites"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#links-to-third-party-websites">
                  Links to Third-Party Websites
                </a>
              </li>
              <p className="m-4">
                The Website may contain links to third-party websites that are
                not owned or controlled by the website's owners. We have no
                control over, and assume no responsibility for, the content,
                privacy policies, or practices of any third-party websites. You
                acknowledge and agree that the website's owners shall not be
                responsible or liable, directly or indirectly, for any damage or
                loss caused or alleged to be caused by or in connection with the
                use of or reliance on any such content, goods, or services
                available on or through any third-party websites.
              </p>
              <li
                id="termination"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#termination">Termination</a>
              </li>
              <p className="m-4">
                The website's owners reserve the right to terminate or suspend
                your access to the Website immediately, without prior notice or
                liability, for any reason whatsoever, including without
                limitation if you breach these Terms and Conditions.
              </p>
              <p className="m-4">
                Upon termination, your right to use the Website will immediately
                cease. All provisions of these Terms and Conditions that by
                their nature should survive termination shall survive
                termination, including, without limitation, ownership
                provisions, warranty disclaimers, indemnity, and limitations of
                liability.
              </p>
              <li
                id="governing-law"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#governing-law">Governing Law</a>
              </li>
              <p className="m-4">
                These Terms and Conditions shall be governed exclusively by
                United States law according to the State of Illinois, without
                regard to its conflict of law provisions.
              </p>

              <li
                id="changes-to-terms-and-conditions"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#changes-to-terms-and-conditions">
                  Changes to Terms and Conditions
                </a>
              </li>
              <p className="m-4">
                The website's owners reserve the right, at their sole
                discretion, to modify or replace these Terms and Conditions at
                any time. If a revision is material, we will provide at least 30
                days' notice prior to any new terms taking effect. What
                constitutes a material change will be determined at our sole
                discretion.
              </p>
              <p className="m-4 font-semibold">
                By continuing to access or use the Website after any revisions
                become effective, you agree to be bound by the revised terms. If
                you do not agree to the new terms, you are no longer authorized
                to use the Website.
              </p>
              <li
                id="contact"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#contact">Contact Us</a>
              </li>
              <p className="m-4">
                If you have any questions, concerns, or inquiries regarding
                these Terms and Conditions, you may contact us at{" "}
                <a
                  href={`mailto:${process.env.REACT_APP_TERMS_EMAIL}`}
                  className="underline text-blue-300 hover:opacity-75"
                >
                  {process.env.REACT_APP_TERMS_EMAIL}
                </a>
                .
              </p>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
