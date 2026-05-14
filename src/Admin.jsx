import { useState, useMemo } from 'react';
import './Admin.css';

// Simple SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="6" cy="6" r="5"></circle>
    <path d="m11 11 4 4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

// Mock user data
const mockUsers = [
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
const mockRoutes = [
  { id: 'RT001', origin: 'BGC, Taguig', destination: 'Makati Business District', driver: 'Juan Dela Cruz', distance: 8.5, fare: 250, status: 'active' },
  { id: 'RT002', origin: 'Quezon City', destination: 'Pasig City', driver: 'Carlos Reyes', distance: 15.2, fare: 380, status: 'completed' },
  { id: 'RT003', origin: 'Manila', destination: 'Caloocan', driver: 'Isabella Cruz', distance: 12.3, fare: 320, status: 'active' },
  { id: 'RT004', origin: 'Las Piñas', destination: 'Paranaque', driver: 'Juan Dela Cruz', distance: 5.8, fare: 180, status: 'cancelled' },
  { id: 'RT005', origin: 'Muntinlupa', destination: 'Marikina', driver: 'Carlos Reyes', distance: 18.9, fare: 450, status: 'active' },
  { id: 'RT006', origin: 'Pasig City', destination: 'Antipolo', driver: 'Isabella Cruz', distance: 22.1, fare: 520, status: 'completed' },
];

const getStatusColor = (status) => {
  const colors = {
    active: { bg: 'rgba(139, 0, 0, 0.35)', text: '#ff8a80' },
    inactive: { bg: 'rgba(255, 255, 255, 0.1)', text: 'rgba(255, 255, 255, 0.6)' },
    suspended: { bg: 'rgba(80, 0, 0, 0.4)', text: 'rgba(255, 120, 120, 0.7)' },
    completed: { bg: 'rgba(255, 255, 255, 0.1)', text: 'rgba(255, 255, 255, 0.6)' },
    cancelled: { bg: 'rgba(80, 0, 0, 0.4)', text: 'rgba(255, 120, 120, 0.7)' },
  };
  return colors[status];
};

const getRoleColor = (role) => {
  const colors = {
    passenger: 'rgba(255, 255, 255, 0.6)',
    driver: 'rgba(255, 255, 255, 0.9)',
    admin: '#ff8a80',
  };
  return colors[role];
};

export default function Admin() {
  // User Management State
  const [searchUser, setSearchUser] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Routes Management State
  const [searchRoute, setSearchRoute] = useState('');
  const [filterRouteStatus, setFilterRouteStatus] = useState('all');

  const USERS_PER_PAGE = 8;

  // Filter and paginate users
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchUser, filterRole, filterStatus]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(startIdx, startIdx + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  // Filter routes
  const filteredRoutes = useMemo(() => {
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

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* ==================== USER MANAGEMENT ==================== */}
        <section className="admin-section">
          <h2 className="admin-section-title">User Management</h2>

          {/* Stats Row */}
          <div className="admin-stats-grid">
            {[
              { label: 'Total Users', value: userStats.total },
              { label: 'Active', value: userStats.active },
              { label: 'Inactive', value: userStats.inactive },
              { label: 'Suspended', value: userStats.suspended },
            ].map((stat) => (
              <div key={stat.label} className="admin-stat-card">
                <p className="admin-stat-label">{stat.label}</p>
                <p className="admin-stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="admin-controls">
            <div className="admin-search-wrapper">
              <SearchIcon className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchUser}
                onChange={(e) => {
                  setSearchUser(e.target.value);
                  setCurrentPage(1);
                }}
                className="admin-search-input"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setCurrentPage(1);
              }}
              className="admin-select"
            >
              <option value="all">All Roles</option>
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-header">
                  {['Name', 'Email', 'Role', 'Status', 'Joined', 'Rides', 'Actions'].map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => (
                  <tr key={user.id} className={idx % 2 === 0 ? 'admin-table-row-alt' : ''}>
                    <td>{user.name}</td>
                    <td className="admin-table-email">{user.email}</td>
                    <td className="admin-table-role" style={{ color: getRoleColor(user.role) }}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </td>
                    <td>
                      <span
                        className="admin-badge"
                        style={{ 
                          background: getStatusColor(user.status).bg,
                          color: getStatusColor(user.status).text
                        }}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="admin-table-date">{user.joinedDate}</td>
                    <td className="admin-table-count">{user.ridesCount}</td>
                    <td>
                      <div className="admin-actions">
                        <button aria-label="View user" className="admin-action-btn">
                          <EyeIcon />
                        </button>
                        <button aria-label="Edit user" className="admin-action-btn">
                          <EditIcon />
                        </button>
                        <button aria-label="Suspend user" className="admin-action-btn">
                          <AlertIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="admin-pagination">
              <p className="admin-pagination-info">
                Page {currentPage} of {totalPages || 1} • {filteredUsers.length} results
              </p>
              <div className="admin-pagination-buttons">
                <button
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="admin-pagination-btn"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  aria-label="Next page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="admin-pagination-btn"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ROUTES & BOOKINGS ==================== */}
        <section className="admin-section">
          <h2 className="admin-section-title">Routes & Bookings</h2>

          {/* Stats Row */}
          <div className="admin-stats-grid">
            {[
              { label: 'Total Routes', value: routeStats.total },
              { label: 'Active', value: routeStats.active },
              { label: 'Completed', value: routeStats.completed },
              { label: 'Cancelled', value: routeStats.cancelled },
            ].map((stat) => (
              <div key={stat.label} className="admin-stat-card">
                <p className="admin-stat-label">{stat.label}</p>
                <p className="admin-stat-value">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="admin-controls">
            <div className="admin-search-wrapper">
              <SearchIcon className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by route ID, origin, destination, or driver..."
                value={searchRoute}
                onChange={(e) => setSearchRoute(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <select
              value={filterRouteStatus}
              onChange={(e) => setFilterRouteStatus(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Routes Table */}
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-header">
                  {['Route ID', 'Origin', 'Destination', 'Driver', 'Distance', 'Fare', 'Status', 'Actions'].map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((route, idx) => (
                  <tr key={route.id} className={idx % 2 === 0 ? 'admin-table-row-alt' : ''}>
                    <td className="admin-table-id">{route.id}</td>
                    <td>{route.origin}</td>
                    <td>{route.destination}</td>
                    <td className="admin-table-driver">{route.driver}</td>
                    <td>{route.distance} km</td>
                    <td className="admin-table-fare">₱{route.fare}</td>
                    <td>
                      <span
                        className="admin-badge"
                        style={{ 
                          background: getStatusColor(route.status).bg,
                          color: getStatusColor(route.status).text
                        }}
                      >
                        {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button aria-label="View route" className="admin-action-btn">
                          <EyeIcon />
                        </button>
                        <button aria-label="Track route" className="admin-action-btn">
                          <EyeIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredRoutes.length === 0 && (
              <div className="admin-empty-state">
                <p>No routes found matching your search criteria.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
