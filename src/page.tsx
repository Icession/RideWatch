'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Search, Eye, Edit2, AlertCircle, Eye as TrackIcon } from 'lucide-react';

type UserRole = 'passenger' | 'driver' | 'admin';
type UserStatus = 'active' | 'inactive' | 'suspended';
type RouteStatus = 'active' | 'completed' | 'cancelled';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  ridesCount: number;
}

interface Route {
  id: string;
  origin: string;
  destination: string;
  driver: string;
  distance: number;
  fare: number;
  status: RouteStatus;
}

// Mock user data
const mockUsers: User[] = [
  { id: '1', name: 'Maria Santos', email: 'maria@example.com', role: 'passenger', status: 'active', joinedDate: 'Jan 12, 2024', ridesCount: 24 },
  { id: '2', name: 'Juan Dela Cruz', email: 'juan@example.com', role: 'driver', status: 'active', joinedDate: 'Dec 05, 2023', ridesCount: 87 },
  { id: '3', name: 'Rosa Garcia', email: 'rosa@example.com', role: 'passenger', status: 'inactive', joinedDate: 'Nov 20, 2023', ridesCount: 5 },
  { id: '4', name: 'Carlos Reyes', email: 'carlos@example.com', role: 'driver', status: 'active', joinedDate: 'Oct 10, 2023', ridesCount: 156 },
  { id: '5', name: 'Ana Lopez', email: 'ana@example.com', role: 'admin', status: 'active', joinedDate: 'Sep 01, 2023', ridesCount: 0 },
  { id: '6', name: 'Miguel Torres', email: 'miguel@example.com', role: 'passenger', status: 'suspended', joinedDate: 'Aug 15, 2023', ridesCount: 12 },
  { id: '7', name: 'Isabella Cruz', email: 'isabella@example.com', role: 'driver', status: 'active', joinedDate: 'Jul 22, 2023', ridesCount: 203 },
  { id: '8', name: 'Francisco Diaz', email: 'francisco@example.com', role: 'passenger', status: 'active', joinedDate: 'Jun 30, 2023', ridesCount: 45 },
  { id: '9', name: 'Luisa Mendoza', email: 'luisa@example.com', role: 'passenger', status: 'active', joinedDate: 'May 18, 2023', ridesCount: 31 },
  { id: '10', name: 'Pedro Romero', email: 'pedro@example.com', role: 'driver', status: 'inactive', joinedDate: 'Apr 12, 2023', ridesCount: 89 },
  { id: '11', name: 'Sofia Gonzalez', email: 'sofia@example.com', role: 'passenger', status: 'active', joinedDate: 'Mar 25, 2023', ridesCount: 18 },
  { id: '12', name: 'Roberto Fernandez', email: 'roberto@example.com', role: 'driver', status: 'suspended', joinedDate: 'Feb 14, 2023', ridesCount: 92 },
];

// Mock routes data
const mockRoutes: Route[] = [
  { id: 'RT001', origin: 'BGC, Taguig', destination: 'Makati Business District', driver: 'Juan Dela Cruz', distance: 8.5, fare: 250, status: 'active' },
  { id: 'RT002', origin: 'Quezon City', destination: 'Pasig City', driver: 'Carlos Reyes', distance: 15.2, fare: 380, status: 'completed' },
  { id: 'RT003', origin: 'Manila', destination: 'Caloocan', driver: 'Isabella Cruz', distance: 12.3, fare: 320, status: 'active' },
  { id: 'RT004', origin: 'Las Piñas', destination: 'Paranaque', driver: 'Juan Dela Cruz', distance: 5.8, fare: 180, status: 'cancelled' },
  { id: 'RT005', origin: 'Muntinlupa', destination: 'Marikina', driver: 'Carlos Reyes', distance: 18.9, fare: 450, status: 'active' },
  { id: 'RT006', origin: 'Pasig City', destination: 'Antipolo', driver: 'Isabella Cruz', distance: 22.1, fare: 520, status: 'completed' },
];

export default function AdminPage(): React.ReactElement {
  // User Management State
  const [searchUser, setSearchUser] = useState<string>('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<UserStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Routes Management State
  const [searchRoute, setSearchRoute] = useState<string>('');
  const [filterRouteStatus, setFilterRouteStatus] = useState<RouteStatus | 'all'>('all');

  const USERS_PER_PAGE = 8;

  // Filter and paginate users
  const filteredUsers = useMemo((): User[] => {
    return mockUsers.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchUser, filterRole, filterStatus]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = useMemo((): User[] => {
    const startIdx = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIdx, startIdx + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Filter routes
  const filteredRoutes = useMemo((): Route[] => {
    return mockRoutes.filter((route) => {
      const matchesSearch = route.origin.toLowerCase().includes(searchRoute.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchRoute.toLowerCase()) ||
        route.driver.toLowerCase().includes(searchRoute.toLowerCase()) ||
        route.id.toLowerCase().includes(searchRoute.toLowerCase());
      const matchesStatus = filterRouteStatus === 'all' || route.status === filterRouteStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchRoute, filterRouteStatus]);

  // Calculate stats
  const userStats = useMemo(() => ({
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === 'active').length,
    inactive: mockUsers.filter((u) => u.status === 'inactive').length,
    suspended: mockUsers.filter((u) => u.status === 'suspended').length,
  }), []);

  const routeStats = useMemo(() => ({
    total: mockRoutes.length,
    active: mockRoutes.filter((r) => r.status === 'active').length,
    completed: mockRoutes.filter((r) => r.status === 'completed').length,
    cancelled: mockRoutes.filter((r) => r.status === 'cancelled').length,
  }), []);

  const getStatusColor = (status: UserStatus | RouteStatus): string => {
    const colors: Record<UserStatus | RouteStatus, string> = {
      active: 'rgba(255, 255, 255, 0.9)',
      inactive: 'rgba(255, 255, 255, 0.7)',
      suspended: '#ff9999',
      completed: 'rgba(255, 255, 255, 0.9)',
      cancelled: '#ff9999',
    };
    return colors[status];
  };

  const getRoleColor = (role: UserRole): string => {
    const colors: Record<UserRole, string> = {
      passenger: 'rgba(255, 255, 255, 0.85)',
      driver: 'rgba(255, 255, 255, 0.9)',
      admin: '#ffff99',
    };
    return colors[role];
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(160deg, #8b0000 0%, #5c0000 100%)',
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      <div style={{ padding: '48px 40px' }} className="max-w-screen-xl mx-auto">
        {/* Header */}
        <h1
          className="mb-12"
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 400,
            color: '#ffffff',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          Admin Dashboard
        </h1>

        {/* ==================== USER MANAGEMENT ==================== */}
        <section className="mb-12">
          <h2
            className="mb-6"
            style={{
              fontSize: '1.2rem',
              fontWeight: 400,
              color: '#ffffff',
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            User Management
          </h2>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Users', value: userStats.total },
              { label: 'Active', value: userStats.active },
              { label: 'Inactive', value: userStats.inactive },
              { label: 'Suspended', value: userStats.suspended },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 border rounded-4xl"
                style={{
                  background: 'rgba(139,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontFamily: '"Courier New", Courier, monospace', marginBottom: '4px' }}>
                  {stat.label}
                </p>
                <p style={{ color: '#ffffff', fontSize: '24px', fontWeight: 500, fontFamily: '"Courier New", Courier, monospace' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search
                size={16}
                style={{ color: '#999999', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchUser}
                onChange={(e) => {
                  setSearchUser(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#333333',
                  fontSize: '14px',
                  fontFamily: '"Courier New", Courier, monospace',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                }}
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value as UserRole | 'all');
                setCurrentPage(1);
              }}
              style={{
                background: '#ffffff',
                color: '#333333',
                fontSize: '14px',
                fontFamily: '"Courier New", Courier, monospace',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Roles</option>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as UserStatus | 'all');
                setCurrentPage(1);
              }}
              style={{
                background: '#ffffff',
                color: '#333333',
                fontSize: '14px',
                fontFamily: '"Courier New", Courier, monospace',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Users Table */}
          <div
            className="rounded-4xl overflow-hidden"
            style={{
              background: 'rgba(139,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"Courier New", Courier, monospace', fontSize: '14px' }}>
                <thead>
                  <tr
                    style={{
                      background: 'rgba(139,0,0,0.6)',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {['Name', 'Email', 'Role', 'Status', 'Joined', 'Rides', 'Actions'].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      style={{
                        background: idx % 2 === 0 ? 'rgba(139,0,0,0.2)' : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#ffffff' }}>{user.name}</td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{user.email}</td>
                      <td style={{ padding: '12px 16px', color: getRoleColor(user.role), fontWeight: 500 }}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.1)',
                            color: getStatusColor(user.status),
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 500,
                          }}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>{user.joinedDate}</td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>{user.ridesCount}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex gap-2">
                          <button
                            aria-label="View user"
                            style={{
                              background: '#ffffff',
                              color: '#111111',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontFamily: '"Courier New", Courier, monospace',
                              fontWeight: 500,
                              transition: 'background 0.2s',
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                            }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            aria-label="Edit user"
                            style={{
                              background: '#ffffff',
                              color: '#111111',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontFamily: '"Courier New", Courier, monospace',
                              fontWeight: 500,
                              transition: 'background 0.2s',
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                            }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            aria-label="Suspend user"
                            style={{
                              background: '#ffffff',
                              color: '#111111',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontFamily: '"Courier New", Courier, monospace',
                              fontWeight: 500,
                              transition: 'background 0.2s',
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                            }}
                          >
                            <AlertCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              className="flex items-center justify-between"
              style={{
                padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(139,0,0,0.3)',
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontFamily: '"Courier New", Courier, monospace' }}>
                Page {currentPage} of {totalPages || 1} • {filteredUsers.length} results
              </p>
              <div className="flex gap-2">
                <button
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    background: currentPage === 1 ? 'rgba(255,255,255,0.2)' : '#ffffff',
                    color: currentPage === 1 ? 'rgba(255,255,255,0.5)' : '#111111',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", Courier, monospace',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  aria-label="Next page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    background: currentPage === totalPages ? 'rgba(255,255,255,0.2)' : '#ffffff',
                    color: currentPage === totalPages ? 'rgba(255,255,255,0.5)' : '#111111',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: '"Courier New", Courier, monospace',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ROUTES & BOOKINGS ==================== */}
        <section>
          <h2
            className="mb-6"
            style={{
              fontSize: '1.2rem',
              fontWeight: 400,
              color: '#ffffff',
              fontFamily: '"Courier New", Courier, monospace',
            }}
          >
            Routes & Bookings
          </h2>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Routes', value: routeStats.total },
              { label: 'Active', value: routeStats.active },
              { label: 'Completed', value: routeStats.completed },
              { label: 'Cancelled', value: routeStats.cancelled },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4"
                style={{
                  background: 'rgba(139,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '16px',
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontFamily: '"Courier New", Courier, monospace', marginBottom: '4px' }}>
                  {stat.label}
                </p>
                <p style={{ color: '#ffffff', fontSize: '24px', fontWeight: 500, fontFamily: '"Courier New", Courier, monospace' }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search
                size={16}
                style={{ color: '#999999', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search by route ID, origin, destination, or driver..."
                value={searchRoute}
                onChange={(e) => setSearchRoute(e.target.value)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  color: '#333333',
                  fontSize: '14px',
                  fontFamily: '"Courier New", Courier, monospace',
                  padding: '10px 14px 10px 36px',
                  borderRadius: '8px',
                  border: 'none',
                  outline: 'none',
                }}
              />
            </div>

            <select
              value={filterRouteStatus}
              onChange={(e) => setFilterRouteStatus(e.target.value as RouteStatus | 'all')}
              style={{
                background: '#ffffff',
                color: '#333333',
                fontSize: '14px',
                fontFamily: '"Courier New", Courier, monospace',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                outline: 'none',
                minWidth: '140px',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Routes Table */}
          <div
            className="rounded-4xl overflow-hidden"
            style={{
              background: 'rgba(139,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"Courier New", Courier, monospace', fontSize: '14px' }}>
                <thead>
                  <tr
                    style={{
                      background: 'rgba(139,0,0,0.6)',
                      borderBottom: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {['Route ID', 'Origin', 'Destination', 'Driver', 'Distance', 'Fare', 'Status', 'Actions'].map((header) => (
                      <th
                        key={header}
                        style={{
                          padding: '12px 16px',
                          textAlign: 'left',
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map((route, idx) => (
                    <tr
                      key={route.id}
                      style={{
                        background: idx % 2 === 0 ? 'rgba(139,0,0,0.2)' : 'transparent',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <td style={{ padding: '12px 16px', color: '#ffffff', fontWeight: 600, fontFamily: '"Courier New", Courier, monospace' }}>
                        {route.id}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.9)', fontFamily: '"Courier New", Courier, monospace' }}>
                        {route.origin}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.9)', fontFamily: '"Courier New", Courier, monospace' }}>
                        {route.destination}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontFamily: '"Courier New", Courier, monospace' }}>
                        {route.driver}
                      </td>
                      <td style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.9)', fontFamily: '"Courier New", Courier, monospace' }}>
                        {route.distance} km
                      </td>
                      <td style={{ padding: '12px 16px', color: '#ffffff', fontWeight: 600, fontFamily: '"Courier New", Courier, monospace' }}>
                        ₱{route.fare}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.1)',
                            color: getStatusColor(route.status),
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 500,
                            fontFamily: '"Courier New", Courier, monospace',
                          }}
                        >
                          {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex gap-2">
                          <button
                            aria-label="View route"
                            style={{
                              background: '#ffffff',
                              color: '#111111',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontFamily: '"Courier New", Courier, monospace',
                              fontWeight: 500,
                              transition: 'background 0.2s',
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                            }}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            aria-label="Track route"
                            style={{
                              background: '#ffffff',
                              color: '#111111',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '12px',
                              fontFamily: '"Courier New", Courier, monospace',
                              fontWeight: 500,
                              transition: 'background 0.2s',
                            }}
                            onMouseOver={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#f0f0f0';
                            }}
                            onMouseOut={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.background = '#ffffff';
                            }}
                          >
                            <TrackIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRoutes.length === 0 && (
              <div style={{ padding: '40px 16px', textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: '"Courier New", Courier, monospace' }}>
                  No routes found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
