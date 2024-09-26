import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";
import { registerUser } from "../../api/userController"; 

jest.mock("../../api/userController");

describe("Register Component", () => {
  const mockCerrarModal = jest.fn();

  beforeEach(() => {
    render(<Register cerrarModal={mockCerrarModal} />);
  });

  test("renders the Register form", () => {
    expect(screen.getByLabelText(/Nombre Completo:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
  });

  test("shows password error when passwords do not match", () => {
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Contraseña/i);

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "differentPassword" } });

    expect(screen.getByText(/La contraseña no coincide/i)).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    registerUser.mockResolvedValueOnce({ status: 200 });

    fireEvent.change(screen.getByLabelText(/Nombre Completo:/i), { target: { value: "Juan Pérez" } });
    fireEvent.change(screen.getByLabelText(/Tipo de identificación/i), { target: { value: "Cédula de ciudadanía" } });
    fireEvent.change(screen.getByLabelText(/Número de identificación/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: "juan@example.com" } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Aceptar/i }));

    expect(mockCerrarModal).toHaveBeenCalledWith(false);
    expect(registerUser).toHaveBeenCalledWith({
      nombre: "Juan Pérez",
      tipoID: "Cédula de ciudadanía",
      numID: "12345678",
      correo: "juan@example.com",
      password: "password123",
    });
  });

  test("does not call cerrarModal on form submission if API call fails", async () => {
    registerUser.mockRejectedValueOnce(new Error("API error"));

    fireEvent.change(screen.getByLabelText(/Nombre Completo:/i), { target: { value: "Juan Pérez" } });
    fireEvent.change(screen.getByLabelText(/Tipo de identificación/i), { target: { value: "Cédula de ciudadanía" } });
    fireEvent.change(screen.getByLabelText(/Número de identificación/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: "juan@example.com" } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: "password123" } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /Aceptar/i }));

    expect(mockCerrarModal).not.toHaveBeenCalled();
  });
});
