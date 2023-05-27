import React from "react";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center pt-5">
      <title>Privacy Policy | {process.env.REACT_APP_WEBSITE_NAME}</title>
      <Logo />

      <div className="text-white bg-gray-800 rounded w-full ">
        <div className="container mx-auto p-4 max-w-screen-xl">
          <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
          <p className="font-light text-md m-2">Last updated: {process.env.REACT_APP_PRIVACY_DATE}</p>
          <div className="bg-gray-700 p-4 text-lg leading-relaxed">
            <ol className="list-none">
              <p className="m-4 font-semibold">
                This privacy policy indicates how {process.env.REACT_APP_BASE_URL} ("Website")
                operated by the website's owners (collectively referred to as
                "we", "us", or "our") uses data retrieved from the Website.
              </p>
              <p className="m-4 font-semibold">
                The purpose of this privacy policy is to inform you how we
                collect and process data from website visitors.
              </p>
              <li
                id="information-we-collect"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#information-we-collect">Information We Collect</a>
              </li>
              <p className="m-4">
                The type of information our website is concerned with is
                indicated below.
                <ol className="list-decimal">
                  <li className="m-4 ml-12">
                    Personal information: No personal information is collected
                    or processed.
                  </li>
                  <li className="m-4 ml-12">
                    Non-personal information:
                    <ul className="list-disc ml-4">
                      <li>The IP address being used.</li>
                      <ol className="list-[circle] ml-4">
                        <li>
                          This enables us to retrieve geolocation data. This
                          narrows location down to the city.
                        </li>
                      </ol>
                      <li>The browser type being used.</li>
                      <li>The device type being used.</li>
                      <li>The operating system being used.</li>
                      <li>Which referral source the user came from.</li>
                      <li>Which pages have been visited.</li>
                      <li>The duration of the visit.</li>
                    </ul>
                  </li>
                </ol>
                The information being collected is anonymous and cannot track
                individual users.
              </p>
              <li
                id="how-we-use-your-information"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#how-we-use-your-information">
                  How We Use Your Information
                </a>
              </li>
              <p className="m-4">
                We use the collected information for the following purposes:
                <ol className="list-decimal">
                  <li className="m-4 ml-12">
                    Analyzing website usage and trends.
                    <ul className="list-disc ml-4">
                      <li>
                        This is done using a self-hosted instance of{" "}
                        <a
                          href="https://github.com/plausible/analytics"
                          target="_blank"
                          rel="noreferrer"
                          className="underline text-blue-300 hover:opacity-75"
                        >
                          Plausible Analytics
                        </a>{" "}
                        for analytics data.
                      </li>
                    </ul>
                  </li>
                  <li className="m-4 ml-12">
                    Providing and improving our services.
                  </li>
                  <li className="m-4 ml-12">
                    Better insight on how the site is used.
                  </li>
                </ol>
                No information collected is sold to other parties.
              </p>
              <li
                id="security"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#security">Security</a>
              </li>
              <p className="m-4">
                We are committed to ensuring that any information collected is
                secure. We implement reasonable security measures to protect
                against unauthorized access, alteration, disclosure, or
                destruction of usage information. However, there is no guarantee
                of our measures being fully secure or error-free. Regardless,
                the information is anonymous and not personally identifiable.
              </p>
              <li
                id="children's-privacy"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#children's-privacy">Children's Privacy</a>
              </li>
              <p className="m-4">
                Our website is not aimed directly at children under the age of
                13, and we do not knowingly collect personal information about
                children under 13.
              </p>
              <li
                id="third-party-links"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#third-party-links">Third-Party Links</a>
              </li>
              <p className="m-4">
                Our website contains links to third-party websites. We have no
                control over the content and privacy practices of those
                websites, so we encourage you to review their privacy policies
                before providing any personal information. You further
                acknowledge and agree that we shall not be held responsible or
                liable, directly or indirectly, for any damages or losses,
                alleged or caused due to or through these third-party websites.
              </p>
              <li
                id="cookies"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#cookies">Cookies</a>
              </li>
              <p className="m-4">
                We may use persistent first-party cookies to store certain
                preferences. If you do not permit cookie retention then some
                features may not operate properly.
              </p>
              <p className="m-4">We do not use third-party cookies.</p>
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
                  href={`mailto:${process.env.REACT_APP_PRIVACY_EMAIL}`}
                  className="underline text-blue-300 hover:opacity-75"
                >
                  {process.env.REACT_APP_PRIVACY_EMAIL}
                </a>
                .
              </p>
              <li
                id="changes-to-this-privacy-policy"
                className="text-xl font-semibold m-4 ml-6 hover:opacity-75"
              >
                <a href="#changes-to-this-privacy-policy">
                  Changes to This Privacy Policy
                </a>
              </li>
              <p className="m-4">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page. Every update will have the last
                updated date at the top. We recommend checking this page
                periodically to stay informed about our privacy practices.
              </p>
              <p className="font-semibold">
                By continuing to use {process.env.REACT_APP_WEBSITE_NAME}, you confirm that you have read,
                understood, and agreed to the privacy policy.
              </p>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
