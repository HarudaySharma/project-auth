import React, { useState, useRef, useEffect, useCallback } from "react";
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
import { InputBox, Button} from "../components";


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
  // console.log(currentUser)

  //image Upload to firebase
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

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  },[formData]);


  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
    
      const data = await res.json();
      if(data.success === false) {
        dispatch(deleteUserFailure());
        return;
      } 
      dispatch(deleteUserSuccess());
      // User deleted successfully
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
  // console.log("formData" + formData);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log(formData);
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
    <main className="shadow-2xl bg-box-color border-black p-8 my-32 mx-auto border-2 max-w-2xl font-mono">

      <h1 className="text-3xl text-center  font-semibold my-7 uppercase tracking-widest ">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 flex-wrap"
      >
        <section className="self-center">
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
          className="outline outline-offset-4 shadow-2xl w-48 h-48 rounded-full cursor-pointer hover:w-52 hover:h-52 hover:shadow-amber-800"
          onClick={() => fileRef.current.click()}
        />
        <p className="mt-4">
          {imageUploadError ? (
            <span className="text-red-700 ">
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
        </section>

        <InputBox labelText="username" type="text" name="username" id="username" value={formData.username || currentUser.username}
         required={true} handleInputChange={handleChange}/>

        <InputBox labelText="e-mail" type="email" name="email" id="email" value={formData.email || currentUser.email} required={true} handleInputChange={handleChange} />

        <InputBox labelText="password" type={type} name="password" id="password" required={false} handleInputChange={handleChange} className={`relative`} >
          <span
            className=" w-fit relative  left-full bottom-11 -mx-10 hover:cursor-pointer "
            onClick={handleToggle}
          >
            {showPass ? <IoIosEye size={25} /> : <IoIosEyeOff size={25} />}
          </span>
          </InputBox>
          <Button formBtn={true} type="submit" value={loading ? "Loading..." : "update"} disabled={loading}
          className={` my-5 bg-inherit p-4 bg-surround outline outline-2 uppercase tracking-widest hover:bg-surround-hover  hover:relative hover:left-4 hover:shadow-2xl disabled:bg-slate-400`}
        />
      </form>
      <div className="flex justify-between flex-wrap">
        <span className="text-red-700 cursor-pointer hover:text-blue-600" onClick={handleDeleteAccount}>Delete Account</span>
        <span className="text-red-700 cursor-pointer hover:text-blue-600" onClick={handleSignOut}>Sign Out</span>
      </div>
      {error && <p className="text-red-500  w-2/3 mt-5"> Something went wrong!!</p>}
      {updateSuccess && <p className="text-green-500  w-2/3 mt-5"> Updated successfully!</p>}
    </main>
  );
}

export default Profile;
