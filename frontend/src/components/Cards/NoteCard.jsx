import React from 'react'
import moment from 'moment-timezone'
import {MdOutlinePushPin} from "react-icons/md";
import {MdCreate, MdDelete} from "react-icons/md"

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
  return (
    <div className='border-4 rounded-tl-[15px] rounded-br-[15px] h-[150px] p-4 hover:shadow-xl transition-all ease-in-out border-gray-400'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-md font-semibold'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format('Do MMM YYYY, h:mm:ss a')}</span>
            </div>

            <MdOutlinePushPin 
                className={`icon-btn ${isPinned ? 'text-primary':'text-slate-300'}`} 
                onClick={onPinNote} 
            />
        </div>

        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-500'>{tags.map( (tag) => `#${tag} `)}</div>

            <div className='flex items-center gap-2'>
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
  )
}

export default NoteCard