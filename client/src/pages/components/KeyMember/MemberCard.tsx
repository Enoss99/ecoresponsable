import React from 'react';
import "./KeyMember.css";

export default function MemberCard({ label }: { label: string }) {
  return (
    <div className="mqc-member">
      <div className="mqc-member-avatar">
        <svg width="40" height="40" fill="none" stroke="#222">
          <circle cx="20" cy="20" r="18" stroke="#bbb" strokeWidth="2" />
          <circle cx="20" cy="16" r="7" fill="#bbb" />
          <ellipse cx="20" cy="30" rx="10" ry="6" fill="#bbb" />
        </svg>
      </div>
      <div className="mqc-member-label">{label}</div>
    </div>
  );
}
