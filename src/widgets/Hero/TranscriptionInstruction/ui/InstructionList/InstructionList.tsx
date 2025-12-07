import { type FC } from 'react';
import type { InstructionListType } from '../../types.ts';
import InstructionItem from './InstructionItem/InstructionItem.tsx';
import '../TranscriptionInstruction.scss';

const InstructionList: FC<InstructionListType> = ({ instructions }) => {
  return (
    <>
      <div className="instruction__list">
        {instructions.map((item) => (
          <InstructionItem key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default InstructionList;
