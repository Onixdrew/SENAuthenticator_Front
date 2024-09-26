// src/pages/interfaces/Guarda/RegistroPersona.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import Inicio from './Inicio'; // Asegúrate de que sea la ruta correcta
import { useAuth } from '../../../Context/AuthContext'; // Mockear el contexto de autenticación
import axios from 'axios'; // Mockear la llamada a la API

// Mockear el useAuth para simular un usuario autenticado
vi.mock('../../../Context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Mockear axios para evitar hacer llamadas reales a la API
vi.mock('axios');

describe('Inicio Component', () => {
  beforeEach(() => {
    // Resetear mocks antes de cada prueba
    vi.clearAllMocks();
  });

  test('renders error message when user is not authenticated or does not have the right role', () => {
    // Simular que el usuario no está autenticado o no es guardia de seguridad
    useAuth.mockReturnValue({
      isAuthenticated: false,
      user: { rol_usuario: 'Usuario regular' },
    });

    render(<Inicio />);

    // Verificar que se muestre el mensaje de error
    expect(screen.getByText(/Error: Página no encontrada/i)).toBeInTheDocument();
  });

  test('renders the form when the user is authenticated and has the right role', async () => {
    // Simular que el usuario está autenticado y tiene el rol correcto
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { rol_usuario: 'Guardia de seguridad' },
    });

    // Simular la respuesta de la API
    const oficinasMock = [
      { id: 1, nombre_oficina: 'Oficina A' },
      { id: 2, nombre_oficina: 'Oficina B' },
    ];
    axios.get.mockResolvedValueOnce({ data: oficinasMock });

    render(<Inicio />);

    // Verificar que se muestre el formulario
    expect(screen.getByText(/Formulario de Registro/i)).toBeInTheDocument();

    // Esperar a que se carguen las opciones de oficina
    await waitFor(() => {
      expect(screen.getByText('Oficina A')).toBeInTheDocument();
      expect(screen.getByText('Oficina B')).toBeInTheDocument();
    });
  });

  test('displays an error message when the API call fails', async () => {
    // Simular que el usuario está autenticado y tiene el rol correcto
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { rol_usuario: 'Guardia de seguridad' },
    });

    // Simular un error en la llamada a la API
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<Inicio />);

    // Verificar que se muestre el formulario
    expect(screen.getByText(/Formulario de Registro/i)).toBeInTheDocument();

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/Error al obtener las oficinas/i)).toBeInTheDocument();
    });
  });
});
