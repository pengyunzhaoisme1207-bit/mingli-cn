interface Pillar {
  label: string;
  stems: string;
  hidden?: string;
  tenGod?: string;
}

interface PillarTableProps {
  pillars: Pillar[];
  label?: string;
  title?: string;
}

export default function PillarTable({
  pillars,
  label = "Your Chart",
  title = "Your Four Pillars",
}: PillarTableProps) {
  return (
    <div className="pillars-header">
      <p className="pillars-header-label">{label}</p>
      <h2 className="pillars-header-title">{title}</h2>
      <div className="pillars-table">
        {pillars.map((p, i) => (
          <div className="pillar" key={i}>
            <p className="pillar-label">{p.label}</p>
            <p className="pillar-stems">{p.stems}</p>
            {p.hidden && <p className="pillar-hidden">{p.hidden}</p>}
            {p.tenGod && <p className="pillar-ten-god">{p.tenGod}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
