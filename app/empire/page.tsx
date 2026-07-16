'use client'

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { resetGame } from "@/lib/actions/systemActions";
import { text } from "@/lib/utilities";
import { useState } from "react";

export default function EmpirePage() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  async function handleResetConfirm() {
    await resetGame();
    setIsResetModalOpen(false);
  };

  return (
    <div>
      <Card>
        <h1 className="text-forged">Ealemir</h1>
        <p>Main text</p>
        <p>Main text with <span className="text-orange">higlight</span> then some <span className="text-secondary">secondary text</span>.</p>
        <p className="text-flavor">Some flavor text</p>
        <p className="text-gray">Gray text</p>
        <p className="text-yellow">Yellow text</p>
        <p className="text-green">Green text</p>
        <p className="text-red">Red text</p>
        <p className="text-blue">Blue text</p>
        <p className="text-purple">Purple text</p>
        <p className="text-gold">Gold text</p>
        <p className="text-brown">Brown text</p>
        <p className="text-darkgreen">Dark green text</p>

        <Button onClick={() => setIsResetModalOpen(true)}>Reset</Button>
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
    </div>
  )
}