import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../../Context/AuthContext";
import { inicioSesion } from "../../api/userController";

// Mock de dependencias
jest.mock("../../Context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("../../api/userController", () => ({
  inicioSesion: jest.fn(),
}));

// Mock para los archivos de imágenes
jest.mock("../../../public/img/Logo Reconocimiento Facial - Verde.png", () => "");
jest.mock("../../../public/img/logoVerdeSENA.png", () => "");

describe("Login Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      setUser: jest.fn(),
      guardarUserLocal: jest.fn(),
      loading: false,
    });
  });

  test("renderiza correctamente el formulario de inicio de sesión", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verificar si los campos de identificación y contraseña están presentes
    expect(screen.getByLabelText(/Número identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Aceptar/i })).toBeInTheDocument();
  });

  test("muestra errores cuando los campos están vacíos", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /Aceptar/i });
    fireEvent.click(submitButton);

    // Verificar si los mensajes de error están presentes
    await waitFor(() => {
      expect(screen.getByText(/El número de identidad es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  test("envía los datos correctamente cuando los campos están llenos", async () => {
    const mockSetUser = jest.fn();
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      setUser: mockSetUser,
      guardarUserLocal: jest.fn(),
      loading: false,
    });

    inicioSesion.mockResolvedValueOnce({
      rol_usuario: "Instructor",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Número identificación/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", { name: /Aceptar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(inicioSesion).toHaveBeenCalledWith(
        { numID: "12345", password: "password123" },
        expect.any(Function)
      );
      expect(mockSetUser).toHaveBeenCalledWith({ rol_usuario: "Instructor" });
    });
  });

  test("muestra un modal de registro al hacer clic en el botón 'Regístrate'", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simular clic en el botón "Regístrate"
    const registerButton = screen.getByText(/Regístrate/i);
    fireEvent.click(registerButton);

    // Verificar si el modal de registro está presente
    expect(screen.getByText(/Registro/i)).toBeInTheDocument();
  });

  test("muestra el loader cuando el estado 'loading' está activo", () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      setUser: jest.fn(),
      guardarUserLocal: jest.fn(),
      loading: true, // Activar loading
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Verificar si el componente Loader está presente
    expect(screen.getByText(/Cargando/i)).toBeInTheDocument();
  });
});
