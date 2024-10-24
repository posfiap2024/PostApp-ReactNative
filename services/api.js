const BASE_URL = 'http://192.168.0.169:3001';
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const obterPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)
    const data = await response.json()

    return data.map(post => ({
      id: post.id,
      autor: post.user.username,
      titulo: post.title,
      descricao: post.content
    }))
  } catch (error) {
    console.log(error)
    return []
  }
};

export const obterPostsAdmin = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()

    return data.map(post => ({
      id: post.id,
      autor: post.user.username,
      titulo: post.title,
      descricao: post.content,
      status: post.status
    }))
  } catch (error) {
    console.log(error)
    return []
  }
};

export const searchPost = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/search?q=${query}`);
    const data = await response.json();

    console.log('Posts encontrados: ', data);
    return data.map(post => ({
      id: post.id,
      autor: post.author || '',
      titulo: post.title,
      descricao: post.content
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const criarPost = async (token, title, content, status) => {
  try {
    console.log('Criando post... ', title);
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, status })
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o post');
    }

    const data = await response.json();
    console.log('Post criado com sucesso!', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const atualizarPost = async (id, post) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw error;
  }
};

export const excluirPost = async (id, token, shouldLog = true) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Falha ao excluir post');
    }

    if (shouldLog) {
      console.log('Post excluído com sucesso!');
    }

    return true;
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    throw error;
  }
};

export const obterPostPorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao obter post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter post:', error);
    throw error;
  }
};

export const logarUsuario = async (username, password) => {
  try {
    console.log('Fazendo login... ', username);
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error('Erro na requisição de login');
    }

    const data = await response.json();
    console.log('Login efetuado com sucesso!', data);
    return data.token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const obterUsuario = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await response.json();


    if (!response.ok) {
      throw new Error('Falha ao obter usuário');
    }
    console.log('Usuário obtido: ', data);
    return data;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
};
