interface InstructionItemInterface {
  id: number;
  title: string;
  description: string;
}

interface InstructionListInterface {
  instructions: InstructionItemType[];
}

export type InstructionItemType = InstructionItemInterface;

export type InstructionListType = InstructionListInterface;
