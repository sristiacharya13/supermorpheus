import { useState } from 'react';

export default function AddMemberForm({ onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [focus, setFocus] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [interests, setInterests] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!role.trim()) errors.role = 'Role is required.';
    if (!focus.trim()) errors.focus = 'Contribution Focus is required.';
    if (!joinedDate.trim()) errors.joinedDate = 'Joined Date is required.';
    if (!interests.trim()) errors.interests = 'At least one interest is required.';
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    onAdd({
      id: Date.now(),
      name,
      role,
      focus,
      joinedDate,
      interests: interests.split(',').map(tag => tag.trim())
    });

    // Clear the form
    setName('');
    setRole('');
    setFocus('');
    setJoinedDate('');
    setInterests('');
    setFormErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 shadow-xl font-inter mb-20 flex flex-col gap-6 bg-white/10 backdrop-blur-lg rounded-xl max-w-xl mx-auto text-black text-lg"
    >
      <h2 className="text-3xl font-bold text-[#262740]">Add New Member</h2>

      <div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="w-full border-b-2 border-white focus:outline-none focus:border-black py-3 px-2 placeholder:text-gray-500 text-lg"
        />
        {formErrors.name && <p className="text-red-600 text-sm mt-1">{formErrors.name}</p>}
      </div>

      <div>
        <input
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="Role"
          className="w-full border-b-2 border-white focus:outline-none focus:border-black py-3 px-2 placeholder:text-gray-500 text-lg"
        />
        {formErrors.role && <p className="text-red-600 text-sm mt-1">{formErrors.role}</p>}
      </div>

      <div>
        <input
          value={focus}
          onChange={e => setFocus(e.target.value)}
          placeholder="Contribution Focus"
          className="w-full border-b-2 border-white focus:outline-none focus:border-black py-3 px-2 placeholder:text-gray-500 text-lg"
        />
        {formErrors.focus && <p className="text-red-600 text-sm mt-1">{formErrors.focus}</p>}
      </div>

      <div>
        <input
          type="date"
          value={joinedDate}
          onChange={e => setJoinedDate(e.target.value)}
          className="w-full border-b-2 border-white focus:outline-none focus:border-black py-3 px-2 text-lg"
        />
        {formErrors.joinedDate && <p className="text-red-600 text-sm mt-1">{formErrors.joinedDate}</p>}
      </div>

      <div>
        <input
          value={interests}
          onChange={e => setInterests(e.target.value)}
          placeholder="Areas of Interest (comma-separated)"
          className="w-full border-b-2 border-white focus:outline-none focus:border-black py-3 px-2 placeholder:text-gray-500 text-lg"
        />
        {formErrors.interests && <p className="text-red-600 text-sm mt-1">{formErrors.interests}</p>}
      </div>

      <button className="bg-[#262740] hover:bg-[#404167] text-white font-semibold px-6 py-3 rounded-4xl transition text-lg">
        Add Member
      </button>
    </form>
  );
}
