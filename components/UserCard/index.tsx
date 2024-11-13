import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type UserCardProps = {
  id: string;
  username: string;
  role: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function UserCard({ id, username, role, onEdit, onDelete }: UserCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteUser = () => {
    onDelete(id);
    setModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{username}</Text>
        <Text style={[styles.cardDescription, styles.boldText]}>Função: {role}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => onEdit(id)}
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
            <Text style={styles.modalMessage}>Você tem certeza que deseja excluir este usuário?</Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleDeleteUser}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
  boldText: {
    fontWeight: 'bold',
    paddingTop: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    alignItems: 'center',
    padding: 8,
    width: 80,
    borderRadius: 16,
  },
  editButton: {
    backgroundColor: '#433878', // Roxo para editar
  },
  deleteButton: {
    backgroundColor: '#FB4D3D', // Vermelho para excluir
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

export default UserCard;
