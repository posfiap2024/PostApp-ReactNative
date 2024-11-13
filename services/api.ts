const BASE_URL = 'http://192.168.15.3:3001';
// const BASE_URL = process.env.REACT_APP_BASE_URL;


export const obterUsuarios = async (token: any) => {
  try {
    console.log('Obtendo usuários... ');
    console.log('Token: ', token);

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao obter usuários: ' + response);
    }
    
    const data = await response.json();
    console.log('Dados: ' + data)
    console.log('Usuários obtidos com sucesso!', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const obterUsuarioPorId = async (
  token: any,
  id: any
) => {
  try {
    console.log('Obtendo usuário: ', id);
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao obter usuário.');
    }

    const data = await response.json();
    console.log('Usuário obtido com sucesso!', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const atualizarUsuario = async (
  token: any,
  title: any,
  content: any,
  status: any
) => {
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

export const criarUsuario = async (
  token: any,
  role: any,
  username: any,
  password: any,
) => {
  try {
    console.log('Criando usuário... ', username);
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role, username, password })
    });

    if (!response.ok) {
      console.log('response: ', JSON.stringify({ username, password, role }));
      throw new Error('Erro ao criar usuário.');
    }

    const data = await response.json();
    console.log('Usuário criado com sucesso!', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const excluirUsuario = async (
  token: any,
  title: any,
  content: any,
  status: any
) => {
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

export const obterPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`)
    const data = await response.json()

    return data.map((post: any) => ({
      id: post.id,
      author: post.user.username,
      title: post.title,
      content: post.content,
      status: post.status
    }))
  } catch (error) {
    console.log(error)
    return []
  }
};

export const obterPostsAdmin = async (token: any) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/admin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()

    return data.map((post: any) => ({
      id: post.id,
      author: post.user.username,
      title: post.title,
      content: post.content,
      status: post.status
    }))
  } catch (error) {
    console.log(error)
    return []
  }
};

export const searchPost = async (query: any) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/search?q=${query}`);
    const data = await response.json();

    console.log('Posts encontrados: ', data);
    return data.map((post: any) => ({
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

export const criarPost = async (
  token: any,
  title: any,
  content: any,
  status: any
) => {
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

export const atualizarPost = async (token: string, id: string, post: any) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      console.error('Falha na resposta da API:', response.status, response.statusText);
      return false;
    }
    const responseText = await response.text();
    if (responseText) {
      try {
        const data = JSON.parse(responseText);
        console.log('Post atualizado com sucesso!', data);
      } catch (jsonError) {
        console.warn('Erro ao analisar JSON:', jsonError);
      }
    } else {
      console.log('Post atualizado com sucesso! (sem corpo na resposta)');
    }
    return true;
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return false;
  }
};



export const excluirPost = async (id: any, token: any, shouldLog = true) => {
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

export const obterPostPorId = async (id: any) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao obter post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter post:', error);
    return undefined;
  }
};

export const logarUsuario = async (username: any, password: any) => {
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

export const obterUsuario = async (token: any) => {
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
