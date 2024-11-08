import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { atualizarPost, excluirPost } from '../../services/api';

type AdminPostCardProps = {
  navigation: NavigationProp<any>;
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    status: string;
  };
  carregarPosts: () => void;
};

const AdminPostCard = ({ post, navigation, carregarPosts }: AdminPostCardProps) => {
  // Limitar a descrição a 150 caracteres
  const shortDescription = post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content;

  const { token } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handlePublishPost = async () => {
    try {
      const atualizaPost = await atualizarPost(token, post.id, { "status": "published" });

      console.log(atualizaPost);

      if (atualizaPost) {
        carregarPosts();
      }
    } catch (error) {
      console.error('Erro ao publicar o post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const postExcluido = await excluirPost(post.id, token);

      if (postExcluido) {
        carregarPosts();
      }

      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{post.title}</Text>
        <Text style={styles.cardDescription}>{shortDescription}</Text>

        <Text style={[styles.cardDescription, styles.paddingTop]}>Status: {post.status}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={[
            styles.iconButton, 
            post.status !== 'draft' ? styles.disabledButton : styles.publishButton
          ]}
          disabled={post.status !== 'draft'}
          onPress={handlePublishPost} 
        >
          <Ionicons name="cloud-upload-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Editar Postagem')} 
          style={[styles.iconButton, styles.editButton]}
        >
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)} 
          style={[styles.iconButton, styles.deleteButton]}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalMessage}>Você tem certeza que deseja excluir este post?</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleDeletePost}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingTop: {
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
    padding: 8,
    width: 70,
    borderRadius: 16,
  },
  editButton: {
    backgroundColor: '#008CBA', // Azul para editar
  },
  deleteButton: {
    backgroundColor: '#F44336', // Vermelho para excluir
  },
  publishButton: {    
    backgroundColor: '#4CAF50', // Verde para publicar
  },
  disabledButton: {
    backgroundColor: '#B0B0B0', // Cinza para desabilitado
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  buttonCancel: {
    backgroundColor: '#B0B0B0', // Cinza para cancelar
  },
  buttonConfirm: {
    backgroundColor: '#F44336', // Vermelho para confirmar
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AdminPostCard;
