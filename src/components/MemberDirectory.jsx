import { useState, useRef, useEffect } from 'react';
import { mockMembers } from '../data/members';
import MemberCard from './MemberCard';
import AddMemberForm from './AddMemberForm';
import { SortAsc, SortDesc, ChevronDown, Plus, X } from 'lucide-react';
import { CiSearch } from 'react-icons/ci';

export default function MemberDirectory() {
  const [members, setMembers] = useState(mockMembers);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');
  const [showForm, setShowForm] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddMember = newMember => {
    setMembers(prev => [...prev, newMember]);
    setShowForm(false);
  };

  const filtered = members
    .filter(m => m.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) =>
      sort === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC] text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center text-[#262740] font-poppins">
          Community Member Directory
        </h1>

        {/* Search, Sort, Add Member - responsive row */}
        <div className="mb-4 flex flex-wrap gap-2 items-center justify-start">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[200px]">
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-4xl font-inter bg-[#262740]/40 text-white placeholder-gray-300 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Sort Button */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setShowSortOptions(prev => !prev)}
              className="flex items-center justify-between px-4 py-2 font-inter rounded-4xl bg-[#262740]/40 text-white backdrop-blur-lg hover:bg-white/20 transition w-36"
            >
              <span className="flex items-center gap-1 font-inter">
                {sort === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                {sort === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
              </span>
              <ChevronDown size={18} />
            </button>
            {showSortOptions && (
              <div className="absolute top-full mt-1 w-36 bg-[#262740]/40 backdrop-blur-lg rounded-xl shadow text-white z-10">
                <div
                  onClick={() => {
                    setSort('asc');
                    setShowSortOptions(false);
                  }}
                  className="px-4 py-2 hover:bg-white/20 cursor-pointer font-inter rounded-t-xl flex items-center gap-2"
                >
                  <SortAsc size={16} /> Sort A-Z
                </div>
                <div
                  onClick={() => {
                    setSort('desc');
                    setShowSortOptions(false);
                  }}
                  className="px-4 py-2 hover:bg-white/20 cursor-pointer rounded-b-xl flex items-center gap-2"
                >
                  <SortDesc size={16} /> Sort Z-A
                </div>
              </div>
            )}
          </div>

          {/* Add Member Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#262740] hover:bg-[#404167] text-white font-inter font-semibold px-4 py-2 rounded-4xl transition flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? 'Close Form' : 'Add Member'}
          </button>
        </div>

        {/* Add Member Form */}
        {showForm && (
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] mx-auto mb-6">
            <AddMemberForm onAdd={handleAddMember} />
          </div>
        )}

        {/* Member List */}
        <div className="flex flex-col gap-6">
          {filtered.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
