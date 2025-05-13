export async function logout() {
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!res.ok) {
        throw new Error('Erro ao fazer logout');
      }
      return true;
    } catch (err) {
      console.error('Falha na requisição de logout:', err);
      return false;
    }
  }


  export async function login(username,password) {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ username, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
         
           return true
        } else if (response.status === 401) {
          return false
        }
    } catch (error) {
        console.log(error)
        return false
    }

  }