'use client'

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { resetGame } from "@/lib/actions/systemActions";
import { text } from "@/lib/utilities";
import { useState } from "react";

export default function AbandonEmpireCard() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  async function handleResetConfirm() {
    await resetGame();
    setIsResetModalOpen(false);
  };
  return (
    <Card title={text('feature_empire.card_abandon_empire.title')} width="fit">
      
      <p className="space-l">{text('feature_empire.card_abandon_empire.message')}</p>
      
      <div>
        <Button onClick={() => setIsResetModalOpen(true)}>{text('feature_empire.card_abandon_empire.button_abandon')}</Button>
      </div>

      <ConfirmModal
        isOpen={isResetModalOpen}
        title={text('general.reset_window.title')}
        message={text('general.reset_window.message')}
        confirmText={text('general.reset_window.button_confirm')}
        cancelText={text('general.reset_window.button_cancel')}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
        />
    </Card>

  )
}