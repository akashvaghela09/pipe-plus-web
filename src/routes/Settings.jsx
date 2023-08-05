import { setAuthStatus, setUser } from "../redux/auth/actions";
import { signOutUser } from "../utils";
import { useDispatch,  } from "react-redux";

export const Settings = () => {
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
            await signOutUser();

            dispatch(setAuthStatus(false));
            dispatch(setUser({}));
        } catch (error) {
            alert("Error signing out");
            console.log(error);
        }
    }
    
    return (
        <div>
            <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sing out
            </button>
        </div>
    )
}