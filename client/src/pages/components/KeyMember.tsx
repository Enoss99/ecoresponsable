import React from 'react';
import MemberCard from './MemberCard';
import "../../css/KeyMember.css";

export default function KeyMember() {
  const members = [
    "Membres clés\nassociation",
    "Membres clés\nassociation",
    "Membres clés\nassociation",
    "Membres clés\nassociation"
  ];

  return (
    <section className="mqc-members">
      <div className="mqc-members-grid">
        {members.map((label, idx) => (
          <MemberCard label={label} key={idx} />
        ))}
      </div>
    </section>
  );
}
