import { useState } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';

export default function MemberCard({ member }) {
  const [showDetails, setShowDetails] = useState(false);

  // Format the joined date as: "Month Day, Year"
  const formattedDate = new Date(member.joinedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      style={{ backgroundColor: 'rgba(255, 255, 250, 0.4)' }} // Opacity reduced here
      className="border-[0.1px] border-[#fcfcff] p-6 rounded-4xl shadow-xl transition-all text-black text-lg space-y-4"
    >
      {/* Top section: Name & Icon Toggle */}
      <div className="flex justify-between items-start">
        <h2 className="text-2xl text-[#262740] font-bold">{member.name}</h2>
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="text-[#262740] hover:text-blue-900 transition-transform duration-300"
          aria-label="Toggle Details"
        >
          <ArrowUpRight
            size={32}
            strokeWidth={3.5}
            className={`transform transition-transform duration-300 ${
              showDetails ? '-rotate-[190deg]' : 'rotate-0'
            }`}
          />
        </button>
      </div>

      <p className="text-lg">
        {member.role} - {member.focus}
      </p>

      {showDetails && (
        <div className="text-md space-y-2">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <p>
              <strong>Joined on</strong> {formattedDate}
            </p>
          </div>
          <div>
            
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest, index) => (
                <span
                  key={index}
                  className="border border-[#bac7e7] bg-[#bac7e7] text-[#262740] px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
