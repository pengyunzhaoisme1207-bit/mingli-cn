import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer-links">
          <li><Link href="#">隐私政策</Link></li>
          <li><Link href="#">服务条款</Link></li>
          <li><Link href="#">联系我们</Link></li>
        </ul>
        <p>&copy; 2026 MÍNG LÌ. 保留所有权利。仅供娱乐与自我反思之用。</p>
      </div>
    </footer>
  );
}
