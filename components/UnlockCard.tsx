interface UnlockCardProps {
  price?: string;
}

export default function UnlockCard({ price = "$9.99" }: UnlockCardProps) {
  return (
    <div className="unlock-card">
      <p className="unlock-badge">Premium Report</p>
      <h3 className="unlock-title">Unlock your full reading</h3>
      <ul className="unlock-features">
        <li>10 chapters total</li>
        <li>Four Schools analysis</li>
        <li>Zi Wei cross-check</li>
        <li>Luck cycle forecast</li>
        <li>Personal action plan</li>
        <li>PDF download</li>
      </ul>
      <p className="unlock-price">{price}</p>
      <a href="#" className="unlock-btn">
        Unlock now &rarr;
      </a>
      <p className="unlock-guarantee">
        One-time payment &middot; Instant access &middot; 30-day guarantee
      </p>
    </div>
  );
}
