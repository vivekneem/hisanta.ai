'use client';

import React from 'react';
import CharacterPicker from '../components/CharacterPicker';
import Badges from '../components/Badges';
import { CheckTooBusy } from '../components/CheckTooBusy';
import CallSantaButton from '../components/Button-CallSanta';

export default function Home() {
  return (
    <CheckTooBusy>
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col lg:flex-row pt-4 md:pt-10">
          <div className="mt-0 lg:w-2/3 mb-2 md:mb-5 lg:mr-10 lg:mt-16">
            {/* <div className="hidden md:block">
              <Badges />
            </div>
            <div className="block md:hidden text-[24px] leading-none md:mt-4 text-center lg:text-[40px] md:mx-20 lg:mx-0 px-1 md:pl-0 lg:text-left sm:mx-0">
              Talk to <span className="text-Holiday-Red">Hop Receptionist</span> like never before
            </div>
            <div className="hidden md:block text-[32px] leading-none md:mt-4 text-center lg:text-[40px] md:mx-20 lg:mx-0 px-1 md:pl-0 lg:text-left sm:mx-0">
              Talk to <span className="text-Holiday-Red">Hop Receptionist</span> like never before
            </div>
            <div className="hidden md:block text-black text-sm text-center font-['Inter-Regular'] px-4 md:pl-0 py-1 md:mx-20 lg:mx-0 lg:text-lg lg:text-left">
              Ready for a holiday trip? Connect with Hop Receptionist and book your stays directly at our hotels!
            </div>
            <CallSantaButton /> */}
            <section className="w-full py-6 md:py-12 bg-opacity-70 bg-white dark:bg-gray-900">
              <div className="container px-4 md:px-6 pl-4">
                <div className="flex flex-col items-start space-y-4 text-left">
                  <div className="space-y-2">
                    <h1 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl/none">
                      Talk to Hop Receptionist like never before.
                    </h1>
                    <p className="mx-auto max-w-[600px] text-slate-950 md:text-xl dark:text-white">
                      Ready for a holiday trip? Connect with Hop Receptionist and book your stays directly at our
                      hotels!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:w-1/3 flex justify-center">
            <CharacterPicker />
          </div>
        </div>
      </div>
    </CheckTooBusy>
  );
}
