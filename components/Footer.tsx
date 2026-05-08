import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li><Link href="#">Privacy</Link></li>
          <li><Link href="#">Terms</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
        <p>&copy; 2026 MÍNG LÌ. All rights reserved. For entertainment and self-reflection purposes only.</p>
      </div>
    </footer>
  );
}
