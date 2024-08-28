import { FunctionComponent, ReactElement, useContext } from "react";
import { Outlet } from "react-router-dom";
import styles from './Layout.module.css'
import { AuthContext } from "../../utils/AuthRoute";
import Button from "../UI/Button/Button";


const Layout: FunctionComponent = (): ReactElement => {
    const { user, setUser } = useContext(AuthContext);
    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }
    return (
        <div className={styles.Layout}>
            <h1>My weird app</h1>
            {user?.id ? 
                <Button
                    onClick={logout}
                >
                    Logout
                </Button>
            : null}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout