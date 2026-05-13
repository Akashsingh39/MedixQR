// ── API Base URL (relative — works on any port automatically) ─
const API = '/api';

// ── Token Helpers ─────────────────────────────────────────────
const getToken  = ()            => localStorage.getItem('medixqr_token');
const getUser   = ()            => JSON.parse(localStorage.getItem('medixqr_user') || 'null');
const saveAuth  = (token, user) => {
  localStorage.setItem('medixqr_token', token);
  localStorage.setItem('medixqr_user', JSON.stringify(user));
};
const clearAuth = () => {
  localStorage.removeItem('medixqr_token');
  localStorage.removeItem('medixqr_user');
};

// ── Auth Guard ────────────────────────────────────────────────
const requireAuth = () => {
  if (!getToken()) { window.location.href = '/pages/login.html'; }
};
const requireGuest = () => {
  if (getToken()) { window.location.href = '/pages/dashboard.html'; }
};

// ── Fetch Wrapper ─────────────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// ── Show / Hide Alert ─────────────────────────────────────────
const showAlert = (id, message, type = 'error') => {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = message;
  setTimeout(() => el.classList.remove('show'), 5000);
};

// ── Logout ────────────────────────────────────────────────────
const logout = () => {
  clearAuth();
  window.location.href = '/pages/login.html';
};

// ── Render Navbar Username ────────────────────────────────────
const renderNavUser = () => {
  const user = getUser();
  const el = document.getElementById('nav-username');
  if (el && user) el.textContent = `👋 ${user.name}`;
};
