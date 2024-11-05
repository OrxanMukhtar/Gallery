// src/components/Gallery.js

import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Modal from "../components/modal";
import "../assets/css/gallery.css";

const Gallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [db, setDb] = useState(null);
  const fileInputRef = useRef(null);
  // const dropdownRef = useRef(null); // Reference for the dropdown menu
  const [dropdownRefs, setDropdownRefs] = useState([]);

  // Initialize IndexedDB on component mount
  useEffect(() => {
    const openDB = indexedDB.open("GalleryDB", 1);

    openDB.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore("media", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("fileType", "fileType", { unique: false });
    };

    openDB.onsuccess = (event) => {
      const dbInstance = event.target.result;
      setDb(dbInstance);
      loadGalleryFromDB(dbInstance);
    };

    openDB.onerror = (event) =>
      console.error("Database error:", event.target.errorCode);
  }, []);

  // Fetch and display media items from IndexedDB
  const loadGalleryFromDB = (dbInstance) => {
    const transaction = dbInstance.transaction(["media"], "readonly");
    const objectStore = transaction.objectStore("media");
    const items = [];

    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const fileData = cursor.value;
        items.push({
          id: fileData.id,
          fileType: fileData.fileType,
          fileBlob: URL.createObjectURL(fileData.fileBlob),
        });
        cursor.continue();
      } else {
        setMediaItems(items);
      }
    };
  };

  // Save file to IndexedDB
  const saveFileToDB = (file) => {
    const fileURL = URL.createObjectURL(file);
    const transaction = db.transaction(["media"], "readwrite");
    const objectStore = transaction.objectStore("media");
    const fileData = { fileType: file.type, fileBlob: file };

    const request = objectStore.add(fileData);
    request.onsuccess = () => {
      setMediaItems((prev) => [
        ...prev,
        { ...fileData, id: request.result, fileBlob: fileURL },
      ]);
    };
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(saveFileToDB);
  };

  // Download file
  const downloadFile = (fileURL, fileType) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `downloaded-file.${fileType.split("/")[1]}`;
    link.click();
  };

  // Delete file from IndexedDB
  const deleteFileFromDB = (id) => {
    const transaction = db.transaction(["media"], "readwrite");
    const objectStore = transaction.objectStore("media");
    objectStore.delete(id).onsuccess = () => {
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
    };
  };

  // Handle PIN change
  const handleChangePin = (e) => {
    e.preventDefault();
    const savedPin = localStorage.getItem("pin");
    if (oldPin === savedPin) {
      localStorage.setItem("pin", newPin);
      alert("PIN changed successfully!");
      setModalOpen(false);
    } else {
      alert("Incorrect old PIN!");
    }
    setOldPin("");
    setNewPin("");
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = (e, index) => {
    dropdownRefs[index].style.display =
      dropdownRefs[index].style.display === 'block' ? 'none' : 'block';
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      dropdownRefs.forEach((ref) => {
        if (ref && !ref.contains(event.target)) {
          ref.style.display = 'none';
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRefs]);
  
  return (
    <div className="gallery-page">
      <Header />

      <Footer
        onFileUploadClick={() => fileInputRef.current.click()}
        onSettingsClick={() => setModalOpen(!isModalOpen)}
      />

<Modal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        oldPin={oldPin}
        newPin={newPin}
        setOldPin={setOldPin}
        setNewPin={setNewPin}
        onSubmit={handleChangePin}
      />


      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <div className="gallery">
        {mediaItems.map((item, index) => (
          <div key={item.id} className="gallery-item">
            {item.fileType.startsWith("image/") ? (
              <img src={item.fileBlob} alt="Uploaded" />
            ) : (
              <video controls src={item.fileBlob} />
            )}
            <span
              className="three-dots-menu"
              onClick={(e) => toggleDropdown(e, index)}
            >
              ⋮
            </span>
            <div
              className="dropdown-menu"
              ref={(el) => (dropdownRefs[index] = el)}
            >
              <button
                onClick={() => downloadFile(item.fileBlob, item.fileType)}
              >
                Download
              </button>
              <button onClick={() => deleteFileFromDB(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Gallery;
