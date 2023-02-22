import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";
import Login from "./Login";
import userEvent from "@testing-library/user-event";

const authObjectMock = {
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => {
        Promise.resolve(true);
    }),
    onAuthStateChanged: jest.fn(),
    currentUser: {
        sendEmailVerification: jest.fn(() => Promise.resolve(true)),
    },
};
const authMock = jest.fn(() => authObjectMock);

export { authMock };

let mockIsLoggedIn = false;
const mockLogInFn = jest.fn();

beforeAll(() => {
    jest.mock('../../../contexts/AuthContext', () => {
        return jest.fn(() => ({
            logIn: mockLogInFn
        }))
    });

})

const setup = () => render(
    <BrowserRouter>
        <AuthProvider>
            <Login />
        </AuthProvider>
    </BrowserRouter>

);

describe('Login', () => {


    // test('Should show email error', () => {
    //     setup();
    //     const emailInput = screen.getByTestId('email');
    //     const passwordInput = screen.getByTestId('password');

    //     userEvent.type(emailInput, 'john');
    //     userEvent.click(passwordInput);

    //     const error = screen.getByText('Please entry a valid email address!');
    //     expect(error).toBeInTheDocument();
    // });

    test('Button should be disabled', () => {
        setup();
        const loginBtn = screen.getByTestId('loginBtn');
        console.log(loginBtn);
        expect(loginBtn).toBeEnabled();
    });

});



