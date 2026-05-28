import { Opportunity } from '@/types';
import { ArrowUpRight, FolderPlus, ExternalLink } from 'lucide-react';

const STATUS_STYLES: Record<Opportunity['status'], { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-[#ECFDF5] text-[#059669]' },
  'closing-soon': { label: 'Closing Soon', className: 'bg-[#FEF3C7] text-[#D97706]' },
  closed: { label: 'Closed', className: 'bg-[#F3F4F6] text-[#6B7280]' },
  awarded: { label: 'Awarded', className: 'bg-[#EDE9FE] text-[#7C3AED]' },
};

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity: opp }: OpportunityCardProps) {
  const status = STATUS_STYLES[opp.status];

  return (
    <div className="border-b border-[#e7e7e7] bg-white px-[24px] py-[16px] last:border-b-0">
      {/* Header row */}
      <div className="mb-[6px] flex items-start gap-[8px]">
        <div className="flex flex-1 flex-col gap-[2px]">
          <h3 className="text-[15px] font-medium leading-[20px] text-[#1b1b1b]">{opp.title}</h3>
          <p className="text-[12px] text-[#565656]">Buyer: {opp.buyer}</p>
        </div>
        <span className={`shrink-0 rounded-full px-[8px] py-[2px] text-[11px] font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Meta row */}
      <div className="mb-[10px] flex flex-wrap gap-x-[16px] gap-y-[4px] text-[12px]">
        <span className="text-[#565656]">
          Deadline: <span className="text-[#1b1b1b]">{opp.deadline}</span>
        </span>
        <span className="text-[#565656]">
          Contract Value: <span className="text-[#1b1b1b]">{opp.contractValue}</span>
        </span>
        <span className="text-[#565656]">
          Country: <span className="text-[#1b1b1b]">{opp.country}</span>
        </span>
        <span className="text-[#565656]">
          Source: <span className="text-[#1b1b1b]">{opp.source}</span>
        </span>
      </div>

      {/* Description */}
      <p className="mb-[12px] line-clamp-2 text-[13px] leading-[18px] text-[#565656]">{opp.description}</p>

      {/* Actions */}
      <div className="flex items-center justify-end gap-[8px]">
        <button className="flex h-[30px] items-center gap-[4px] rounded-[5px] px-[12px] text-[12px] font-medium text-[#565656] hover:bg-[#f5f5f5]">
          {opp.hasProject ? (
            <>
              <ArrowUpRight size={14} />
              Open project
            </>
          ) : (
            <>
              <FolderPlus size={14} />
              Create project
            </>
          )}
        </button>
        <button className="flex h-[30px] items-center gap-[4px] rounded-[5px] bg-[#e8edf4] px-[12px] text-[12px] font-medium text-[#1b1b1b] hover:bg-[#dce4f0]">
          <ExternalLink size={13} />
          Open source
        </button>
      </div>
    </div>
  );
}
