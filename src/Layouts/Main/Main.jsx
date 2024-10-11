import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-[1600px] mx-auto p-2">
            <Outlet></Outlet>
        </div>
    );
};

export default Main;