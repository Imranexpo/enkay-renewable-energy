import React from 'react';
import { ProjectItem } from '../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestQuote: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuote,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-[#0f172a]/10 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#002217] shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002217] via-[#002217]/40 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block px-2.5 py-1 rounded bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[11px] font-bold uppercase tracking-wider mb-1.5">
              {project.categoryLabel}
            </span>
            <h3 className="font-['Space Grotesk'] text-[24px] sm:text-[28px] font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 font-['Manrope']">
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#7b5800] mb-1">
              Engineering Topology Description
            </h4>
            <p className="text-[14px] text-[#414845] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="bg-[#f2f3ff] rounded-xl p-4 sm:p-5">
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#002217] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#7b5800]">engineering</span>
              Standardized Technical Bill of Materials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                <span className="text-[#414845] text-[11px] uppercase block">Asset Capacity</span>
                <span className="font-bold text-[#002217] text-[14px]">{project.specs.capacity}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                <span className="text-[#414845] text-[11px] uppercase block">PV Module Class</span>
                <span className="font-bold text-[#002217] text-[14px]">{project.specs.moduleType}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                <span className="text-[#414845] text-[11px] uppercase block">Inverter Architecture</span>
                <span className="font-bold text-[#002217] text-[14px]">{project.specs.inverterType}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#eaedff]">
                <span className="text-[#414845] text-[11px] uppercase block">Mounting Sub-Structure</span>
                <span className="font-bold text-[#002217] text-[14px]">{project.specs.mounting}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#eaedff] rounded-xl flex items-center gap-3 text-[12px] text-[#414845]">
            <span className="material-symbols-outlined text-[#002217] text-[20px] shrink-0">verified</span>
            <span>
              All installation topologies comply strictly with TNERC grid code, CEA safety guidelines, and IS 875 wind velocity benchmarks for Tamil Nadu.
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onRequestQuote(project.title)}
              className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#002217] hover:bg-[#0e382b] text-white font-['Manrope'] text-[14px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Request Quote for This Architecture</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#eaedff] text-[#002217] font-semibold text-[14px] hover:bg-[#dae2fd] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
