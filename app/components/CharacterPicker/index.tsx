"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import config from "@/lib/config";
import { CharacterType } from "@/lib/types";
import PickerButtons from "../ButtonGroup-Picker";

const CharacterPicker = () => {
  const characters = config.availableCharacters;
  // default to Santa
  const santa = characters.find((c) => c.characterId === "santa");

  // handle state changes on the picker
  const [mainCharacter, setMainCharacter] = useState(santa); // Handle main character
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterType | null>(null); // Handle border color change on click
  const changeCharacter = (newCharacter: CharacterType) => {
    setMainCharacter(newCharacter);
    setSelectedCharacter(newCharacter);
  };

  // set selectedCharacter once santa is loaded
  useEffect(() => {
    if (santa) {
      setSelectedCharacter(santa);
    }
  }, [santa]);

  return (
    <div>
      {/* Card */}

      <div className="flex flex-col items-center bg-White-75 align-middle rounded-jumbo py-2.5 px-3 h-[492px] w-[340px] text-center text-black text-sm border border-black items-center overflow-x-hidden relative shadow-lg">
        <div className="text-Holiday-Red text-xl">{mainCharacter?.name}</div>
        {/* Selected Character */}
        <div className="flex justify-center mt-8">
          <Image
            src={`/images/${mainCharacter?.image}`}
            alt="Main"
            width={175}
            height={175}
            className="drop-shadow-avatar"
          />
        </div>

        <div className="flex space-x-5 mt-12 absolute bottom-[110px]">
          {characters.map((character, index) => (
            <div
              key={index}
              onClick={() => changeCharacter(character)}
              className="w-[64px]"
            >
              <Image
                src={`/images/${character.image}`}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className={`object-cover w-16 h-16 shadow-lg cursor-pointer items-center justify-center rounded-full ${
                  character === selectedCharacter
                    ? "ring-Holiday-Green ring-4"
                    : "ring-2 ring-inset-2 ring-white"
                } `}
              />
            </div>
          ))}
        </div>
        {selectedCharacter ? (
          <PickerButtons
            currentCharacter={selectedCharacter}
            className="absolute bottom-4"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CharacterPicker;
