import styles from './Tooltip.module.css'
import { ResourceTooltipData } from '@/types/game'
import { formatNumber, text } from '@/lib/utilities';
import ResourceRow from './ResourceRow';

interface ResourceTooltipType {
  data: ResourceTooltipData
}

function FlavorText ({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className='space-m space-negative-top-m'>
      <span className='text-flavor'>{text}</span>
    </div>
  );
};

export default function ResourceTooltip({data}: ResourceTooltipType) {
  return (
    <div className={`${styles.tooltip} ${styles.tooltipResource}`}>
      <p className={`${styles.title} ${styles.titleResource}`}>{data.title}</p>

      <div className={`${styles.row} space-m`}>
        <span>{text('tooltips.info.total')}</span>
        <span className='text-bold'>{formatNumber(data.total, true)}</span>
      </div>

      <FlavorText text={data.messages?.afterTotal} />

      <ResourceRow items={data.custom || []} />

      <FlavorText text={data.messages?.afterCustom} />

      <ResourceRow 
        title={text('tooltips.info.income')} 
        items={data.income} 
        valueClass="text-green" 
        prefix="+" 
      />

      <ResourceRow 
        title={text('tooltips.info.expenditure')} 
        items={data.expenditures} 
        valueClass="text-red" 
        prefix="-" 
      />

      <FlavorText text={data.messages?.beforeChange} />

      <div className={`${styles.row} space-top-m`}>
        <span>{text('tooltips.info.change')}</span>
        <span className={`text-bold ${data.change >= 0 ? 'text-green' : 'text-red'}`}>
          {data.change >= 0 ? '+' : '-'}
          {formatNumber(Math.abs(data.change), true)}
        </span>
      </div>
    </div>
  )
}