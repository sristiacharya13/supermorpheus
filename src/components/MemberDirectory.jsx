import { useState } from 'react';
import { mockMembers } from '../data/members';
import MemberCard from './MemberCard';
import AddMemberForm from './AddMemberForm';

export default function MemberDirectory() {
  const [members, setMembers] = useState(mockMembers);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  const handleAddMember = newMember => {
    setMembers(prev => [...prev, newMember]);
  };

  const filtered = members
    .filter(m => m.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => sort === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Member Directory</h1>
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>
      <AddMemberForm onAdd={handleAddMember} />
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(member => <MemberCard key={member.id} member={member} />)}
      </div>
    </div>
  );
}
