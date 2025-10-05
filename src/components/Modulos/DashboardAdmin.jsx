"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [filters, setFilters] = useState({
    attendance: "all", // "all", "attending", "notAttending"
    vegetarian: "all", // "all", "vegetarian", "notVegetarian"
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    attendingUsers: 0,
    notAttendingUsers: 0,
    totalPeople: 0,
    totalSongs: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      const [usersResponse, songsResponse] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/songs"),
      ]);

      const usersData = await usersResponse.json();
      const songsData = await songsResponse.json();

      setUsers(usersData);
      setSongs(songsData);

      // Calcular estadísticas con verificación de tipos
      let totalConfirmations = 0;
      let totalPeopleAttending = 0;
      let totalPeopleNotAttending = 0;
      let totalVegetarianMenu = 0;
      let totalSongs = 0;

      if (Array.isArray(usersData)) {
        totalConfirmations = usersData.length;
        // Calcular total de personas que van a asistir
        totalPeopleAttending = usersData
          .filter((user) => user.asistira?.toLowerCase() === "sí")
          .reduce((sum, user) => {
            const cantidadPersonas = parseInt(user.cantidadPersonas || "1", 10);
            return sum + (Number.isNaN(cantidadPersonas) ? 1 : cantidadPersonas);
          }, 0);

        // Calcular total de personas que NO van a asistir
        totalPeopleNotAttending = usersData
          .filter((user) => user.asistira?.toLowerCase() === "no")
          .reduce((sum, user) => {
            const cantidadPersonas = parseInt(user.cantidadPersonas || "1", 10);
            return sum + (Number.isNaN(cantidadPersonas) ? 1 : cantidadPersonas);
          }, 0);

        // Calcular total de personas con menú vegetariano/vegano
        totalVegetarianMenu = usersData
          .filter((user) => user.asistira?.toLowerCase() === "sí")
          .reduce((sum, user) => {
            const cantidadVegetariano = parseInt(user.menuVegetariano || "0", 10);
            return sum + (Number.isNaN(cantidadVegetariano) ? 0 : cantidadVegetariano);
          }, 0);
      }

      if (Array.isArray(songsData)) {
        totalSongs = songsData.length;
      }

      setStats({
        totalUsers: totalConfirmations,
        attendingUsers: totalPeopleAttending,
        notAttendingUsers: totalPeopleNotAttending,
        totalPeople: totalVegetarianMenu,
        totalSongs,
      });
    } catch (error) {
      throw new Error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClearData = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción borrará TODOS los datos de confirmaciones y canciones. No se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, borrar todo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/clear-data", {
          method: "DELETE",
        });

        if (response.ok) {
          await Swal.fire({
            title: "¡Datos borrados!",
            text: "Todos los datos han sido eliminados exitosamente.",
            icon: "success",
          });
          // Recargar los datos
          fetchData();
        } else {
          throw new Error("Error al borrar datos");
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se pudieron borrar los datos. Intenta nuevamente.",
          icon: "error",
        });
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("es-ES");
    } catch {
      return dateString;
    }
  };

  // Función para filtrar usuarios
  const getFilteredUsers = () => {
    if (!Array.isArray(users)) return [];

    return users.filter((user) => {
      // Filtro por asistencia
      const attendanceMatch = filters.attendance === "all"
        || (filters.attendance === "attending" && user.asistira?.toLowerCase() === "sí")
        || (filters.attendance === "notAttending" && user.asistira?.toLowerCase() === "no");

      // Filtro por menú vegetariano (solo aplica a los que asisten)
      const vegetarianMatch = filters.vegetarian === "all"
        || (filters.vegetarian === "vegetarian" && user.asistira?.toLowerCase() === "sí" && parseInt(user.menuVegetariano || "0", 10) > 0)
        || (filters.vegetarian === "notVegetarian" && user.asistira?.toLowerCase() === "sí" && parseInt(user.menuVegetariano || "0", 10) === 0);

      return attendanceMatch && vegetarianMatch;
    });
  };

  const filteredUsers = getFilteredUsers();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">

          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto" />

          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600">
            Gestión de confirmaciones y canciones del casamiento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Confirmaciones
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Personas Asistentes</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.attendingUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Menú Vegetariano/Vegano</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalPeople}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">No Asisten</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.notAttendingUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Canciones</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalSongs}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("users")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "users"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                type="button"
              >
                Confirmaciones (
                {stats.totalUsers}
                )
              </button>
              <button
                onClick={() => setActiveTab("songs")}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === "songs"
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                type="button"
              >
                Canciones (
                {stats.totalSongs}
                )
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "users" && (
              <div>
                {/* Filtros */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="attendanceFilter" className="block text-sm font-medium text-gray-700 mb-2">
                        Asistencia
                      </label>
                      <select
                        id="attendanceFilter"
                        value={filters.attendance}
                        onChange={(e) => setFilters({ ...filters, attendance: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      >
                        <option value="all">Todos</option>
                        <option value="attending">Solo asistentes</option>
                        <option value="notAttending">Solo no asistentes</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vegetarianFilter" className="block text-sm font-medium text-gray-700 mb-2">
                        Menú Vegetariano
                      </label>
                      <select
                        id="vegetarianFilter"
                        value={filters.vegetarian}
                        onChange={(e) => setFilters({ ...filters, vegetarian: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      >
                        <option value="all">Todos</option>
                        <option value="vegetarian">Solo vegetarianos/veganos</option>
                        <option value="notVegetarian">Solo menú normal</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Mostrando
                      {" "}
                      {filteredUsers.length}
                      {" "}
                      de
                      {" "}
                      {users.length}
                      {" "}
                      confirmaciones
                    </p>
                    <button
                      type="button"
                      onClick={() => setFilters({ attendance: "all", vegetarian: "all" })}
                      className="text-sm text-rose-600 hover:text-rose-800 font-medium"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px] divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Asiste
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                          Cantidad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Menú Vegetariano
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                          Comentarios
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Array.isArray(filteredUsers)
                        && filteredUsers.map((user) => (
                          <tr key={`${user.email}-${user.marcaTemporal}`} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(user.marcaTemporal)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {user.nombreCompleto}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.asistira?.toLowerCase() === "sí"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {user.asistira || "Sin respuesta"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 min-w-[150px]">
                              {user.asistira?.toLowerCase() === "sí" ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {user.cantidadPersonas || "1"}
                                  {user.cantidadPersonas === "1" ? "persona" : "personas"}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {user.asistira?.toLowerCase() === "sí" && (
                                parseInt(user.menuVegetariano || "0", 10) > 0 ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {user.menuVegetariano}
                                    {user.menuVegetariano === "1" ? " persona" : " personas"}
                                  </span>
                                ) : (
                                  <span className="text-gray-400">Menú normal</span>
                                )
                              )}
                              {user.asistira?.toLowerCase() !== "sí" && (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 min-w-[200px] max-w-md">
                              <div className="break-words">
                                {user.comentarios || "-"}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {(!Array.isArray(filteredUsers) || filteredUsers.length === 0) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        {Array.isArray(users) && users.length > 0
                          ? "No hay resultados que coincidan con los filtros aplicados"
                          : "No hay confirmaciones aún"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "songs" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Canción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(songs)
                      && songs.map((song) => (
                        <tr key={song.email} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(song.fecha)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {song.nombre}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {song.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {song.cancionSugerida}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {song.link ? (
                              <a
                                href={song.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-rose-600 hover:text-rose-900 underline"
                              >
                                Ver enlace
                              </a>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {(!Array.isArray(songs) || songs.length === 0) && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No hay canciones sugeridas aún
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {loading ? "Actualizando..." : "Actualizar Datos"}
          </button>

          <button
            type="button"
            onClick={handleClearData}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {loading ? "Procesando..." : "🗑️ Borrar Datos"}
          </button>
        </div>
      </div>
    </div>
  );
}
