"use client";

import { Button } from "@/components/ui/button";
import useFinishOrder from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  return (
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
            <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>

  );
};

export default FinishOrderButton;
