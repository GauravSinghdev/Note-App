import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from "react-icons/md";
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';

const Home = () => {

  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenEditModal({ isShown: true, data: noteDetails, type: "edit" });
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  }

  const handleCloseToast = useCallback(() => {
    setShowToastMsg({
      isShown: false,
      message: '',
      type: '',
    });
  }, []);

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.")
    }
  }

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try{
        const response = await axiosInstance.delete("/delete-note/" + noteId);

        if(response.data && !response.data.error){
            showToastMessage("Note Deleted Successfully", 'delete');
            getAllNotes();
        }
      } catch(error){
      if(error.response && error.response.data && error.response.data.message){
        console.log("An unexpected error occured. Please try again.");
      }
    }
  }

  //Searching a Note
  const onSearchNote = async (query) => {
    try{
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch(error){
      console.log(error);
    }
  }

const updateIsPinned = async (noteData) => {
  const noteId = noteData._id;
  try {
    const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
      isPinned: !noteData.isPinned,
    });

    if (response.data && response.data.note) {
      showToastMessage("Note Updated Successfully");
      getAllNotes();
    }
  } catch (error) {
    console.log(error);
  }
}

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto">
        {allNotes.length > 0 ?
          <div className='grid grid-cols-3 gap-10 mt-20'>
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => updateIsPinned(item)}
            />
          ))}
        </div> : <EmptyCard/>
        }
      </div>

      <button
        className='w-16 h-16 flex items-center justify-center rounded-[50%] bg-primary hover:bg-blue-700 absolute right-10 bottom-10'
        onClick={() => {
          setOpenEditModal({ isShown: true, type: "add", data: null });
        }}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-[70px] p-5"
      >

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home;
