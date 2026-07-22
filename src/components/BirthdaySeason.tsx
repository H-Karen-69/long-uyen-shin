import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { getDaysUntilBirthday, isBirthdayToday } from '../lib/dateUtils';
import { Gift, CalendarDays, List, ChevronRight, ChevronLeft } from 'lucide-react';
import CuteDragon from './CuteDragon';
import { format, addMonths, subMonths } from 'date-fns';
import { vi } from 'date-fns/locale';

interface BirthdaySeasonProps {
  characters: Character[];
  onOpenBirthdayModal: (char: Character) => void;
}

export default function BirthdaySeason({ characters, onOpenBirthdayModal }: BirthdaySeasonProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Find today's birthdays
  const todaysBirthdays = characters.filter(c => c.birthday && isBirthdayToday(c.birthday));
  const mainBirthdayChar = todaysBirthdays.length > 0 ? todaysBirthdays[0] : null;

  // Find upcoming birthdays
  const upcomingBirthdays = characters
    .filter(c => c.birthday && !isBirthdayToday(c.birthday))
    .map(c => ({
      char: c,
      daysUntil: getDaysUntilBirthday(c.birthday!)
    }))
    .filter(item => item.daysUntil >= 0)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5); // top 5

  const nextBirthdayChar = upcomingBirthdays.length > 0 ? upcomingBirthdays[0] : null;

  // Calendar data prep
  const currentMonth = calendarDate.getMonth();
  const currentYear = calendarDate.getFullYear();
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; 

  const monthName = format(calendarDate, 'MMMM yyyy', { locale: vi });
  
  const getCharactersForDay = (day: number) => {
    const dayStr = `${day.toString().padStart(2, '0')}/${(currentMonth + 1).toString().padStart(2, '0')}`;
    return characters.filter(c => c.birthday === dayStr);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[60vh] flex flex-col space-y-8 pb-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full relative bg-[#F8F6F5] shadow-md border border-[#D8DEE8] rounded-[32px] overflow-hidden"
      >
        {mainBirthdayChar ? (
          <div className="relative min-h-[400px] flex items-center">
            <div className="absolute inset-0 z-0">
              <img 
                src={mainBirthdayChar.birthdayImage || mainBirthdayChar.avatar} 
                alt={mainBirthdayChar.name} 
                className="w-full h-full object-cover object-top opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>
            
            <div className="relative z-10 p-8 md:p-12 w-full max-w-2xl text-white">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-[#7A8AA5]/30 backdrop-blur-md px-4 py-2 rounded-full font-bold mb-4 border border-[#7A8AA5]/50 text-[#D8DEE8]"
              >
                <Gift className="w-5 h-5 text-[#E88BA0]" />
                <span>Long Đản Hôm Nay</span>
              </motion.div>
              
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl md:text-6xl font-bold mb-2 leading-tight text-white"
              >
                Hôm nay là Long Đản của <br className="hidden md:block"/>
                <span className="text-[#F5C8D0]">{mainBirthdayChar.name}</span>! 🎂
              </motion.h1>
              
              {mainBirthdayChar.age && (
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-lg text-white/90 font-comfortaa mb-8"
                >
                  Chúc mừng lần thứ {mainBirthdayChar.age}!
                </motion.p>
              )}
              
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => onOpenBirthdayModal(mainBirthdayChar)}
                className="bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] text-[#F8F6F5] px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(122,138,165,0.4)] hover:shadow-[0_0_30px_rgba(122,138,165,0.6)] hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Đến tiệc chúc mừng ngay</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute -left-20 -top-20 opacity-20"><CuteDragon size={200} /></div>
            <div className="absolute -right-10 -bottom-10 opacity-20"><CuteDragon size={150} /></div>
            
            <div className="relative z-10 max-w-lg mx-auto">
              <Gift className="w-16 h-16 text-[#7A8AA5] mx-auto mb-4 drop-shadow-md" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3A4258] mb-2">Đếm ngược đến Long Đản gần nhất</h2>
              
              {nextBirthdayChar ? (
                <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-[#D8DEE8] shadow-sm inline-block w-full">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <div className="absolute inset-0 bg-[#7A8AA5] rounded-full animate-pulse opacity-50 blur-md" />
                      <img src={nextBirthdayChar.char.avatar} alt={nextBirthdayChar.char.name} className="w-full h-full object-cover object-top rounded-full border-4 border-white relative z-10 shadow-sm" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="font-bold text-xl text-[#3A4258]">{nextBirthdayChar.char.name}</h3>
                      <p className="text-[#6B7590] font-comfortaa">Sinh nhật: {nextBirthdayChar.char.birthday}</p>
                      <div className="mt-2 inline-block bg-gradient-to-r from-[#7A8AA5] to-[#E88BA0] px-4 py-1.5 rounded-full font-bold text-[#F8F6F5] text-sm">
                        Còn {nextBirthdayChar.daysUntil} ngày nữa!
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[#6B7590] font-comfortaa mt-4">Hiện chưa có thông tin sinh nhật nào sắp tới.</p>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Toggle View */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#F8F6F5] backdrop-blur-sm p-1 rounded-full border border-[#D8DEE8] flex shadow-sm inline-flex">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 transition-all ${viewMode === 'list' ? 'bg-[#7A8AA5] text-[#F8F6F5] shadow-sm' : 'text-[#6B7590] hover:text-[#3A4258]'}`}
            >
              <List className="w-4 h-4" />
              <span>Sắp Tới</span>
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm flex items-center space-x-2 transition-all ${viewMode === 'calendar' ? 'bg-[#7A8AA5] text-[#F8F6F5] shadow-sm' : 'text-[#6B7590] hover:text-[#3A4258]'}`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Lịch Long Đản</span>
            </button>
          </div>
        </div>

        {/* Content based on view */}
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-[#F8F6F5] shadow-md border border-[#D8DEE8] p-6 md:p-8 rounded-[32px]"
            >
              <h3 className="font-serif text-2xl font-bold text-[#3A4258] mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-[#E88BA0]" /> Sắp Tới
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingBirthdays.map((item) => (
                  <div key={item.char.id} className="bg-white p-4 rounded-2xl flex items-center space-x-4 border border-[#D8DEE8] shadow-sm hover:shadow-md transition-shadow group">
                    <img src={item.char.avatar} className="w-16 h-16 rounded-xl object-cover object-top" alt={item.char.name} referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#3A4258] text-lg group-hover:text-[#7A8AA5] transition-colors">{item.char.name}</h4>
                      <p className="text-sm text-[#6B7590] font-comfortaa">Ngày {item.char.birthday}</p>
                    </div>
                    <div className="bg-[#F8F6F5] px-3 py-2 rounded-xl text-center border border-[#D8DEE8]">
                      <span className="block text-xl font-bold text-[#E88BA0] leading-none">{item.daysUntil}</span>
                      <span className="text-[10px] uppercase font-bold text-[#6B7590]">Ngày</span>
                    </div>
                  </div>
                ))}
                {upcomingBirthdays.length === 0 && (
                  <p className="text-[#6B7590] col-span-2 text-center py-8">Chưa có sinh nhật nào sắp tới!</p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="calendar"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-[#F8F6F5] shadow-md border border-[#D8DEE8] p-6 md:p-8 rounded-[32px]"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center space-x-4 bg-white/60 p-2 rounded-full border border-[#D8DEE8] shadow-sm">
                  <button 
                    onClick={() => setCalendarDate(prev => subMonths(prev, 1))}
                    className="p-1.5 hover:bg-[#D8DEE8] rounded-full transition-colors text-[#3A4258]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="font-serif text-lg font-bold text-[#3A4258] capitalize w-32 text-center select-none">{monthName}</h3>
                  <button 
                    onClick={() => setCalendarDate(prev => addMonths(prev, 1))}
                    className="p-1.5 hover:bg-[#D8DEE8] rounded-full transition-colors text-[#3A4258]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-xs font-bold text-[#6B7590]">
                  <span className="w-3 h-3 rounded-full bg-[#7A8AA5]"></span> = Sinh nhật
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center font-bold text-sm text-[#6B7590] mb-2">
                <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {[...Array(startingDay)].map((_, i) => (
                  <div key={`empty-${i}`} className="p-2 opacity-30"></div>
                ))}
                
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const chars = getCharactersForDay(day);
                  const today = new Date();
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const hasBirthday = chars.length > 0;
                  
                  return (
                    <div 
                      key={`day-${day}`} 
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border min-h-[60px] transition-all
                        ${isToday ? 'border-[#E88BA0] bg-white shadow-sm' : 'border-transparent hover:bg-white hover:shadow-sm'}
                        ${hasBirthday ? 'bg-[#7A8AA5]/10 border-[#7A8AA5]/30 cursor-pointer' : ''}
                      `}
                    >
                      <span className={`font-bold text-sm ${isToday ? 'text-[#E88BA0]' : 'text-[#3A4258]'}`}>
                        {day}
                      </span>
                      {hasBirthday && (
                        <div className="mt-1 flex -space-x-2">
                          {chars.map(c => (
                            <img 
                              key={c.id} 
                              src={c.avatar} 
                              alt={c.name}
                              title={c.name}
                              referrerPolicy="no-referrer"
                              className="w-6 h-6 rounded-full border border-white object-cover object-top shadow-sm"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
