import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice";
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice";
import { signOut } from "../redux/user/userSlice";
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
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log(imageUploadPercent);

  console.log(currentUser)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        methond: 'DELETE',
      });
    
      const data = await res.json();
      if(data.sucess === false) {
        dispatch(deleteUserFailure());
        return;
      } 
      dispatch(deleteUserSuccess());
    }
    catch(err) {
      deleteUserFailure(err);
    }
  }
  const handleSignOut = async (e) =>  {
    try {
      await fetch('/backend/auth/sign_out');
      dispatch(signOut()); 
    } catch(err) {
      console.log(err);
    }
  }
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true);
    } catch (err) {
      console.log(err);
    }

  };
  return (
    <main className="mt-10 py-8  max-w-2xl flex flex-col mx-auto place-items-center">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <form
        onSubmit={handleSubmit}
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
            value={formData.username || currentUser.username}
            id="username"
            className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200  "
            onChange={handleChange}
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
            value={formData.email || currentUser.email}
            id="email"
            className="p-4 min-w-md h-auto bg-slate-300 rounded-2xl hover:bg-slate-200  "
            onChange={handleChange}

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
            onChange={handleChange}

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
          value={loading ? "loading..." : "update"}
          className="p-4 w-2/3  min-w-md h-auto text-white uppercase tracking-wider bg-red-500 rounded-2xl hover:bg-red-400 hover:cursor-pointer"
        />
      </form>
      <div className="w-2/3 flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign Out</span>
      </div>
      {error && <p className="text-red-500  w-2/3 mt-5"> Something went wrong </p>}
      {updateSuccess && <p className="text-green-500  w-2/3 mt-5"> Updated successfully </p>}
    </main>
  );
}

export default Profile;
