
import { Gamepad2, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 12.87c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zm2.4 0c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2z" />
      <path d="M15.23 7.23s-.47-.53-1.09-.76c.03-.05.05-.1.08-.15.35-.47.65-1.12.65-1.12s-.71-.05-1.61.64c-1.35-.38-2.7-.38-4.05 0-.9-.69-1.61-.64-1.61-.64s.3.65.65 1.12c.03.05.05.1.08.15-.62.23-1.09.76-1.09.76s-1.88 2.65-2.22 6.63c2.05 1.2 4.1 1.2 4.1 1.2H12s2.05 0 4.1-1.2c-.34-3.98-2.22-6.63-2.22-6.63z" />
    </svg>
  );

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Gamepad2 className="h-6 w-6" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                PlayFlow
              </span>
            </Link>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <DiscordIcon className="h-6 w-6" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>Copyright © PlayFlow 2025</p>
        </div>
      </div>
    </footer>
  );
}
