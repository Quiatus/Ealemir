import { ReactNode } from "react";

export default function FlavorText ({ text }: { text?: string | ReactNode}) {
  if (!text) return null;

  return (
    <div className='space-m space-negative-top-m'>
      <span className='text-flavor'>{text}</span>
    </div>
  );
};