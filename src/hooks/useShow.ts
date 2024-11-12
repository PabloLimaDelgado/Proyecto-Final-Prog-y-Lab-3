import React, { useState } from "react";

export const useShow = () => {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "Categorias"
  );

  const handleMouseEnter = () => {
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    setShowCard(false);
  };

  const handleClickButton = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return {
    showCard,
    handleMouseEnter,
    handleMouseLeave,
    selectedButton,
    handleClickButton,
  };
};
