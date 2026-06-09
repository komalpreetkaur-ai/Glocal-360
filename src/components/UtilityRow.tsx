import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ListFilter, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';

function DateFilter({ selected, onChange }: { selected: string, onChange: (selected: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = ['All Time', 'Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Date'];
  const [showCustom, setShowCustom] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (selected.startsWith('Custom:')) {
        setShowCustom(true);
        const rangeStr = selected.replace('Custom: ', '');
        const [startStr, endStr] = rangeStr.split(' to ');
        if (startStr && endStr) {
          setRange({
            from: new Date(startStr),
            to: new Date(endStr)
          });
        }
      } else {
        setShowCustom(false);
        setRange(undefined);
      }
    }
  }, [isOpen, selected]);

  const handleApplyCustom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (range?.from && range?.to) {
      onChange(`Custom: ${format(range.from, 'yyyy-MM-dd')} to ${format(range.to, 'yyyy-MM-dd')}`);
      setIsOpen(false);
    }
  };

  const isSelected = (option: string) => {
    if (option === 'Custom Date' && selected.startsWith('Custom:')) return true;
    return selected === option;
  };

  const labelText = selected.startsWith('Custom:') ? selected.replace('Custom: ', '') : selected;

  const renderOptionList = () => (
    <div className="flex flex-col gap-0.5 shrink-0">
      {options.map(option => {
        const active = isSelected(option);
        return (
          <button 
            key={option} 
            type="button"
            className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-[13px] font-medium transition-all text-left focus:outline-none ${
              active 
                ? 'bg-[#E8F0FE] text-[#1D6FB8] border-l-4 border-[#1D6FB8] pl-3' 
                : 'text-[#44474E] hover:bg-[#F1F3F5] border-l-4 border-transparent'
            }`}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (option === 'Custom Date') {
                setShowCustom(true);
              } else {
                onChange(option); 
                setIsOpen(false); 
                setShowCustom(false);
              }
            }}
          >
            <span>{option}</span>
            {active && <Check className="w-3.5 h-3.5 text-[#1D6FB8]" strokeWidth={2.5} />}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative z-20" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[12px] font-semibold text-[#44474E] cursor-pointer hover:text-[#1D6FB8] transition-colors bg-white border border-[#E1E3E1] rounded-full px-4 py-2 hover:border-[#1D6FB8] shadow-sm focus:outline-none"
      >
        <Calendar className="w-3.5 h-3.5 text-[#1D6FB8]" />
        <span>{labelText}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#74777F] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1D6FB8]' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 bg-white border border-[#E1E3E1] shadow-xl shadow-slate-900/15 rounded-[16px] z-50 overflow-hidden date-range-popover"
          >
            {!showCustom ? (
              <div className="w-56 py-2">
                <div className="px-4 pb-2 text-[10px] font-bold text-[#74777F] uppercase tracking-wider">
                  Select Period
                </div>
                {renderOptionList()}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E1E3E1]">
                {/* Left Side: Preset List */}
                <div className="w-full md:w-52 bg-[#F8F9FA] py-4">
                  <div className="px-4 pb-2 text-[10px] font-bold text-[#74777F] uppercase tracking-wider">
                    Preset Periods
                  </div>
                  {renderOptionList()}
                </div>

                {/* Right Side: Dual Month Calendar View */}
                <div className="p-5 flex flex-col bg-white" onClick={(e) => e.stopPropagation()}>
                  {/* Select Range Subheader */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F1F3F5]">
                    <div>
                      <h4 className="text-[14px] font-bold text-[#1C1B1F]">Select date range</h4>
                      <p className="text-[11px] text-[#74777F]">Pick a custom start and end date</p>
                    </div>
                    {range?.from && (
                      <div className="bg-[#E8F0FE] border border-[#D0E2FF] rounded-[8px] px-3 py-1.5 flex items-center gap-2 text-[12px] font-medium text-[#1A73E8]">
                        <span>{format(range.from, 'MMM dd, yyyy')}</span>
                        <span className="text-[#A6C8FF] font-light">→</span>
                        <span>{range.to ? format(range.to, 'MMM dd, yyyy') : 'Choose End'}</span>
                      </div>
                    )}
                  </div>

                  <div className="custom-calendar-wrapper">
                    <style>{`
                      .custom-calendar-wrapper .rdp {
                        margin: 0;
                        font-family: inherit;
                      }
                      .custom-calendar-wrapper .rdp-months {
                        display: flex;
                        gap: 28px;
                        justify-content: center;
                      }
                      .custom-calendar-wrapper .rdp-month {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                      }
                      .custom-calendar-wrapper .rdp-month_caption {
                        font-size: 13.5px;
                        font-weight: 700;
                        color: #1C1B1F;
                        text-align: center;
                        text-transform: capitalize;
                        position: relative;
                        margin-bottom: 2px;
                      }
                      .custom-calendar-wrapper .rdp-weekday {
                        font-size: 11px;
                        font-weight: 600;
                        color: #74777F;
                        width: 38px;
                        height: 38px;
                        text-align: center;
                        text-transform: uppercase;
                      }
                      .custom-calendar-wrapper .rdp-day {
                        width: 38px;
                        height: 38px;
                        padding: 0;
                      }
                      .custom-calendar-wrapper .rdp-day_button {
                        font-size: 12.5px;
                        font-weight: 500;
                        color: #1C1B1F;
                        width: 38px;
                        height: 38px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        transition: all 120ms ease;
                        position: relative;
                        border-radius: 6px;
                      }
                      /* Interactive Range Connector style mapping */
                      .custom-calendar-wrapper .rdp-range_middle,
                      .custom-calendar-wrapper [class*="range_middle"] {
                        background-color: #E8F0FE !important;
                        color: #1A73E8 !important;
                        border-radius: 0px !important;
                      }
                      .custom-calendar-wrapper .rdp-range_start,
                      .custom-calendar-wrapper [class*="range_start"] {
                        background-color: #1D6FB8 !important;
                        color: white !important;
                        border-radius: 0px !important;
                        border-top-left-radius: 9999px !important;
                        border-bottom-left-radius: 9999px !important;
                        font-weight: 700 !important;
                        z-index: 10;
                      }
                      .custom-calendar-wrapper .rdp-range_end,
                      .custom-calendar-wrapper [class*="range_end"] {
                        background-color: #1D6FB8 !important;
                        color: white !important;
                        border-radius: 0px !important;
                        border-top-right-radius: 9999px !important;
                        border-bottom-right-radius: 9999px !important;
                        font-weight: 700 !important;
                        z-index: 10;
                      }
                      /* Fallback for single selected element */
                      .custom-calendar-wrapper .rdp-selectedDay,
                      .custom-calendar-wrapper .rdp-selected,
                      .custom-calendar-wrapper [class*="selected"] {
                        background-color: #1D6FB8;
                        color: white;
                        font-weight: 700;
                      }
                      /* Hover effects */
                      .custom-calendar-wrapper .rdp-day_button:hover:not(.rdp-range_start):not(.rdp-range_end):not(.rdp-range_middle) {
                        background-color: #F1F3F5;
                        color: #111;
                        border-radius: 9999px;
                      }
                      /* Nav controls customization */
                      .custom-calendar-wrapper .rdp-nav {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                        display: flex;
                        gap: 8px;
                      }
                      .custom-calendar-wrapper .rdp-button_next,
                      .custom-calendar-wrapper .rdp-button_previous {
                        position: static !important;
                        width: 30px !important;
                        height: 30px !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        background: white !important;
                        border: 1px solid #E1E3E1 !important;
                        border-radius: 8px !important;
                        color: #44474E !important;
                        cursor: pointer !important;
                        transition: all 120ms ease !important;
                      }
                      .custom-calendar-wrapper .rdp-button_next:hover,
                      .custom-calendar-wrapper .rdp-button_previous:hover {
                        background: #F1F3F5 !important;
                        color: #111 !important;
                        border-color: #C4C7C5 !important;
                      }
                    `}</style>
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={2}
                      pagedNavigation
                      className="text-[13px]"
                    />
                  </div>
                  <div className="flex justify-end w-full gap-3 mt-4 pt-4 border-t border-[#E1E3E1]">
                    <button 
                      onClick={() => { setShowCustom(false); setRange(undefined); }}
                      className="px-4 py-2 rounded-[8px] text-[13px] font-semibold text-[#44474E] hover:bg-[#F1F3F5] transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleApplyCustom}
                      disabled={!range?.from || !range?.to}
                      className="bg-[#1D6FB8] disabled:bg-[#1D6FB8]/40 disabled:cursor-not-allowed text-white px-5 py-2 rounded-[8px] text-[13px] font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      Apply Range
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickFilter({ label, options, selected = [], onChange = () => {} }: { label: string, options: string[], selected?: string[], onChange?: (selected: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const next = selected.includes(option) ? selected.filter(o => o !== option) : [...selected, option];
    onChange(next);
  };

  return (
    <div className="relative z-20" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#1D6FB8] ${
          selected.length > 0 
            ? 'border-[#1D6FB8] bg-[#DDE1FF] text-[#001466]' 
            : 'border-[#E1E3E1] bg-[#F9FAFB] text-[#44474E] hover:bg-[#F1F3F5]'
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#1D6FB8] text-white text-[10px]">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-[#E1E3E1] shadow-lg shadow-slate-900/5 rounded-[12px] py-1.5 z-50 overflow-hidden"
          >
            {options.map(option => (
              <label 
                key={option} 
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#F1F3F5] cursor-pointer text-[13px] text-[#1C1B1F] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                <div className={`flex items-center justify-center w-4 h-4 rounded-[4px] border transition-colors ${selected.includes(option) ? 'bg-[#1D6FB8] border-[#1D6FB8]' : 'border-[#C4C7C5] bg-white group-hover:border-[#1D6FB8]'}`}>
                  {selected.includes(option) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                {option}
              </label>
            ))}
            {selected.length > 0 && (
              <div className="border-t border-[#E1E3E1] mt-1.5 pt-1.5 px-3 pb-1">
                <button 
                  onClick={() => onChange([])}
                  className="text-[12px] font-medium text-[#1D6FB8] hover:text-blue-800 transition-colors w-full text-left"
                >
                  Clear selection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface Filters {
  postedBy: string[];
  platform: string[];
  postType: string[];
  dateRange: string;
}

export function UtilityRow({ 
  filters, 
  onFilterChange 
}: { 
  filters?: Filters, 
  onFilterChange?: (filters: Filters) => void 
}) {
  const currentFilters = filters || { postedBy: [], platform: [], postType: [], dateRange: 'Last 30 Days' };

  const handleChange = (key: keyof Filters, value: any) => {
    if (onFilterChange) {
      onFilterChange({ ...currentFilters, [key]: value });
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-8 py-2 border-b border-[#E1E3E1] shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold text-[#74777F] uppercase tracking-wider mr-2">Filters</span>
        <QuickFilter 
          label="Posted By" 
          options={['AGL', 'Brands', 'Dealer']} 
          selected={currentFilters.postedBy}
          onChange={(val) => handleChange('postedBy', val)}
        />
        <QuickFilter 
          label="Platform" 
          options={['Facebook', 'Instagram']} 
          selected={currentFilters.platform}
          onChange={(val) => handleChange('platform', val)}
        />
        <QuickFilter 
          label="Post Type" 
          options={['Image', 'Video', 'Carousel', 'Reel', 'Story', 'Cover Image']} 
          selected={currentFilters.postType}
          onChange={(val) => handleChange('postType', val)}
        />
      </div>

      <div className="flex items-center gap-6">
        <DateFilter 
          selected={currentFilters.dateRange} 
          onChange={(val) => handleChange('dateRange', val)} 
        />
      </div>
    </div>
  );
}
