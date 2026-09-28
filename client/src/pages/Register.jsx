import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from './Login.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signUp(form);
      navigate('/products', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account.');
    } finally {
      setBusy(false);
    }
  }

  return <AuthForm title="Make room for good things" submitLabel="Create account" form={form} setForm={setForm} error={error} busy={busy} onSubmit={submit} register footer={<>Already a member? <Link to="/login">Log in</Link></>} />;
}
