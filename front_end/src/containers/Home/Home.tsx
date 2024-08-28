import { FunctionComponent, ReactElement, useContext } from "react";
import { AuthContext } from "../../utils/AuthRoute";

const Button: FunctionComponent = (): ReactElement => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            {user ? 
            <>
                <h1>Name: {user.username}</h1>
                <h1>Email: {user.email}</h1>
                <h1>Phone: {user.phone}</h1>
            </>
            : null}
        </div>
    )
}

export default Button