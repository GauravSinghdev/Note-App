import React from 'react';
import moment from 'moment-timezone';
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title, 
  date,
  content, 
  tags, 
  isPinned, 
  onEdit, 
  onDelete, 
  onPinNote,
}) => {

  const borderColors = [
    'border-red-400', 
    'border-green-400', 
    'border-blue-400', 
    'border-yellow-400', 
    'border-purple-400',
    'border-pink-400',
    'border-orange-400'
  ];

  const randomBorderColor = borderColors[Math.floor(Math.random() * borderColors.length)];

  return (
    <div className={`border-4 ${randomBorderColor} rounded h-[150px] p-4 hover:shadow-xl transition-all ease-in-out overflow-hidden relative`}>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <h6 className='text-[20px] font-semibold'>{title}</h6>
          <span className='text-[12px] text-slate-500'>{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <MdOutlinePushPin 
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} 
          onClick={onPinNote} 
        />
      </div>

      <p className='text-[16px] text-slate-600 mt-3'>{content?.slice(0, 40)}</p>

      <div className='flex justify-between mt-2 relative'>
        <div className='flex-1 text-[12px] text-slate-500 mt-3 overflow-hidden whitespace-nowrap overflow-ellipsis pr-6'>
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>
        <div className='flex-shrink-0 flex items-center gap-2 mt-4'>
          <MdCreate
            className='icon-btn hover:text-green-600'
            onClick={onEdit}
          />
          <MdDelete
            className='icon-btn hover:text-red-500'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
