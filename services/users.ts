import { api } from "./api";

export const obterUsuarios = async (
  token: any,
) => {
  try {
    console.log('Obtendo usuários... ');
    console.log('Token: ', token);

    const response = await api('/users', {
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

export const obterUsuariosPorFuncao = async (
  token: any,
  role: string,
) => {
  try {
    console.log("Função: ", role);

    const response = await api(`/users?role=${role}`, {
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
    const response = await api(`/users/${id}`, {
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
  id: number,
  username: string,
  password: string,
  role: string
) => {
  try {
    console.log('Atualizando usuário... ', username);
    const response = await api(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role, username, password  })
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário.');
    }

    // const data = await response.json();
    console.log('Usuário atualizado com sucesso!');
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logarUsuario = async (username: any, password: any) => {
  try {
    console.log('Fazendo login... ', username);
    const response = await api(`/auth/login`, {
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
    const response = await api(`/auth/user`, {
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

export const criarUsuario = async (
  token: any,
  role: any,
  username: any,
  password: any,
) => {
  try {
    console.log('Criando usuário... ', username);
    const response = await api(`/users`, {
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
  id: number,
) => {
  try {
    console.log('Excluindo usuário... ', id);
    const response = await api(`/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir usuário.');
    }

    const data = await response.json();
    console.log('Usuário excluído com sucesso!', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
