import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();
    const handleButtonClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/backend/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (err) {
            console.log("was not able to connect to google", err);
        }
    };

    return (
        <button
            type="button"
            className="bg-red-500 py-3 rounded-md text-white  uppercase bg-slate-700 hover:bg-red-400 hover:cursor-pointer disabled:bg-slate-400"
            onClick={handleButtonClick}
        >
            Proceed with Google
        </button>
    );
};

export default OAuth;
