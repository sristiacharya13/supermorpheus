import { useState } from 'react';

export default function AddMemberForm({ onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [focus, setFocus] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return alert('Name is required');
    onAdd({
      id: Date.now(),
      name,
      role,
      focus,
      joinedDate,
      interests: interests.split(',').map(tag => tag.trim())
    });
    setName(''); setRole(''); setFocus(''); setJoinedDate(''); setInterests('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-1 gap-3"
    >
      <h2 className="text-lg font-bold">Add New Member</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 rounded" />
      <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role" className="border p-2 rounded" />
      <input value={focus} onChange={e => setFocus(e.target.value)} placeholder="Contribution Focus" className="border p-2 rounded" />
      <input type="date" value={joinedDate} onChange={e => setJoinedDate(e.target.value)} className="border p-2 rounded" />
      <input value={interests} onChange={e => setInterests(e.target.value)} placeholder="Areas of Interest (comma-separated)" className="border p-2 rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Member</button>
    </form>
  );
}