import { createMemoryRouter } from "react-router-dom";
import Main from "../Layouts/Main/Main";
import PNPLExtraction from "../pages/PNPLExtraction/PNPLExtraction";

export const router = createMemoryRouter([
    {
        path: "/",
        element:<Main />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PNPLExtraction />
            },
        ]
    }
]);