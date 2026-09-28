import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(form);
      navigate(location.state?.from?.pathname || '/products', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to log in.');
    } finally {
      setBusy(false);
    }
  }

  return <AuthForm title="Welcome back" submitLabel="Log in" form={form} setForm={setForm} error={error} busy={busy} onSubmit={submit} footer={<>New here? <Link to="/register">Create an account</Link></>} />;
}

function AuthForm({ title, submitLabel, form, setForm, error, busy, onSubmit, footer, register = false }) {
  return (
    <section className="form-page">
      <div className="form-panel">
        <p className="eyebrow">Your account</p>
        <h1>{title}</h1>
        <form onSubmit={onSubmit} className="stack-form">
          {register && <label>Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>}
          <label>Email<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label>Password<input required minLength="6" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          {error && <p className="form-error">{error}</p>}
          <button className="button" disabled={busy}>{busy ? 'Working...' : submitLabel}</button>
        </form>
        <p className="form-footer">{footer}</p>
      </div>
    </section>
  );
}

export { AuthForm };
