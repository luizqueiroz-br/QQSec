export async function logout() {
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!res.ok) {
        throw new Error('Erro ao fazer logout');
      }
      console.log('ok, te liberei')
      return true;
    } catch (err) {
      console.error('Falha na requisição de logout:', err);
      return false;
    }
  }