import { assets } from "@/assets/assets";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-8  max-w-screen-xl mx-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <Link to="/" className="text-xl font-bold">
            {/* GovTestPrep */}
            <img src={assets.logo} alt="Logo" className="w-32 h-32" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Helping aspirants ace Agriculture job exams since 2023
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center md:text-left">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* <div className="space-y-2">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/tests"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/help"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Social</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/@HashtagAgriculture"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/EdCIhZYulWR29zvfLh5ny7"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp Group
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/HashtagAgriJobs"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram Group
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-6 md:mt-8">
        <p className="text-xs text-center text-muted-foreground">
          Copyright © {new Date().getFullYear()} Hashtag Agriculture. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
