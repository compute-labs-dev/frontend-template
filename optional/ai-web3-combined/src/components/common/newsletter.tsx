'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { setNewsLetterOpen } from '@/store/reducers/app-reducer';
import { ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Checkbox } from '../ui/checkbox';

const Topics = ['Articles', 'Event Announcements'];
const Interests = ['Yes', 'No', 'Not Sure'];

const Newsletter = () => {
  const [topic, setTopic] = useState('');
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [topicInput, setTopicInput] = useState('');
  const [interest, setInterest] = useState('');
  const [interestOpen, setInterestOpen] = useState(false);

  const newsLetterOpen = useAppSelector((state) => state.app.newsLetterOpen);
  const dispatch = useAppDispatch();

  const onHide = () => {
    dispatch(setNewsLetterOpen(false));
  };

  if (!newsLetterOpen) return null;

  return (
    <>
      <div
        className='newsletter-backdrop fixed left-0 top-0 z-[99] h-screen w-screen bg-black/10 opacity-0 backdrop-blur-sm'
        onClick={onHide}
      />

      <div className='newsletter-content fixed left-1/2 top-1/2 z-[100] w-[calc(100vw-24px)] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-[6px] border-[#E8EDF5] bg-white px-5 py-5 opacity-0 shadow-xl md:px-8 md:py-8 lg:px-10 lg:py-10 xl:px-12 xl:py-12 2xl:px-16 2xl:py-14'>
        <h1 className='text-[22px] font-semibold text-[#272727] md:text-[24px] 2xl:text-[36px]'>
          Stay Updated!
        </h1>
        <p className='mt-2 text-[12px] text-[#838383] sm:text-[14px] md:mt-4 md:text-[16px] lg:text-[16px]'>
          Get the latest insights from Compute Labs delivered straight to your
          inbox.
        </p>

        <div className='mt-5 space-y-5 md:mt-10 [&_input]:w-full [&_input]:rounded-md [&_input]:border-2 [&_input]:border-[#c2c2c2] [&_input]:px-2 [&_input]:py-0.5'>
          <div className='grid gap-x-20 gap-y-5 sm:grid-cols-2'>
            <div>
              <p className='pb-0.5 text-[14px] md:text-[16px]'>
                E-mail<span className='text-error'>*</span>
              </p>
              <input type='text' />
            </div>
            <div>
              <p className='pb-0.5 text-[14px] md:text-[16px]'>Name</p>
              <input type='text' />
            </div>
          </div>
          <div className='grid gap-x-20 gap-y-5 sm:grid-cols-2'>
            <div>
              <p className='pb-0.5 text-[14px] md:text-[16px]'>
                Topics and Content Preference
                <span className='text-error'>*</span>
              </p>
              <div className='relative z-[99] w-full border-t border-gray-200 bg-background px-4 py-6 dark:border-gray-700 dark:bg-gray-800'>
                <div className='mx-auto max-w-7xl'>
                  <PopoverTrigger asChild>
                    <button
                      className={`relative h-8 w-full rounded-md border-2 border-[#c2c2c2] px-2 py-0.5 dark:border-gray-600 dark:bg-gray-700 ${topic === '' ? 'text-[#C2C2C2] dark:text-gray-400' : ''}`}
                      aria-label={
                        topic === ''
                          ? 'Select a topic'
                          : `Selected topic: ${topic}`
                      }
                      aria-expanded={topicsOpen}
                      onClick={() => setTopicsOpen(!topicsOpen)}
                    >
                      <span className='flex items-center justify-between'>
                        {topic === '' ? 'None selected' : topic}
                        <ChevronUp
                          className={`text-[#C2C2C2] transition-all ${topicsOpen ? 'rotate-0' : 'rotate-180'}`}
                          aria-hidden='true'
                        />
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className='PopoverContent rounded-none border-none p-0 dark:bg-gray-800'>
                    {Topics.map((_topic, i) => (
                      <button
                        key={i}
                        className={`flex w-full items-center gap-2.5 px-6 py-3 text-left ${
                          i % 2
                            ? 'bg-[#F6F6F6] dark:bg-gray-700'
                            : 'bg-white dark:bg-gray-800'
                        }`}
                        onClick={() => setTopic(_topic)}
                        role='menuitem'
                      >
                        <Checkbox checked={_topic === topic} />
                        <span
                          className={`transition-all ${_topic === topic ? 'text-primary' : 'text-[#54595E]'}`}
                        >
                          {_topic}
                        </span>
                      </button>
                    ))}
                    <div
                      className={`flex items-center gap-2.5 bg-white px-6 py-3`}
                      role='group'
                      aria-label='Other topic'
                    >
                      <Checkbox
                        checked={topicInput === topic}
                        aria-label='Select custom topic'
                      />
                      <span
                        className={`transition-all ${topic === topicInput ? 'text-primary' : 'text-[#54595E]'}`}
                      >
                        Other (please specify):
                      </span>
                      <input
                        type='text'
                        className='w-0 grow border-b border-[#54595E] bg-transparent text-sm'
                        value={topicInput}
                        onChange={(e) => {
                          setTopicInput(e.target.value);
                          setTopic(e.target.value);
                        }}
                        aria-label='Enter custom topic'
                      />
                    </div>
                  </PopoverContent>
                </div>
              </div>
            </div>
            <div>
              <p className='pb-0.5 text-[14px] md:text-[16px]'>
                Interested in Compute Labs Events?
                <span className='text-error'>*</span>
              </p>
              <Popover open={interestOpen} onOpenChange={setInterestOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={`relative h-8 w-full rounded-md border-2 border-[#c2c2c2] px-2 py-0.5 ${interest === '' ? 'text-[#C2C2C2]' : ''}`}
                    aria-label={
                      interest === ''
                        ? 'Select your interest'
                        : `Selected interest: ${interest}`
                    }
                    aria-expanded={interestOpen}
                  >
                    <span className='flex items-center justify-between'>
                      {interest === '' ? 'None selected' : interest}
                      <ChevronUp
                        className={`text-[#C2C2C2] transition-all ${interestOpen ? 'rotate-0' : 'rotate-180'}`}
                        aria-hidden='true'
                      />
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='PopoverContent rounded-none border-none p-0'>
                  {Interests.map((_interest, i) => (
                    <button
                      key={i}
                      className={`flex w-full items-center gap-2.5 px-6 py-3 text-left ${i % 2 ? 'bg-[#F6F6F6]' : 'bg-white'}`}
                      onClick={() => setInterest(_interest)}
                      role='menuitem'
                    >
                      <Checkbox
                        checked={_interest === interest}
                        aria-label={`Select ${_interest}`}
                      />
                      <span
                        className={`transition-all ${_interest === interest ? 'text-primary' : 'text-[#54595E]'}`}
                      >
                        {_interest}
                      </span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-2 md:flex md:gap-8'>
          <button className='rounded-full bg-primary py-2 font-bold text-white md:px-10 md:py-2.5'>
            Subscribe Now!
          </button>
          <button
            className='py-2 text-neutral-700 hover:text-neutral-900 md:px-8 md:py-2.5'
            onClick={onHide}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
