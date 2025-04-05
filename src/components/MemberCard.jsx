import { useState } from 'react';

export default function MemberCard({ member }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p className="text-sm text-gray-600">{member.role} - {member.focus}</p>
        </div>
        <button
          onClick={() => setShowDetails(prev => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      {showDetails && (
        <div className="mt-2 text-sm text-gray-700">
          <p><strong>Joined:</strong> {member.joinedDate}</p>
          <p><strong>Interests:</strong> {member.interests.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
