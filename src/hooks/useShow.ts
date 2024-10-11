import React, { useState } from "react";

export const useShow = () => {
  const [showCard, setShowCard] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    setShowCard(false);
  };
  return {
    showCard,
    handleMouseEnter,
    handleMouseLeave,
  };
};
