export default function FlavorText ({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <div className='space-m space-negative-top-m'>
      <span className='text-flavor'>{text}</span>
    </div>
  );
};