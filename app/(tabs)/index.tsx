import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Callout, Marker } from 'react-native-maps';

import { addPhoto, deletePhoto, getPhotos, initDatabase } from '../../database';

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState<any[]>([]);
  const [screen, setScreen] = useState('gallery');

  useEffect(() => {
    initDatabase();
    loadPhotos();
  }, []);

  function loadPhotos() {
    setPhotos(getPhotos());
  }

  async function takePhoto() {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Digite um título.');
      return;
    }

    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert('Permissão negada', 'Permita acesso à câmera.');
      return;
    }

    const locationPermission = await Location.requestForegroundPermissionsAsync();

    if (!locationPermission.granted) {
      Alert.alert('Permissão negada', 'Permita acesso à localização.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (result.canceled) return;

    const location = await Location.getCurrentPositionAsync({});

    addPhoto({
      title,
      image_uri: result.assets[0].uri,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      created_at: new Date().toLocaleString(),
    });

    setTitle('');
    loadPhotos();

    Alert.alert('Sucesso', 'Foto salva com localização.');
  }

  function removePhoto(id: number) {
    deletePhoto(id);
    loadPhotos();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Galeria com Localização</Text>

      <View style={styles.menu}>
        <Button title="Galeria" onPress={() => setScreen('gallery')} />
        <Button title="Mapa" onPress={() => setScreen('map')} />
      </View>

      {screen === 'gallery' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Título da foto"
            value={title}
            onChangeText={setTitle}
          />

          <Button title="Tirar foto" onPress={takePhoto} />

          <FlatList
            data={photos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image_uri }} style={styles.image} />

                <Text style={styles.photoTitle}>{item.title}</Text>
                <Text>{item.created_at}</Text>
                <Text>Latitude: {item.latitude}</Text>
                <Text>Longitude: {item.longitude}</Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removePhoto(item.id)}
                >
                  <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: photos[0]?.latitude || -23.55052,
            longitude: photos[0]?.longitude || -46.633308,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {photos.map((photo) => (
            <Marker
              key={photo.id}
              coordinate={{
                latitude: photo.latitude,
                longitude: photo.longitude,
              }}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.photoTitle}>{photo.title}</Text>
                  <Image source={{ uri: photo.image_uri }} style={styles.thumb} />
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  callout: {
    width: 150,
    alignItems: 'center',
  },
  thumb: {
    width: 120,
    height: 80,
    marginTop: 5,
  },
});