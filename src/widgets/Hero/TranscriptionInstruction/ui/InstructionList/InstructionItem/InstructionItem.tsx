import type { InstructionItemType } from '../../../types.ts';
import type { FC } from 'react';
import '../../TranscriptionInstruction.scss';

const InstructionItem: FC<InstructionItemType> = ({ id, title, description }) => {
  return (
    <div className="instruction__item">
      <div className="instruction__item-header">
        <div className="instruction__item-id">
          <span>{id}</span>
        </div>
        <h3 className="instruction__item-title h4">{title}</h3>
      </div>
      <div className="instruction__item-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InstructionItem;
