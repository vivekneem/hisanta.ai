'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import config from '@/lib/config';
import { CharacterType } from '@/lib/types';
import PickerButtons from '../ButtonGroup-Picker';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import EpicButton from '../Buttons';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useSession } from 'next-auth/react';
import { datadogRum } from '@datadog/browser-rum';
import { NaughtyNiceSwitch } from '../NaughtyNiceSwitch';

export default function CharacterPicker() {
  const searchParams = useSearchParams();
  const [buildOwn, setBuildOwn] = useState(false);
  const { customCharactersEnabled } = useFlags();
  const { data: session } = useSession();

  let characters = config.availableCharacters;
  // const showBad = searchParams.get('nice') == '0' || false;

  // datadogRum.addAction('character-picker-viewed', {
  //   bad: showBad,
  //   user: session?.user?.email,
  // });

  // if (showBad) {
  //   characters = characters.filter((c) => c?.bad === true);
  // } else {
  //   characters = characters.filter((c) => c?.bad !== true);
  // }
  const santa = characters.find((c) => c.characterId === 'santa');
  const hopReceptionist = characters.find((c) => c.characterId === 'hop');

  const handleCreateClick = () => {
    setBuildOwn(true);
    // setSelectedCharacter({});
  };

  // handle state changes on the picker
  const [mainCharacter, setMainCharacter] = useState(hopReceptionist); // Handle main character
  const [selectedCharacter, setSelectedCharacter] = useState(hopReceptionist); // Handle border color change on click
  const changeCharacter = (newCharacter: CharacterType) => {
    setMainCharacter(newCharacter);
    setSelectedCharacter(newCharacter);
    setBuildOwn(false);
  };

  // set selectedCharacter once santa is loaded
  useEffect(() => {
    if (santa) {
      setMainCharacter(santa);
      setSelectedCharacter(santa);
    }
  }, [santa]);

  return (
    <div>
      {/* Card */}

      <div className="flex flex-col bg-White-75 align-middle rounded-jumbo py-2.5 px-3 h-[492px] w-[340px] text-center text-black text-sm border border-black items-center overflow-x-hidden relative shadow-lg">
        <div className="text-black text-xl">{buildOwn ? 'Build your own holiday character!' : mainCharacter?.name}</div>
        {/* Selected Character */}
        <div className="flex justify-center mt-8">
          <Image
            src={`/images/${mainCharacter?.image}`}
            alt={mainCharacter?.name || 'Unknown'}
            width={125}
            height={125}
            className="drop-shadow-avatar"
          />
          {/* {buildOwn ? (
            <Image
              src={`/images/questionmark.png`}
              alt="Question mark"
              width={125}
              height={125}
              className="drop-shadow-avatar rounded-full"
            />
          ) : (
            <Image
              src={`/images/${mainCharacter?.image}`}
              alt={mainCharacter?.name || 'Unknown'}
              width={125}
              height={125}
              className="drop-shadow-avatar"
            />
          )} */}
        </div>
        <div className="absolute bottom-[95px]">
          <div className="flex space-x-5 mt-12 justify-center">
            {characters.slice(0, customCharactersEnabled).map((character, index) => (
              <div key={index} onClick={() => changeCharacter(character)} className="w-[64px]">
                <Image
                  src={`/images/${character.image}`}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className={`object-cover w-16 h-16 p-2 shadow-lg cursor-pointer items-center justify-center rounded-full ${
                    character === selectedCharacter ? 'ring-Holiday-Green ring-4' : 'ring-2 ring-inset-2 ring-white'
                  } `}
                />
              </div>
            ))}
          </div>
          {customCharactersEnabled && (
            <>
              <div className="flex space-x-5 mt-4 justify-center">
                {characters.slice(3, 4).map((character, index) => (
                  <div key={index} onClick={() => changeCharacter(character)} className="w-[64px]">
                    <Image
                      src={`/images/${character.image}`}
                      alt={`Thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className={`object-cover w-16 h-16 p-2 shadow-lg cursor-pointer items-center justify-center rounded-full ${
                        character === selectedCharacter ? 'ring-Holiday-Green ring-4' : 'ring-2 ring-inset-2 ring-white'
                      } `}
                    />
                  </div>
                ))}
                <div onClick={() => handleCreateClick()} className="w-[64px]">
                  <Image
                    src={`/images/questionmark.png`}
                    alt={`New character`}
                    width={64}
                    height={64}
                    className={`object-cover w-16 h-16 p-2 shadow-lg cursor-pointer items-center justify-center rounded-full ${
                      !selectedCharacter ? 'ring-Holiday-Green ring-4' : 'ring-2 ring-inset-2 ring-white'
                    } `}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <PickerButtons currentCharacter={selectedCharacter} className="absolute bottom-4" />
        {/* {selectedCharacter ? (
          <PickerButtons currentCharacter={selectedCharacter} className="absolute bottom-4" />
        ) : (
          <div className="absolute bottom-4">
            <Link href={`/build`}>
              <EpicButton type="primary" className="w-[310px]">
                Build your own!
              </EpicButton>
            </Link>
          </div>
        )} */}
      </div>
      {/* <div className="w-fit mx-auto mt-2">
        <NaughtyNiceSwitch />
      </div> */}
    </div>
  );
}
