'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Target, Copy, Check, ExternalLink,
  Search, Plus, Save, Trash2, Edit3,
  Briefcase, MessageSquare, AlertCircle,
  ChevronRight, X, Terminal, Filter
} from 'lucide-react';

// --- Initial Data: The "Gold" Leads ---
const INITIAL_LEADS = [
  {
    id: 'hogarth-uk',
    company: 'Hogarth',
    location: 'UK/Global',
    role: 'Head of Creative Operations',
    status: 'pending', // pending, sent, replied, meeting, rejected
    hook: 'WPP Open & Coca-Cola Account ($4B win).',
    pain: 'Producing real-time content for 200+ markets is impossible manually.',
    value: 'Middleware templates for "Open X" model.',
    subject: 'Automating the "Open X" asset volume?',
    message: `Hi [Name],

I've been following the WPP Open X rollout. The promise of 'real-time content' for a client like Coca-Cola usually breaks traditional production workflows—specifically the Figma-to-DCO handoff.

I specialize in building the middleware for this exact problem.

I build custom Figma plugins that sanitize design data and instantly generate production-ready HTML5 bundles (GSAP-optimized) for high-volume feeds.

I'd love to show you the 'Guardrails System' I built for a similar global automotive rollout. It might save your team a few weekends.

Protocol details: x-code.studio

Best,
Xavier`
  },
  {
    id: 'oliver-uk',
    company: 'Oliver Agency',
    location: 'UK/Global',
    role: 'Head of Studio / Design Ops',
    status: 'pending',
    hook: 'U-Studio (Unilever) & "Inside" Model.',
    pain: 'Margin depends on speed. On-site teams get stuck in versioning hell.',
    value: 'Velocity Engines to make on-site teams 2x faster.',
    subject: 'Reducing "time-to-market" for your on-site teams?',
    message: `Hi [Name],

I know Oliver's model relies on beating external agency speed. But often, on-site teams get bogged down in the 'versioning hell' of resizing master creative for 15 formats.

I build 'Velocity Engines'—custom pipelines that allow designers to stay in Figma while my code generates the production assets automatically.

If you have a high-volume account (like Unilever or Barclaycard) struggling with turnaround times, I can deploy a script that cuts their production phase by 60%.

I built a calculator here to verify the savings: x-code.studio

Best,
Xavier`
  },
  {
    id: 'dept-ams',
    company: 'DEPT®',
    location: 'Amsterdam',
    role: 'Director of Digital Operations',
    status: 'pending',
    hook: 'Philips & Tech/Marketing Hybrid.',
    pain: 'Consistency across global assets (e-commerce, social, display).',
    value: 'Fractional Technical Director bridging Design/Dev.',
    subject: 'Bridging the Design/Dev gap on the Philips account?',
    message: `Hi [Name],

I've noticed DEPT® is handling increasingly complex global rollouts. The biggest bottleneck I usually see in 'Tech + Marketing' setups is the friction between the Creative Director's vision and the developer's code.

I operate as a fractional Technical Director to fix this.

I build Design Systems for Ad Tech—ensuring that the high-fidelity designs in Figma are translated into code with 100% pixel perfection and 60fps performance (using GSAP), automatically.

I'd love to demo a recent 'Color Configurator' I built (similar to what a Philips Hue campaign might need) that runs under 150kb.

Case study here: x-code.studio

Best,
Xavier`
  },
  {
    id: 'justeat-ams',
    company: 'Just Eat Takeaway',
    location: 'Amsterdam',
    role: 'Global Head of Creative Studio',
    status: 'pending',
    hook: 'UEFA Sponsorship & Reactive Ads.',
    pain: 'Need for instant, reactive ads during matches (e.g., "Goal Scored").',
    value: 'DCO "Live Data" Pipeline.',
    subject: 'Reactive DCO for UEFA match days?',
    message: `Hi [Name],

I saw the huge push Just Eat is making with UEFA. Managing reactive, real-time creative (e.g., 'Goal scored! Order now') across multiple markets usually breaks standard production workflows.

I specialize in Data-to-Creative pipelines.

I can build a system where your team inputs a trigger (e.g., 'Match Halftime'), and my code automatically generates and traffics the localized banners for Amsterdam, London, and Madrid instantly.

I did a similar 'Real-Time' architecture for a GTECH project.

Let's discuss automating your game-day assets: x-code.studio

Best,
Xavier`
  },
  {
    id: 'jellyfish-es',
    company: 'Jellyfish',
    location: 'Spain/Global',
    role: 'VP Creative & Experience',
    status: 'pending',
    hook: 'Google Marketing Platform (GMP) Partners.',
    pain: 'Clients buy DV360 but use static assets, wasting the tech potential.',
    value: 'GSAP Rich Media to fuel the DV360 engine.',
    subject: 'Unleashing the full power of DV360 for [Client]?',
    message: `Hi [Name],

I know Jellyfish sells the most advanced GMP setups in the world. But often, clients are running static assets that don't utilize the 'Dynamic' capabilities of the platform.

I'm a Creative Technologist who builds the fuel for that engine.

I code high-performance GSAP Rich Media and DCO templates that utilize the full targeting power of DV360—weather triggers, location data, and live feeds.

I'd love to be your 'go-to' resource when a client asks, 'Can we do something cool with this data?'

See my 'Data-to-Creative' case study: x-code.studio

Best,
Xavier`
  },
  {
    id: 'mango-es',
    company: 'Mango',
    location: 'Barcelona',
    role: 'Head of Digital Production',
    status: 'pending',
    hook: 'Fast Fashion Inventory Turnover.',
    pain: 'Promoting out-of-stock items wastes budget.',
    value: 'API-Connected Creative (Guardrails System).',
    subject: "Killing 'Out of Stock' ad spend automatically?",
    message: `Hi [Name],

In fast fashion, speed is everything. I often see brands wasting budget promoting items that just went out of stock because the banner update cycle is too slow.

I build API-connected creative workflows.

I can architect a system where your Figma designs are connected directly to your product inventory feed. If a SKU hits '0 stock', the banner updates automatically to the next best seller—without a designer touching it.

I call it the 'Guardrails System.' It saves budget and keeps the CFO happy.

Let's sync on your inventory feed setup: x-code.studio

Best,
Xavier`
  }
];

// --- Utility Functions ---

const getStatusColor = (status: string) => {
  switch(status) {
    case 'sent': return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
    case 'replied': return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
    case 'meeting': return 'text-green-400 border-green-500/50 bg-green-500/10';
    case 'rejected': return 'text-red-400 border-red-500/50 bg-red-500/10';
    default: return 'text-slate-400 border-slate-700 bg-slate-800/50';
  }
};

// Scout View Component (extracted to prevent re-renders)
const ScoutViewComponent = ({ searchParams, setSearchParams, generateLinkedInUrl, setActiveTab, setShowAddModal }: any) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Search className="text-green-500" /> LEAD_SCOUT_PROTOCOL
      </h2>
      <p className="text-slate-400 mb-6">Generate advanced Boolean search strings to find hidden decision makers.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-mono text-slate-500 mb-2">TARGET LOCATION</label>
          <input
            value={searchParams.location}
            onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
            className="w-full bg-black border border-slate-700 text-white p-3 rounded focus:border-green-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-500 mb-2">TARGET ROLE</label>
          <select
            value={searchParams.role}
            onChange={(e) => setSearchParams({...searchParams, role: e.target.value})}
            className="w-full bg-black border border-slate-700 text-white p-3 rounded focus:border-green-500 outline-none appearance-none"
          >
            <option>Head of Digital Production</option>
            <option>Head of Creative Operations</option>
            <option>Design Ops Lead</option>
            <option>Marketing Technology Director</option>
            <option>Programmatic Lead</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-500 mb-2">SECTOR KEYWORD</label>
          <input
            value={searchParams.sector}
            onChange={(e) => setSearchParams({...searchParams, sector: e.target.value})}
            className="w-full bg-black border border-slate-700 text-white p-3 rounded focus:border-green-500 outline-none"
          />
        </div>
      </div>

      <a
        href={generateLinkedInUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-600/10 border border-green-500 text-green-400 font-mono font-bold py-4 rounded flex items-center justify-center gap-2 hover:bg-green-500 hover:text-black transition-all"
      >
        <ExternalLink size={18} /> INITIATE LINKEDIN SCAN
      </a>
    </div>

    <div className="text-center text-slate-500 text-sm font-mono">
      <p>Found a target? Add them to the dashboard manually.</p>
      <button onClick={() => { setActiveTab('dashboard'); setShowAddModal(true); }} className="text-green-400 underline mt-2">
        Open Manual Entry Form
      </button>
    </div>
  </div>
);

const LeadCommandCenter = () => {
  // State
  const [leads, setLeads] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('x-code-leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    }
    return INITIAL_LEADS;
  });
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, scout
  const [showAddModal, setShowAddModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    company: '', location: '', role: '', hook: '', subject: '', message: ''
  });

  // Search/Scout State
  const [searchParams, setSearchParams] = useState({
    role: 'Head of Digital Production',
    location: 'Amsterdam',
    sector: 'Agency'
  });

  // Persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('x-code-leads', JSON.stringify(leads));
    }
  }, [leads]);

  // Handlers
  const updateStatus = (id: string, newStatus: string) => {
    setLeads(leads.map((l: any) => l.id === id ? { ...l, status: newStatus } : l));
  };

  const deleteLead = (id: string) => {
    if (confirm('Delete this lead record?')) {
      setLeads(leads.filter((l: any) => l.id !== id));
      setSelectedLead(null);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Visual feedback could be added here
  };

  const addNewLead = () => {
    const id = `custom-${Date.now()}`;
    setLeads([...leads, { ...newLead, id, status: 'pending', pain: 'Custom Lead', value: 'Custom Value' }]);
    setShowAddModal(false);
    setNewLead({ company: '', location: '', role: '', hook: '', subject: '', message: '' });
  };

  const generateLinkedInUrl = () => {
    // Simplified search that works with LinkedIn's current syntax
    const query = `${searchParams.role} ${searchParams.location}`;
    return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`;
  };

  // --- Views ---

  const DashboardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {leads.map((lead: any) => (
        <div
          key={lead.id}
          onClick={() => setSelectedLead(lead)}
          className={`cursor-pointer group relative p-5 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${getStatusColor(lead.status)} bg-slate-900`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-white group-hover:text-green-400">{lead.company}</h3>
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-1 flex items-center gap-2">
            <Briefcase size={12} /> {lead.role}
          </p>
          <p className="text-xs text-slate-500 mb-4 flex items-center gap-2">
            <Target size={12} /> {lead.location}
          </p>

          <div className="border-t border-slate-800 pt-3 mt-auto">
             <div className="text-xs font-mono text-green-500/80 truncate">
               HOOK: {lead.hook}
             </div>
          </div>
        </div>
      ))}

      {/* Add New Card */}
      <button
        onClick={() => setShowAddModal(true)}
        className="flex flex-col items-center justify-center p-5 rounded-lg border border-dashed border-slate-700 bg-slate-900/30 text-slate-500 hover:text-green-400 hover:border-green-500/50 transition-all min-h-[160px]"
      >
        <Plus size={32} className="mb-2" />
        <span className="font-mono text-sm">ADD TARGET</span>
      </button>
    </div>
  );

  const LeadDetailModal = () => {
    const [editMode, setEditMode] = useState(false);
    const [editedMessage, setEditedMessage] = useState(selectedLead?.message || '');
    const [editedSubject, setEditedSubject] = useState(selectedLead?.subject || '');

    useEffect(() => {
      if (selectedLead) {
        setEditedMessage(selectedLead.message);
        setEditedSubject(selectedLead.subject);
        setEditMode(false);
      }
    }, [selectedLead?.id]);

    if (!selectedLead) return null;

    const saveEdits = () => {
      setLeads(leads.map((l: any) => l.id === selectedLead.id ? { ...l, message: editedMessage, subject: editedSubject } : l));
      setEditMode(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-slate-950 border border-green-500/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl flex flex-col md:flex-row">

          {/* Left Column: Intel */}
          <div className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/50">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-2xl font-bold text-white mb-1">{selectedLead.company}</h2>
                 <p className="text-green-400 font-mono text-xs">{selectedLead.role}</p>
               </div>
               <button onClick={() => deleteLead(selectedLead.id)} className="text-slate-600 hover:text-red-500">
                 <Trash2 size={16} />
               </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 font-mono block mb-1">THE HOOK (DATA)</label>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedLead.hook}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 font-mono block mb-1">THE PAIN</label>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedLead.pain}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 font-mono block mb-1">YOUR VALUE</label>
                <p className="text-sm text-slate-300 leading-relaxed">{selectedLead.value}</p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <label className="text-xs font-bold text-slate-500 font-mono block mb-2">STATUS PROTOCOL</label>
                <div className="grid grid-cols-2 gap-2">
                  {['pending', 'sent', 'replied', 'meeting', 'rejected'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      className={`px-3 py-2 text-xs font-mono uppercase rounded border transition-all ${selectedLead.status === s ? 'bg-green-500 text-black border-green-500' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Communication */}
          <div className="md:w-2/3 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                <Terminal size={14} /> SNIPER_MESSAGE_TERMINAL
              </div>
              <div className="flex gap-2">
                 {editMode ? (
                   <button onClick={saveEdits} className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-500">
                     <Save size={12} /> SAVE
                   </button>
                 ) : (
                   <button onClick={() => setEditMode(true)} className="flex items-center gap-1 text-xs border border-slate-700 text-slate-300 px-3 py-1.5 rounded hover:text-white">
                     <Edit3 size={12} /> EDIT
                   </button>
                 )}
                 <button onClick={() => setSelectedLead(null)} className="text-slate-500 hover:text-white ml-2">
                   <X size={20} />
                 </button>
              </div>
            </div>

            <div className="flex-grow bg-black border border-slate-800 rounded p-4 font-mono text-sm">
              <div className="mb-4">
                <span className="text-slate-500 select-none">Subject: </span>
                {editMode ? (
                  <input
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                    className="bg-slate-900 text-white w-full p-1 border border-slate-700 focus:border-green-500 outline-none mt-1"
                  />
                ) : (
                  <span className="text-white">{selectedLead.subject}</span>
                )}
              </div>
              <div className="w-full h-px bg-slate-800 mb-4" />
              {editMode ? (
                <textarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                  className="w-full h-[300px] bg-slate-900 text-slate-300 p-2 border border-slate-700 focus:border-green-500 outline-none resize-none"
                />
              ) : (
                <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              )}
            </div>

            {!editMode && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleCopy(selectedLead.subject + '\n\n' + selectedLead.message)}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-black font-bold font-mono rounded flex items-center justify-center gap-2"
                >
                  <Copy size={16} /> COPY TO CLIPBOARD
                </button>
                <button
                  onClick={() => { updateStatus(selectedLead.id, 'sent'); setSelectedLead(null); }}
                  className="px-6 py-3 border border-slate-700 text-slate-300 hover:text-white font-mono rounded"
                >
                  MARK AS SENT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-green-900 selection:text-green-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950 p-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
             <h1 className="text-xl font-bold tracking-widest font-mono text-white">COMMAND_CENTER</h1>
          </div>
          <div className="flex gap-4">
             <button
               onClick={() => setActiveTab('dashboard')}
               className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               <Users size={16} /> TARGETS ({leads.length})
             </button>
             <button
               onClick={() => setActiveTab('scout')}
               className={`flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all ${activeTab === 'scout' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               <Search size={16} /> SCOUT
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' ? <DashboardView /> : <ScoutViewComponent searchParams={searchParams} setSearchParams={setSearchParams} generateLinkedInUrl={generateLinkedInUrl} setActiveTab={setActiveTab} setShowAddModal={setShowAddModal} />}
      </main>

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">ADD NEW TARGET</h2>
            <div className="space-y-4">
              <input placeholder="Company Name" className="w-full bg-black border border-slate-700 p-2 text-white rounded" value={newLead.company} onChange={e => setNewLead({...newLead, company: e.target.value})} />
              <input placeholder="Location" className="w-full bg-black border border-slate-700 p-2 text-white rounded" value={newLead.location} onChange={e => setNewLead({...newLead, location: e.target.value})} />
              <input placeholder="Role" className="w-full bg-black border border-slate-700 p-2 text-white rounded" value={newLead.role} onChange={e => setNewLead({...newLead, role: e.target.value})} />
              <input placeholder="The Hook (Why them?)" className="w-full bg-black border border-slate-700 p-2 text-white rounded" value={newLead.hook} onChange={e => setNewLead({...newLead, hook: e.target.value})} />
              <textarea placeholder="Initial Message Draft" className="w-full bg-black border border-slate-700 p-2 text-white rounded h-32" value={newLead.message} onChange={e => setNewLead({...newLead, message: e.target.value})} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-slate-400 hover:text-white">CANCEL</button>
              <button onClick={addNewLead} className="px-6 py-2 bg-green-600 text-black font-bold rounded hover:bg-green-500">ADD TO DATABASE</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal Layer */}
      <LeadDetailModal />

    </div>
  );
};

export default LeadCommandCenter;
