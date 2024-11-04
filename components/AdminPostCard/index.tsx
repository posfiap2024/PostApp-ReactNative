import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type AdminPostCardProps = {
  navigation: NavigationProp<any>;
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    status: string;
  };
};

const AdminPostCard = ({ post, navigation }: AdminPostCardProps) => {
  // Limitar a descrição a 150 caracteres
  const shortDescription = post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content;

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
            style={[styles.iconButton, styles.deleteButton]}
        >
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
});

export default AdminPostCard;
