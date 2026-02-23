interface TierBadgeProps {
  tier: "platinum" | "gold" | "silver" | "bronze" | "in-assay" | "listed-only";
  score?: number;
}

export default function TierBadge({ tier, score }: TierBadgeProps) {
  if (tier === "listed-only") {
    return null;
  }

  if (tier === "in-assay") {
    return (
      <span 
        className="badge badge-in-assay"
        title="This community is currently being assessed for a Burnish Score. Check back soon."
      >
        In Assay
      </span>
    );
  }

  const tierLabels = {
    platinum: "Burnish Platinum",
    gold: "Burnish Gold",
    silver: "Burnish Silver",
    bronze: "Burnish Bronze",
  };

  return (
    <span className={`badge badge-${tier}`}>
      {tierLabels[tier]}
      {score !== undefined && <span className="ml-1">· {score}</span>}
    </span>
  );
}
