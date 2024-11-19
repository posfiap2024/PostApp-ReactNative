import { api } from "./api";

export const obterPosts = async () => {
  try {
    const response = await api(`/posts`)
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

export const obterPostPorId = async (id: any) => {
  try {
    const response = await api(`/posts/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao obter post');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao obter post:', error);
    return undefined;
  }
};

export const obterPostsAdmin = async (token: any) => {
  try {
    const response = await api(`/posts/admin`, {
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
    const response = await api(`/posts/search?q=${query}`);
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
    const response = await api(`/posts`, {
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
    const response = await api(`/posts/${id}`, {
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
    const response = await api(`/posts/${id}`, {
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
