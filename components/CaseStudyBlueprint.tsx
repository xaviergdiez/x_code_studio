import React from 'react';
import { Cpu, FileJson } from 'lucide-react';

interface BlueprintNodeProps {
  icon: React.ElementType;
  label: string;
  subtext: string;
  active?: boolean;
}

const BlueprintNode = ({ icon: Icon, label, subtext, active = false }: BlueprintNodeProps) => (
  <div className={`relative p-4 border rounded-sm flex flex-col items-center text-center gap-2 transition-all ${active ? 'border-[#00FF41] bg-[#00FF41]/10' : 'border-[#333] bg-[#1a1a1a]'}`}>
    <div className={`p-2 rounded-full ${active ? 'text-[#00FF41] bg-[#00FF41]/20' : 'text-gray-500 bg-[#333]'}`}>
      <Icon size={20} />
    </div>
    <span className={`text-xs font-mono font-bold ${active ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    <span className="text-[10px] text-gray-500 font-mono leading-tight">{subtext}</span>

    {/* Connector Line */}
    <div className="hidden md:block absolute -right-6 top-1/2 w-6 h-px bg-[#333]" />
  </div>
);

interface BlueprintProps {
  architecture: {
    nodes: {
      stage: string;
      icon: React.ElementType;
      label: string;
      subtext: string;
      active?: boolean;
    }[];
  };
  codeExample: {
    filename: string;
    size: string;
    code: string;
  };
  artifactDescription: string;
  artifactPlaceholder?: string | React.ReactNode;
}

const CaseStudyBlueprint = ({
  architecture,
  codeExample,
  artifactDescription,
  artifactPlaceholder = 'Video Placeholder: Screen recording of CLI tool running'
}: BlueprintProps) => {
  return (
    <section className="border-b border-[#333] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* The System Architecture Diagram */}
        <div className="mb-16">
          <h3 className="text-gray-500 font-mono text-xs mb-6 flex items-center gap-2">
            <Cpu size={14} /> SYSTEM_ARCHITECTURE_DIAGRAM
          </h3>

          <div className="bg-[#0a0a0a] border border-[#333] p-8 rounded-lg overflow-x-auto">
            <div className="flex flex-col md:flex-row gap-8 md:gap-6 min-w-[800px] justify-between relative">
              {architecture.nodes.map((node, index) => (
                <div key={index} className="w-1/4">
                  <div className="mb-2 text-xs text-[#00FF41] font-mono text-center">{node.stage}</div>
                  <BlueprintNode
                    icon={node.icon}
                    label={node.label}
                    subtext={node.subtext}
                    active={node.active}
                  />
                  {index === architecture.nodes.length - 1 && (
                    <style>{`.w-1\\/4:last-child .absolute { display: none; }`}</style>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-16">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 rounded font-mono text-xs overflow-x-auto">
            <div className="flex justify-between text-gray-500 mb-4 border-b border-[#333] pb-2">
              <span>{codeExample.filename}</span>
              <span>{codeExample.size}</span>
            </div>
            <div className="text-[#00FF41] whitespace-pre-wrap break-words">
              {codeExample.code}
            </div>
          </div>
        </div>

        {/* The Artifact */}
        <div>
           <h3 className="text-gray-500 font-mono text-xs mb-6 flex items-center gap-2">
            <FileJson size={14} /> AUTOMATION_ARTIFACT
          </h3>
          <div className="border border-[#333] bg-[#1a1a1a] p-8 text-center rounded-lg">
             <div className="inline-block p-4 bg-[#121212] border border-[#333] rounded mb-4">
                {typeof artifactPlaceholder === 'string' ? (
                  <span className="text-xs font-mono text-gray-500">{artifactPlaceholder}</span>
                ) : (
                  artifactPlaceholder
                )}
             </div>
             <p className="text-gray-400 text-sm max-w-lg mx-auto" dangerouslySetInnerHTML={{ __html: artifactDescription }} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyBlueprint;
