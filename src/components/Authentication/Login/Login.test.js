import { Home } from "@mui/icons-material";
import { render, screen, act } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";


test('using test library', () => {
    const { logIn } = useAuth(jest.mock('../../../contexts/AuthContext'));
    const value = 'Chuck Norris smth';
    render(<BrowserRouter>
        <Login text={value} />
    </BrowserRouter>
    )

    expect(screen.getByText(value)).toBeInTheDocument();
})

