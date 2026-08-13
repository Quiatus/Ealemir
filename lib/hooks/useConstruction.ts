import { useState, useTransition } from 'react';
import { text } from '@/lib/utilities';

export function useConstruction(actionFunction: () => Promise<{ success: boolean; message?: string }>) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  function handleBuild(isDisabled: boolean) {
    if (isPending || isDisabled) return;

    startTransition(async () => {
      const result = await actionFunction();
      if (result && !result.success) {
        setIsErrorModalOpen(true);
        setErrorMessage(result.message || text("errors.construction_failed_message"));
      }
    });
  }

  function closeError() {
    setIsErrorModalOpen(false);
    setErrorMessage(null);
  }

  return {
    isPending,
    handleBuild,
    errorModalProps: {
      isOpen: isErrorModalOpen,
      message: errorMessage,
      onConfirm: closeError,
      title: text("errors.construction_failed_title")
    }
  };
}