import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);

  const [image, setImage] = useState(undefined);
  const [imageUploadPercent, SetImageUploadPercent] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(false);

  const [formData, setFormData] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [type, setType] = useState("password");

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log(imageUploadPercent);

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        SetImageUploadPercent(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, pfp: downloadURL });
        });
      }
    );
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    type === "password" ? setType("text") : setType("password");
    setShowPass((prev) => !prev);
  };

  const handleUpdate = (e) => {};
  return (
    <main className="mt-10 py-8  max-w-2xl flex flex-col mx-auto place-items-center">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <form
        action=""
        className="flex flex-col w-full h-full place-items-center"
      >
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          src={formData.pfp || currentUser.pfp}
          alt="user image"
          className="w-44 h-44 rounded-full cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {imageUploadError ? (
            <span className="text-red-700">
              Error uploading (image size should be less than 2mb)
            </span>
          ) : imageUploadPercent > 0 && imageUploadPercent < 100 ? (
            <span className="text-red-700">
              {imageUploadPercent}% uploaded!!
            </span>
          ) : imageUploadPercent == 100 ? (
            <span className="text-green-700">uploaded successfully!!</span>
          ) : (
            ""
          )}
        </p>
        <fieldset className="my-3 flex flex-col w-2/3 ">
          <label
            htmlFor="uname"
            className="px-2 uppercase text-sm tracking-wider"
          >
            username
          </label>
          <input
            type="text"
            value={currentUser.username}
            id="uname"
            className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200  "
          />
        </fieldset>
        <fieldset className="my-3 flex flex-col w-2/3 ">
          <label
            htmlFor="email"
            className="px-2 uppercase text-sm tracking-wider"
          >
            email
          </label>
          <input
            type="email"
            value={currentUser.email}
            id="email"
            className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200  "
          />
        </fieldset>
        <fieldset className="my-3 flex flex-col w-2/3 ">
          <label
            htmlFor="password"
            className="px-2 uppercase text-sm tracking-wider"
          >
            password
          </label>
          <input
            type={type}
            id="password"
            className="relative p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200  "
          />
          <span
            className="relative left-96 -top-10 w-fit  hover:cursor-pointer"
            onClick={handleToggle}
          >
            {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </span>
        </fieldset>
        <input
          type="submit"
          value="update"
          onClick={handleUpdate}
          className="p-4 w-2/3  min-w-md h-auto text-white uppercase tracking-wider bg-red-500 rounded-2xl hover:bg-red-400 hover:cursor-pointer"
        />
      </form>
      <div className="w-2/3 flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </main>
  );
}

export default Profile;
